'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  BrainCircuit,
  DollarSign,
  Gem,
  Swords,
  TrendingUp,
  Share2,
  Target,
  Home,
  Settings,
  HelpCircle,
  Badge,
  Newspaper,
  LayoutPanelLeft,
  ChevronDown,
  Copy,
  Users,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePlan } from '@/hooks/use-plan';
import { ALL_NAV_ITEMS } from '@/lib/constants';
import type { NavItem, PlanTier, View } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import WebsiteAnalysis from '@/components/views/website-analysis';
import RevenueMaximizer from '@/components/views/revenue-maximizer';
import AiCoach from '@/components/views/ai-coach';
import Predictions from '@/components/views/predictions';
import ViralPlatforms from '@/components/views/viral-platforms';
import Organizer from '@/components/views/organizer';
import UpgradePlan from '@/components/views/upgrade';
import PageHeader from '@/components/page-header';
import { motion, AnimatePresence } from 'framer-motion';
import BeastDashboard from '@/components/views/beast-dashboard';
import ProDashboard from '@/components/views/pro-dashboard';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
const REFERRAL_CODE = "PROFIT-1A2B3C";

const NAV_ICONS: { [key in View]: React.ElementType } = {
    overview: Home,
    'free-dashboard': Home,
    'pro-dashboard': Home,
    'beast-dashboard': Gem,
    'website-analysis': Swords,
    'revenue-maximizer': DollarSign,
    'ai-coach': BrainCircuit,
    predictions: TrendingUp,
    'viral-platforms': Share2,
    organizer: Target,
    upgrade: Gem,
};

const PLAN_DASHBOARDS: Record<PlanTier, View> = {
    free: 'free-dashboard',
    pro: 'pro-dashboard',
    beast: 'beast-dashboard',
};

const VIEW_COMPONENTS: Record<View, React.ElementType> = {
    'free-dashboard': ProDashboard,
    'pro-dashboard': ProDashboard,
    'beast-dashboard': BeastDashboard,
    'website-analysis': WebsiteAnalysis,
    'revenue-maximizer': RevenueMaximizer,
    'ai-coach': AiCoach,
    predictions: Predictions,
    'viral-platforms': ViralPlatforms,
    organizer: Organizer,
    upgrade: UpgradePlan,
    overview: ProDashboard,
};

export default function CoverPage() {
    const { currentPlan, setCurrentPlan, navItemsForPlan, canAccess } = usePlan();
    const [activeView, setActiveView] = React.useState<View>(PLAN_DASHBOARDS[currentPlan] || 'free-dashboard');
    const { toast } = useToast();

    React.useEffect(() => {
        const defaultView = PLAN_DASHBOARDS[currentPlan] || 'free-dashboard';
        if (!canAccess(activeView)) {
            setActiveView(defaultView);
        } else if(activeView !== defaultView && (activeView === 'free-dashboard' || activeView === 'pro-dashboard' || activeView === 'beast-dashboard')) {
            setActiveView(defaultView);
        }
    }, [currentPlan, canAccess, activeView]);


    const handleViewChange = (viewId: View) => {
        if (canAccess(viewId)) {
            setActiveView(viewId);
        } else {
            setActiveView('upgrade');
        }
    };
    
    const activeNavItem = ALL_NAV_ITEMS.find(item => item.id === activeView);

    const RenderComponent = VIEW_COMPONENTS[activeView] || ProDashboard;

    const getBadgeForPlan = (plan: PlanTier) => {
        switch(plan) {
            case 'pro': return <div className='px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary'>PRO</div>
            case 'beast': return <div className='px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground'>BEAST</div>
            default: return <div className='px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground'>FREE</div>
        }
    }
    
    const handleCopyReferral = () => {
        navigator.clipboard.writeText(REFERRAL_CODE);
        toast({
            title: "Referral Code Copied",
            description: "Share it with your friends to earn rewards!",
        })
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary rounded-lg">
                            <DollarSign className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="font-headline text-2xl font-bold text-primary">ProfitPro</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {navItemsForPlan.map(item => {
                            const Icon = NAV_ICONS[item.id] ?? LayoutPanelLeft;
                            return (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        onClick={() => handleViewChange(item.id)}
                                        isActive={activeView === item.id}
                                        tooltip={{children: item.title, side: 'right'}}
                                    >
                                        <Icon />
                                        <span>{item.title}</span>
                                        {item.isNew && <SidebarMenuBadge>New</SidebarMenuBadge>}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-2 border rounded-lg p-2 cursor-pointer hover:border-primary/50 transition-colors">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={userAvatar?.imageUrl} alt="User Avatar" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-semibold truncate">Richie Rich</p>
                                    <div className="flex items-center gap-1.5">
                                        {getBadgeForPlan(currentPlan)}
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 mb-2">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-sm">Referrals</h4>
                                    <p className="text-xs text-muted-foreground">Invite 3 friends, get 1 month of Pro free.</p>
                                    <div className="flex items-center justify-between text-xs">
                                        <span>1 / 3 referrals</span>
                                        <span>33%</span>
                                    </div>
                                    <Progress value={33} className="h-2"/>
                                </div>
                                <div className="flex items-center gap-2">
                                     <div className="flex-1 select-all text-sm font-mono bg-muted rounded-md px-2 py-1">{REFERRAL_CODE}</div>
                                     <Button variant="outline" size="sm" onClick={handleCopyReferral}>
                                         <Copy className="h-4 w-4 mr-2"/>
                                         Copy
                                     </Button>
                                </div>
                                <Separator />
                                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Button>
                                 <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Help & Support
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset className="max-h-screen overflow-y-auto">
                 <header className="flex items-center justify-between p-4 -m-px border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50 md:hidden">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary rounded-lg">
                            <DollarSign className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="font-headline text-2xl font-bold text-primary">ProfitPro</h1>
                    </div>
                    <SidebarTrigger />
                </header>

                <main className="p-4 md:p-8">
                    {activeNavItem && (
                         <PageHeader title={activeNavItem.title} description={activeNavItem.description}>
                            <SidebarTrigger className='hidden md:flex'/>
                         </PageHeader>
                    )}
                   <div className="mt-8">
                        <AnimatePresence mode="out-in">
                            <motion.div
                                key={activeView}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <RenderComponent 
                                    setActiveView={handleViewChange}
                                    currentPlan={currentPlan}
                                    setCurrentPlan={setCurrentPlan}
                                />
                            </motion.div>
                        </AnimatePresence>
                   </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
