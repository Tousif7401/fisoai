/**
 * Calmify Chat API Route
 *
 * This endpoint handles all AI chat interactions using Mistral AI with tool use support.
 * It streams responses in real-time for a smooth chat experience.
 */

import { NextRequest, NextResponse } from 'next/server';
import { streamMessageWithTools, formatChatHistory, ChatMessage, CALMIFY_SYSTEM_PROMPT } from '@/lib/mistral';
import { formatToolsForMistral, executeToolCall } from '@/lib/tools';
import { Mistral } from '@mistralai/mistralai';

// Initialize Mistral client for continuation calls
const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY || '' });

interface ChatRequestBody {
  message: string;
  conversationHistory?: ChatMessage[];
  enableTools?: boolean;
}

/**
 * POST /api/chat
 *
 * Handles chat message requests and streams AI responses with agentic tool use.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ChatRequestBody = await request.json();
    const { message, conversationHistory = [], enableTools = true } = body;

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

    // Format conversation history for Mistral (exclude tool messages)
    const nonToolMessages = conversationHistory.filter(
      (msg: ChatMessage) => msg.role === 'user' || msg.role === 'assistant'
    );

    // Explicitly type the filtered messages for formatChatHistory
    const historyForFormatting: Array<{ role: 'user' | 'assistant'; content: string }> =
      nonToolMessages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

    const formattedHistory = formatChatHistory(historyForFormatting);

    // Prepare tools if enabled
    const tools = enableTools ? formatToolsForMistral() : undefined;

    // Create a streaming response with tool support
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Track tool calls for multi-turn conversation
          let messagesWithTools = [...formattedHistory];

          // Track if tools were called (for multi-turn continuation)
          let toolCallsPending = false;
          const toolResults: Array<{ role: 'tool'; content: string; tool_call_id: string; name?: string }> = [];
          // Track the assistant's tool call message for proper conversation flow
          let assistantToolCallMessage: any = null;

          // Stream with tools
          for await (const chunk of streamMessageWithTools(message, messagesWithTools, tools)) {
            // Handle different chunk types
            if (chunk.type === 'content') {
              const data = JSON.stringify({ type: 'content', chunk: chunk.content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
            else if (chunk.type === 'tool_call' && chunk.tool_call) {
              // Log tool call for debugging
              console.log('🔧 TOOL CALLED:', chunk.tool_call.name, 'with args:', chunk.tool_call.arguments);

              const data = JSON.stringify({
                type: 'tool_call',
                tool_call: chunk.tool_call
              });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));

              // Execute the tool
              try {
                // Convert arguments from string to object for executeToolCall
                const toolArgs = typeof chunk.tool_call.arguments === 'string'
                  ? JSON.parse(chunk.tool_call.arguments)
                  : chunk.tool_call.arguments;

                const toolCallForExecution = {
                  id: chunk.tool_call.id,
                  name: chunk.tool_call.name,
                  arguments: toolArgs
                };

                const toolResult = await executeToolCall(toolCallForExecution);

                // Log tool result for debugging
                console.log('✅ TOOL RESULT:', toolResult.result);

                // Send tool result to client
                const resultData = JSON.stringify({
                  type: 'tool_result',
                  result: toolResult.result
                });
                controller.enqueue(encoder.encode(`data: ${resultData}\n\n`));

                // Add tool result to conversation for context
                messagesWithTools.push({
                  role: 'tool',
                  content: JSON.stringify(toolResult.result),
                  tool_call_id: chunk.tool_call.id,
                  name: chunk.tool_call.name
                });

                // Store the assistant's tool call message for continuation FIRST
                if (!assistantToolCallMessage) {
                  assistantToolCallMessage = {
                    role: 'assistant',
                    tool_calls: [{
                      id: chunk.tool_call.id,
                      function: {
                        name: chunk.tool_call.name,
                        arguments: chunk.tool_call.arguments
                      }
                    }]
                  };

                  // Only set flag AFTER assistant message is confirmed set
                  toolCallsPending = true;
                }
              } catch (toolError) {
                console.error('❌ TOOL EXECUTION ERROR:', toolError);
                const errorData = JSON.stringify({
                  type: 'tool_error',
                  error: toolError instanceof Error ? toolError.message : 'Unknown tool error'
                });
                controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
              }
            }
            else if (chunk.type === 'error') {
              const data = JSON.stringify({ type: 'error', error: chunk.error });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          // If tools were called, continue streaming to get AI's response
          if (toolCallsPending) {
            console.log('🔄 Tools were called, getting AI response with tool results...');

            // Build proper message array for continuation
            const continuationMessages = [
              { role: 'system', content: CALMIFY_SYSTEM_PROMPT },
              { role: 'user', content: message },
              // Assistant's tool call message
              ...(assistantToolCallMessage ? [assistantToolCallMessage] : []),
              // Tool result
              ...messagesWithTools.filter(m => m.role === 'tool')
            ];

            // Use raw HTTP to bypass SDK tool call issues
            try {
              // Add timeout protection (30 seconds)
              const controller_timeout = new AbortController();
              const timeoutId = setTimeout(() => controller_timeout.abort(), 30000);

              const rawResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
                },
                body: JSON.stringify({
                  model: 'mistral-large-latest',
                  messages: continuationMessages
                }),
                signal: controller_timeout.signal
              });

              clearTimeout(timeoutId);

              // Handle specific error statuses with user-friendly messages
              if (!rawResponse.ok) {
                const errorBody = await rawResponse.text();
                console.error('Mistral API error:', rawResponse.status, errorBody);

                let userFriendlyMessage = 'Something went wrong. Please try again.';

                // Rate limit (429)
                if (rawResponse.status === 429) {
                  userFriendlyMessage = 'AI is busy right now. Please wait a moment and try again.';
                }
                // Service unavailable (503) or Gateway error (502)
                else if (rawResponse.status === 503 || rawResponse.status === 502) {
                  userFriendlyMessage = 'AI service temporarily unavailable. Please try again in a few minutes.';
                }
                // Server error (500)
                else if (rawResponse.status === 500) {
                  userFriendlyMessage = 'AI service is having issues. Please try again later.';
                }

                const errorData = JSON.stringify({
                  type: 'error',
                  error: userFriendlyMessage,
                  status: rawResponse.status
                });
                controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
                return;
              }

              const responseData = await rawResponse.json();
              const responseContent = responseData.choices[0]?.message?.content;

              if (responseContent) {
                // Stream the response content character by character for smooth UX
                const contentStr = typeof responseContent === 'string' ? responseContent : String(responseContent);
                for (const char of contentStr) {
                  const data = JSON.stringify({ type: 'content', chunk: char });
                  controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                }
              }
            } catch (continuationError) {
              console.error('Continuation streaming error:', continuationError);

              let userFriendlyMessage = 'Failed to continue conversation. Please try again.';

              // Timeout detection
              if (continuationError instanceof Error && continuationError.name === 'AbortError') {
                userFriendlyMessage = 'AI is taking longer than usual. Please try again.';
              }

              const errorData = JSON.stringify({
                type: 'error',
                error: userFriendlyMessage
              });
              controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
            }
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorData = JSON.stringify({
            type: 'error',
            error: error instanceof Error ? error.message : 'Streaming error'
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
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
    tools_enabled: true,
    available_tools: ['suggest_article', 'detect_crisis_level', 'infer_mood']
  });
}
