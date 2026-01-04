'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting the revenue potential of a user's idea.
 *
 * - predictRevenuePotential - A function that predicts the revenue potential.
 * - PredictRevenuePotentialInput - The input type for the predictRevenuePotential function.
 * - PredictRevenuePotentialOutput - The return type for the predictRevenuePotential function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictRevenuePotentialInputSchema = z.object({
  idea: z.string().describe('The user\u0027s business idea.'),
  plan: z.string().describe('The detailed plan for executing the idea.'),
  marketData: z.string().describe('Relevant market data and trends.'),
});
export type PredictRevenuePotentialInput = z.infer<typeof PredictRevenuePotentialInputSchema>;

const PredictRevenuePotentialOutputSchema = z.object({
  revenueProjection: z.string().describe('The projected revenue for the idea.'),
  successProbability: z.number().describe('The probability of success for the idea (0-1).'),
  keyFactors: z.string().describe('The key factors influencing the prediction.'),
});
export type PredictRevenuePotentialOutput = z.infer<typeof PredictRevenuePotentialOutputSchema>;

export async function predictRevenuePotential(input: PredictRevenuePotentialInput): Promise<PredictRevenuePotentialOutput> {
  return predictRevenuePotentialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRevenuePotentialPrompt',
  input: {schema: PredictRevenuePotentialInputSchema},
  output: {schema: PredictRevenuePotentialOutputSchema},
  prompt: `You are an AI-powered business analyst specializing in predicting the revenue potential of new business ideas. Analyze the provided business idea, execution plan, and market data to generate a revenue projection, a success probability, and identify key factors influencing the prediction.

Business Idea: {{{idea}}}
Execution Plan: {{{plan}}}
Market Data: {{{marketData}}}

Consider factors like market size, competition, execution strategy, and current trends. Provide a well-reasoned revenue projection, a success probability between 0 and 1, and list the key factors driving your prediction.

Output in the following JSON format:
{
  "revenueProjection": "Projected revenue",
  "successProbability": 0.75,
  "keyFactors": "Key factors influencing the prediction"
}`,
});

const predictRevenuePotentialFlow = ai.defineFlow(
  {
    name: 'predictRevenuePotentialFlow',
    inputSchema: PredictRevenuePotentialInputSchema,
    outputSchema: PredictRevenuePotentialOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
