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
