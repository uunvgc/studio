'use client';

import * as React from 'react';
import { ArrowRight, Bot, Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { View } from '@/lib/types';
import ViralPlatforms from './viral-platforms';
import Predictions from './predictions';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useToast } from '@/hooks/use-toast';
import { aiCoachPersonalizedGuidance, type AICoachPersonalizedGuidanceOutput } from '@/ai/flows/ai-coach-guidance';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion, AnimatePresence } from 'framer-motion';

interface BeastDashboardProps {
  setActiveView: (view: View) => void;
}

const chatSchema = z.object({
    message: z.string().min(1, { message: 'Message cannot be empty.' }),
});

interface Message {
    id: number;
    sender: 'user' | 'ai';
    text: string | AICoachPersonalizedGuidanceOutput;
}

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

export default function BeastDashboard({ setActiveView }: BeastDashboardProps) {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof chatSchema>>({
        resolver: zodResolver(chatSchema),
        defaultValues: { message: '' },
    });

    React.useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    async function onSubmit(values: z.infer<typeof chatSchema>) {
        const userMessage: Message = { id: Date.now(), sender: 'user', text: values.message };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        form.reset();

        try {
            // For a more advanced implementation, we would maintain conversation history.
            // For now, we'll treat each message as a new request for simplicity.
            const result = await aiCoachPersonalizedGuidance({
                userIdea: values.message,
                businessGoals: 'Maximize profit and growth.',
                riskTolerance: 'high',
            });
            const aiMessage: Message = { id: Date.now() + 1, sender: 'ai', text: result };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("AI Coach guidance failed:", error);
            toast({
                variant: "destructive",
                title: "Guidance Failed",
                description: "The AI Coach is unavailable. Please try again later.",
            });
            const errorMessage: Message = { id: Date.now() + 1, sender: 'ai', text: "Sorry, I'm unable to provide guidance at the moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    const AiMessageContent = ({ content }: { content: AICoachPersonalizedGuidanceOutput | string }) => {
        if (typeof content === 'string') {
            return <p>{content}</p>;
        }
        return (
            <div className="space-y-2 text-sm">
                <p className="font-bold">Here is your personalized guidance:</p>
                <p>{content.personalizedGuidance}</p>
                <p className="font-bold mt-2">Recommended Actions:</p>
                <ul className="list-disc list-inside">
                    {content.recommendedActions.map((action, index) => <li key={index}>{action}</li>)}
                </ul>
                <p className="font-bold mt-2 text-amber-500">Potential Risks:</p>
                <p className="text-amber-500/80">{content.potentialRisks}</p>
            </div>
        );
    }

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <div className="xl:col-span-2 space-y-8">
            <Card className="flex flex-col h-[70vh]">
                <CardHeader>
                    <CardTitle className="font-headline">Conversational AI Coach</CardTitle>
                    <CardDescription>Chat directly with your AI CEO for ruthless, profit-driven advice.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
                   <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div 
                                    key={message.id} 
                                    className={cn("flex items-end gap-2", message.sender === 'user' ? 'justify-end' : 'justify-start')}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {message.sender === 'ai' && (
                                        <Avatar className="h-8 w-8 border-2 border-primary/50">
                                            <AvatarFallback><Bot size={18} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("max-w-md rounded-lg p-3", message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                        <AiMessageContent content={message.text} />
                                    </div>
                                    {message.sender === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={userAvatar?.imageUrl} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    )}
                                </motion.div>
                            ))}
                            </AnimatePresence>
                            {isLoading && <div className="flex justify-start"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}
                        </div>
                    </ScrollArea>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 pt-4 border-t">
                            <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Textarea placeholder="Ask for advice on your business idea..." {...field} rows={1} className="min-h-0 resize-none" />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <div className="h-[70vh] flex flex-col gap-8">
                <div className="flex-1 overflow-hidden">
                    <Predictions currentPlan='beast' setActiveView={setActiveView} />
                </div>
                <div className="flex-1 overflow-hidden">
                    <ViralPlatforms currentPlan='beast' setActiveView={setActiveView} />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
