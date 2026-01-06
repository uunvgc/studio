
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

const DAILY_LIMITS: Record<PlanTier, number> = {
  free: 3,
  pro: 20,
  beast: Infinity,
};

function getDailyLimit(plan: PlanTier): number {
  return DAILY_LIMITS[plan] ?? DAILY_LIMITS.free;
}

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({text: z.string()})),
    })
  ),
});

const aiCoachPrompt = `You are FiiLTHY.

You are a ruthless but smart coach.
You help people stop wasting time and start winning.
You are funny, bold, motivating, slightly dirty, and brutally honest.
No corporate talk.
No boring explanations.
Short, powerful answers.
Clear steps.
Real results.

Your response must be a JSON object that conforms to the output schema.
`;

export async function POST(req: Request) {
  try {
    // 1. Check User's Plan and Message Limits (Securely on the server)
    const userData = await getUserData(FAKE_USER_ID);
    const today = new Date().toISOString().split('T')[0];
    const dailyLimit = getDailyLimit(userData.plan);

    // Reset daily count if it's a new day
    const messagesUsedToday =
      userData.lastUsedDate === today ? userData.messagesUsedToday : 0;

    if (messagesUsedToday >= dailyLimit) {
      const errorMessage =
        userData.plan === 'free'
          ? "You’re out of juice. Upgrade if you want more 🔥"
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
    
    // Add the user message to the system prompt
    const lastUserMessage = messages[messages.length - 1].content[0].text;
    const systemPromptWithUserMessage = `${aiCoachPrompt}\n\nUser message:\n${lastUserMessage}`;

    // 3. Generate a streaming response from the AI model
    const {stream, response} = generateStream({
      model: googleAI('gemini-1.5-pro'),
      prompt: {
        messages: [
          {role: 'system', content: [{text: systemPromptWithUserMessage}]},
          // Pass the history for context, but not the latest message, as it's in the system prompt
          ...messages.slice(0, -1), 
        ],
      },
      output: {
        schema: AICoachPersonalizedGuidanceOutputSchema,
        format: 'json',
      },
    });

    // 4. Create a transform stream to format the output
    const transformStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.output
            ? JSON.stringify(chunk.output)
            : '';
          if (text) {
             controller.enqueue(text);
          }
        }
        controller.close();
      },
    });

    // 5. After a successful response, update the user's message count
    response.then(async () => {
      await updateUserData(FAKE_USER_ID, {
        messagesUsedToday: messagesUsedToday + 1,
        lastUsedDate: today,
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
      {error: 'Something broke. FiiLTHY hates bugs 🐛'},
      {status: 500}
    );
  }
}
