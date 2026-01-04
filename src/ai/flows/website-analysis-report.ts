'use server';

/**
 * @fileOverview This file defines the Genkit flow for analyzing a website and generating a report.
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
    .describe('The URL of the website to analyze.'),
  businessIdea: z
    .string()
    .describe(
      'A brief description of the business idea or purpose behind the website.'
    ),
});
export type WebsiteAnalysisInput = z.infer<typeof WebsiteAnalysisInputSchema>;

const WebsiteAnalysisOutputSchema = z.object({
  potentialRevenueStreams: z
    .string()
    .describe(
      'A detailed analysis of potential revenue streams for the website.'
    ),
  areasForImprovement: z
    .string()
    .describe('Identified areas for improvement on the website.'),
});
export type WebsiteAnalysisOutput = z.infer<typeof WebsiteAnalysisOutputSchema>;

export async function analyzeWebsite(input: WebsiteAnalysisInput): Promise<WebsiteAnalysisOutput> {
  return websiteAnalysisFlow(input);
}

const websiteAnalysisPrompt = ai.definePrompt({
  name: 'websiteAnalysisPrompt',
  input: {schema: WebsiteAnalysisInputSchema},
  output: {schema: WebsiteAnalysisOutputSchema},
  prompt: `You are a website analysis expert. Analyze the provided website URL and business idea to identify potential revenue streams and areas for improvement.

Website URL: {{{websiteUrl}}}
Business Idea: {{{businessIdea}}}

Respond with a detailed report including:

*   Potential Revenue Streams: A comprehensive list of ways the website can generate income, including specific strategies and examples.
*   Areas for Improvement: Specific recommendations on how to improve the website's design, functionality, content, and marketing to maximize its potential.`,
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
