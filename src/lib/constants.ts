import type { NavItem, PlanTier } from '@/lib/types';

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    title: 'Dashboard',
    description: 'A high-level overview of your profit journey.',
  },
  {
    id: 'website-analysis',
    title: 'Website Analysis',
    description: 'Analyze your website to find hidden revenue.',
  },
  {
    id: 'revenue-maximizer',
    title: 'Revenue Maximizer',
    description: 'Generate a tailored revenue plan for your idea.',
  },
  {
    id: 'ai-coach',
    title: 'AI Coach',
    description: 'Your personal AI CEO for maximizing profits.',
    isNew: true,
  },
  {
    id: 'predictions',
    title: 'Predictive Analysis',
    description: 'Forecast your revenue potential with AI.',
  },
  {
    id: 'viral-platforms',
    title: 'Viral Platforms',
    description: 'Discover the best platforms to go viral.',
  },
  {
    id: 'organizer',
    title: 'Organizer',
    description: 'Plan your tasks and stay on track.',
  },
  {
    id: 'upgrade',
    title: 'Upgrade Plan',
    description: 'Unlock more power with Pro and Beast plans.',
  },
];

export const pricingPlans: {
  id: PlanTier;
  name: string;
  price: string;
  priceDetail: string;
  features: string[];
  cta: string;
}[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    priceDetail: '/ month',
    features: [
      'Basic Website Analysis',
      'Standard Revenue Plan',
      'Task Organizer',
      'Limited platform recommendations',
    ],
    cta: 'Current Plan',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$14.99',
    priceDetail: '/ month',
    features: [
      'Everything in Free, plus:',
      'Enhanced Website Analysis',
      'Detailed Pro Revenue Plan',
      'Full platform access',
      'Priority Support',
    ],
    cta: 'Upgrade to Pro',
  },
  {
    id: 'beast',
    name: 'Beast Mode',
    price: '$29.99',
    priceDetail: '/ month',
    features: [
      'Everything in Pro, plus:',
      'Premium AI Coaching',
      'Predictive Revenue Analysis',
      'Beast Mode Revenue Plan',
      'Emerging trend alerts',
    ],
    cta: 'Unleash Beast Mode',
  },
];

export const viralPlatforms = [
    { name: "TikTok", category: "Short-Form Video", userBase: "1B+", potential: "High", description: "Dominant platform for viral short videos and trends." },
    { name: "YouTube Shorts", category: "Short-Form Video", userBase: "2B+", potential: "High", description: "Leverages YouTube's massive user base for short content." },
    { name: "Instagram Reels", category: "Short-Form Video", userBase: "2B+", potential: "High", description: "Integrated into the Instagram ecosystem, great for visual brands." },
    { name: "X (Twitter)", category: "Microblogging", userBase: "400M+", potential: "Medium", description: "Real-time information and viral text/meme dissemination." },
    { name: "Reddit", category: "Community Forum", userBase: "500M+", potential: "Medium-High", description: "Niche communities (subreddits) can drive targeted viral traffic." },
    { name: "LinkedIn", category: "Professional Network", userBase: "800M+", potential: "Medium", description: "Ideal for B2B, professional content, and industry insights." },
    { name: "Pinterest", category: "Visual Discovery", userBase: "475M+", potential: "Medium", description: "Strong for visual products, DIY, and aspirational content." },
    { name: "Threads", category: "Microblogging", userBase: "150M+", potential: "Emerging", description: "A growing text-based social network from Meta, potential for early adoption." },
    { name: "Lemon8", category: "Lifestyle Community", userBase: "10M+", potential: "Emerging", description: "A visual-heavy platform from the creators of TikTok, focused on lifestyle content." },
];
