import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText } from 'ai';

// Create Google provider
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt =
    'You are Electra, a friendly and neutral election guide for India. ' +
    'Explain everything in simple language. Always base answers on official ' +
    'Election Commission of India rules. Be helpful, non-partisan, and encourage voting. ' +
    'Keep your responses concise and well-formatted using markdown.';

  // Convert UI messages (parts-based) to model messages for streamText
  const coreMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
