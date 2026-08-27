import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  calculateMedian,
  calculateDecayParameters,
  evaluateFormat,
  MIN_BASELINE_POSTS,
} from '../lib/decay-engine.ts';

describe('Half-Life Decay Engine & Statistical Confidence Tests', () => {
  test('calculateMedian correctly computes odd and even datasets', () => {
    assert.strictEqual(calculateMedian([0.05, 0.02, 0.08]), 0.05);
    assert.strictEqual(calculateMedian([0.02, 0.04, 0.06, 0.08]), 0.05);
    assert.strictEqual(calculateMedian([]), 0);
  });

  test('calculateDecayParameters computes lambda and half-life correctly', () => {
    // 50% decay over 4 posts -> lambda = -ln(0.5)/4 = 0.6931/4 = 0.1733
    // Half life remaining at exact 50% = 0 posts
    const res = calculateDecayParameters(0.10, 0.05, 4);
    assert.strictEqual(res.lambda, 0.1733);
    assert.strictEqual(res.halfLifePosts, 0);

    // No decay (growth or flat) returns null/zero
    const flat = calculateDecayParameters(0.05, 0.06, 3);
    assert.strictEqual(flat.lambda, 0);
    assert.strictEqual(flat.halfLifePosts, null);
  });

  test('Slice 2 / P2: Cold-Start Guard strictly refuses formats with < 5 posts', () => {
    const format = {
      id: 'fmt-test',
      creatorId: 'c1',
      name: 'Brand New Format',
      archetype: 'tutorial',
      description: 'test',
      firstObservedAt: Date.now(),
      baselineEngagementRate: 0,
      postCount: 3,
      status: 'PROBATION',
      decayRateLambda: 0,
      halfLifePostsRemaining: null,
      lastEvaluatedAt: Date.now(),
    };

    const posts = [
      { id: '1', formatId: 'fmt-test', creatorId: 'c1', title: 'P1', postedAt: 1000, impressions: 1000, engagements: 50, engagementRate: 0.05 },
      { id: '2', formatId: 'fmt-test', creatorId: 'c1', title: 'P2', postedAt: 2000, impressions: 1000, engagements: 60, engagementRate: 0.06 },
      { id: '3', formatId: 'fmt-test', creatorId: 'c1', title: 'P3', postedAt: 3000, impressions: 1000, engagements: 40, engagementRate: 0.04 },
    ];

    const evaluation = evaluateFormat(format, posts);

    assert.strictEqual(evaluation.status, 'PROBATION');
    assert.strictEqual(evaluation.report.needsRotation, false);
    assert.match(evaluation.report.plainNarrative, /has recorded 3 of 5 required baseline posts/);
    assert.match(evaluation.report.recommendedAction, /Need 2 more posts/);
  });

  test('Slice 1 / P1: Detects Healthy format and maintains stability', () => {
    const format = {
      id: 'fmt-healthy',
      creatorId: 'c1',
      name: 'Steady Tutorials',
      archetype: 'tutorial',
      description: 'test',
      firstObservedAt: Date.now(),
      baselineEngagementRate: 0.05,
      postCount: 6,
      status: 'HEALTHY',
      decayRateLambda: 0,
      halfLifePostsRemaining: null,
      lastEvaluatedAt: Date.now(),
    };

    const posts = [
      { id: '1', formatId: 'fmt-healthy', creatorId: 'c1', title: 'P1', postedAt: 1000, impressions: 1000, engagements: 50, engagementRate: 0.05 },
      { id: '2', formatId: 'fmt-healthy', creatorId: 'c1', title: 'P2', postedAt: 2000, impressions: 1000, engagements: 52, engagementRate: 0.052 },
      { id: '3', formatId: 'fmt-healthy', creatorId: 'c1', title: 'P3', postedAt: 3000, impressions: 1000, engagements: 49, engagementRate: 0.049 },
      { id: '4', formatId: 'fmt-healthy', creatorId: 'c1', title: 'P4', postedAt: 4000, impressions: 1000, engagements: 51, engagementRate: 0.051 },
      { id: '5', formatId: 'fmt-healthy', creatorId: 'c1', title: 'P5', postedAt: 5000, impressions: 1000, engagements: 50, engagementRate: 0.05 },
      { id: '6', formatId: 'fmt-healthy', creatorId: 'c1', title: 'P6', postedAt: 6000, impressions: 1000, engagements: 53, engagementRate: 0.053 },
    ];

    const evaluation = evaluateFormat(format, posts);

    assert.strictEqual(evaluation.status, 'HEALTHY');
    assert.strictEqual(evaluation.report.needsRotation, false);
    assert.strictEqual(evaluation.baselineRate, 0.05);
    assert.strictEqual(evaluation.trailingRate, 0.051);
  });

  test('Slice 1 & 3: Detects Fatiguing Format and triggers warnings', () => {
    const format = {
      id: 'fmt-fatigue',
      creatorId: 'c1',
      name: 'Thread Hooks',
      archetype: 'opinion',
      description: 'test',
      firstObservedAt: Date.now(),
      baselineEngagementRate: 0.06,
      postCount: 8,
      status: 'HEALTHY',
      decayRateLambda: 0,
      halfLifePostsRemaining: null,
      lastEvaluatedAt: Date.now(),
    };

    const posts = [
      // 5 baseline posts (~6.0% rate)
      { id: '1', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P1', postedAt: 1000, impressions: 1000, engagements: 60, engagementRate: 0.06 },
      { id: '2', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P2', postedAt: 2000, impressions: 1000, engagements: 62, engagementRate: 0.062 },
      { id: '3', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P3', postedAt: 3000, impressions: 1000, engagements: 59, engagementRate: 0.059 },
      { id: '4', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P4', postedAt: 4000, impressions: 1000, engagements: 61, engagementRate: 0.061 },
      { id: '5', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P5', postedAt: 5000, impressions: 1000, engagements: 60, engagementRate: 0.06 },
      // 3 trailing fatigue posts (~3.6% rate, 40% decay)
      { id: '6', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P6', postedAt: 6000, impressions: 1000, engagements: 38, engagementRate: 0.038 },
      { id: '7', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P7', postedAt: 7000, impressions: 1000, engagements: 36, engagementRate: 0.036 },
      { id: '8', formatId: 'fmt-fatigue', creatorId: 'c1', title: 'P8', postedAt: 8000, impressions: 1000, engagements: 35, engagementRate: 0.035 },
    ];

    const evaluation = evaluateFormat(format, posts);

    assert.strictEqual(evaluation.status, 'FATIGUING');
    assert.strictEqual(evaluation.report.needsRotation, true);
    assert.strictEqual(evaluation.decayPercentage, -40);
    assert.match(evaluation.report.plainNarrative, /Fatigue Alert/);
    assert.match(evaluation.report.plainNarrative, /Rotate to a fresh format/);
  });
});
