'use client';

import * as React from 'react';
import { Bot, Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { View } from '@/lib/types';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useToast } from '@/hooks/use-toast';
import { aiCoachPersonalizedGuidance } from '@/ai/flows/ai-coach-guidance';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion, AnimatePresence } from 'framer-motion';

type AICoachPersonalizedGuidanceOutput = Awaited<ReturnType<typeof aiCoachPersonalizedGuidance>>;

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
    isGreeting?: boolean;
}

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

export default function BeastDashboard({ setActiveView }: BeastDashboardProps) {
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: Date.now(),
            sender: 'ai',
            text: "Welcome to Beast Mode. I am your personal AI CEO. My purpose is to maximize your profit. Tell me what you're working on, or ask me for a market domination strategy. Let's get to work.",
            isGreeting: true,
        }
    ]);
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
            const result = await aiCoachPersonalizedGuidance({
                userIdea: values.message,
                currentRevenue: 0,
                businessGoals: 'Maximize profit.',
                riskTolerance: 'high'
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
            const errorMessage: Message = { id: Date.now() + 1, sender: 'ai', text: "My apologies, I'm unable to provide guidance at this moment. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    const AiMessageContent = ({ content }: { content: AICoachPersonalizedGuidanceOutput | string }) => {
        if (typeof content === 'string') {
            return <p className="text-sm whitespace-pre-wrap">{content}</p>;
        }
        return (
            <div className="space-y-3 text-sm">
                <p className="whitespace-pre-wrap">{content.personalizedGuidance}</p>
                
                <div>
                    <p className="font-bold mb-1">Recommended Actions:</p>
                    <ul className="list-disc list-inside space-y-1">
                        {content.recommendedActions.map((action, index) => <li key={index}>{action}</li>)}
                    </ul>
                </div>
                
                <div>
                    <p className="font-bold text-amber-500 mb-1">Potential Risks:</p>
                    <p className="text-amber-500/90 whitespace-pre-wrap">{content.potentialRisks}</p>
                </div>
            </div>
        );
    }

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <Card className="xl:col-span-3 flex flex-col h-[80vh] bg-transparent">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Your AI CEO</CardTitle>
                <CardDescription>Direct line to your AI strategist for ruthless, profit-driven advice.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
                <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div 
                                key={message.id} 
                                className={cn("flex items-start gap-3", message.sender === 'user' ? 'justify-end' : 'justify-start')}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {message.sender === 'ai' && (
                                    <Avatar className="h-8 w-8 border-2 border-primary/50 shadow-sm">
                                        <AvatarFallback className="bg-background"><Bot size={18} className="text-primary" /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-3xl rounded-xl p-4 shadow-md", 
                                    message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card',
                                    message.isGreeting && 'bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 text-foreground'
                                )}>
                                    <AiMessageContent content={message.text} />
                                </div>
                                {message.sender === 'user' && userAvatar && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={userAvatar.imageUrl} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                )}
                            </motion.div>
                        ))}
                        </AnimatePresence>
                        {isLoading && (
                            <motion.div
                                className="flex items-start gap-3 justify-start"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Avatar className="h-8 w-8 border-2 border-primary/50 shadow-sm">
                                    <AvatarFallback className="bg-background"><Bot size={18} className="text-primary"/></AvatarFallback>
                                </Avatar>
                                <div className="bg-card rounded-lg p-3">
                                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </ScrollArea>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 pt-4 border-t">
                        <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormControl>
                                    <Textarea placeholder="Ask your AI CEO for a strategy or advice..." {...field} rows={1} className="min-h-0 resize-none text-base bg-card" onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            form.handleSubmit(onSubmit)();
                                        }
                                    }}/>
                                </FormControl>
                            </FormItem>
                        )} />
                        <Button type="submit" size="lg" disabled={isLoading} className="gap-2">
                            <Send className="h-4 w-4" />
                            Send
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
