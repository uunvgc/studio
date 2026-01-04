'use client';

import * as React from 'react';
import type { PlanTier, View } from '@/lib/types';
import { ALL_NAV_ITEMS } from '@/lib/constants';

const NAV_ITEMS_BY_PLAN: Record<PlanTier, View[]> = {
  free: ['free-dashboard', 'revenue-maximizer', 'organizer', 'upgrade'],
  pro: ['pro-dashboard', 'website-analysis', 'revenue-maximizer', 'viral-platforms', 'organizer', 'upgrade'],
  beast: ['beast-dashboard', 'website-analysis', 'revenue-maximizer', 'ai-coach', 'predictions', 'viral-platforms', 'organizer', 'upgrade'],
};

export function usePlan() {
  const [currentPlan, setCurrentPlan] = React.useState<PlanTier>('free');

  const activeDashboard = `${currentPlan}-dashboard` as View;

  const navItemsForPlan = React.useMemo(() => {
    const planNavIds = NAV_ITEMS_BY_PLAN[currentPlan];

    // Filter all nav items to get the ones for the current plan
    const items = ALL_NAV_ITEMS
      .filter(item => planNavIds.includes(item.id))
      .map(item => {
        // Unify the dashboard title and icon for all plans
        if (item.id.endsWith('-dashboard')) {
          const dashboardItem = ALL_NAV_ITEMS.find(i => i.id === 'free-dashboard');
          return { ...item, title: 'Dashboard', icon: dashboardItem?.icon };
        }
        return item;
      });

    // Ensure the correct dashboard is the first item
    items.sort((a, b) => {
      if (a.id === activeDashboard) return -1;
      if (b.id === activeDashboard) return 1;
      return 0; // maintain original order for other items
    });
    
    return items;
      
  }, [currentPlan, activeDashboard]);

  const canAccess = React.useCallback((featureId: string) => {
    return NAV_ITEMS_BY_PLAN[currentPlan].includes(featureId as View);
  }, [currentPlan]);

  return { currentPlan, setCurrentPlan, navItemsForPlan, canAccess, activeDashboard };
}
