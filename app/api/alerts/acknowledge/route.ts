import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { alertId } = body;

    if (!alertId) {
      return NextResponse.json(
        { success: false, error: 'alertId is required' },
        { status: 400 }
      );
    }

    const success = store.acknowledgeAlert(alertId);
    if (!success) {
      return NextResponse.json(
        { success: false, error: `Alert with ID '${alertId}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Alert '${alertId}' acknowledged.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to acknowledge alert' },
      { status: 500 }
    );
  }
}
