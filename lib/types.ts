export type FormatArchetype =
  | 'breakdown'
  | 'story'
  | 'opinion'
  | 'tutorial'
  | 'curation'
  | 'news'
  | 'meme';

export type HealthStatus =
  | 'PROBATION'   // < 5 posts, insufficient statistical baseline
  | 'HEALTHY'     // >= 85% of baseline
  | 'STABLE'      // 70% - 84% of baseline
  | 'FATIGUING'   // 50% - 69% of baseline (Warning threshold)
  | 'DECAYED';    // < 50% of baseline (Terminal fatigue, retire or pivot)

export interface ContentFormat {
  id: string;
  creatorId: string;
  name: string;
  archetype: FormatArchetype;
  description: string;
  firstObservedAt: number;
  baselineEngagementRate: number; // median of initial healthy window
  postCount: number;
  status: HealthStatus;
  decayRateLambda: number; // exponential decay rate per post
  halfLifePostsRemaining: number | null; // estimated posts until 50% decay
  lastEvaluatedAt: number;
}

export interface PostMetric {
  id: string;
  formatId: string;
  creatorId: string;
  title: string;
  postedAt: number;
  impressions: number;
  engagements: number; // likes + retweets + comments + bookmarks
  engagementRate: number; // engagements / impressions
}

export interface FatigueReport {
  formatId: string;
  formatName: string;
  archetype: FormatArchetype;
  postCount: number;
  status: HealthStatus;
  baselineRate: number;
  trailingRate: number;
  decayPercentage: number; // relative change vs baseline, e.g. -38.2%
  halfLifePostsRemaining: number | null;
  needsRotation: boolean;
  recommendedAction: string;
  plainNarrative: string;
}

export interface ProactiveAlert {
  id: string;
  formatId: string;
  formatName: string;
  creatorId: string;
  triggeredAt: number;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  decayPercentage: number;
  message: string;
  suggestedPivots: string[];
  acknowledged: boolean;
}
