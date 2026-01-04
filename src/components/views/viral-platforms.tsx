'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateViralStrategy } from '@/ai/flows/generate-viral-strategy';
import { ViralStrategyInputSchema, type ViralStrategyOutput } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Users, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { z } from 'zod';
import type { PlanTier, View } from '@/lib/types';
import UpgradePrompt from '@/components/upgrade-prompt';
import { ScrollArea } from '../ui/scroll-area';

interface ViralPlatformsProps {
  currentPlan: PlanTier;
  setActiveView: (view: View) => void;
}

export default function ViralPlatforms({ currentPlan, setActiveView }: ViralPlatformsProps) {
    const [strategyOutput, setStrategyOutput] = useState<ViralStrategyOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof ViralStrategyInputSchema>>({
        resolver: zodResolver(ViralStrategyInputSchema),
        defaultValues: {
            businessIdea: '',
        },
    });

    if (currentPlan === 'free') {
        return <UpgradePrompt featureName="Viral Platform Strategy" requiredPlan="Pro" setActiveView={setActiveView} />;
    }

    async function onSubmit(values: z.infer<typeof ViralStrategyInputSchema>) {
        setIsLoading(true);
        setStrategyOutput(null);
        try {
            const result = await generateViralStrategy(values);
            setStrategyOutput(result);
        } catch (error) {
            console.error("Viral strategy generation failed:", error);
            toast({
                variant: "destructive",
                title: "Strategy Generation Failed",
                description: "There was an error creating your viral strategy. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const getPotentialBadgeColor = (potential: string) => {
        switch (potential?.toLowerCase()) {
            case 'high': return 'bg-green-500/20 text-green-700 border-green-500/30';
            case 'medium-high': return 'bg-lime-500/20 text-lime-700 border-lime-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
            case 'emerging': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
            case 'untapped': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
            default: return 'bg-secondary';
        }
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            );
        }

        if (strategyOutput && strategyOutput.strategies && strategyOutput.strategies.length > 0) {
            return (
                <Accordion type="single" collapsible defaultValue={strategyOutput.strategies[0]?.platform} className="w-full space-y-2">
                    {strategyOutput.strategies.map((platformStrategy) => (
                        <AccordionItem value={platformStrategy.platform} key={platformStrategy.platform} className="border-b-0">
                            <Card className="flex flex-col text-sm">
                                <AccordionTrigger className="p-3 text-left hover:no-underline group">
                                    <div className="flex justify-between items-center w-full">
                                        <div className='font-bold'>{platformStrategy.platform}</div>
                                        <Badge variant="outline" className={`font-bold ml-4 ${getPotentialBadgeColor(platformStrategy.potential)}`}>
                                            {platformStrategy.potential}
                                        </Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-3 pb-3">
                                    <p className="text-muted-foreground mb-2">{platformStrategy.rationale}</p>
                                    <p className="whitespace-pre-wrap text-xs mb-2">{platformStrategy.strategy}</p>
                                    <div className="flex items-center text-xs text-foreground">
                                        <Users className="h-3 w-3 mr-1.5 text-muted-foreground" />
                                        <span>{platformStrategy.userBase} Users</span>
                                    </div>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            );
        }
        
        return (
            <div className="text-center py-4 text-muted-foreground border-2 border-dashed rounded-lg h-full flex flex-col justify-center">
                <Sparkles className="mx-auto h-8 w-8" />
                <p className="mt-2 text-sm font-bold">Your custom viral strategy awaits.</p>
            </div>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline">AI Viral Strategy</CardTitle>
                <CardDescription>Tell our AI your business idea to get a ruthless plan.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="businessIdea"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Business Idea</FormLabel>
                            <FormControl>
                            <Textarea placeholder="e.g., A subscription box service for rare indoor plants..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate Viral Plan
                    </Button>
                    </form>
                </Form>
                <div className="mt-4 flex-grow overflow-hidden">
                    <ScrollArea className="h-full pr-4 -mr-4">
                        {renderContent()}
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}
