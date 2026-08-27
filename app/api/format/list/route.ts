import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId') || undefined;

    const formats = store.getFormats(creatorId);
    return NextResponse.json({
      success: true,
      creatorId: creatorId || 'all',
      count: formats.length,
      formats,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to list formats' },
      { status: 500 }
    );
  }
}
