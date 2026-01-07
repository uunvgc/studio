'use server';
/**
 * @fileOverview A revenue plan generator AI agent.
 *
 * - generateRevenuePlan - A function that generates a revenue plan.
 * - GenerateRevenuePlanInput - The input type for the generateRevenuePlan function.
 * - GenerateRevenuePlanOutput - The return type for the generateRevenuePlan function.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateRevenuePlanInputSchema,
  GenerateRevenuePlanOutputSchema,
  type GenerateRevenuePlanInput,
  type GenerateRevenuePlanOutput,
} from '@/lib/types';

export async function generateRevenuePlan(
  input: GenerateRevenuePlanInput
): Promise<GenerateRevenuePlanOutput> {
  if (!input) {
    console.error("generateRevenuePlan called with undefined or null input.");
    throw new Error("GenerateRevenuePlan called with invalid input");
  }

  const parsed = GenerateRevenuePlanInputSchema.safeParse(input);
  if (!parsed.success) {
    console.error("Invalid input schema for generateRevenuePlan:", parsed.error);
    throw new Error("Invalid input provided to generateRevenuePlan flow.");
  }
  
  try {
    return await generateRevenuePlanFlow(parsed.data);
  } catch (e: any) {
    console.error("ERROR EXECUTING FLOW: generateRevenuePlanFlow", e);
    throw new Error(`Failed to generate revenue plan: ${e.message}`);
  }
}

const prompt = ai.definePrompt({
  name: 'generateRevenuePlanPrompt',
  input: {schema: GenerateRevenuePlanInputSchema},
  output: {schema: GenerateRevenuePlanOutputSchema},
  config: {
    model: 'googleai/gemini-1.5-pro',
  },
  prompt: `You are an expert business consultant specializing in revenue maximization. Your task is to generate a detailed, actionable revenue maximization plan for the user's business idea, tailored to their selected plan tier.

Business Idea: {{{businessIdea}}}
Selected Tier: {{{tier}}}

Instructions:
- If the tier is 'free', create a plan focused on lead generation, value demonstration, and converting users to paid plans.
- If the tier is 'pro', create a practical, in-depth plan using advanced analytics and market insights for a competitive edge.
- If the tier is 'beast', create an aggressive, dominant strategy using AI-powered predictive analytics and advanced techniques to crush the competition.

The output must be a valid JSON object with a single key "revenuePlan" which contains the detailed, formatted plan as a string.
`,
});

const generateRevenuePlanFlow = ai.defineFlow(
  {
    name: 'generateRevenuePlanFlow',
    inputSchema: GenerateRevenuePlanInputSchema,
    outputSchema: GenerateRevenuePlanOutputSchema,
  },
  async input => {
    console.log("FLOW RECEIVED (generateRevenuePlanFlow):", JSON.stringify(input, null, 2));
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI model did not return a valid output.");
    }
    return output;
  }
);
