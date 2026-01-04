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
  Check,
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
import { ALL_NAV_ITEMS, FREE_NAV_ITEMS, PRO_NAV_ITEMS, BEAST_NAV_ITEMS, pricingPlans } from '@/lib/constants';
import type { NavItem, PlanTier, View } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import WebsiteAnalysis from '@/components/views/website-analysis';
import RevenueMaximizer from '@/components/views/revenue-maximizer';
import AiCoach from '@/components/views/ai-coach';
import Predictions from '@/components/views/predictions';
import ViralPlatforms from '@/components/views/viral-platforms';
import Organizer from '@/components/views/organizer';
import Overview from '@/components/views/overview';
import UpgradePlan from '@/components/views/upgrade';
import PageHeader from '@/components/page-header';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import BeastDashboard from '@/components/views/beast-dashboard';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

const NAV_ICONS: { [key in View]: React.ElementType } = {
    overview: Home,
    'website-analysis': Swords,
    'revenue-maximizer': DollarSign,
    'ai-coach': BrainCircuit,
    predictions: TrendingUp,
    'viral-platforms': Share2,
    organizer: Target,
    upgrade: Gem,
    'beast-dashboard': Gem,
};

export default function CoverPage() {
    const { currentPlan, setCurrentPlan, navItemsForPlan, canAccess } = usePlan();
    const [activeView, setActiveView] = React.useState<View>('overview');

    React.useEffect(() => {
        if (currentPlan === 'beast') {
            setActiveView('beast-dashboard');
        } else if (activeView === 'beast-dashboard') {
            setActiveView('overview');
        }
    }, [currentPlan, activeView]);

    const handleViewChange = (viewId: View) => {
        if (canAccess(viewId)) {
            setActiveView(viewId);
        } else {
            setActiveView('upgrade');
        }
    };
    
    const activeNavItem = ALL_NAV_ITEMS.find(item => item.id === activeView);

    const renderView = () => {
        switch (activeView) {
            case 'overview': return <Overview setActiveView={handleViewChange} />;
            case 'website-analysis': return <WebsiteAnalysis currentPlan={currentPlan} setActiveView={handleViewChange} />;
            case 'revenue-maximizer': return <RevenueMaximizer currentPlan={currentPlan} />;
            case 'ai-coach': return <AiCoach currentPlan={currentPlan} setActiveView={handleViewChange} />;
            case 'predictions': return <Predictions currentPlan={currentPlan} setActiveView={handleViewChange} />;
            case 'viral-platforms': return <ViralPlatforms currentPlan={currentPlan} setActiveView={handleViewChange} />;
            case 'organizer': return <Organizer />;
            case 'upgrade': return <UpgradePlan currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />;
            case 'beast-dashboard':
                return currentPlan === 'beast' ? <BeastDashboard setActiveView={handleViewChange} /> : <UpgradePlan currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />;
            default: return <Overview setActiveView={handleViewChange} />;
        }
    };

    const getBadgeForPlan = (plan: PlanTier) => {
        switch(plan) {
            case 'pro': return <div className='px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary'>PRO</div>
            case 'beast': return <div className='px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground'>BEAST</div>
            default: return <div className='px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground'>FREE</div>
        }
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary rounded-lg">
                            <DollarSign className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="font-headline text-2xl font-bold text-primary">Fiilthy</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {navItemsForPlan.map(item => {
                            const Icon = NAV_ICONS[item.id] ?? LayoutPanelLeft;
                            const isLocked = !canAccess(item.id);
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
                     <div className="flex items-center gap-2 border rounded-lg p-2">
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
                            <Settings className="h-4 w-4" />
                        </Button>
                     </div>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset className="max-h-screen overflow-y-auto">
                 <header className="flex items-center justify-between p-4 -m-px border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50 md:hidden">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary rounded-lg">
                            <DollarSign className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="font-headline text-2xl font-bold text-primary">Fiilthy</h1>
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
                                {renderView()}
                            </motion.div>
                        </AnimatePresence>
                   </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
