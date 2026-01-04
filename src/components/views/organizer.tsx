'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2, ListTodo } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const formSchema = z.object({
  task: z.string().min(3, { message: 'Task must be at least 3 characters long.' }),
});

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Organizer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTask: Task = {
      id: Date.now(),
      text: values.task,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
    form.reset();
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="font-headline">Task Organizer</CardTitle>
        <CardDescription>Break down your master plan into actionable steps.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 mb-6">
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="e.g., Design the landing page" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon">
              <PlusCircle className="h-5 w-5" />
            </Button>
          </form>
        </Form>
        
        <div className="space-y-4">
            <div className="px-1 space-y-2">
                <div className='flex justify-between items-center text-sm text-muted-foreground'>
                    <span>Progress</span>
                    <span>{completedTasks} / {totalTasks} Completed</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {tasks.length > 0 ? (
                <ul className="space-y-2">
                    <AnimatePresence>
                    {tasks.map(task => (
                        <motion.li
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-4 p-3 rounded-md bg-background hover:bg-muted/50"
                        >
                            <Checkbox 
                                id={`task-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(task.id)}
                            />
                            <label 
                                htmlFor={`task-${task.id}`} 
                                className={`flex-grow text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                                {task.text}
                            </label>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteTask(task.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </motion.li>
                    ))}
                    </AnimatePresence>
                </ul>
            ) : (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                    <ListTodo className="mx-auto h-12 w-12" />
                    <p className="mt-4 text-sm">No tasks yet. Add your first task to get started!</p>
                </div>
            )}
        </div>

      </CardContent>
    </Card>
  );
}
