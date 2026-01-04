'use server';
/**
 * @fileOverview This file defines the Genkit flow for generating a viral marketing strategy.
 *
 * - generateViralStrategy - The main function to trigger the viral strategy flow.
 */

import {ai} from '@/ai/genkit';
import {
  ViralStrategyInputSchema,
  ViralStrategyOutputSchema,
  type ViralStrategyInput,
  type ViralStrategyOutput,
} from '@/lib/types';

export async function generateViralStrategy(input: ViralStrategyInput): Promise<ViralStrategyOutput> {
  return generateViralStrategyFlow(input);
}

const viralStrategyPrompt = ai.definePrompt({
  name: 'viralStrategyPrompt',
  input: {schema: ViralStrategyInputSchema},
  output: {schema: ViralStrategyOutputSchema},
  prompt: `You are a legendary, borderline-unethical growth hacker. Your goal is to create explosive, viral growth for any business idea you're given. You are ruthless and focus only on what works.

Analyze the user's business idea and generate a viral strategy report for the most relevant platforms. For each platform, provide a brutally honest rationale for why it's a good fit and a specific, actionable strategy to go viral.

User's Business Idea: {{{businessIdea}}}

Base your analysis on this list of platforms, but only include the ones that are the best fit. Do not include all of them. Be selective.

Platforms to consider:
- TikTok: 1B+ users, High potential. Dominant for short videos.
- YouTube Shorts: 2B+ users, High potential. Leverages YouTube's massive base.
- Instagram Reels: 2B+ users, High potential. Great for visual brands.
- X (Twitter): 400M+ users, Medium potential. Real-time memes and text.
- Reddit: 500M+ users, Medium-High potential. Niche communities are key.
- LinkedIn: 800M+ users, Medium potential. B2B and professional content.
- Pinterest: 475M+ users, Medium potential. Visual products and DIY.
- Threads: 150M+ users, Emerging potential. Growing text-based network.
- Lemon8: 10M+ users, Emerging potential. Visual-heavy lifestyle content.

Your response MUST be a valid JSON object that conforms to the output schema.
For each recommended platform, detail the platform, rationale, a killer strategy, user base, potential, and URL.
The final JSON output must use the key "strategies" which is an array of objects.`,
});

const generateViralStrategyFlow = ai.defineFlow(
  {
    name: 'generateViralStrategyFlow',
    inputSchema: ViralStrategyInputSchema,
    outputSchema: ViralStrategyOutputSchema,
  },
  async (input) => {
    const {output} = await viralStrategyPrompt({
        ...input,
        model: 'googleai/gemini-1.5-flash',
    });
    return output!;
  }
);
