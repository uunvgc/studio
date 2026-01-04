'use server';
/**
 * @fileOverview This file defines the Genkit flow for analyzing a competitor's website and generating a report.
 *
 * It includes:
 * - `analyzeWebsite`: The main function to trigger the website analysis flow.
 */

import {ai} from '@/ai/genkit';
import {
  WebsiteAnalysisInputSchema,
  WebsiteAnalysisOutputSchema,
  type WebsiteAnalysisInput,
  type WebsiteAnalysisOutput,
} from '@/lib/types';

export async function analyzeWebsite(
  input: WebsiteAnalysisInput
): Promise<WebsiteAnalysisOutput> {
  return websiteAnalysisFlow(input);
}

const websiteAnalysisPrompt = ai.definePrompt({
  name: 'websiteAnalysisPrompt',
  input: {schema: WebsiteAnalysisInputSchema},
  output: {schema: WebsiteAnalysisOutputSchema},
  config: {
    model: 'googleai/gemini-1.5-pro',
  },
  prompt: `You are a ruthless business strategist and corporate spy. Your mission is to analyze a competitor's website and provide a actionable battle plan for my business to dominate them.

I am providing you with the competitor's website and context about my own business.

Competitor Website URL: {{{websiteUrl}}}
My Business: {{{businessIdea}}}

Your report must be brutally honest and focused on exploitation. Your response must be a JSON object.

For "potentialRevenueStreams": Deconstruct every possible way the competitor makes money. Advertising, affiliate links, product sales, subscriptions, etc. For each stream, suggest how I can do it better, cheaper, or faster to steal their customers. Provide a detailed, tactical plan.

For "areasForImprovement": Identify every crack in their armor. Is their design dated? Is their copy weak? Is their site slow? Is their marketing message unclear? Provide a direct, actionable list of their failures that I can turn into my strengths. Be specific and merciless. Give me a concrete plan to exploit these weaknesses.

The final JSON output must use the key "potentialRevenueStreams" for the revenue analysis and "areasForImprovement" for the weakness analysis.`,
});

const websiteAnalysisFlow = ai.defineFlow(
  {
    name: 'websiteAnalysisFlow',
    inputSchema: WebsiteAnalysisInputSchema,
    outputSchema: WebsiteAnalysisOutputSchema,
  },
  async input => {
    const {output} = await websiteAnalysisPrompt(input);
    return output!;
  }
);
