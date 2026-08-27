import fs from 'fs';
import path from 'path';
import type { ContentFormat, PostMetric, ProactiveAlert } from './types';
import { evaluateFormat } from './decay-engine';

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

interface Schema {
  formats: ContentFormat[];
  posts: PostMetric[];
  alerts: ProactiveAlert[];
}

function getInitialSeed(): Schema {
  const now = Date.now();
  const day = 86400000;

  // Format 1: "System Architecture Deep-Dives" (Healthy & Established)
  const f1: ContentFormat = {
    id: 'fmt-deepdives',
    creatorId: 'jadoncreator',
    name: 'System Architecture Deep-Dives',
    archetype: 'breakdown',
    description: 'Technical thread breakdowns of complex distributed systems with diagrams',
    firstObservedAt: now - 30 * day,
    baselineEngagementRate: 0.052,
    postCount: 6,
    status: 'HEALTHY',
    decayRateLambda: 0,
    halfLifePostsRemaining: null,
    lastEvaluatedAt: now,
  };

  const f1Posts: PostMetric[] = [
    { id: 'p1-1', formatId: f1.id, creatorId: 'jadoncreator', title: 'Why Kafka partitions scale', postedAt: now - 28 * day, impressions: 10000, engagements: 520, engagementRate: 0.052 },
    { id: 'p1-2', formatId: f1.id, creatorId: 'jadoncreator', title: 'Raft consensus in plain English', postedAt: now - 24 * day, impressions: 12000, engagements: 630, engagementRate: 0.0525 },
    { id: 'p1-3', formatId: f1.id, creatorId: 'jadoncreator', title: 'EVM gas optimization tricks', postedAt: now - 20 * day, impressions: 11000, engagements: 560, engagementRate: 0.0509 },
    { id: 'p1-4', formatId: f1.id, creatorId: 'jadoncreator', title: 'Vector DB similarity indexing', postedAt: now - 16 * day, impressions: 15000, engagements: 780, engagementRate: 0.052 },
    { id: 'p1-5', formatId: f1.id, creatorId: 'jadoncreator', title: 'Distributed locking patterns', postedAt: now - 12 * day, impressions: 13000, engagements: 690, engagementRate: 0.053 },
    { id: 'p1-6', formatId: f1.id, creatorId: 'jadoncreator', title: 'CRDT vs OT real-time sync', postedAt: now - 4 * day, impressions: 14000, engagements: 740, engagementRate: 0.0528 },
  ];

  // Format 2: "Quick Opinion Hot Takes" (Fatiguing Format - 40% decay)
  const f2: ContentFormat = {
    id: 'fmt-hottakes',
    creatorId: 'jadoncreator',
    name: 'Quick Opinion Hot Takes',
    archetype: 'opinion',
    description: '1-sentence hot takes designed to provoke engagement',
    firstObservedAt: now - 25 * day,
    baselineEngagementRate: 0.065,
    postCount: 8,
    status: 'FATIGUING',
    decayRateLambda: 0.16,
    halfLifePostsRemaining: 3,
    lastEvaluatedAt: now,
  };

  const f2Posts: PostMetric[] = [
    { id: 'p2-1', formatId: f2.id, creatorId: 'jadoncreator', title: 'Most devtools are glorified wrappers', postedAt: now - 24 * day, impressions: 20000, engagements: 1300, engagementRate: 0.065 },
    { id: 'p2-2', formatId: f2.id, creatorId: 'jadoncreator', title: 'Stop using Microservices in 2026', postedAt: now - 21 * day, impressions: 22000, engagements: 1450, engagementRate: 0.0659 },
    { id: 'p2-3', formatId: f2.id, creatorId: 'jadoncreator', title: 'Clean code is a scam', postedAt: now - 18 * day, impressions: 19000, engagements: 1220, engagementRate: 0.0642 },
    { id: 'p2-4', formatId: f2.id, creatorId: 'jadoncreator', title: 'TypeScript isn’t optional anymore', postedAt: now - 15 * day, impressions: 25000, engagements: 1650, engagementRate: 0.066 },
    { id: 'p2-5', formatId: f2.id, creatorId: 'jadoncreator', title: 'Why fullstack devs are extinct', postedAt: now - 12 * day, impressions: 18000, engagements: 1170, engagementRate: 0.065 },
    // Trailing fatigue drop
    { id: 'p2-6', formatId: f2.id, creatorId: 'jadoncreator', title: 'Frontend frameworks are exhausting', postedAt: now - 8 * day, impressions: 16000, engagements: 720, engagementRate: 0.045 },
    { id: 'p2-7', formatId: f2.id, creatorId: 'jadoncreator', title: 'Nobody needs Docker on local', postedAt: now - 5 * day, impressions: 14000, engagements: 560, engagementRate: 0.040 },
    { id: 'p2-8', formatId: f2.id, creatorId: 'jadoncreator', title: 'AI code assistants are boring now', postedAt: now - 1 * day, impressions: 15000, engagements: 570, engagementRate: 0.038 },
  ];

  // Format 3: "Podcast Short Clips" (Cold-Start Probation - 3 posts only)
  const f3: ContentFormat = {
    id: 'fmt-podclips',
    creatorId: 'jadoncreator',
    name: 'Podcast Short Clips',
    archetype: 'curation',
    description: '30-second captioned video snippets from guest podcast episodes',
    firstObservedAt: now - 7 * day,
    baselineEngagementRate: 0.041,
    postCount: 3,
    status: 'PROBATION',
    decayRateLambda: 0,
    halfLifePostsRemaining: null,
    lastEvaluatedAt: now,
  };

  const f3Posts: PostMetric[] = [
    { id: 'p3-1', formatId: f3.id, creatorId: 'jadoncreator', title: 'Guest on scaling from 0 to 100k users', postedAt: now - 6 * day, impressions: 8000, engagements: 320, engagementRate: 0.040 },
    { id: 'p3-2', formatId: f3.id, creatorId: 'jadoncreator', title: 'Building in public without shame', postedAt: now - 4 * day, impressions: 9000, engagements: 380, engagementRate: 0.0422 },
    { id: 'p3-3', formatId: f3.id, creatorId: 'jadoncreator', title: 'The biggest mistake indie hackers make', postedAt: now - 2 * day, impressions: 8500, engagements: 350, engagementRate: 0.0411 },
  ];

  return {
    formats: [f1, f2, f3],
    posts: [...f1Posts, ...f2Posts, ...f3Posts],
    alerts: [
      {
        id: 'alert-initial-f2',
        formatId: f2.id,
        formatName: f2.name,
        creatorId: 'jadoncreator',
        triggeredAt: now - 1 * day,
        severity: 'WARNING',
        decayPercentage: -41.5,
        message: `⚠️ Fatigue Alert: '${f2.name}' engagement is down 41.5% from baseline (3.8% vs 6.5%). Estimated half-life: ~3 posts before terminal decay. Recommendation: Rotate or pause.`,
        suggestedPivots: [
          'Switch to System Architecture Deep-Dives',
          'Test long-form case studies',
        ],
        acknowledged: false,
      },
    ],
  };
}

export class MemoryStore {
  private schema: Schema;

  constructor() {
    this.schema = this.load();
  }

  private load(): Schema {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch {
      // ignore
    }
    const seed = getInitialSeed();
    this.saveDirect(seed);
    return seed;
  }

  private saveDirect(data: Schema) {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch {
      // ignore
    }
  }

  private persist() {
    this.saveDirect(this.schema);
  }

  public getFormats(creatorId?: string): ContentFormat[] {
    if (!creatorId) return this.schema.formats;
    return this.schema.formats.filter((f) => f.creatorId.toLowerCase() === creatorId.toLowerCase());
  }

  public getFormat(formatId: string): ContentFormat | undefined {
    return this.schema.formats.find((f) => f.id === formatId);
  }

  public getPosts(formatId: string): PostMetric[] {
    return this.schema.posts.filter((p) => p.formatId === formatId);
  }

  public addFormat(format: ContentFormat): ContentFormat {
    this.schema.formats.push(format);
    this.persist();
    return format;
  }

  public addPost(post: PostMetric): { post: PostMetric; format: ContentFormat } {
    this.schema.posts.push(post);

    const format = this.getFormat(post.formatId);
    if (format) {
      const formatPosts = this.getPosts(format.id);
      const evalResult = evaluateFormat(format, formatPosts);

      format.postCount = formatPosts.length;
      format.status = evalResult.status;
      format.baselineEngagementRate = evalResult.baselineRate;
      format.decayRateLambda = evalResult.lambda;
      format.halfLifePostsRemaining = evalResult.halfLifePosts;
      format.lastEvaluatedAt = Date.now();

      // Check if proactive alert should be generated
      if (evalResult.status === 'FATIGUING' || evalResult.status === 'DECAYED') {
        const existingAlert = this.schema.alerts.find(
          (a) => a.formatId === format.id && !a.acknowledged
        );
        if (!existingAlert) {
          this.schema.alerts.unshift({
            id: `alert-${format.id}-${Date.now()}`,
            formatId: format.id,
            formatName: format.name,
            creatorId: format.creatorId,
            triggeredAt: Date.now(),
            severity: evalResult.status === 'DECAYED' ? 'CRITICAL' : 'WARNING',
            decayPercentage: evalResult.decayPercentage,
            message: evalResult.report.plainNarrative,
            suggestedPivots: [
              'Rotate to System Architecture Deep-Dives',
              'Test tutorial archetype with interactive hooks',
            ],
            acknowledged: false,
          });
        }
      }
    }

    this.persist();
    return { post, format: format! };
  }

  public getPendingAlerts(creatorId?: string): ProactiveAlert[] {
    let alerts = this.schema.alerts.filter((a) => !a.acknowledged);
    if (creatorId) {
      alerts = alerts.filter((a) => a.creatorId.toLowerCase() === creatorId.toLowerCase());
    }
    return alerts;
  }

  public acknowledgeAlert(alertId: string): boolean {
    const alert = this.schema.alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      this.persist();
      return true;
    }
    return false;
  }
}

export const store = new MemoryStore();
