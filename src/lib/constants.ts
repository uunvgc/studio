import type { NavItem, PlanTier } from '@/lib/types';

export const ALL_NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    title: 'Dashboard',
    description: 'Your command center for financial domination.',
  },
  {
    id: 'free-dashboard',
    title: 'Dashboard',
    description: 'Your command center for financial domination.',
  },
  {
    id: 'pro-dashboard',
    title: 'Pro Dashboard',
    description: 'Your command center for financial domination.',
  },
  {
    id: 'beast-dashboard',
    title: 'Beast Dashboard',
    description: 'Your Ultimate Command Center.',
    isNew: true,
  },
  {
    id: 'website-analysis',
    title: 'Competitor Annihilator',
    description: 'Dismantle your competition. Steal their profits.',
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

const getItem = (id: NavItem['id']) => ALL_NAV_ITEMS.find(item => item.id === id)!;

export const FREE_NAV_ITEMS: NavItem[] = [
  getItem('free-dashboard'),
  getItem('revenue-maximizer'),
  getItem('organizer'),
  getItem('upgrade'),
];

export const PRO_NAV_ITEMS: NavItem[] = [
  getItem('pro-dashboard'),
  getItem('website-analysis'),
  getItem('revenue-maximizer'),
  getItem('viral-platforms'),
  getItem('organizer'),
  getItem('upgrade'),
];

export const BEAST_NAV_ITEMS: NavItem[] = [
    getItem('beast-dashboard'),
    getItem('website-analysis'),
    getItem('revenue-maximizer'),
    getItem('ai-coach'),
    getItem('predictions'),
    getItem('viral-platforms'),
    getItem('organizer'),
    getItem('upgrade'),
];


export const NAV_ITEMS = ALL_NAV_ITEMS; // Keep for backward compatibility if needed anywhere else

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
      'Basic Revenue Plan',
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
      'Enhanced Competitor Annihilation',
      'Detailed Pro Revenue Plan',
      'Viral Platform Strategy',
      'Priority Support',
    ],
    cta: 'Upgrade with Stripe',
  },
  {
    id: 'beast',
    name: 'Beast',
    price: '$29.99',
    priceDetail: '/ month',
    features: [
      'Everything in Pro, plus:',
      'Premium AI Coaching',
      'Predictive Revenue Analysis',
      'Beast-level Revenue Plan',
      'Emerging trend alerts',
    ],
    cta: 'Upgrade with Stripe',
  },
];

export const viralPlatforms = [
    { name: "TikTok", category: "Short-Form Video", userBase: "1B+", potential: "High", description: "Dominant platform for viral short videos and trends.", url: "https://www.tiktok.com" },
    { name: "YouTube Shorts", category: "Short-Form Video", userBase: "2B+", potential: "High", description: "Leverages YouTube's massive user base for short content.", url: "https://www.youtube.com/shorts" },
    { name: "Instagram Reels", category: "Short-Form Video", userBase: "2B+", potential: "High", description: "Integrated into the Instagram ecosystem, great for visual brands.", url: "https://www.instagram.com/reels" },
    { name: "X (Twitter)", category: "Microblogging", userBase: "400M+", potential: "Medium", description: "Real-time information and viral text/meme dissemination.", url: "https://www.x.com" },
    { name: "Reddit", category: "Community Forum", userBase: "500M+", potential: "Medium-High", description: "Niche communities (subreddits) can drive targeted viral traffic.", url: "https://www.reddit.com" },
    { name: "LinkedIn", category: "Professional Network", userBase: "800M+", potential: "Medium", description: "Ideal for B2B, professional content, and industry insights.", url: "https://www.linkedin.com" },
    { name: "Pinterest", category: "Visual Discovery", userBase: "475M+", potential: "Medium", description: "Strong for visual products, DIY, and aspirational content.", url: "https://www.pinterest.com" },
    { name: "Threads", category: "Microblogging", userBase: "150M+", potential: "Emerging", description: "A growing text-based social network from Meta, potential for early adoption.", url: "https://www.threads.net" },
    { name: "Lemon8", category: "Lifestyle Community", userBase: "10M+", potential: "Emerging", description: "A visual-heavy platform from the creators of TikTok, focused on lifestyle content.", url: "https://www.lemon8-app.com" },
];
