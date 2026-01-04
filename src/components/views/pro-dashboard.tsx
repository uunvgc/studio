'use client';

import { ArrowRight, BrainCircuit, DollarSign, Gem, Swords, Target, TrendingUp, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { View } from "@/lib/types";
import { Button } from "../ui/button";

interface ProDashboardProps {
  setActiveView: (view: View) => void;
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

export default function ProDashboard({ setActiveView }: ProDashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="p-8 bg-card rounded-xl shadow-lg text-center border">
        <h2 className="font-headline text-3xl md:text-5xl font-bold">Pro Dashboard</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-2">You have the power to outmaneuver the competition. Use these tools to build your empire.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {proLinks.map((link) => (
          <Card key={link.view} className="hover:border-primary/50 transition-colors duration-300 group cursor-pointer" onClick={() => setActiveView(link.view as View)}>
            <CardHeader>
               <div className={`p-3 rounded-lg ${link.bgColor} w-fit`}>
                <link.icon className={`h-7 w-7 ${link.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-headline text-xl font-bold mb-1">{link.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
              <div className="flex items-center text-primary font-bold text-sm transition-transform group-hover:translate-x-1">
                <span>Engage</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
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
  );
}
