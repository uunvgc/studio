'use client';

import * as React from 'react';
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
import { Button } from '@/components/ui/button';
import { LogOut, DollarSign, BrainCircuit } from 'lucide-react';
import type { View, PlanTier } from '@/lib/types';
import { usePlan } from '@/hooks/use-plan';

// Import all your view components
import FreeDashboard from '@/components/views/free-dashboard';
import BeastDashboard from '@/components/views/beast-dashboard';
import WebsiteAnalysis from '@/components/views/website-analysis';
import RevenueMaximizer from '@/components/views/revenue-maximizer';
import AiCoach from '@/components/views/ai-coach';
import Predictions from '@/components/views/predictions';
import ViralPlatforms from '@/components/views/viral-platforms';
import Organizer from '@/components/views/organizer';
import UpgradePlan from '@/components/views/upgrade';
import PageHeader from '@/components/page-header';
import { ALL_NAV_ITEMS } from '@/lib/constants';


export default function App() {
  const { currentPlan, setCurrentPlan, navItemsForPlan, activeDashboard } = usePlan();
  const [activeView, setActiveView] = React.useState<View>(activeDashboard);

  // Effect to sync dashboard view with plan changes
  React.useEffect(() => {
    setActiveView(activeDashboard);
  }, [currentPlan, activeDashboard]);
  
  const activeNavItem = navItemsForPlan.find(item => item.id === activeView);
  const pageTitle = activeNavItem?.title ?? 'Dashboard';
  const pageDescription = activeNavItem?.description ?? '';

  const renderActiveView = () => {
    // If there's no active nav item, default to the dashboard to be safe
    const viewToRender = activeNavItem ? activeView : activeDashboard;

    switch (viewToRender) {
      case 'free-dashboard':
      case 'pro-dashboard':
        return <FreeDashboard setActiveView={setActiveView} currentPlan={currentPlan} />;
      case 'beast-dashboard':
        return <BeastDashboard setActiveView={setActiveView} />;
      case 'website-analysis':
        return <WebsiteAnalysis currentPlan={currentPlan} setActiveView={setActiveView} />;
      case 'revenue-maximizer':
        return <RevenueMaximizer currentPlan={currentPlan} />;
      case 'ai-coach':
        return <AiCoach currentPlan={currentPlan} setActiveView={setActiveView} />;
      case 'predictions':
        return <Predictions currentPlan={currentPlan} setActiveView={setActiveView} />;
      case 'viral-platforms':
        return <ViralPlatforms currentPlan={currentPlan} setActiveView={setActiveView} />;
      case 'organizer':
        return <Organizer />;
      case 'upgrade':
        return <UpgradePlan currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />;
      default:
        // Default to the dashboard for the current plan
        return <FreeDashboard setActiveView={setActiveView} currentPlan={currentPlan} />;
    }
  };


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-10 w-full justify-start px-2 font-bold text-base">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                ProfitPro AI
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent className='p-2'>
          <SidebarMenu>
            {navItemsForPlan.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveView(item.id)}
                  isActive={activeView === item.id}
                  tooltip={{
                    children: item.title,
                    className: 'bg-sidebar-accent text-sidebar-accent-foreground'
                  }}
                >
                  {item.icon ? <item.icon /> : <BrainCircuit />}
                  <span className='w-full'>{item.title}</span>
                  {item.isNew && (
                    <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">New</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost">
            <LogOut />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">
          <PageHeader title={pageTitle} description={pageDescription} />
          <main className="py-8">
            {renderActiveView()}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
