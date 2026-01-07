import type { NavItem } from '@/lib/types';
import { BrainCircuit, DollarSign, Gem, Search, Share2, Target, Bot, TrendingUp } from 'lucide-react';


export const ALL_NAV_ITEMS: NavItem[] = [
  // Dashboards (handled dynamically)
  {
    id: 'free-dashboard',
    title: 'Dashboard',
    description: 'Your command center to start making money.',
    icon: BrainCircuit,
  },
  {
    id: 'pro-dashboard',
    title: 'Dashboard',
    description: 'Your command center for building your empire.',
    icon: BrainCircuit,
  },
  {
    id: 'beast-dashboard',
    title: 'Dashboard',
    description: 'Your Ultimate Command Center for Market Domination.',
    icon: BrainCircuit,
  },
  
  // Core Tools
  {
    id: 'organizer',
    title: 'Idea Organizer',
    description: 'Capture, refine, and organize your business ideas.',
    icon: Target,
  },
  {
    id: 'revenue-maximizer',
    title: 'Revenue Maximizer',
    description: 'Generate a tailored revenue plan for your idea.',
    icon: DollarSign,
  },

  // Pro & Beast Tools
  {
    id: 'website-analysis',
    title: 'Website Analyzer',
    description: 'Dismantle your competition. Steal their profits.',
    icon: Search,
  },
  {
    id: 'viral-platforms',
    title: 'Viral Platforms',
    description: 'Discover the best platforms to go viral.',
    icon: Share2,
  },
  
  // Beast-only Tools
  {
    id: 'ai-coach',
    title: 'AI Coach',
    description: 'Your personal AI CEO for maximizing profits.',
    icon: Bot,
    isNew: true,
  },
  {
    id: 'predictions',
    title: 'Predictive Analysis',
    description: 'Forecast your revenue potential with AI.',
    icon: TrendingUp,
  },

  // Upgrade
  {
    id: 'upgrade',
    title: 'Upgrade Plan',
    description: 'Unlock your full income potential.',
    icon: Gem,
  },
  
  // Overview is deprecated but kept for type safety if referenced.
  {
    id: 'overview',
    title: 'Dashboard',
    description: 'Your command center for financial domination.',
    icon: BrainCircuit,
  },
];

type PlanTier = 'free' | 'pro' | 'beast';

export const pricingPlans: {
  id: PlanTier;
  name: string;
  price: string;
  priceDetail: string;
  annualPrice: string;
  features: string[];
  cta: string;
  isMostPopular?: boolean;
  priceIds: {
    monthly: string;
    annual: string;
  };
}[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    priceDetail: '/ month',
    annualPrice: '$0',
    features: [
      'Basic Revenue Plan Generation',
      'Idea & Task Organizer',
      'Demonstrates Core Value Fast',
      'Limited AI analysis'
    ],
    cta: 'Start for Free',
    priceIds: {
      monthly: '', // Free plan has no price IDs
      annual: '',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '14.99',
    priceDetail: '/ month',
    annualPrice: '149',
    isMostPopular: true,
    features: [
      'Everything in Free, plus:',
      '**Advanced** Revenue Strategies',
      '**Competitor Annihilator** Analysis',
      '**Detailed Viral Growth** Blueprints',
      'ROI-focused tools to directly increase your income',
    ],
    cta: 'Upgrade to Pro',
    priceIds: {
      // Replace with your actual Stripe Price ID for the Pro monthly plan
      monthly: 'YOUR_PRO_MONTHLY_PRICE_ID', 
      // Replace with your actual Stripe Price ID for the Pro annual plan
      annual: 'YOUR_PRO_ANNUAL_PRICE_ID',
    },
  },
  {
    id: 'beast',
    name: 'Beast',
    price: '29.99',
    priceDetail: '/ month',
    annualPrice: '299',
    features: [
      'Everything in Pro, plus:',
      '**Conversational AI CEO/Coach**',
      '**Predictive Revenue & Success Analysis**',
      'Elite, Custom-Tailored Business Strategies',
      'The ultimate toolkit for market domination',
    ],
    cta: 'Unleash Beast Mode',
    priceIds: {
      // Replace with your actual Stripe Price ID for the Beast monthly plan
      monthly: 'YOUR_BEAST_MONTHLY_PRICE_ID',
      // Replace with your actual Stripe Price ID for the Beast annual plan
      annual: 'YOUR_BEAST_ANNUAL_PRICE_ID',
    },
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
