/**
 * Calmify Chat API Route
 *
 * This endpoint handles all AI chat interactions using Mistral AI.
 * It streams responses in real-time for a smooth chat experience.
 */

import { NextRequest, NextResponse } from 'next/server';
import { streamMessage, formatChatHistory } from '@/lib/mistral';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  message: string;
  conversationHistory?: ChatMessage[];
}

/**
 * POST /api/chat
 *
 * Handles chat message requests and streams AI responses.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ChatRequestBody = await request.json();
    const { message, conversationHistory = [] } = body;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate conversation history format
    if (!Array.isArray(conversationHistory)) {
      return NextResponse.json(
        { error: 'conversationHistory must be an array' },
        { status: 400 }
      );
    }

    // Check if Mistral API key is configured
    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Format conversation history for Mistral
    const formattedHistory = formatChatHistory(conversationHistory);

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Stream the AI response
          for await (const chunk of streamMessage(message, formattedHistory)) {
            const data = JSON.stringify({ chunk });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    // Return the streaming response
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 *
 * Returns chat API status and configuration info.
 */
export async function GET() {
  return NextResponse.json({
    status: 'operational',
    configured: !!process.env.MISTRAL_API_KEY,
  });
}
