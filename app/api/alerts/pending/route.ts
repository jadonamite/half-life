import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId') || undefined;

    const alerts = store.getPendingAlerts(creatorId);
    return NextResponse.json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch pending alerts' },
      { status: 500 }
    );
  }
}
