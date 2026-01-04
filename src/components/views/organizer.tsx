'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2, Edit, Lightbulb } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';

const ideaSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().optional(),
});

interface Idea {
  id: number;
  title: string;
  description: string;
}

export default function Organizer() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
        const storedIdeas = localStorage.getItem('userIdeas');
        if (storedIdeas) {
            setIdeas(JSON.parse(storedIdeas));
        }
    } catch (error) {
        console.error("Failed to parse ideas from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
        localStorage.setItem('userIdeas', JSON.stringify(ideas));
    }
  }, [ideas, isClient]);
  
  const addForm = useForm<z.infer<typeof ideaSchema>>({
    resolver: zodResolver(ideaSchema),
    defaultValues: { title: '', description: '' },
  });

  const editForm = useForm<z.infer<typeof ideaSchema>>({
    resolver: zodResolver(ideaSchema),
  });

  function handleAddIdea(values: z.infer<typeof ideaSchema>) {
    const newIdea: Idea = {
      id: Date.now(),
      title: values.title,
      description: values.description || '',
    };
    setIdeas(prev => [newIdea, ...prev]);
    addForm.reset();
  }

  function handleEditIdea(id: number, values: z.infer<typeof ideaSchema>) {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, title: values.title, description: values.description || '' } : idea));
  }

  const deleteIdea = (id: number) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline">Idea Organizer</CardTitle>
                <CardDescription>Capture, refine, and organize your business ideas.</CardDescription>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Idea</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Capture a New Idea</DialogTitle>
                    </DialogHeader>
                    <Form {...addForm}>
                        <form onSubmit={addForm.handleSubmit(handleAddIdea)} className="space-y-4">
                            <FormField control={addForm.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Idea Title</FormLabel>
                                    <FormControl><Input placeholder="e.g., AI-powered pet translator" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={addForm.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl><Textarea placeholder="Describe your idea in more detail..." {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Save Idea</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isClient && ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {ideas.map(idea => (
                <motion.div
                  key={idea.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">{idea.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{idea.description || "No description provided."}</p>
                        </CardContent>
                        <CardContent className="flex justify-end gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => editForm.reset(idea)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader><DialogTitle>Edit Idea</DialogTitle></DialogHeader>
                                    <Form {...editForm}>
                                        <form onSubmit={editForm.handleSubmit((values) => handleEditIdea(idea.id, values))} className="space-y-4">
                                            <FormField control={editForm.control} name="title" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Idea Title</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={editForm.control} name="description" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description (Optional)</FormLabel>
                                                    <FormControl><Textarea {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <DialogFooter>
                                                <DialogClose asChild><Button type="submit">Save Changes</Button></DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => deleteIdea(idea.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
            <Lightbulb className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm font-bold">Your idea vault is empty.</p>
            <p className="text-sm">Click "Add Idea" to capture your first concept.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
