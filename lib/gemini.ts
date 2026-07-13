/**
 * Gemini AI Integration for Calmify
 *
 * This module handles all interactions with Google's Gemini AI API,
 * specifically configured for mental health support conversations.
 */

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// Initialize the Gemini client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

console.log('Gemini API Key format:', GEMINI_API_KEY.substring(0, 10) + '...');

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * System Prompt for Calmify AI
 *
 * This prompt defines the AI's persona, scope, and behavioral guidelines.
 * It's designed to create a warm, professional, empathetic psychiatric companion
 * that stays within its scope of mental health support.
 */
export const CALMIFY_SYSTEM_PROMPT = `You are Calmify, a warm, friendly AI companion for developers and builders.

**RESPOND TO WHAT'S ACTUALLY SAID**
- Don't assume emotional state — only respond to what the user expresses
- If user asks "how are you" → Reply warmly and briefly, then ask how they are
- No pre-written scripts or generic monologues
- Match the user's energy: casual = casual, distressed = supportive

**BE BRIEF**
- Casual chat: 1-2 short sentences
- Emotional topics: 2-3 sentences max
- Never give long lists or multiple options unprompted

**YOUR ROLE**
- Listen without judgment
- Acknowledge feelings first, then perspectives
- Understand builder pressures: burnout, imposter syndrome, isolation
- You're a companion, not a therapist or doctor

**CRISIS RESOURCES**
Self-harm/suicide: Share India helpline (9152987821) and global resource (https://www.iasp.info/resources/Crisis_Centres/)`;

/**
 * Creates a Gemini model configured for Calmify
 */
function createCalmifyModel(): GenerativeModel {
  return genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    systemInstruction: CALMIFY_SYSTEM_PROMPT,
  });
}

/**
 * Chat history interface for maintaining conversation context
 */
export interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

/**
 * Sends a message to Gemini and returns the response
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
    const model = createCalmifyModel();

    // Start a chat session with history if provided
    const chat = model.startChat({
      history: conversationHistory || [],
    });

    // Send the message and get response
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get response from Calmify AI. Please try again.');
  }
}

/**
 * Streams a response from Gemini for real-time chat experience
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
    console.log('Starting Gemini stream with message:', userMessage);
    console.log('Conversation history:', conversationHistory);

    const model = createCalmifyModel();
    const chat = model.startChat({
      history: conversationHistory || [],
    });

    console.log('Sending message to Gemini...');
    const result = await chat.sendMessageStream(userMessage);

    console.log('Stream started, receiving chunks...');
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        console.log('Received chunk:', chunkText.substring(0, 50));
        yield chunkText;
      }
    }
    console.log('Stream completed successfully');
  } catch (error: any) {
    console.error('Gemini streaming error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error(`Failed to stream response: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Converts chat history format from database to Gemini format
 *
 * @param messages - Array of messages from the database
 * @returns Formatted chat history for Gemini
 */
export function formatChatHistory(messages: Array<{ role: 'user' | 'assistant'; content: string }>): ChatMessage[] {
  if (!messages || messages.length === 0) return [];

  const formatted: ChatMessage[] = messages.map(msg => ({
    role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
    parts: [{ text: msg.content }],
  }));

  console.log('Formatted history before cleanup:', formatted.map(f => ({ role: f.role, text: f.parts[0].text.substring(0, 30) })));

  // Gemini requires conversation history to:
  // 1. Start with a 'user' message
  // 2. Alternate between 'user' and 'model'

  // Find the first user message to start from
  let firstUserIndex = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (formatted[i].role === 'user') {
      firstUserIndex = i;
      break;
    }
  }

  // Slice from the first user message
  let validHistory: ChatMessage[] = formatted.slice(firstUserIndex);

  // Ensure the sequence alternates correctly (user, model, user, model, ...)
  // If we have consecutive messages with the same role, remove the earlier ones
  const cleanedHistory: ChatMessage[] = [];
  for (const msg of validHistory) {
    if (cleanedHistory.length === 0) {
      if (msg.role === 'user') {
        cleanedHistory.push(msg);
      }
    } else {
      const lastRole = cleanedHistory[cleanedHistory.length - 1].role;
      if (lastRole !== msg.role) {
        cleanedHistory.push(msg);
      }
    }
  }

  // If the cleaned history ends with 'model', remove it (should end with user)
  if (cleanedHistory.length > 0 && cleanedHistory[cleanedHistory.length - 1].role === 'model') {
    cleanedHistory.pop();
  }

  console.log('Cleaned history:', cleanedHistory.map(f => ({ role: f.role, text: f.parts[0].text.substring(0, 30) })));

  return cleanedHistory;
}
