'use client';

import * as React from 'react';
import type { PlanTier, View, UserData } from '@/lib/types';
import { ALL_NAV_ITEMS } from '@/lib/constants';
import { getUserData, updateUserData } from '@/lib/user-service';

const NAV_ITEMS_BY_PLAN: Record<PlanTier, View[]> = {
  free: ['free-dashboard', 'revenue-maximizer', 'organizer', 'upgrade'],
  pro: ['pro-dashboard', 'website-analysis', 'revenue-maximizer', 'viral-platforms', 'organizer', 'upgrade'],
  beast: ['beast-dashboard', 'website-analysis', 'revenue-maximizer', 'ai-coach', 'predictions', 'viral-platforms', 'organizer', 'upgrade'],
};

// A placeholder user ID. In a real app, you would get this from your auth session.
const FAKE_USER_ID = "user_placeholder_id";

export function usePlan() {
  const [userData, setUserData] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    async function loadUserData() {
      const data = await getUserData(FAKE_USER_ID);
      setUserData(data);
    }
    loadUserData();
  }, []);

  const currentPlan = userData?.plan ?? 'free';
  const activeDashboard = `${currentPlan}-dashboard` as View;
  
  const setCurrentPlan = React.useCallback(async (plan: PlanTier) => {
    // Optimistically update the UI
    setUserData(prevData => prevData ? { ...prevData, plan } : { plan, messagesUsedToday: 0, lastUsedDate: '' });
    // "Persist" the change
    await updateUserData(FAKE_USER_ID, { plan });
  }, []);

  const navItemsForPlan = React.useMemo(() => {
    const planNavIds = NAV_ITEMS_BY_PLAN[currentPlan];
    const items = ALL_NAV_ITEMS
      .filter(item => planNavIds.includes(item.id))
      .map(item => {
        if (item.id.endsWith('-dashboard')) {
          const dashboardItem = ALL_NAV_ITEMS.find(i => i.id === 'free-dashboard');
          return { ...item, title: 'Dashboard', icon: dashboardItem?.icon };
        }
        return item;
      });

    items.sort((a, b) => {
      if (a.id === activeDashboard) return -1;
      if (b.id === activeDashboard) return 1;
      return 0;
    });
    
    return items;
      
  }, [currentPlan, activeDashboard]);

  const canAccess = React.useCallback((featureId: string) => {
    return NAV_ITEMS_BY_PLAN[currentPlan].includes(featureId as View);
  }, [currentPlan]);

  return { currentPlan, setCurrentPlan, navItemsForPlan, canAccess, activeDashboard, userData, setUserData };
}
