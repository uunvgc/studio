'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { predictRevenuePotential, type PredictRevenuePotentialOutput } from '@/ai/flows/predict-revenue-potential';
import type { PlanTier, View } from '@/lib/types';
import UpgradePrompt from '@/components/upgrade-prompt';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, TrendingUp, Key } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScrollArea } from '../ui/scroll-area';


const formSchema = z.object({
  idea: z.string().min(10, { message: 'Please describe your idea (min 10 chars).' }),
  plan: z.string().min(10, { message: 'Please describe your plan (min 10 chars).' }),
  marketData: z.string().min(10, { message: 'Please describe your market (min 10 chars).' }),
});

interface PredictionsProps {
  currentPlan: PlanTier;
  setActiveView: (view: View) => void;
}

export default function Predictions({ currentPlan, setActiveView }: PredictionsProps) {
  const [prediction, setPrediction] = useState<PredictRevenuePotentialOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: '',
      plan: '',
      marketData: '',
    },
  });

  if (currentPlan !== 'beast') {
    return <UpgradePrompt featureName="Predictive Analysis" requiredPlan="Beast" setActiveView={setActiveView} />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictRevenuePotential(values);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction failed:", error);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: "There was an error generating the prediction. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card className="h-full">
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-20 w-full" />
            </CardContent>
        </Card>
      );
    }

    if (prediction) {
      const probability = Math.round(prediction.successProbability * 100);
      const chartData = [{ name: 'Success', probability, fill: 'hsl(var(--primary))' }];
      const chartConfig = {
        probability: { label: 'Probability' },
      } satisfies ChartConfig;

      return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className='font-headline'>Success Probability: {probability}%</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xl font-bold mb-2">{prediction.revenueProjection}</p>
                <p className="text-sm text-muted-foreground">{prediction.keyFactors}</p>
            </CardContent>
        </Card>
      );
    }

    return (
        <Card className="h-full">
            <CardHeader>
                 <CardTitle className="font-headline">Predictive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-4 text-muted-foreground">
                    <TrendingUp className="mx-auto h-8 w-8" />
                    <p className="mt-2 text-sm">Your revenue and success predictions will appear here.</p>
                </div>
            </CardContent>
        </Card>
    );
  };
  
  return (
    <Card className="h-full flex flex-col">
        <CardHeader>
            <CardTitle className="font-headline">Get Your Revenue Prediction</CardTitle>
            <CardDescription>Fill out the details to get an AI-driven forecast.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col">
                <ScrollArea className="flex-grow pr-4 -mr-4">
                    <div className="space-y-4">
                        <FormField control={form.control} name="idea" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Idea</FormLabel>
                                <FormControl><Textarea placeholder="e.g., A platform that connects local artists with coffee shops..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="plan" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Execution Plan</FormLabel>
                                <FormControl><Textarea placeholder="How will you build it, market it, and operate it?" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="marketData" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Market Data</FormLabel>
                                <FormControl><Textarea placeholder="Who are your competitors? What's your target market size?" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </ScrollArea>
                <div className="pt-4">
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Predict Potential
                    </Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
