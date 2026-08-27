import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';
import { evaluateFormat } from '@/lib/decay-engine';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const formatId = searchParams.get('formatId');
    const creatorId = searchParams.get('creatorId') || 'jadoncreator';

    if (formatId) {
      const format = store.getFormat(formatId);
      if (!format) {
        return NextResponse.json(
          { success: false, error: `Format with ID '${formatId}' not found` },
          { status: 404 }
        );
      }

      const posts = store.getPosts(format.id);
      const evalResult = evaluateFormat(format, posts);

      return NextResponse.json({
        success: true,
        report: evalResult.report,
        posts,
      });
    }

    // Portfolio-wide audit across all formats for a creator
    const formats = store.getFormats(creatorId);
    const reports = formats.map((f) => {
      const posts = store.getPosts(f.id);
      return evaluateFormat(f, posts).report;
    });

    const activeFatiguing = reports.filter(
      (r) => r.status === 'FATIGUING' || r.status === 'DECAYED'
    );
    const healthyCount = reports.filter(
      (r) => r.status === 'HEALTHY' || r.status === 'STABLE'
    ).length;

    let portfolioSummary = `Portfolio Status: ${healthyCount} healthy/stable format${healthyCount !== 1 ? 's' : ''}, ${activeFatiguing.length} fatiguing format${activeFatiguing.length !== 1 ? 's' : ''}.`;
    if (activeFatiguing.length > 0) {
      portfolioSummary += ` Urgent attention required for: ${activeFatiguing.map((r) => `'${r.formatName}' (${r.decayPercentage}%)`).join(', ')}.`;
    }

    return NextResponse.json({
      success: true,
      creatorId,
      portfolioSummary,
      reports,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to generate audit' },
      { status: 500 }
    );
  }
}
