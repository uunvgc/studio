'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateRevenuePlan, type GenerateRevenuePlanOutput } from '@/ai/flows/generate-revenue-plan';
import type { PlanTier } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  businessIdea: z.string().min(20, { message: 'Please provide a detailed business idea (at least 20 characters).' }),
});

interface RevenueMaximizerProps {
  currentPlan: PlanTier;
}

export default function RevenueMaximizer({ currentPlan }: RevenueMaximizerProps) {
  const [revenuePlan, setRevenuePlan] = useState<GenerateRevenuePlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessIdea: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRevenuePlan(null);
    try {
      const result = await generateRevenuePlan({ ...values, tier: currentPlan });
      setRevenuePlan(result);
    } catch (error) {
      console.error("Revenue plan generation failed:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the revenue plan. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      );
    }

    if (revenuePlan) {
      return (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center justify-between">
              Your Revenue Maximization Plan
              <Badge variant="outline" className="capitalize text-base">{currentPlan}</Badge>
            </CardTitle>
            <CardDescription>A detailed strategy to turn your idea into a profitable business.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap rounded-md border p-4 bg-muted/50 font-code">
                {revenuePlan.revenuePlan}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
        <div className="text-center py-12 text-muted-foreground">
            <Lightbulb className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm">Your generated revenue plan will appear here.</p>
        </div>
    );
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
            <CardTitle className="font-headline">Generate a Revenue Plan</CardTitle>
            <CardDescription>Describe your business idea, and our AI will create a monetization strategy based on your <span className='font-bold capitalize text-primary'>{currentPlan}</span> plan.</CardDescription>
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
                      <Textarea 
                        placeholder="e.g., A subscription box service for rare indoor plants, targeting millennials living in apartments. We'll source plants from local nurseries and provide care guides..."
                        rows={6}
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Plan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {renderContent()}
    </div>
  );
}
