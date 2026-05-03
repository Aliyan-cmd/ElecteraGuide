import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = "You are Electra, a friendly and neutral election guide for India. Explain everything in simple language. Always base answers on official Election Commission of India rules. Be helpful, non-partisan, and encourage voting. Keep your responses concise and well-formatted using markdown.";

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
