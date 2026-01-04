'use client';

import {z} from 'zod';

// CORE APP TYPES
// =================================================================
export type PlanTier = 'free' | 'pro' | 'beast';

export type View =
  | 'overview'
  | 'website-analysis'
  | 'revenue-maximizer'
  | 'ai-coach'
  | 'predictions'
  | 'viral-platforms'
  | 'organizer'
  | 'upgrade'
  | 'beast-dashboard'
  | 'free-dashboard'
  | 'pro-dashboard';

export interface NavItem {
  id: View;
  title: string;
  description: string;
  isNew?: boolean;
}

// WEBSITE ANALYSIS SCHEMAS
// =================================================================
export const WebsiteAnalysisInputSchema = z.object({
  websiteUrl: z
    .string()
    .url({message: 'Please enter a valid URL.'})
    .describe("The URL of the competitor's website to analyze."),
  businessIdea: z
    .string()
    .min(10, {message: 'Please provide a brief description of your business.'})
    .describe(
      'A brief description of your business idea or purpose, for context.'
    ),
});
export type WebsiteAnalysisInput = z.infer<typeof WebsiteAnalysisInputSchema>;

export const WebsiteAnalysisOutputSchema = z.object({
  potentialRevenueStreams: z
    .string()
    .describe(
      'A ruthless analysis of how the competitor makes money and how you can do it better.'
    ),
  areasForImprovement: z
    .string()
    .describe("A list of the competitor's weaknesses to be exploited."),
});
export type WebsiteAnalysisOutput = z.infer<typeof WebsiteAnalysisOutputSchema>;

// VIRAL STRATEGY SCHEMAS
// =================================================================
export const ViralStrategyInputSchema = z.object({
  businessIdea: z
    .string()
    .min(10, {message: 'Please provide a more detailed business idea.'})
    .describe('A description of the business or product idea.'),
});
export type ViralStrategyInput = z.infer<typeof ViralStrategyInputSchema>;

const StrategyItemSchema = z.object({
  platform: z
    .string()
    .describe(
      'The name of the social media platform (e.g., TikTok, X, Reddit).'
    ),
  rationale: z
    .string()
    .describe(
      "A brief, hard-hitting reason why this platform is a goldmine for the user's specific business idea."
    ),
  strategy: z
    .string()
    .describe(
      'A concise, actionable, and ruthless viral strategy for this platform. Give specific content ideas.'
    ),
  userBase: z.string().describe("The user base of the platform (e.g., '1B+')."),
  potential: z
    .string()
    .describe(
      "The viral potential on this platform for this specific idea (e.g., 'High', 'Medium', 'Untapped')."
    ),
  url: z.string().url().describe('The URL to get started on the platform.'),
});

export const ViralStrategyOutputSchema = z.object({
  strategies: z
    .array(StrategyItemSchema)
    .describe('An array of tailored viral strategies for different platforms.'),
});
export type ViralStrategyOutput = z.infer<typeof ViralStrategyOutputSchema>;

// AI COACH SCHEMAS
// =================================================================
export const AICoachPersonalizedGuidanceInputSchema = z.object({
  userIdea: z.string().describe("The user's business idea or question."),
  currentRevenue: z.number().optional().describe('The current monthly revenue in USD.'),
  businessGoals: z.string().optional().describe('The user\'s primary business goals.'),
  riskTolerance: z.enum(['low', 'medium', 'high']).optional().describe('The user\'s tolerance for risk.'),
});
export type AICoachPersonalizedGuidanceInput = z.infer<
  typeof AICoachPersonalizedGuidanceInputSchema
>;

export const AICoachPersonalizedGuidanceOutputSchema = z.object({
  personalizedGuidance: z
    .string()
    .describe(
      'Personalized advice and strategies from the AI coach to maximize profits.'
    ),
  potentialRisks: z
    .string()
    .describe('Potential risks associated with the suggested strategies.'),
  recommendedActions: z
    .array(z.string())
    .describe('A list of recommended actions for the user to take.'),
});
export type AICoachPersonalizedGuidanceOutput = z.infer<
  typeof AICoachPersonalizedGuidanceOutputSchema
>;

// REVENUE PLAN SCHEMAS
// =================================================================
export const GenerateRevenuePlanInputSchema = z.object({
  businessIdea: z
    .string()
    .describe('The business idea for which to generate a revenue plan.'),
  tier: z
    .enum(['free', 'pro', 'beast'])
    .describe('The tier of service requested (free, pro, or beast).'),
});
export type GenerateRevenuePlanInput = z.infer<
  typeof GenerateRevenuePlanInputSchema
>;

export const GenerateRevenuePlanOutputSchema = z.object({
  revenuePlan: z
    .string()
    .describe('A detailed revenue maximization plan with actionable steps.'),
});
export type GenerateRevenuePlanOutput = z.infer<
  typeof GenerateRevenuePlanOutputSchema
>;

// REVENUE PREDICTION SCHEMAS
// =================================================================
export const PredictRevenuePotentialInputSchema = z.object({
  idea: z.string().describe("The user's business idea."),
  plan: z.string().describe('The detailed plan for executing the idea.'),
  marketData: z.string().describe('Relevant market data and trends.'),
});
export type PredictRevenuePotentialInput = z.infer<
  typeof PredictRevenuePotentialInputSchema
>;

export const PredictRevenuePotentialOutputSchema = z.object({
  revenueProjection: z
    .string()
    .describe('The projected revenue for the idea (e.g., "$10k-$15k MRR within 12 months").'),
  successProbability: z
    .number()
    .min(0)
    .max(1)
    .describe('The probability of success for the idea (0-1).'),
  keyFactors: z
    .string()
    .describe('The key positive and negative factors influencing the prediction.'),
});
export type PredictRevenuePotentialOutput = z.infer<
  typeof PredictRevenuePotentialOutputSchema
>;
