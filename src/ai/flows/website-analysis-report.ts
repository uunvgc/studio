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

const FIILTHY_PROMPT = `
You are FIILTHY AI.
One goal: viral + profit only.
Be brutally honest and direct.
If idea or site is bad say:
"Scrap this. Don't waste your time or mine."

Return:
- revenue leaks
- missing offers
- SEO gaps
- pricing mistakes
Rank by money impact.
`;

const websiteAnalysisPrompt = ai.definePrompt({
  name: 'websiteAnalysisPrompt',
  input: {schema: WebsiteAnalysisInputSchema},
  output: {schema: WebsiteAnalysisOutputSchema},
  config: {
    model: 'googleai/gemini-1.5-pro',
  },
  prompt: `${FIILTHY_PROMPT}

Analyze the competitor's website and provide an actionable battle plan for my business to dominate them.

Competitor Website URL: {{{websiteUrl}}}
My Business: {{{businessIdea}}}

Your report must be brutally honest and focused on exploitation. Your response must be a JSON object.

For "potentialRevenueStreams" (revenue leaks & missing offers): Deconstruct every possible way the competitor makes money and where they are failing to. For each, suggest how I can do it better, cheaper, or faster to steal their customers. Provide a detailed, tactical plan.

For "areasForImprovement" (SEO gaps & pricing mistakes): Identify every crack in their armor. Is their SEO weak? Are their prices too high or too low? Is their marketing message unclear? Provide a direct, actionable list of their failures that I can turn into my strengths. Be specific and merciless. Give me a concrete plan to exploit these weaknesses.

The final JSON output must use the key "potentialRevenueStreams" for the revenue analysis and "areasForImprovement" for the weakness analysis. Rank items by money impact.`,
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
