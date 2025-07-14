import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Call N8N webhook endpoint
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!n8nWebhookUrl) {
      return NextResponse.json({ error: 'N8N webhook URL not configured' }, { status: 500 });
    }

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('N8N workflow failed');
    }

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing blog:', error);
    return NextResponse.json(
      { error: 'Failed to process blog' },
      { status: 500 }
    );
  }
}