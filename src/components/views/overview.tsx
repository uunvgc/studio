'use client';

import { ArrowRight, BrainCircuit, DollarSign, Globe, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { View } from "@/lib/types";

interface OverviewProps {
  setActiveView: (view: View) => void;
}

const quickLinks = [
  {
    title: 'Analyze Your Website',
    description: 'Instantly find hidden profits on your site.',
    icon: Globe,
    view: 'website-analysis',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Build Your Revenue Plan',
    description: 'Turn your idea into a cash machine.',
    icon: DollarSign,
    view: 'revenue-maximizer',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Unleash the AI Coach',
    description: 'Get genius-level advice on demand.',
    icon: BrainCircuit,
    view: 'ai-coach',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
]

export default function Overview({ setActiveView }: OverviewProps) {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="p-8 bg-card rounded-xl shadow-lg text-center border-2 border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5" style={{ maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'}}></div>
        <div className="relative">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3">Stop Guessing. Start Profiting.</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">This is your command center for financial domination. Use these tools to crush your goals.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((link) => (
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
                <span>Start Now</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
       <Card className="text-center" onClick={() => setActiveView('organizer')}>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                     <div className="bg-accent/10 p-3 rounded-full border border-accent/20">
                        <Target className="w-8 h-8 text-accent"/>
                     </div>
                    <div className='text-left'>
                        <h3 className="font-headline text-xl font-bold">Ready to Execute?</h3>
                        <p className="text-muted-foreground">Map out your world domination. Go to your Task Organizer.</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground ml-auto hidden md:block" />
                </div>
            </CardContent>
        </Card>

    </div>
  );
}
