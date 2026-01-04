'use client';

import { useState } from 'react';
import { pricingPlans } from '@/lib/constants';
import type { PlanTier } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Gem, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { createCheckoutSession } from '@/app/actions/stripe';
import { useToast } from '@/hooks/use-toast';

interface UpgradePlanProps {
  currentPlan: PlanTier;
  setCurrentPlan: (plan: PlanTier) => void;
}

export default function UpgradePlan({ currentPlan, setCurrentPlan }: UpgradePlanProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isLoading, setIsLoading] = useState<string | null>(null); // Store the plan id being loaded
  const { toast } = useToast();

  const handleUpgradeClick = async (planId: PlanTier, billingCycle: 'monthly' | 'annual') => {
    if (planId === 'free') return;

    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) return;

    const priceId = plan.priceIds[billingCycle];
    
    setIsLoading(planId);
    
    try {
      const { url } = await createCheckoutSession(priceId);
      if (url) {
        window.location.href = url;
      }
      // The user will be redirected to Stripe by the server action.
      // No need to set current plan here, that would happen after a successful payment webhook.
    } catch (error) {
      console.error("Stripe checkout failed:", error);
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description: "We couldn't connect to Stripe. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(null);
    }
  }


  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="text-center">
        <h2 className="font-headline text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">The ROI is Inevitable</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">This is not an expense, it's an investment in your income. Choose the plan that matches your ambition.</p>
      </div>
      
      <div className="flex justify-center items-center gap-4">
        <Label htmlFor="billing-cycle" className="font-medium">Monthly</Label>
        <Switch id="billing-cycle" checked={isAnnual} onCheckedChange={setIsAnnual} />
        <Label htmlFor="billing-cycle" className="font-medium">Annual</Label>
        <div className="text-sm bg-accent/20 text-accent-foreground border border-accent/30 rounded-full px-3 py-1 font-bold">Save 15%</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
                "flex flex-col border-2 transition-all duration-300",
                plan.isMostPopular && "border-primary shadow-2xl shadow-primary/10 -translate-y-4",
                plan.id === currentPlan && "ring-2 ring-offset-2 ring-primary",
                plan.id !== currentPlan && "hover:border-primary/50 hover:shadow-lg"
            )}
          >
            <CardHeader className="text-center p-8">
              {plan.isMostPopular && (
                <div className="flex justify-center mb-4">
                  <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                    <Gem className="h-4 w-4" /> BEST VALUE
                  </div>
                </div>
              )}
               {plan.id === 'beast' && !plan.isMostPopular && (
                <div className="flex justify-center mb-4">
                  <div className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                    <Zap className="h-4 w-4" /> MAX POWER
                  </div>
                </div>
              )}
              <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
              <div className="h-20">
                {plan.id !== 'free' ? (
                  <>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold font-headline tracking-tighter">${isAnnual ? plan.annualPrice : plan.price}</span>
                      <span className="text-muted-foreground">{isAnnual ? '/ year' : '/ month'}</span>
                    </div>
                    { isAnnual && plan.id !== 'free' && <p className="text-sm text-muted-foreground">Billed Annually. Equivalent to ${plan.price}/month.</p> }
                  </>
                ) : (
                  <span className="text-5xl font-bold font-headline tracking-tighter">$0</span>
                )}
              </div>
              <CardDescription>{plan.id === 'free' ? "A taste of the power. For beginners." : plan.id === 'pro' ? "For serious builders ready to scale." : "For market dominators who refuse to lose."}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow px-8">
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8 mt-4">
              <Button 
                className="w-full" 
                size="lg"
                variant={plan.isMostPopular || plan.id === 'beast' ? 'default' : 'outline'}
                disabled={currentPlan === plan.id || isLoading === plan.id}
                onClick={() => handleUpgradeClick(plan.id, isAnnual ? 'annual' : 'monthly')}
              >
                {isLoading === plan.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentPlan === plan.id ? 'Your Current Plan' : plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
