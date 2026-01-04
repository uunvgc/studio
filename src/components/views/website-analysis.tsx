'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzeWebsite, type WebsiteAnalysisOutput } from '@/ai/flows/website-analysis-report';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Zap, Target } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  websiteUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  businessIdea: z.string().min(10, { message: 'Please describe your business idea in at least 10 characters.' }),
});

export default function WebsiteAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<WebsiteAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteUrl: '',
      businessIdea: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                <Zap className="text-accent" />
                Potential Revenue Streams
              </CardTitle>
              <CardDescription>Ways your website can start making money.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{analysisResult.potentialRevenueStreams}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Target className="text-accent" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Actionable advice to enhance your site.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{analysisResult.areasForImprovement}</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
        <div className="text-center py-12 text-muted-foreground">
            <Globe className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm">Your analysis results will appear here.</p>
        </div>
    );
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
            <CardTitle className="font-headline">Analyze Your Website</CardTitle>
            <CardDescription>Enter your website URL and a brief description of your business to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
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
                    <FormLabel>Business Idea</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your business, goals, and target audience." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Website
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {renderContent()}
    </div>
  );
}
