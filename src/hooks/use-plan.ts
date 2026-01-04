'use client';

import * as React from 'react';
import type { PlanTier } from '@/lib/types';
import { ALL_NAV_ITEMS } from '@/lib/constants';

const NAV_ITEMS_BY_PLAN: Record<PlanTier, string[]> = {
  free: ['free-dashboard', 'revenue-maximizer', 'organizer', 'upgrade'],
  pro: ['pro-dashboard', 'website-analysis', 'revenue-maximizer', 'viral-platforms', 'organizer', 'upgrade'],
  beast: ['beast-dashboard', 'website-analysis', 'revenue-maximizer', 'ai-coach', 'predictions', 'viral-platforms', 'organizer', 'upgrade'],
};

export function usePlan() {
  const [currentPlan, setCurrentPlan] = React.useState<PlanTier>('free');

  const navItemsForPlan = React.useMemo(() => {
    const planNavIds = NAV_ITEMS_BY_PLAN[currentPlan];
    const dashboardId = `${currentPlan}-dashboard`;

    // Filter all nav items to get the ones for the current plan
    const items = ALL_NAV_ITEMS
      .filter(item => planNavIds.includes(item.id))
      .map(item => {
        // Unify the dashboard title
        if (item.id.endsWith('-dashboard')) {
          return { ...item, title: 'Dashboard' };
        }
        return item;
      });

    // Ensure the correct dashboard is the first item
    items.sort((a, b) => {
      if (a.id === dashboardId) return -1;
      if (b.id === dashboardId) return 1;
      // You can add other sorting logic here if needed
      return 0;
    });

    return items;
      
  }, [currentPlan]);

  const canAccess = React.useCallback((featureId: string) => {
    return NAV_ITEMS_BY_PLAN[currentPlan].includes(featureId);
  }, [currentPlan]);

  return { currentPlan, setCurrentPlan, navItemsForPlan, canAccess };
}
