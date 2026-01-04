'use client';

import { ArrowRight, DollarSign, Gem, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { View } from "@/lib/types";
import { Button } from "../ui/button";
import ReferralCard from "../referral-card";

interface FreeDashboardProps {
  setActiveView: (view: View) => void;
}

const quickStartLinks = [
  {
    title: 'Build Your First Revenue Plan',
    description: 'Turn your idea into a cash machine.',
    icon: DollarSign,
    view: 'revenue-maximizer',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Organize Your Ideas',
    description: 'Map out your world domination.',
    icon: Target,
    view: 'organizer',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
]

export default function FreeDashboard({ setActiveView }: FreeDashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="p-8 bg-card rounded-xl shadow-lg text-center border">
        <h2 className="font-headline text-3xl md:text-5xl font-bold">Welcome to ProfitPro AI</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-2">You're on the free plan. Get a taste of the power, then upgrade to unlock your full income potential.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Quick Start</CardTitle>
                    <CardDescription>You're minutes away from your first AI-generated strategy.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                     {quickStartLinks.map((link) => (
                      <Card key={link.view} className="hover:border-primary/50 transition-colors duration-300 group cursor-pointer" onClick={() => setActiveView(link.view as View)}>
                        <CardHeader className="p-4">
                           <div className={`p-3 rounded-lg ${link.bgColor} w-fit`}>
                            <link.icon className={`h-6 w-6 ${link.color}`} />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <h3 className="font-headline text-lg font-bold mb-1">{link.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{link.description}</p>
                          <div className="flex items-center text-primary font-bold text-xs transition-transform group-hover:translate-x-1">
                            <span>Start Now</span>
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20" onClick={() => setActiveView('upgrade')}>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                         <div className="bg-primary p-3 rounded-full border-2 border-primary-foreground/50 shadow-lg">
                            <Gem className="w-8 h-8 text-primary-foreground"/>
                         </div>
                        <div className='text-left'>
                            <h3 className="font-headline text-xl font-bold">You're Leaving Money On The Table.</h3>
                            <p className="text-muted-foreground">The free plan is just a warm-up. Unlock the Competitor Annihilator, AI Coach & more to multiply your results.</p>
                        </div>
                        <Button size="lg" className="ml-auto flex-shrink-0">Upgrade to Pro</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <ReferralCard />
      </div>
    </div>
  );
}
