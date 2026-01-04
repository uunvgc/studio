'use client';

import { pricingPlans } from '@/lib/constants';
import type { PlanTier } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Gem } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradePlanProps {
  currentPlan: PlanTier;
  setCurrentPlan: (plan: PlanTier) => void;
}

export default function UpgradePlan({ currentPlan, setCurrentPlan }: UpgradePlanProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Choose Your Weapon</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">Unlock more power and accelerate your path to profit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
                "flex flex-col",
                plan.id === 'beast' && "border-primary ring-2 ring-primary shadow-lg",
                plan.id === currentPlan && "border-accent ring-2 ring-accent"
            )}
          >
            <CardHeader className="text-center">
              {plan.id === 'beast' && (
                <div className="flex justify-center mb-2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Gem className="h-4 w-4" /> Most Powerful
                  </div>
                </div>
              )}
              <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold font-headline">{plan.price}</span>
                <span className="text-muted-foreground">{plan.priceDetail}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg"
                variant={plan.id === 'beast' ? 'default' : 'outline'}
                disabled={currentPlan === plan.id}
                onClick={() => setCurrentPlan(plan.id)}
              >
                {currentPlan === plan.id ? 'Current Plan' : plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
