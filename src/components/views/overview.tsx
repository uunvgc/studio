'use client';

import { ArrowRight, BrainCircuit, DollarSign, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { View } from "@/lib/types";

interface OverviewProps {
  setActiveView: (view: View) => void;
}

const quickLinks = [
  {
    title: 'Analyze a Website',
    description: 'Find hidden revenue on your site.',
    icon: Globe,
    view: 'website-analysis',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Create a Revenue Plan',
    description: 'Turn your idea into profit.',
    icon: DollarSign,
    view: 'revenue-maximizer',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Talk to the AI Coach',
    description: 'Get expert advice now.',
    icon: BrainCircuit,
    view: 'ai-coach',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

export default function Overview({ setActiveView }: OverviewProps) {
  return (
    <div className="space-y-8">
      <div className="p-8 bg-card rounded-lg shadow-sm text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">Welcome to ProfitPro AI</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Your AI-powered partner for profit maximization. Let&apos;s turn your ideas into income.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Card key={link.view} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveView(link.view as View)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-headline font-medium">{link.title}</CardTitle>
              <div className={`p-2 rounded-md ${link.bgColor}`}>
                <link.icon className={`h-6 w-6 ${link.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{link.description}</p>
              <div className="flex items-center text-primary font-medium text-sm mt-4">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
