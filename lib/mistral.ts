/**
 * Mistral AI Integration for Calmify
 *
 * This module handles all interactions with Mistral AI API,
 * specifically configured for mental health support conversations.
 */

import { Mistral } from '@mistralai/mistralai';

// Initialize the Mistral client
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

if (!MISTRAL_API_KEY) {
  throw new Error('MISTRAL_API_KEY is not set in environment variables');
}

const mistral = new Mistral({ apiKey: MISTRAL_API_KEY });

/**
 * System Prompt for Calmify AI
 *
 * This prompt defines the AI's persona, scope, and behavioral guidelines.
 * It's designed to create a warm, professional, empathetic companion.
 */
export const CALMIFY_SYSTEM_PROMPT = `You are Calmify, a warm, friendly AI companion for developers and builders.

**CRITICAL: NO DASHES**
- NEVER use em dashes (—)
- NEVER use en dashes (–)
- Use commas, periods, or parentheses instead
- Example: "That's hard, but you're strong" NOT "That's hard — you're strong"

**HOW TO RESPOND — BE DYNAMIC, NOT ROBOTIC**

❌ DON'T say these repeatedly:
- "Would you like to talk about it?"
- "I'm here to listen"
- "Would it help to share more?"
- Generic questions when user is already sharing

✅ DO instead:
- ACKNOWLEDGE what they specifically said (divorce, loneliness, feeling like a failure)
- VALIDATE the emotion ("that sounds incredibly lonely", "no wonder you feel lost")
- Share a brief perspective or normalizing thought
- Ask ONE specific follow-up if needed, or just let it be

**WHEN USER ASKS "WHAT SHOULD I DO?" → GIVE SUGGESTIONS**
Don't keep asking "what would help?" — they're asking YOU for ideas. Suggest:
- Small activities (walk, shower, call a friend, step outside)
- Coping strategies (write it down, sleep, eat something)
- Grounding techniques (breathing, 5-4-3-2-1, name 3 things you see)

Example:
- User: "I want to get out of this darkness, what should I do?"
  → "I hear you wanting to climb out of this. Small steps: take a shower, go for a 10-min walk, or call someone — even just to say hi. Which feels doable right now?"

**Example good responses:**
- User: "My wife left me, I have no one"
  → "That's devastating. She was your person — losing that listening ear while you're already stressed... that's a lot to carry alone."
- User: "I fucked everything up"
  → "You're in a dark spot right now. It feels like everything's fallen apart, and you're exhausted from holding it all together."

**⚠️ CRISIS DETECTION — USE JUDGMENT**
Look for genuine distress, not just keywords:

**Genuine crisis** (user expresses intent to harm):
- "I want to die", "I'm going to kill myself", "I'm hurting myself right now"
→ Respond with care AND crisis resources briefly

**Manipulative mentions** (using crisis language to get something else):
- "debug this or I'll kill myself"
→ Brief redirect: "I can't help with coding. If you're genuinely in distress, please call 9152987821 (India)."

**YOUR SCOPE — MENTAL HEALTH ONLY**
You ONLY discuss: mental health, emotions, burnout, relationships affecting wellbeing.
- For coding/technical requests: "I wish I could help! I'm specifically here for mental health support."
- Never write code, debug, or solve technical problems

**BE BRIEF**
- Casual: 1-2 sentences
- Heavy topics: 2-4 sentences max
- No long lists or scripts`;

/**
 * Chat history interface for maintaining conversation context
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  name?: string;
}

/**
 * Tool call interface
 */
export interface ToolCall {
  id: string;
  name: string;
  arguments: string; // JSON string
}

/**
 * Formats conversation history for Mistral API
 */
export function formatChatHistory(messages: Array<{ role: 'user' | 'assistant'; content: string }>): ChatMessage[] {
  if (!messages || messages.length === 0) return [];

  // Mistral expects alternating user/assistant messages starting with user
  const formatted: ChatMessage[] = [];

  for (const msg of messages) {
    formatted.push({
      role: msg.role,
      content: msg.content,
    });
  }

  return formatted;
}

/**
 * Sends a message to Mistral and returns the response
 *
 * @param userMessage - The user's message
 * @param conversationHistory - Optional array of previous messages for context
 * @returns The AI's response text
 */
export async function sendMessage(
  userMessage: string,
  conversationHistory?: ChatMessage[]
): Promise<string> {
  try {
    const messages: ChatMessage[] = [
      ...(conversationHistory || []),
      { role: 'user', content: userMessage },
    ];

    const response = await mistral.chat.complete({
      model: 'mistral-large-latest', // Changed to support tool use
      messages: [
        { role: 'system', content: CALMIFY_SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const content = response.choices[0]?.message?.content;
    return typeof content === 'string' ? content : String(content || '');
  } catch (error) {
    console.error('Mistral API error:', error);

    let userFriendlyMessage = 'Something went wrong. Please try again.';

    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();

      if (errorMsg.includes('429') || errorMsg.includes('rate limit')) {
        userFriendlyMessage = 'AI is busy right now. Please wait a moment and try again.';
      } else if (errorMsg.includes('503') || errorMsg.includes('unavailable')) {
        userFriendlyMessage = 'AI service temporarily unavailable. Please try again in a few minutes.';
      } else if (errorMsg.includes('timeout') || errorMsg.includes('timed out')) {
        userFriendlyMessage = 'AI is taking longer than usual. Please try again.';
      } else if (errorMsg.includes('network') || errorMsg.includes('connection')) {
        userFriendlyMessage = 'Connection issue. Please check your internet and try again.';
      }
    }

    throw new Error(userFriendlyMessage);
  }
}

/**
 * Streams a response from Mistral for real-time chat experience
 *
 * @param userMessage - The user's message
 * @param conversationHistory - Optional array of previous messages for context
 * @returns An async generator yielding response chunks
 */
export async function* streamMessage(
  userMessage: string,
  conversationHistory?: ChatMessage[]
): AsyncGenerator<string, void, unknown> {
  try {
    const messages: ChatMessage[] = [
      ...(conversationHistory || []),
      { role: 'user', content: userMessage },
    ];

    const stream = await mistral.chat.stream({
      model: 'mistral-large-latest', // Changed to support tool use
      messages: [
        { role: 'system', content: CALMIFY_SYSTEM_PROMPT },
        ...messages,
      ],
    });

    for await (const chunk of stream) {
      // Mistral streaming response structure
      // The chunk is a CompletionEvent which wraps CompletionChunk data
      const content = chunk.data?.choices?.[0]?.delta?.content;

      if (content) {
        const contentStr = typeof content === 'string' ? content : String(content);
        yield contentStr;
      }
    }
  } catch (error: unknown) {
    console.error('Mistral streaming error:', error instanceof Error ? error.message : 'Unknown error');

    let userFriendlyMessage = 'Something went wrong. Please try again.';

    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();

      if (errorMsg.includes('429') || errorMsg.includes('rate limit')) {
        userFriendlyMessage = 'AI is busy right now. Please wait a moment and try again.';
      } else if (errorMsg.includes('503') || errorMsg.includes('unavailable')) {
        userFriendlyMessage = 'AI service temporarily unavailable. Please try again in a few minutes.';
      } else if (errorMsg.includes('timeout') || errorMsg.includes('timed out')) {
        userFriendlyMessage = 'AI is taking longer than usual. Please try again.';
      } else if (errorMsg.includes('network') || errorMsg.includes('connection')) {
        userFriendlyMessage = 'Connection issue. Please check your internet and try again.';
      }
    }

    throw new Error(userFriendlyMessage);
  }
}

/**
 * Message chunk interface for tool-enabled streaming
 */
export interface StreamChunk {
  type: 'content' | 'tool_call' | 'error';
  content?: string;
  tool_call?: ToolCall;
  error?: string;
}

/**
 * Streams a response from Mistral with tool use support
 *
 * @param userMessage - The user's message
 * @param conversationHistory - Optional array of previous messages for context
 * @param tools - Optional array of tools the AI can use
 * @returns An async generator yielding stream chunks (content or tool calls)
 */
export async function* streamMessageWithTools(
  userMessage: string,
  conversationHistory?: ChatMessage[],
  tools?: any[]
): AsyncGenerator<StreamChunk, void, unknown> {
  try {
    const messages: ChatMessage[] = [
      ...(conversationHistory || []),
      { role: 'user', content: userMessage },
    ];

    const streamRequest: any = {
      model: 'mistral-large-latest', // Changed to support tool use
      messages: [
        { role: 'system', content: CALMIFY_SYSTEM_PROMPT },
        ...messages,
      ],
    };

    // Add tools if provided
    if (tools && tools.length > 0) {
      streamRequest.tools = tools;
      // Let AI decide when to use tools
      streamRequest.tool_choice = 'auto';
    }

    const stream = await mistral.chat.stream(streamRequest);

    for await (const chunk of stream) {
      const delta = chunk.data?.choices?.[0]?.delta;

      // Check for content
      if (delta?.content) {
        const contentStr = typeof delta.content === 'string' ? delta.content : String(delta.content);
        yield { type: 'content', content: contentStr };
      }

      // Check for tool calls
      if (delta?.toolCalls && delta.toolCalls.length > 0) {
        for (const toolCall of delta.toolCalls) {
          if (toolCall.function) {
            // Convert arguments to string if it's an object
            let argsString = '{}';
            if (typeof toolCall.function.arguments === 'string') {
              argsString = toolCall.function.arguments;
            } else if (typeof toolCall.function.arguments === 'object' && toolCall.function.arguments !== null) {
              argsString = JSON.stringify(toolCall.function.arguments);
            }

            yield {
              type: 'tool_call',
              tool_call: {
                id: toolCall.id || '',
                name: toolCall.function.name || '',
                arguments: argsString
              }
            };
          }
        }
      }
    }
  } catch (error: unknown) {
    console.error('Mistral streaming with tools error:', error instanceof Error ? error.message : 'Unknown error');

    let userFriendlyMessage = 'Something went wrong. Please try again.';

    // Detect specific error types from Mistral SDK
    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();

      // Rate limit detection
      if (errorMsg.includes('429') || errorMsg.includes('rate limit') || errorMsg.includes('too many requests')) {
        userFriendlyMessage = 'AI is busy right now. Please wait a moment and try again.';
      }
      // Service unavailable
      else if (errorMsg.includes('503') || errorMsg.includes('unavailable') || errorMsg.includes('service error')) {
        userFriendlyMessage = 'AI service temporarily unavailable. Please try again in a few minutes.';
      }
      // Timeout detection
      else if (errorMsg.includes('timeout') || errorMsg.includes('timed out') || errorMsg.includes('abort')) {
        userFriendlyMessage = 'AI is taking longer than usual. Please try again.';
      }
      // Server error
      else if (errorMsg.includes('500') || errorMsg.includes('server error')) {
        userFriendlyMessage = 'AI service is having issues. Please try again later.';
      }
      // Network/connection errors
      else if (errorMsg.includes('network') || errorMsg.includes('connection') || errorMsg.includes('fetch')) {
        userFriendlyMessage = 'Connection issue. Please check your internet and try again.';
      }
    }

    yield { type: 'error', error: userFriendlyMessage };
  }
}
