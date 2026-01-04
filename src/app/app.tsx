
'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
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

const getIconForView = (viewId: View) => {
  switch (viewId) {
    case 'free-dashboard':
    case 'pro-dashboard':
    case 'beast-dashboard':
      return <BrainCircuit />;
    case 'upgrade':
      return <DollarSign />;
    default:
      return <BrainCircuit />;
  }
}

export default function App() {
  const { currentPlan, setCurrentPlan, navItemsForPlan } = usePlan();
  const [activeView, setActiveView] = React.useState<View>(`${currentPlan}-dashboard`);

  // Effect to sync dashboard view with plan changes
  React.useEffect(() => {
    setActiveView(`${currentPlan}-dashboard`);
  }, [currentPlan]);

  const renderActiveView = () => {
    switch (activeView) {
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
        return <FreeDashboard setActiveView={setActiveView} currentPlan={currentPlan} />;
    }
  };

  const activeNavItem = navItemsForPlan.find(item => item.id === activeView);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-10 w-full justify-start px-2 font-bold text-base">
                <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
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
                  {getIconForView(item.id)}
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
          {activeNavItem && <PageHeader title={activeNavItem.title} description={activeNavItem.description} />}
          <main className="py-8">
            {renderActiveView()}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
