
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';
import { Task } from '@/components/tasks/TaskItem';
import MainLayout from '@/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock data for initial tasks
const mockTasks: Task[] = [
  {
    id: generateId(),
    title: 'Complete project proposal',
    description: 'Finalize the project proposal document and send it to the client for review.',
    priority: 9,
    completed: false,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: generateId(),
    title: 'Schedule team meeting',
    description: 'Set up a meeting with the development team to discuss project milestones.',
    priority: 6,
    completed: false,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: generateId(),
    title: 'Research competitor products',
    description: 'Analyze similar products in the market to identify strengths and weaknesses.',
    priority: 4,
    completed: true,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: generateId(),
    title: 'Update personal portfolio',
    description: 'Add recent projects to portfolio website and update skills section.',
    priority: 3,
    completed: false,
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
  },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data from an API
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTasks(mockTasks);
      } catch (error) {
        toast({
          title: "Error loading tasks",
          description: "There was a problem loading your tasks. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [toast]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: generateId(),
      createdAt: new Date(),
    };

    setTasks(prevTasks => [task, ...prevTasks]);
    
    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    });
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully.",
    });
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const highPriorityTasks = tasks.filter(task => task.priority > 7 && !task.completed).length;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and prioritize your tasks</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-2 py-1 bg-background">
              <Clock className="h-3 w-3 mr-1" />
              <span>{new Date().toLocaleDateString()}</span>
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold">{totalTasks}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="glass-panel rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="glass-panel rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-red-600">{highPriorityTasks}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </div>
        </div>

        <TaskForm onAddTask={handleAddTask} />

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-pulse flex flex-col space-y-4 w-full">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-muted rounded w-full" />
              ))}
            </div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
