import type { ContentFormat, FatigueReport, HealthStatus, PostMetric, ProactiveAlert } from './types';

export const MIN_BASELINE_POSTS = 5;
export const TRAILING_WINDOW_SIZE = 3;

/**
 * Calculates the median of a numeric array.
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Calculates the exponential decay rate (lambda) and estimated half-life posts.
 * Model: E(n) = E_0 * e^(-lambda * n)
 */
export function calculateDecayParameters(
  baseline: number,
  trailing: number,
  postsSinceBaseline: number
): { lambda: number; halfLifePosts: number | null } {
  if (baseline <= 0 || trailing <= 0 || postsSinceBaseline <= 0) {
    return { lambda: 0, halfLifePosts: null };
  }

  // If trailing >= baseline, there is no decay (growth or stability)
  if (trailing >= baseline) {
    return { lambda: 0, halfLifePosts: null };
  }

  const ratio = trailing / baseline;
  const lambda = -Math.log(ratio) / postsSinceBaseline;

  if (lambda <= 0) {
    return { lambda: 0, halfLifePosts: null };
  }

  // Half-life: when E(n) drops to 0.5 * baseline -> n_half = ln(2) / lambda
  const totalHalfLifePosts = Math.LN2 / lambda;
  const remainingPosts = Math.max(0, Math.round(totalHalfLifePosts - postsSinceBaseline));

  return {
    lambda: parseFloat(lambda.toFixed(4)),
    halfLifePosts: remainingPosts,
  };
}

/**
 * Evaluates a format against its post history.
 */
export function evaluateFormat(
  format: ContentFormat,
  posts: PostMetric[]
): {
  status: HealthStatus;
  baselineRate: number;
  trailingRate: number;
  decayPercentage: number;
  lambda: number;
  halfLifePosts: number | null;
  report: FatigueReport;
} {
  const sortedPosts = [...posts].sort((a, b) => a.postedAt - b.postedAt);
  const postCount = sortedPosts.length;

  // Cold-Start Statistical Floor Check (P2 requirement)
  if (postCount < MIN_BASELINE_POSTS) {
    const missing = MIN_BASELINE_POSTS - postCount;
    const currentAvg =
      postCount > 0
        ? sortedPosts.reduce((acc, p) => acc + p.engagementRate, 0) / postCount
        : 0;

    const report: FatigueReport = {
      formatId: format.id,
      formatName: format.name,
      archetype: format.archetype,
      postCount,
      status: 'PROBATION',
      baselineRate: currentAvg,
      trailingRate: currentAvg,
      decayPercentage: 0,
      halfLifePostsRemaining: null,
      needsRotation: false,
      recommendedAction: `Continue publishing. Need ${missing} more post${missing > 1 ? 's' : ''} to establish statistical baseline.`,
      plainNarrative: `Format '${format.name}' has recorded ${postCount} of ${MIN_BASELINE_POSTS} required baseline posts. Fatigue analysis is paused until baseline confidence is reached.`,
    };

    return {
      status: 'PROBATION',
      baselineRate: currentAvg,
      trailingRate: currentAvg,
      decayPercentage: 0,
      lambda: 0,
      halfLifePosts: null,
      report,
    };
  }

  // 1. Establish Baseline: Median of first 5 posts
  const baselinePosts = sortedPosts.slice(0, MIN_BASELINE_POSTS);
  const baselineRates = baselinePosts.map((p) => p.engagementRate);
  const baselineRate = calculateMedian(baselineRates);

  // 2. Compute Trailing Performance: Median of last TRAILING_WINDOW_SIZE posts
  const trailingPosts = sortedPosts.slice(-TRAILING_WINDOW_SIZE);
  const trailingRates = trailingPosts.map((p) => p.engagementRate);
  const trailingRate = calculateMedian(trailingRates);

  // 3. Compute Decay Ratio & Percentage
  const decayRatio = baselineRate > 0 ? trailingRate / baselineRate : 1.0;
  const decayPercentage = parseFloat(((decayRatio - 1) * 100).toFixed(1));

  // 4. Compute Exponential Decay Parameters
  const postsSinceBaseline = Math.max(1, postCount - MIN_BASELINE_POSTS);
  const { lambda, halfLifePosts } = calculateDecayParameters(
    baselineRate,
    trailingRate,
    postsSinceBaseline
  );

  // 5. Determine Health Status
  let status: HealthStatus = 'HEALTHY';
  let needsRotation = false;
  let recommendedAction = 'Format is performing well. Maintain current frequency.';

  if (decayRatio >= 0.85) {
    status = 'HEALTHY';
    recommendedAction = 'Format is strong. Safe to keep as primary pillar.';
  } else if (decayRatio >= 0.70) {
    status = 'STABLE';
    recommendedAction = 'Minor fatigue observed. Experiment with slight hook variations.';
  } else if (decayRatio >= 0.50) {
    status = 'FATIGUING';
    needsRotation = true;
    recommendedAction = 'Format has reached fatigue threshold. Rotate with adjacent formats or overhaul visual hook.';
  } else {
    status = 'DECAYED';
    needsRotation = true;
    recommendedAction = 'Terminal format fatigue. Retire this format or pause for at least 30-45 days to reset audience saturation.';
  }

  // 6. Generate Plain-English Narration for Mind
  let plainNarrative = '';
  if (status === 'HEALTHY' || status === 'STABLE') {
    plainNarrative = `Format '${format.name}' is healthy (${(trailingRate * 100).toFixed(1)}% vs baseline ${(baselineRate * 100).toFixed(1)}%). Decay is minimal (${decayPercentage >= 0 ? '+' : ''}${decayPercentage}%).`;
  } else if (status === 'FATIGUING') {
    plainNarrative = `⚠️ Fatigue Alert: '${format.name}' engagement is down ${Math.abs(decayPercentage)}% from baseline (${(trailingRate * 100).toFixed(1)}% vs ${(baselineRate * 100).toFixed(1)}%). Estimated half-life: ~${halfLifePosts || 2} posts before terminal fatigue. Recommendation: Rotate to a fresh format.`;
  } else {
    plainNarrative = `🚨 Critical Decay: '${format.name}' has entered terminal fatigue (down ${Math.abs(decayPercentage)}% below baseline). Audience saturation is high. Recommendation: Retire or pause this format.`;
  }

  const report: FatigueReport = {
    formatId: format.id,
    formatName: format.name,
    archetype: format.archetype,
    postCount,
    status,
    baselineRate: parseFloat(baselineRate.toFixed(4)),
    trailingRate: parseFloat(trailingRate.toFixed(4)),
    decayPercentage,
    halfLifePostsRemaining: halfLifePosts,
    needsRotation,
    recommendedAction,
    plainNarrative,
  };

  return {
    status,
    baselineRate,
    trailingRate,
    decayPercentage,
    lambda,
    halfLifePosts,
    report,
  };
}

/**
 * Inspects all formats for a creator and generates proactive alerts when formats cross fatigue gates.
 */
export function generateProactiveAlerts(
  creatorId: string,
  formats: ContentFormat[],
  allPosts: Map<string, PostMetric[]>
): ProactiveAlert[] {
  const alerts: ProactiveAlert[] = [];

  for (const format of formats) {
    const posts = allPosts.get(format.id) || [];
    if (posts.length < MIN_BASELINE_POSTS) continue;

    const evaluation = evaluateFormat(format, posts);

    if (evaluation.status === 'FATIGUING' || evaluation.status === 'DECAYED') {
      const severity = evaluation.status === 'DECAYED' ? 'CRITICAL' : 'WARNING';

      alerts.push({
        id: `alert-${format.id}-${Date.now()}`,
        formatId: format.id,
        formatName: format.name,
        creatorId,
        triggeredAt: Date.now(),
        severity,
        decayPercentage: evaluation.decayPercentage,
        message: evaluation.report.plainNarrative,
        suggestedPivots: [
          'Rotate to visual breakdown format',
          'Test counter-intuitive opinion hook',
          'Switch from tutorial pacing to narrative story arc',
        ],
        acknowledged: false,
      });
    }
  }

  return alerts;
}
