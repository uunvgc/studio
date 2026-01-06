'use server';

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {generateStream} from 'genkit/generate';
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getUserData, updateUserData} from '@/lib/user-service';
import type { PlanTier } from '@/lib/types';
import {AICoachPersonalizedGuidanceOutputSchema} from '@/lib/types';

// A placeholder user ID. In a real app, you would get this from your auth session.
const FAKE_USER_ID = 'user_placeholder_id';

function getDailyLimit(plan: PlanTier): number {
  switch (plan) {
    case 'beast':
      return Infinity;
    case 'pro':
      return 20;
    case 'free':
    default:
      return 3;
  }
}

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({text: z.string()})),
    })
  ),
});

const aiCoachPrompt = `You are an AI-powered financial advisor/CEO whose sole focus is maximizing the user's profits. You are having a conversation with the user.

  Based on the conversation history, provide personalized guidance and strategies to maximize their profits. Include potential risks associated with the suggested strategies and a list of recommended actions for the user to take.  Assume you are speaking to the user directly, and refer to them as "you". Be encouraging but direct and ruthless in your advice.

  Your response must be a JSON object that conforms to the output schema.`;

export async function POST(req: Request) {
  try {
    // 1. Check User's Plan and Message Limits (Securely on the server)
    const userData = await getUserData(FAKE_USER_ID);
    const today = new Date().toISOString().split('T')[0];
    const dailyLimit = getDailyLimit(userData.plan);

    // Reset daily count if it's a new day
    const messagesUsedToday =
      userData.lastMessageDate === today ? userData.messagesUsedToday : 0;

    if (messagesUsedToday >= dailyLimit) {
      const errorMessage =
        userData.plan === 'free'
          ? 'You have reached your daily message limit. Upgrade for more 🔥'
          : `You have reached your daily limit of ${dailyLimit} for the ${userData.plan} plan.`;
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 429 } // 429 Too Many Requests
      );
    }

    // 2. Parse incoming request body
    const reqBody = await req.json();
    const parsedRequest = chatRequestSchema.safeParse(reqBody);

    if (!parsedRequest.success) {
      return NextResponse.json(
        {error: 'Invalid request body'},
        {status: 400}
      );
    }

    const messages = parsedRequest.data.messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // 3. Generate a streaming response from the AI model
    const {stream, response} = generateStream({
      model: googleAI('gemini-1.5-pro'),
      prompt: {
        messages: [
          {role: 'system', content: [{text: aiCoachPrompt}]},
          ...messages,
        ],
      },
      output: {
        schema: AICoachPersonalizedGuidanceOutputSchema,
      },
    });

    // 4. Create a transform stream to format the output
    const transformStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.output
            ? JSON.stringify(chunk.output)
            : JSON.stringify(chunk.content);
          controller.enqueue(text);
        }
        controller.close();
      },
    });

    // 5. After a successful response, update the user's message count
    response.then(async () => {
      await updateUserData(FAKE_USER_ID, {
        messagesUsedToday: messagesUsedToday + 1,
        lastMessageDate: today,
      });
    });

    return new Response(transformStream, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {error: 'An unexpected error occurred.'},
      {status: 500}
    );
  }
}
