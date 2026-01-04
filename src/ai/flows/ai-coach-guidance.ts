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
  userIdea: z.string().describe('The user\'s business idea or existing business description.'),
  currentRevenue: z.number().optional().describe('The current monthly revenue of the business, if applicable.'),
  businessGoals: z.string().describe('The user\'s goals for the business (e.g., increase revenue, expand market share).'),
  riskTolerance: z.string().describe('The user\'s risk tolerance level (e.g., high, medium, low).'),
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
  prompt: `You are an AI-powered financial advisor/CEO whose sole focus is maximizing the user\'s profits.

  The user will provide you with their business idea, current revenue, business goals and risk tolerance.
  Based on this information, provide personalized guidance and strategies to maximize their profits. Include potential risks associated with the suggested strategies and a list of recommended actions for the user to take.  Assume you are speaking to the user directly, and refer to them as "you".

  Business Idea: {{{userIdea}}}
Current Revenue: {{{currentRevenue}}}
Business Goals: {{{businessGoals}}}
Risk Tolerance: {{{riskTolerance}}}

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
