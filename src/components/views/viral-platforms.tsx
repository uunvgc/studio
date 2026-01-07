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
import { Loader2, Users, Sparkles, Copy, ClipboardCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { z } from 'zod';
import type { PlanTier, View } from '@/lib/types';
import UpgradePrompt from '@/components/upgrade-prompt';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface ViralPlatformsProps {
  currentPlan: PlanTier;
  setActiveView: (view: View) => void;
}

export default function ViralPlatforms({ currentPlan, setActiveView }: ViralPlatformsProps) {
    const [strategyOutput, setStrategyOutput] = useState<ViralStrategyOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
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

    const handleCopy = (textToCopy: string, type: 'content' | 'hashtags', platform: string) => {
        navigator.clipboard.writeText(textToCopy);
        const key = `${platform}-${type}`;
        setCopiedStates(prev => ({...prev, [key]: true}));
        toast({
            title: "Copied to Clipboard",
            description: `Your ${type === 'content' ? 'post content' : 'hashtags'} for ${platform} are ready.`,
        });
        setTimeout(() => setCopiedStates(prev => ({...prev, [key]: false})), 2000);
    }

    const getPotentialBadgeColor = (potential: string) => {
        switch (potential?.toLowerCase()) {
            case 'high': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'medium-high': return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'emerging': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'untapped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            default: return 'bg-secondary';
        }
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className='bg-card/50'>
                          <CardHeader className='p-4'>
                             <Skeleton className="h-6 w-full" />
                          </CardHeader>
                        </Card>
                    ))}
                </div>
            );
        }

        if (strategyOutput && strategyOutput.strategies && strategyOutput.strategies.length > 0) {
            return (
                <Accordion type="single" collapsible defaultValue={strategyOutput.strategies[0]?.platform} className="w-full space-y-3">
                    {strategyOutput.strategies.map((platformStrategy) => (
                        <AccordionItem value={platformStrategy.platform} key={platformStrategy.platform} className="border-b-0">
                            <Card className="flex flex-col text-sm bg-card/80 border-border transition-all">
                                <AccordionTrigger className="p-4 text-left hover:no-underline group">
                                    <div className="flex justify-between items-center w-full">
                                        <div className='font-bold text-lg font-headline'>{platformStrategy.platform}</div>
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className={`font-bold ml-4 ${getPotentialBadgeColor(platformStrategy.potential)}`}>
                                              {platformStrategy.potential}
                                          </Badge>
                                          <div className="flex items-center text-xs text-muted-foreground">
                                              <Users className="h-3 w-3 mr-1.5" />
                                              <span>{platformStrategy.userBase} Users</span>
                                          </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 space-y-4">
                                    <div>
                                      <p className="font-bold text-muted-foreground text-xs uppercase tracking-wider mb-1">Rationale</p>
                                      <p className="text-foreground/90">{platformStrategy.rationale}</p>
                                    </div>
                                    <Separator />
                                    <div className="space-y-3">
                                        <p className="font-bold text-muted-foreground text-xs uppercase tracking-wider">Killer Content Idea: <span className="font-medium capitalize text-foreground/90">{platformStrategy.contentIdea}</span></p>

                                        <div>
                                          <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-semibold">Copy-Paste Content</p>
                                            <Button variant="ghost" size="sm" onClick={() => handleCopy(platformStrategy.copyPasteContent, 'content', platformStrategy.platform)}>
                                                {copiedStates[`${platformStrategy.platform}-content`] ? <ClipboardCheck className="h-4 w-4 mr-2 text-green-500"/> : <Copy className="h-4 w-4 mr-2"/>}
                                                Copy
                                            </Button>
                                          </div>
                                          <p className="whitespace-pre-wrap text-sm p-3 bg-muted/50 rounded-md border">{platformStrategy.copyPasteContent}</p>
                                        </div>

                                        <div>
                                          <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-semibold">Hashtags</p>
                                            <Button variant="ghost" size="sm" onClick={() => handleCopy(platformStrategy.hashtags.join(' '), 'hashtags', platformStrategy.platform)}>
                                                {copiedStates[`${platformStrategy.platform}-hashtags`] ? <ClipboardCheck className="h-4 w-4 mr-2 text-green-500"/> : <Copy className="h-4 w-4 mr-2"/>}
                                                Copy
                                            </Button>
                                          </div>
                                          <p className="text-sm p-3 bg-muted/50 rounded-md border text-accent">{platformStrategy.hashtags.join(' ')}</p>
                                        </div>
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
                <p className="text-xs">Fill out your idea to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-8 h-[calc(100vh-10rem)]">
             <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">AI Viral Strategy</CardTitle>
                    <CardDescription>Tell our AI your business idea to get a ruthless, copy-paste plan to go viral.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full flex flex-col">
                        <FormField
                            control={form.control}
                            name="businessIdea"
                            render={({ field }) => (
                            <FormItem className="flex-grow flex flex-col">
                                <FormLabel>Your Business Idea</FormLabel>
                                <FormControl className="flex-grow">
                                <Textarea placeholder="e.g., A subscription box service for rare indoor plants, targeting millennials living in apartments. We'll source plants from local nurseries and provide care guides..." {...field} className="h-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Viral Plan
                        </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">Recommended Platforms & Content</CardTitle>
                    <CardDescription>Your AI-generated list of high-potential platforms will appear here.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                    <ScrollArea className="h-full pr-4 -mr-4">
                        {renderContent()}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
