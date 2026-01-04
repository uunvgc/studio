'use server';

/**
 * @fileOverview This file defines the Genkit flow for analyzing a competitor's website and generating a report.
 *
 * It includes:
 * - `analyzeWebsite`: The main function to trigger the website analysis flow.
 * - `WebsiteAnalysisInput`: The input type for the `analyzeWebsite` function.
 * - `WebsiteAnalysisOutput`: The output type for the `analyzeWebsite` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WebsiteAnalysisInputSchema = z.object({
  websiteUrl: z
    .string()
    .url()
    .describe("The URL of the competitor's website to analyze."),
  businessIdea: z
    .string()
    .describe(
      'A brief description of your business idea or purpose, for context.'
    ),
});
export type WebsiteAnalysisInput = z.infer<typeof WebsiteAnalysisInputSchema>;

const WebsiteAnalysisOutputSchema = z.object({
  potentialRevenueStreams: z
    .string()
    .describe(
      'A ruthless analysis of how the competitor makes money and how you can do it better.'
    ),
  areasForImprovement: z
    .string()
    .describe('A list of the competitor\'s weaknesses to be exploited.'),
});
export type WebsiteAnalysisOutput = z.infer<typeof WebsiteAnalysisOutputSchema>;

export async function analyzeWebsite(input: WebsiteAnalysisInput): Promise<WebsiteAnalysisOutput> {
  return websiteAnalysisFlow(input);
}

const websiteAnalysisPrompt = ai.definePrompt({
  name: 'websiteAnalysisPrompt',
  input: {schema: WebsiteAnalysisInputSchema},
  output: {schema: WebsiteAnalysisOutputSchema},
  prompt: `You are a ruthless business strategist and corporate spy. Your mission is to analyze a competitor's website and provide a actionable battle plan for my business to dominate them.

I am providing you with the competitor's website and context about my own business.

Competitor Website URL: {{{websiteUrl}}}
My Business: {{{businessIdea}}}

Your report must be brutally honest and focused on exploitation. Respond with:

*   **Revenue Stream Recon:** Deconstruct every possible way the competitor makes money. Advertising, affiliate links, product sales, subscriptions, etc. For each stream, suggest how I can do it better, cheaper, or faster to steal their customers.

*   **Exploitable Weaknesses:** Identify every crack in their armor. Is their design dated? Is their copy weak? Is their site slow? Is their marketing message unclear? Provide a direct, actionable list of their failures that I can turn into my strengths. Be specific and merciless.`,
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
