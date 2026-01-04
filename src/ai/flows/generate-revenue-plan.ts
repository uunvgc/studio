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

You will generate a detailed revenue maximization plan with actionable steps for the user's business idea.

The user's business idea is: {{{businessIdea}}}
The user's selected tier is: {{{tier}}}

{{#if (eq tier "free")}}
The revenue maximization plan for the 'Free' tier should focus on lead generation, value demonstration, and strategic upselling to convert users to paid subscriptions. Your response for this tier should be based on the following strategy:

1.  **Optimized Onboarding & Value Demonstration:** Recommend a concise onboarding process that highlights the business idea's core capabilities to give a quick win.
2.  **Strategic Call-to-Action (CTA) Placement:** Suggest where to embed prominent CTAs within the user's product to upsell to potential premium versions.
3.  **Email List Building & Nurturing:** Advise on making email sign-up a primary objective and using a welcome sequence to educate and nurture leads.
4.  **Limited-Time Upgrade Incentives:** Suggest creating time-sensitive offers to encourage upgrades.
5.  **Contextual Feature Previews:** Recommend showing 'locked' premium features in the user's product to provide a tangible glimpse of added value.
6.  **Referral Program:** Suggest a referral program where users can earn rewards for referring new customers.
7.  **Data-Driven Analytics:** Emphasize tracking user behavior to optimize conversion rates.

Your output for the free tier should be a plan for the USER'S business idea that incorporates these principles.
{{/if}}

{{#if (eq tier "pro")}}
The plan for the "Pro" tier should be a practical and more in-depth strategy. It should include advanced analytics, deeper market research, and more personalized income strategies. Focus on delivering efficiency and better, more tailored results than the free offering.
{{/if}}

{{#if (eq tier "beast")}}
The "Beast" tier plan must be the flagship, premium offering. It should include the most advanced and comprehensive strategies, including AI-driven personalization, predictive analysis of earnings, and guidance on leveraging viral platforms for maximum reach and monetization. Emphasize the cutting-edge tools and strategic foresight that will position the user years ahead of the market.
{{/if}}

Generate the Revenue Plan:`,
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
