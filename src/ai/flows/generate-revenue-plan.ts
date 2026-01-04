'use server';

/**
 * @fileOverview A revenue plan generator AI agent.
 *
 * - generateRevenuePlan - A function that generates a revenue plan.
 * - GenerateRevenuePlanInput - The input type for the generateRevenuePlan function.
 * - GenerateRevenuePlanOutput - The return type for the generateRevenuePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRevenuePlanInputSchema = z.object({
  businessIdea: z
    .string()
    .describe('The business idea for which to generate a revenue plan.'),
  tier: z
    .enum(['free', 'pro', 'beast'])
    .describe('The tier of service requested (free, pro, or beast).'),
});
export type GenerateRevenuePlanInput = z.infer<typeof GenerateRevenuePlanInputSchema>;

const GenerateRevenuePlanOutputSchema = z.object({
  revenuePlan: z
    .string()
    .describe('A detailed revenue maximization plan with actionable steps.'),
});
export type GenerateRevenuePlanOutput = z.infer<typeof GenerateRevenuePlanOutputSchema>;

export async function generateRevenuePlan(
  input: GenerateRevenuePlanInput
): Promise<GenerateRevenuePlanOutput> {
  return generateRevenuePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRevenuePlanPrompt',
  input: {schema: GenerateRevenuePlanInputSchema},
  output: {schema: GenerateRevenuePlanOutputSchema},
  prompt: `You are an expert business consultant specializing in revenue maximization.

You will use this information to generate a detailed revenue maximization plan with actionable steps for the user's business idea.

Consider the user's selected tier when creating the plan. The "beast" tier should include more advanced and comprehensive strategies including AI coaching, predictive analysis, and viral platform integration.

Business Idea: {{{businessIdea}}}
Tier: {{{tier}}}

Revenue Plan:`,
});

const generateRevenuePlanFlow = ai.defineFlow(
  {
    name: 'generateRevenuePlanFlow',
    inputSchema: GenerateRevenuePlanInputSchema,
    outputSchema: GenerateRevenuePlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
