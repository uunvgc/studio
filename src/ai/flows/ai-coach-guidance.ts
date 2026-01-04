'use server';
/**
 * @fileOverview This file defines the AI Coach flow for providing personalized guidance and strategies to maximize profits.
 *
 * - aiCoachPersonalizedGuidance - A function that provides personalized financial advice.
 * - AICoachPersonalizedGuidanceInput - The input type for the aiCoachPersonalizedGuidance function.
 * - AICoachPersonalizedGuidanceOutput - The return type for the aiCoachPersonalizedGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICoachPersonalizedGuidanceInputSchema = z.object({
  userIdea: z.string().describe("The user's business idea or question."),
});
export type AICoachPersonalizedGuidanceInput = z.infer<typeof AICoachPersonalizedGuidanceInputSchema>;

const AICoachPersonalizedGuidanceOutputSchema = z.object({
  personalizedGuidance: z.string().describe('Personalized advice and strategies from the AI coach to maximize profits.'),
  potentialRisks: z.string().describe('Potential risks associated with the suggested strategies.'),
  recommendedActions: z.array(z.string()).describe('A list of recommended actions for the user to take.'),
});
export type AICoachPersonalizedGuidanceOutput = z.infer<typeof AICoachPersonalizedGuidanceOutputSchema>;

export async function aiCoachPersonalizedGuidance(input: AICoachPersonalizedGuidanceInput): Promise<AICoachPersonalizedGuidanceOutput> {
  return aiCoachPersonalizedGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCoachPersonalizedGuidancePrompt',
  input: {schema: AICoachPersonalizedGuidanceInputSchema},
  output: {schema: AICoachPersonalizedGuidanceOutputSchema},
   config: {
    model: 'googleai/gemini-1.5-pro',
  },
  prompt: `You are an AI-powered financial advisor/CEO whose sole focus is maximizing the user's profits. You are having a conversation with the user.

  The user will provide you with their business idea or a question. Based on this information, provide personalized guidance and strategies to maximize their profits. Include potential risks associated with the suggested strategies and a list of recommended actions for the user to take.  Assume you are speaking to the user directly, and refer to them as "you". Be encouraging but direct and ruthless in your advice.

  User's message: {{{userIdea}}}

Your response must be a JSON object that conforms to the output schema.
`,
});

const aiCoachPersonalizedGuidanceFlow = ai.defineFlow(
  {
    name: 'aiCoachPersonalizedGuidanceFlow',
    inputSchema: AICoachPersonalizedGuidanceInputSchema,
    outputSchema: AICoachPersonalizedGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
