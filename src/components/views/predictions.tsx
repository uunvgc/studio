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
    return <UpgradePrompt featureName="Predictive Analysis" requiredPlan="Beast Mode" setActiveView={setActiveView} />;
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
        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-40 w-full" />
                </CardContent>
            </Card>
            <div className="space-y-6">
                <Card><CardHeader><Skeleton className="h-10 w-full" /></CardHeader></Card>
                <Card><CardHeader><Skeleton className="h-10 w-full" /></CardHeader></Card>
            </div>
        </div>
      );
    }

    if (prediction) {
      const probability = Math.round(prediction.successProbability * 100);
      const chartData = [{ name: 'Success', probability, fill: 'hsl(var(--primary))' }];
      const chartConfig = {
        probability: { label: 'Probability' },
      } satisfies ChartConfig;

      return (
        <div className="grid lg:grid-cols-5 gap-6 animate-in fade-in-50">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className='font-headline'>Success Probability: {probability}%</CardTitle>
                    <CardDescription>AI-powered estimation of your idea's success.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="w-full h-40">
                        <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                            <CartesianGrid horizontal={false} />
                            <XAxis type="number" dataKey="probability" domain={[0, 100]} tickFormatter={(value) => `${value}%`} hide />
                            <YAxis type="category" dataKey="name" hide />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Bar dataKey="probability" radius={8}>
                                <LabelList 
                                    position="right" 
                                    offset={10} 
                                    className="fill-foreground font-bold"
                                    fontSize={16}
                                    formatter={(value: number) => `${value}%`} 
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <TrendingUp className="text-accent" /> Revenue Projection
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{prediction.revenueProjection}</p>
                </CardContent>
            </Card>
             <Card className="lg:col-span-5">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Key className="text-accent" /> Key Influencing Factors
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap">{prediction.keyFactors}</p>
                </CardContent>
            </Card>
        </div>
      );
    }

    return (
        <div className="text-center py-12 text-muted-foreground">
            <TrendingUp className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm">Your revenue and success predictions will appear here.</p>
        </div>
    );
  };
  
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
            <CardTitle className="font-headline">Get Your Revenue Prediction</CardTitle>
            <CardDescription>Fill out the details below to get an AI-driven forecast of your potential success.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control} name="idea"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Idea</FormLabel>
                        <FormControl><Textarea placeholder="e.g., A platform that connects local artists with coffee shops for displaying their art." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control} name="plan"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Execution Plan</FormLabel>
                        <FormControl><Textarea placeholder="How will you build it, market it, and operate it?" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control} name="marketData"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Market Data</FormLabel>
                        <FormControl><Textarea placeholder="Who are your competitors? What's your target market size? Any relevant trends?" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Predict Potential
                </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {renderContent()}
    </div>
  );
}
