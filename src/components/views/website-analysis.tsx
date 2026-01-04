'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzeWebsite } from '@/ai/flows/website-analysis-report';
import { WebsiteAnalysisInputSchema, type WebsiteAnalysisOutput } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ShieldOff, Target, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { PlanTier, View } from '@/lib/types';
import UpgradePrompt from '@/components/upgrade-prompt';

interface WebsiteAnalysisProps {
  currentPlan: PlanTier;
  setActiveView: (view: View) => void;
}

export default function WebsiteAnalysis({ currentPlan, setActiveView }: WebsiteAnalysisProps) {
  const [analysisResult, setAnalysisResult] = useState<WebsiteAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof WebsiteAnalysisInputSchema>>({
    resolver: zodResolver(WebsiteAnalysisInputSchema),
    defaultValues: {
      websiteUrl: '',
      businessIdea: '',
    },
  });

  if (currentPlan === 'free') {
    return <UpgradePrompt featureName="Competitor Annihilator" requiredPlan="Pro" setActiveView={setActiveView} />;
  }

  async function onSubmit(values: z.infer<typeof WebsiteAnalysisInputSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeWebsite(values);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Website analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing the website. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      );
    }

    if (analysisResult) {
      return (
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in-50">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Eye className="text-accent" />
                Revenue Stream Recon
              </CardTitle>
              <CardDescription>How they make money. And how you can do it better.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{analysisResult.potentialRevenueStreams}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <ShieldOff className="text-accent" />
                Exploitable Weaknesses
              </CardTitle>
              <CardDescription>The cracks in their armor. Your blueprint for attack.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{analysisResult.areasForImprovement}</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
            <Target className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm font-bold">Your target is acquired.</p>
            <p className="text-sm">The intel report will appear here.</p>
        </div>
    );
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
            <CardTitle className="font-headline">Identify Your Target</CardTitle>
            <CardDescription>Enter your competitor's website. Our AI will dismantle their strategy and expose their weaknesses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitor's Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://competitor.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessIdea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Business (for context)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Briefly describe your business so the AI can tailor its attack plan." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Annihilate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {renderContent()}
    </div>
  );
}
