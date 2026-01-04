'use client';

import { ArrowRight, BrainCircuit, DollarSign, Gem, Swords, Target, TrendingUp, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { View, PlanTier } from "@/lib/types";
import { Button } from "../ui/button";
import ReferralCard from "../referral-card";
import FreeDashboard from "./free-dashboard";

interface ProDashboardProps {
  setActiveView: (view: View) => void;
  currentPlan: PlanTier;
}

const proLinks = [
  {
    title: 'Annihilate Competitor',
    description: 'Expose their weaknesses. Steal their traffic and revenue.',
    icon: Swords,
    view: 'website-analysis',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  {
    title: 'Find Viral Platforms',
    description: 'Get a ruthless, data-driven plan to go viral.',
    icon: Share2,
    view: 'viral-platforms',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
   {
    title: 'Advanced Revenue Plan',
    description: 'Build a multi-stage funnel for your business.',
    icon: DollarSign,
    view: 'revenue-maximizer',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Organize Your Ideas',
    description: 'Map out your empire, from concept to execution.',
    icon: Target,
    view: 'organizer',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
]

export default function ProDashboard({ setActiveView, currentPlan }: ProDashboardProps) {
  if (currentPlan === 'free') {
    return <FreeDashboard setActiveView={setActiveView} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in-50">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Pro Command Center</CardTitle>
                    <CardDescription>You have the power to outmaneuver the competition. Use these tools to build your empire.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                     {proLinks.map((link) => (
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
                            <span>Engage</span>
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-r from-purple-500/10 to-accent/10 border-purple-500/20" onClick={() => setActiveView('upgrade')}>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                         <div className="bg-purple-500 p-3 rounded-full border-2 border-purple-400/50 shadow-lg">
                            <BrainCircuit className="w-8 h-8 text-white"/>
                         </div>
                        <div className='text-left'>
                            <h3 className="font-headline text-xl font-bold">You're Ready For The Next Level.</h3>
                            <p className="text-muted-foreground">Unlock the conversational AI CEO and predictive analytics to achieve market domination.</p>
                        </div>
                        <Button variant="outline" size="lg" className="ml-auto bg-background flex-shrink-0">Unleash Beast Mode</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <ReferralCard />
      </div>
    </div>
  );
}
