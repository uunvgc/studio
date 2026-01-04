'use server';
/**
 * @fileOverview This file defines a Genkit flow for predicting the revenue potential of a user's idea.
 *
 * - predictRevenuePotential - A function that predicts the revenue potential.
 * - PredictRevenuePotentialInput - The input type for the predictRevenuePotential function.
 * - PredictRevenuePotentialOutput - The return type for the predictRevenuePotential function.
 */

import {ai} from '@/ai/genkit';
import {
  PredictRevenuePotentialInputSchema,
  PredictRevenuePotentialOutputSchema,
  type PredictRevenuePotentialInput,
  type PredictRevenuePotentialOutput,
} from '@/lib/types';

export async function predictRevenuePotential(
  input: PredictRevenuePotentialInput
): Promise<PredictRevenuePotentialOutput> {
  return predictRevenuePotentialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRevenuePotentialPrompt',
  input: {schema: PredictRevenuePotentialInputSchema},
  output: {schema: PredictRevenuePotentialOutputSchema},
  config: {
    model: 'googleai/gemini-1.5-pro',
  },
  prompt: `You are an AI-powered business analyst specializing in predicting the revenue potential of new business ideas. Analyze the provided business idea, execution plan, and market data to generate a revenue projection, a success probability, and identify key factors influencing the prediction.

Business Idea: {{{idea}}}
Execution Plan: {{{plan}}}
Market Data: {{{marketData}}}

Consider factors like market size, competition, execution strategy, and current trends. Provide a well-reasoned revenue projection (e.g., "$10k-$15k MRR within 12 months"), a success probability between 0 and 1, and list the key positive and negative factors driving your prediction.

Your response must be a JSON object that conforms to the output schema.`,
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
