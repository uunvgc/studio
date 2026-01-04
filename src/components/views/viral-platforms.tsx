'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateViralStrategy } from '@/ai/flows/generate-viral-strategy';
import { type ViralStrategyOutput, ViralStrategyInputSchema } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Users, ExternalLink, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import type { z } from 'zod';

export default function ViralPlatforms() {
    const [strategy, setStrategy] = useState<ViralStrategyOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof ViralStrategyInputSchema>>({
        resolver: zodResolver(ViralStrategyInputSchema),
        defaultValues: {
            businessIdea: '',
        },
    });

    async function onSubmit(values: z.infer<typeof ViralStrategyInputSchema>) {
        setIsLoading(true);
        setStrategy(null);
        try {
            const result = await generateViralStrategy(values);
            setStrategy(result);
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
        switch (potential.toLowerCase()) {
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
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-1/3" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            );
        }

        if (strategy) {
            return (
                <Accordion type="single" collapsible defaultValue={strategy.strategies[0]?.platform} className="w-full space-y-4">
                    {strategy.strategies.map((platformStrategy) => (
                        <AccordionItem value={platformStrategy.platform} key={platformStrategy.platform} className="border-b-0">
                            <Card className="flex flex-col">
                                <AccordionTrigger className="p-6 text-left hover:no-underline">
                                    <div className="flex justify-between items-start w-full">
                                        <div className='flex flex-col gap-1 items-start'>
                                            <CardTitle className="font-headline text-xl">{platformStrategy.platform}</CardTitle>
                                            <CardDescription>{platformStrategy.rationale}</CardDescription>
                                        </div>
                                        <Badge variant="outline" className={`font-bold ml-4 ${getPotentialBadgeColor(platformStrategy.potential)}`}>
                                            {platformStrategy.potential}
                                        </Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <div className="text-sm prose prose-sm max-w-none prose-p:text-muted-foreground prose-strong:text-foreground">
                                        <p className="whitespace-pre-wrap">{platformStrategy.strategy}</p>
                                    </div>
                                    <div className="flex items-center text-sm text-foreground mt-4">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>{platformStrategy.userBase} Users</span>
                                    </div>
                                    <CardFooter className="p-0 mt-4">
                                        <a href={platformStrategy.url} target="_blank" rel="noopener noreferrer" className="w-full">
                                            <Button className="w-full">
                                                <ExternalLink className="mr-2" />
                                                Get Started on {platformStrategy.platform}
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            );
        }

        return (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                <Sparkles className="mx-auto h-12 w-12" />
                <p className="mt-4 text-sm font-bold">Your custom viral strategy awaits.</p>
                <p className="text-sm">Enter your business idea to generate a plan.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="font-headline">AI Viral Strategy</CardTitle>
                    <CardDescription>Don't guess where your customers are. Tell our AI about your business, and it will generate a ruthless plan to find and dominate them on the right platforms.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="businessIdea"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Business Idea</FormLabel>
                                <FormControl>
                                <Textarea placeholder="e.g., A subscription box service for rare indoor plants, targeting millennials living in apartments." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Viral Plan
                        </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {renderContent()}
        </div>
    );
}
