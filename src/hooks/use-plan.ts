'use client';

import * as React from 'react';
import type { PlanTier } from '@/lib/types';
import { NAV_ITEMS, FREE_NAV_ITEMS, PRO_NAV_ITEMS, BEAST_NAV_ITEMS } from '@/lib/constants';

export function usePlan() {
  const [currentPlan, setCurrentPlan] = React.useState<PlanTier>('free');

  const navItemsForPlan = React.useMemo(() => {
    switch (currentPlan) {
      case 'pro':
        return PRO_NAV_ITEMS;
      case 'beast':
        return BEAST_NAV_ITEMS;
      case 'free':
      default:
        return FREE_NAV_ITEMS;
    }
  }, [currentPlan]);

  const canAccess = (featureId: string) => {
    return navItemsForPlan.some(item => item.id === featureId);
  }

  return { currentPlan, setCurrentPlan, navItemsForPlan, canAccess };
}
