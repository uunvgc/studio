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
import {
  GenerateRevenuePlanInputSchema,
  GenerateRevenuePlanOutputSchema,
  type GenerateRevenuePlanInput,
  type GenerateRevenuePlanOutput,
} from '@/lib/types';

export async function generateRevenuePlan(
  input: GenerateRevenuePlanInput
): Promise<GenerateRevenuePlanOutput> {
  return generateRevenuePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRevenuePlanPrompt',
  input: {
    schema: z.object({
      businessIdea: z.string(),
      tier: z.object({
        free: z.boolean().optional(),
        pro: z.boolean().optional(),
        beast: z.boolean().optional(),
      }),
    }),
  },
  output: {schema: GenerateRevenuePlanOutputSchema},
  config: {
    model: 'googleai/gemini-1.5-pro',
  },
  prompt: `You are an expert business consultant specializing in revenue maximization.

You will generate a detailed revenue maximization plan with actionable steps for the user's business idea.

The user's business idea is: {{{businessIdea}}}

{{#if tier.free}}
The revenue maximization plan for the 'Free' tier focuses entirely on lead generation, value demonstration, and strategic upselling to convert users to paid subscriptions.

1.  **Optimized Onboarding & Value Demonstration:** Upon sign-up, immediately guide users through a concise onboarding process that highlights the free tier's core capabilities: basic website analysis and initial idea input for generalized income suggestions. Ensure the value proposition of the free offering is clear and quickly realized. Use interactive elements to demonstrate the initial impact of the app, even with limited features. This quick win is crucial for retention and future conversion.
2.  **Strategic Call-to-Action (CTA) Placement:** Embed prominent and clear calls-to-action throughout the free experience. When users interact with features exclusive to 'Pro' or 'Beast' modes, or when the free tier reaches its limitations (e.g., after a certain number of basic analyses), display compelling prompts to upgrade. Examples include: "Unlock advanced insights with Pro," "Get personalized AI coaching with Beast Mode," or "Generate 10x more detailed plans – Upgrade Now." These CTAs should explain the specific benefit of upgrading.
3.  **Email List Building & Nurturing:** Make email sign-up a primary objective during free tier registration. Utilize a welcome email sequence that educates users about the app's full potential, showcases testimonials from paid users (if available), and provides initial tips that can be enhanced by upgrading. Regularly send newsletters with valuable content (e.g., general business tips, market trends) that subtly promotes the advanced features available in 'Pro' and 'Beast' tiers.
4.  **Limited-Time Upgrade Incentives:** Introduce occasional, time-sensitive offers exclusively for free tier users to encourage their first upgrade. For example, a "first-month-half-off" for the Pro tier, or a bundled discount for an annual Pro subscription. These incentives create urgency and lower the barrier to entry for paid tiers.
5.  **Contextual Feature Previews:** Implement 'locked' premium features within the free interface that users can briefly preview. For instance, when a free user gets a generalized income suggestion, a "See how AI coaching refines this idea for maximum profit with Beast Mode" button could pop up, perhaps showing a blurred screenshot of the Beast interface or a short video clip demonstrating its power. This provides a tangible glimpse of the added value.
6.  **Referral Program for Free Tier Users:** Introduce a referral program where free users can earn limited-time access to 'Pro' features (e.g., 7 days of Pro access) for successfully referring new free users who sign up. This incentivizes viral growth within the free tier and exposes more users to premium functionality, increasing upgrade potential.
7.  **Data-Driven Analytics for Conversion Optimization:** Continuously track user behavior within the free tier, identifying common drop-off points, features that generate the most engagement, and the most effective upgrade prompts. Use this data to iteratively refine the free experience, optimize CTA placements, and personalize upgrade offers to maximize conversion rates to the 'Pro' and 'Beast' tiers.
{{/if}}

{{#if tier.pro}}
The revenue maximization plan for the 'Pro' tier should be practical, in-depth, and focus on delivering tangible results quickly. The strategy is to leverage advanced analytics and market insights to give the user a distinct competitive advantage.

1.  **Deep Competitor Analysis Integration:** Go beyond basic website scrapes. The plan should guide the user to leverage the "Competitor Annihilator" feature to identify 3-5 key competitors. For each competitor, the user should be prompted to analyze their pricing, marketing channels, and customer reviews. The AI will then synthesize this into a "Weakness Matrix" that shows the most exploitable gaps in the market.
2.  **Advanced Revenue Funnel Mapping:** Provide a visual, step-by-step guide to building a multi-stage revenue funnel. This includes:
    *   **Top of Funnel (Awareness):** Based on the "Viral Platforms" analysis, select the top 2 platforms. Provide concrete content ideas (e.g., "For TikTok, create a 3-part series on '3 Mistakes Your Competitor Is Making'").
    *   **Middle of Funnel (Consideration):** Propose creating a high-value lead magnet (e.g., a short e-book, a webinar) that directly addresses a pain point discovered in the competitor analysis.
    *   **Bottom of Funnel (Conversion):** Outline a simple email marketing sequence (3-5 emails) to convert leads from the lead magnet into paying customers. Include templates for these emails.
3.  **Persona-Driven Monetization Models:** Generate 2-3 distinct customer personas for the user's business idea. For each persona, propose a tailored pricing model. Example:
    *   **Persona A: "The Budget-Conscious Beginner."** Offer: A low-cost, entry-level subscription with core features.
    *   **Persona B: "The Growth-Focused Professional."** Offer: A premium tier with all features, and a one-on-one consultation.
4.  **Key Performance Indicator (KPI) Dashboard Setup:** Instruct the user to set up a simple KPI dashboard (using a free tool like Google Sheets or a paid tool if appropriate). The plan must specify the 5-7 most critical metrics to track daily/weekly, such as Customer Acquisition Cost (CAC), Lifetime Value (LTV), Conversion Rate, and Churn Rate. Explain *why* each KPI is critical.
5.  **A/B Testing Roadmap:** Provide a 30-day roadmap for A/B testing. This should include specific, high-impact elements to test, such as the main headline on their landing page, the call-to-action button color/text, and the pricing structure. The goal is to drive incremental, data-backed improvements.
{{/if}}

{{#if tier.beast}}
The "Beast" tier plan is the ultimate, all-out assault on the market. It combines ruthless strategy with cutting-edge AI and predictive analytics to not just compete, but dominate.

1.  **AI-Powered Predictive Market-Fit Analysis:** Before executing, the plan will guide the user to use the "Predictive Analysis" tool. The user will input their core idea and the AI will generate a Success Probability Score. If the score is below a certain threshold (e.g., 75%), the AI will provide 3-5 specific "pivots" or adjustments to the business model to increase its likelihood of success.
2.  **Conversational AI Sales Funnel:** The plan will outline how to use the "AI Coach" as a 24/7 sales and strategy partner. This includes:
    *   **Role-playing Sales Calls:** Instruct the user to practice sales pitches with the AI Coach to refine their messaging.
    *   **Negotiation Simulation:** The user can simulate negotiations for partnerships or pricing with the AI to identify weaknesses in their approach.
    *   **Objection Handling:** Generate a list of the top 10 potential customer objections and use the AI Coach to develop and practice "bulletproof" responses.
3.  **Total Dominance Viral Strategy:** This goes beyond simple content ideas. The plan will create a multi-platform, compounding content strategy.
    *   **Platform Synergy:** A single core idea is repurposed across multiple platforms (e.g., a deep-dive YouTube video becomes a Twitter thread, a series of TikToks, an Instagram Reel, and a LinkedIn article).
    *   **"Contrarian" Content Plays:** Identify the dominant narrative in the user's niche and create content that takes a strong, controversial, but well-argued opposing view to generate debate and massive engagement.
    *   **Influencer Hijacking:** Identify 5-10 micro-influencers in the niche. The plan will provide a script for outreach that offers undeniable value, effectively "hijacking" their audience's attention.
4.  **Automated Opportunity Scouting:** Instruct the user on how to set up alerts (e.g., Google Alerts, social listening tools) for keywords related to their competitors' weaknesses and customer complaints. This creates an automated system for finding and poaching dissatisfied customers.
5.  **Pre-emptive Trend Modeling:** Use the AI's analytical capabilities to forecast 1-2 emerging trends that will impact the user's market in the next 6-12 months. The plan will provide actionable steps on how to position the business to capitalize on these trends *before* they become mainstream, ensuring the user is seen as a forward-thinking leader.
{{/if}}

Generate the Revenue Plan as a JSON object with a single key "revenuePlan" containing the detailed plan as a string.
`,
});

const generateRevenuePlanFlow = ai.defineFlow(
  {
    name: 'generateRevenuePlanFlow',
    inputSchema: GenerateRevenuePlanInputSchema,
    outputSchema: GenerateRevenuePlanOutputSchema,
  },
  async input => {
    // Create a structured object to enable simple #if checks in Handlebars
    const structuredInput = {
      businessIdea: input.businessIdea,
      tier: {
        [input.tier]: true,
      },
    };
    const {output} = await prompt(structuredInput);
    return output!;
  }
);
