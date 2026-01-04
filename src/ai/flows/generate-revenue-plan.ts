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
The revenue maximization plan for the 'Free' tier focuses entirely on lead generation, value demonstration, and strategic upselling to convert users to paid subscriptions.

1.  **Optimized Onboarding & Value Demonstration:** Upon sign-up, immediately guide users through a concise onboarding process that highlights the free tier's core capabilities: basic website analysis and initial idea input for generalized income suggestions. Ensure the value proposition of the free offering is clear and quickly realized. Use interactive elements to demonstrate the initial impact of the app, even with limited features. This quick win is crucial for retention and future conversion.
2.  **Strategic Call-to-Action (CTA) Placement:** Embed prominent and clear calls-to-action throughout the free experience. When users interact with features exclusive to 'Pro' or 'Beast' modes, or when the free tier reaches its limitations (e.g., after a certain number of basic analyses), display compelling prompts to upgrade. Examples include: "Unlock advanced insights with Pro," "Get personalized AI coaching with Beast Mode," or "Generate 10x more detailed plans – Upgrade Now." These CTAs should explain the specific benefit of upgrading.
3.  **Email List Building & Nurturing:** Make email sign-up a primary objective during free tier registration. Utilize a welcome email sequence that educates users about the app's full potential, showcases testimonials from paid users (if available), and provides initial tips that can be enhanced by upgrading. Regularly send newsletters with valuable content (e.g., general business tips, market trends) that subtly promotes the advanced features available in 'Pro' and 'Beast' tiers.
4.  **Limited-Time Upgrade Incentives:** Introduce occasional, time-sensitive offers exclusively for free tier users to encourage their first upgrade. For example, a "first-month-half-off" for the Pro tier, or a bundled discount for an annual Pro subscription. These incentives create urgency and lower the barrier to entry for paid tiers.
5.  **Contextual Feature Previews:** Implement 'locked' premium features within the free interface that users can briefly preview. For instance, when a free user gets a generalized income suggestion, a "See how AI coaching refines this idea for maximum profit with Beast Mode" button could pop up, perhaps showing a blurred screenshot of the Beast interface or a short video clip demonstrating its power. This provides a tangible glimpse of the added value.
6.  **Referral Program for Free Tier Users:** Introduce a referral program where free users can earn limited-time access to 'Pro' features (e.g., 7 days of Pro access) for successfully referring new free users who sign up. This incentivizes viral growth within the free tier and exposes more users to premium functionality, increasing upgrade potential.
7.  **Data-Driven Analytics for Conversion Optimization:** Continuously track user behavior within the free tier, identifying common drop-off points, features that generate the most engagement, and the most effective upgrade prompts. Use this data to iteratively refine the free experience, optimize CTA placements, and personalize upgrade offers to maximize conversion rates to the 'Pro' and 'Beast' tiers.
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
