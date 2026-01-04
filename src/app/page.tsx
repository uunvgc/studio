
'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  BrainCircuit,
  Check,
  CheckSquare,
  DollarSign,
  Gem,
  Swords,
  TrendingUp,
  Share2,
  Target,
  ArrowRight,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { pricingPlans } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

const featureSections = [
    {
        icon: Swords,
        title: 'Annihilate Your Competitors',
        description: 'Our AI acts as your corporate spy, analyzing competitor websites to expose their revenue streams and pinpoint exploitable weaknesses. Turn their strategy into your battle plan.',
        image: 'https://picsum.photos/seed/compete/1200/800',
        imageHint: 'chess game',
    },
    {
        icon: Share2,
        title: 'Engineer Viral Growth',
        description: 'Stop guessing where your customers are. Our AI generates ruthless, platform-specific strategies to find and dominate your target audience, ensuring your idea spreads like wildfire.',
        image: 'https://picsum.photos/seed/viral/1200/800',
        imageHint: 'social media',
    },
    {
        icon: BrainCircuit,
        title: 'Consult Your AI CEO',
        description: 'Get genius-level advice on demand. Our AI coach provides personalized, profit-focused guidance to navigate risks and identify your most effective actions.',
        image: 'https://picsum.photos/seed/coach/1200/800',
        imageHint: 'business meeting',
    },
    {
        icon: TrendingUp,
        title: 'Predict Your Success',
        description: 'Eliminate uncertainty. Our AI analyzes your idea, execution plan, and market data to deliver a concrete revenue projection and a calculated probability of success.',
        image: 'https://picsum.photos/seed/predict/1200/800',
        imageHint: 'stock chart',
    },
];


export default function CoverPage() {
    const [currentPlan, setCurrentPlan] = React.useState<'free' | 'pro' | 'beast'>('free');

    return (
        <div className="dark bg-background text-foreground min-h-screen">
            <header className="p-4 flex justify-between items-center border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                    <h1 className="font-headline text-2xl font-bold text-primary">Fiilthy</h1>
                </div>
                <Button variant="outline">
                    <Gem className="mr-2" />
                    Sign In
                </Button>
            </header>

            <main className="font-body antialiased">
                {/* Hero Section */}
                <section className="py-20 md:py-32 text-center px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 80%, transparent)' }}></div>
                    <div className="relative max-w-4xl mx-auto">
                        <Badge variant="outline" className="mb-4 text-primary border-primary/50">Your Unfair Advantage</Badge>
                        <h2 className="font-headline text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                            Stop Guessing. Start Dominating.
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Fiilthy is your AI-powered co-founder, relentlessly focused on one thing: making you rich. We provide the strategies, analysis, and cold, hard data you need to crush your market.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                <Zap className="mr-2" /> Get Started for Free
                            </Button>
                            <Button size="lg" variant="ghost">
                                Learn More <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 md:py-24 bg-card/20">
                    <div className="container mx-auto px-4 space-y-24">
                        {featureSections.map((feature, index) => (
                            <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                                <div className={cn("space-y-4", index % 2 !== 0 && "md:order-2")}>
                                    <div className="inline-flex items-center gap-3">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <feature.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="font-headline text-3xl font-bold">{feature.title}</h3>
                                    </div>
                                    <p className="text-lg text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                                <div className={cn(index % 2 !== 0 && "md:order-1")}>
                                    <Card className="overflow-hidden shadow-2xl">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            width={1200}
                                            height={800}
                                            data-ai-hint={feature.imageHint}
                                            className="w-full h-auto"
                                        />
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                         <div className="text-center max-w-3xl mx-auto">
                            <h2 className="font-headline text-3xl md:text-5xl font-bold">Choose Your Weapon</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
                                This is a simple choice. More power means more profit. Don't overthink it.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
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
                                {plan.id === 'pro' && ! (plan.id === 'beast') && (
                                    <div className="flex justify-center mb-4">
                                    <div className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
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
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                        <span>{feature}</span>
                                    </li>
                                    ))}
                                </ul>
                                </CardContent>
                                <CardContent className="p-8">
                                <Button 
                                    className="w-full" 
                                    size="lg"
                                    variant={plan.id === 'beast' ? 'default' : 'outline'}
                                    disabled={currentPlan === plan.id}
                                    onClick={() => setCurrentPlan(plan.id)}
                                >
                                    {currentPlan === plan.id ? 'Your Current Plan' : plan.cta}
                                </Button>
                                </CardContent>
                            </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 border-t">
                    <div className="container mx-auto px-4 text-center text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} Fiilthy. All rights reserved. Let's get rich.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

    