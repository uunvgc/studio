'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  BrainCircuit,
  CheckSquare,
  DollarSign,
  Gem,
  LayoutDashboard,
  Menu,
  Share2,
  Swords,
  TrendingUp,
  User,
} from 'lucide-react';
import type { PlanTier, View } from '@/lib/types';
import { pricingPlans } from '@/lib/constants';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// View Components
import Overview from '@/components/views/overview';
import WebsiteAnalysis from '@/components/views/website-analysis';
import RevenueMaximizer from '@/components/views/revenue-maximizer';
import AiCoach from '@/components/views/ai-coach';
import Predictions from '@/components/views/predictions';
import ViralPlatforms from '@/components/views/viral-platforms';
import Organizer from '@/components/views/organizer';
import UpgradePlan from '@/components/views/upgrade';
import PageHeader from '@/components/page-header';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { usePlan } from '@/hooks/use-plan';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

export default function Dashboard() {
  const [activeView, setActiveView] = React.useState<View>('overview');
  const { currentPlan, setCurrentPlan, navItemsForPlan } = usePlan();

  React.useEffect(() => {
    // If the active view is no longer available in the new plan, switch to overview
    if (!navItemsForPlan.some(item => item.id === activeView)) {
      setActiveView('overview');
    }
  }, [navItemsForPlan, activeView]);

  const activeNavItem = navItemsForPlan.find(item => item.id === activeView);

  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return <Overview setActiveView={setActiveView} />;
      case 'website-analysis':
        return <WebsiteAnalysis />;
      case 'revenue-maximizer':
        return <RevenueMaximizer currentPlan={currentPlan} />;
      case 'ai-coach':
        return <AiCoach currentPlan={currentPlan} setActiveView={setActiveView} />;
      case 'predictions':
        return <Predictions currentPlan={currentPlan} setActiveView={setActiveView} />;
      case 'viral-platforms':
        return <ViralPlatforms />;
      case 'organizer':
        return <Organizer />;
      case 'upgrade':
        return <UpgradePlan currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />;
      default:
        return <Overview setActiveView={setActiveView} />;
    }
  };

  const IconMap: { [key: string]: React.ElementType } = {
    overview: LayoutDashboard,
    'website-analysis': Swords,
    'revenue-maximizer': DollarSign,
    'ai-coach': BrainCircuit,
    predictions: TrendingUp,
    'viral-platforms': Share2,
    organizer: CheckSquare,
    upgrade: Gem,
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
            <DollarSign className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-primary">Fiilthy</h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItemsForPlan.map(item => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveView(item.id)}
                  isActive={activeView === item.id}
                  tooltip={{ children: item.title, className: 'font-headline' }}
                >
                  {React.createElement(IconMap[item.id])}
                  <span className="font-headline">{item.title}</span>
                  {item.isNew && <Badge variant="secondary">New</Badge>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Separator className="mb-4" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                {userAvatar && <Image src={userAvatar.imageUrl} alt="User avatar" width={32} height={32} className="rounded-full" data-ai-hint={userAvatar.imageHint} />}
                <div className='flex flex-col items-start'>
                  <span className="font-headline text-sm font-semibold">Guest User</span>
                  <Badge variant="outline" className="capitalize text-xs">
                    {currentPlan} Plan
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Fiilthy</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    guest@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveView('upgrade')}>
                <Gem className="mr-2 h-4 w-4" />
                <span>Upgrade Plan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <PageHeader title={activeNavItem?.title || 'Dashboard'} description={activeNavItem?.description || ''}>
          {currentPlan !== 'beast' && (
            <Button variant="outline" size="sm" onClick={() => setActiveView('upgrade')} className='ml-auto'>
              <Gem className="mr-2 h-4 w-4" />
              Upgrade to {pricingPlans.find(p => p.id === (currentPlan === 'free' ? 'pro' : 'beast'))?.name}
            </Button>
          )}
        </PageHeader>
        <main className="flex-1 p-6">{renderView()}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
