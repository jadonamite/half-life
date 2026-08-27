import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';
import { PostMetric } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formatId, creatorId, title, impressions, engagements, postedAt } = body;

    if (!formatId || !creatorId || !impressions || engagements === undefined) {
      return NextResponse.json(
        { success: false, error: 'formatId, creatorId, impressions, and engagements are required' },
        { status: 400 }
      );
    }

    const imp = Number(impressions);
    const eng = Number(engagements);

    if (isNaN(imp) || isNaN(eng) || imp <= 0 || eng < 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid numeric impressions or engagements' },
        { status: 400 }
      );
    }

    const rate = parseFloat((eng / imp).toFixed(5));
    const newPost: PostMetric = {
      id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      formatId,
      creatorId,
      title: title || `Post #${Date.now()}`,
      postedAt: postedAt || Date.now(),
      impressions: imp,
      engagements: eng,
      engagementRate: rate,
    };

    const { post, format } = store.addPost(newPost);

    return NextResponse.json({
      success: true,
      post,
      formatUpdated: {
        id: format.id,
        name: format.name,
        status: format.status,
        postCount: format.postCount,
        baselineRate: (format.baselineEngagementRate * 100).toFixed(2) + '%',
        halfLifePostsRemaining: format.halfLifePostsRemaining,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to ingest post' },
      { status: 500 }
    );
  }
}
