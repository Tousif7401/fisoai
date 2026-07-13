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
  role: 'user' | 'assistant';
  content: string;
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
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: CALMIFY_SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const content = response.choices[0]?.message?.content;
    return typeof content === 'string' ? content : String(content || '');
  } catch (error) {
    console.error('Mistral API error:', error);
    throw new Error('Failed to get response from Calmify AI. Please try again.');
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
    console.log('Starting Mistral stream with message:', userMessage);
    console.log('Conversation history:', conversationHistory);

    const messages: ChatMessage[] = [
      ...(conversationHistory || []),
      { role: 'user', content: userMessage },
    ];

    console.log('Sending message to Mistral...');

    const stream = await mistral.chat.stream({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: CALMIFY_SYSTEM_PROMPT },
        ...messages,
      ],
    });

    console.log('Stream started, receiving chunks...');

    for await (const chunk of stream) {
      console.log('Raw chunk:', JSON.stringify(chunk).substring(0, 200));

      // Mistral streaming response structure
      // The chunk is a CompletionEvent which wraps CompletionChunk data
      const content = chunk.data?.choices?.[0]?.delta?.content;

      if (content) {
        const contentStr = typeof content === 'string' ? content : String(content);
        console.log('Received chunk:', contentStr.substring(0, 50));
        yield contentStr;
      }
    }

    console.log('Stream completed successfully');
  } catch (error: any) {
    console.error('Mistral streaming error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error(`Failed to stream response: ${error.message || 'Unknown error'}`);
  }
}
