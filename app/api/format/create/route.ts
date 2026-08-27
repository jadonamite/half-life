import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';
import { ContentFormat, FormatArchetype } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { creatorId, name, archetype, description } = body;

    if (!creatorId || !name || !archetype) {
      return NextResponse.json(
        { success: false, error: 'creatorId, name, and archetype are required' },
        { status: 400 }
      );
    }

    const id = `fmt-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    const newFormat: ContentFormat = {
      id,
      creatorId,
      name,
      archetype: archetype as FormatArchetype,
      description: description || '',
      firstObservedAt: Date.now(),
      baselineEngagementRate: 0,
      postCount: 0,
      status: 'PROBATION',
      decayRateLambda: 0,
      halfLifePostsRemaining: null,
      lastEvaluatedAt: Date.now(),
    };

    const created = store.addFormat(newFormat);

    return NextResponse.json({
      success: true,
      format: created,
      message: `Format '${name}' registered in PROBATION. Publish 5 posts to establish statistical baseline.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to create format' },
      { status: 500 }
    );
  }
}
