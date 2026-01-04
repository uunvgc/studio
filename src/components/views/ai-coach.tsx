'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiCoachPersonalizedGuidance } from '@/ai/flows/ai-coach-guidance';
import type { PlanTier, View, AICoachPersonalizedGuidanceOutput } from '@/lib/types';
import UpgradePrompt from '@/components/upgrade-prompt';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Bot, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  userIdea: z.string().min(10, { message: 'Please describe your idea (min 10 chars).' }),
  currentRevenue: z.coerce.number().min(0).optional(),
  businessGoals: z.string().min(10, { message: 'Please describe your goals (min 10 chars).' }),
  riskTolerance: z.enum(['low', 'medium', 'high']),
});

interface AiCoachProps {
  currentPlan: PlanTier;
  setActiveView: (view: View) => void;
}

export default function AiCoach({ currentPlan, setActiveView }: AiCoachProps) {
  const [guidance, setGuidance] = useState<AICoachPersonalizedGuidanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userIdea: '',
      currentRevenue: 0,
      businessGoals: '',
      riskTolerance: 'medium',
    },
  });

  if (currentPlan !== 'beast') {
    return <UpgradePrompt featureName="AI Coach" requiredPlan="Beast" setActiveView={setActiveView} />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGuidance(null);
    try {
      const result = await aiCoachPersonalizedGuidance(values);
      setGuidance(result);
    } catch (error) {
      console.error("AI Coach guidance failed:", error);
      toast({
        variant: "destructive",
        title: "Guidance Failed",
        description: "There was an error getting advice from the AI Coach. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </CardContent>
        </Card>
      );
    }

    if (guidance) {
      return (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Bot className="text-primary" />
                Your AI Coach's Guidance
            </CardTitle>
            <CardDescription>Profit-focused strategies and actions tailored for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-headline">Personalized Guidance</AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap">{guidance.personalizedGuidance}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-headline flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Potential Risks
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap">{guidance.potentialRisks}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-headline">Recommended Actions</AccordionTrigger>
                <AccordionContent>
                    <ul className="space-y-2">
                        {guidance.recommendedActions.map((action, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                <span>{action}</span>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      );
    }

    return (
        <div className="text-center py-12 text-muted-foreground">
            <Bot className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm">Your personalized guidance from the AI Coach will appear here.</p>
        </div>
    );
  };
  
  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader>
            <CardTitle className="font-headline">Consult the AI Coach</CardTitle>
            <CardDescription>Provide details about your business, and our AI CEO will give you a no-nonsense plan to maximize profit.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="userIdea"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Idea/Current Business</FormLabel>
                        <FormControl><Textarea placeholder="Describe your business..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="currentRevenue"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Monthly Revenue (USD)</FormLabel>
                            <FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="riskTolerance"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Risk Tolerance</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select your risk tolerance" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="low">Low - I prefer safe, steady growth.</SelectItem>
                                    <SelectItem value="medium">Medium - I'm open to calculated risks for higher returns.</SelectItem>
                                    <SelectItem value="high">High - I'm willing to take significant risks for massive growth.</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="businessGoals"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Goals</FormLabel>
                        <FormControl><Textarea placeholder="What are your primary goals? (e.g., Increase monthly revenue by 50% in 6 months, expand to a new market, etc.)" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Get Guidance
                </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {renderContent()}
    </div>
  );
}
