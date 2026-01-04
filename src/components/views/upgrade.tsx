'use client';

import { pricingPlans } from '@/lib/constants';
import type { PlanTier } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Gem, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradePlanProps {
  currentPlan: PlanTier;
  setCurrentPlan: (plan: PlanTier) => void;
}

export default function UpgradePlan({ currentPlan, setCurrentPlan }: UpgradePlanProps) {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="text-center">
        <h2 className="font-headline text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">Choose Your Weapon</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">This is a simple choice. More power means more profit. Don't overthink it.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
                "flex flex-col border-2 transition-transform duration-300 hover:scale-105 hover:border-primary",
                plan.id === 'beast' ? "border-accent/50 shadow-2xl shadow-accent/10" : "border-border/50",
                plan.id === currentPlan && "border-primary ring-2 ring-primary scale-105"
            )}
          >
            <CardHeader className="text-center p-8">
              {plan.id === 'beast' && (
                <div className="flex justify-center mb-4">
                  <div className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                    <Zap className="h-4 w-4" /> MOST POWERFUL
                  </div>
                </div>
              )}
               {plan.id === 'pro' && (
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/20 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                    <Gem className="h-4 w-4" /> BEST VALUE
                  </div>
                </div>
              )}
              <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold font-headline tracking-tighter">{plan.price}</span>
                <span className="text-muted-foreground">{plan.priceDetail}</span>
              </div>
              <CardDescription>{plan.id === 'free' ? "Get a taste of the power." : plan.id === 'pro' ? "For serious builders." : "For market dominators."}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow px-8">
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-base">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8">
              <Button 
                className="w-full" 
                size="lg"
                variant={plan.id === 'beast' ? 'default' : 'outline'}
                disabled={currentPlan === plan.id}
                onClick={() => setCurrentPlan(plan.id)}
              >
                {currentPlan === plan.id ? 'Your Current Plan' : plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
