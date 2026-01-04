import { z } from 'zod';

export type PlanTier = 'free' | 'pro' | 'beast';

export type View =
  | 'overview'
  | 'website-analysis'
  | 'revenue-maximizer'
  | 'ai-coach'
  | 'predictions'
  | 'viral-platforms'
  | 'organizer'
  | 'upgrade';

export interface NavItem {
  id: View;
  title: string;
  description: string;
  isNew?: boolean;
}

// Viral Strategy Schemas and Types
export const ViralStrategyInputSchema = z.object({
  businessIdea: z
    .string()
    .describe('A description of the business or product idea.'),
});
export type ViralStrategyInput = z.infer<typeof ViralStrategyInputSchema>;

const StrategyItemSchema = z.object({
    platform: z.string().describe("The name of the social media platform (e.g., TikTok, X, Reddit)."),
    rationale: z.string().describe("A brief, hard-hitting reason why this platform is a goldmine for the user's specific business idea."),
    strategy: z.string().describe("A concise, actionable, and ruthless viral strategy for this platform. Give specific content ideas."),
    userBase: z.string().describe("The user base of the platform (e.g., '1B+')."),
    potential: z.string().describe("The viral potential on this platform for this specific idea (e.g., 'High', 'Medium', 'Untapped')."),
    url: z.string().url().describe("The URL to get started on the platform.")
});

export const ViralStrategyOutputSchema = z.object({
  strategies: z.array(StrategyItemSchema).describe("An array of tailored viral strategies for different platforms.")
});
export type ViralStrategyOutput = z.infer<typeof ViralStrategyOutputSchema>;
