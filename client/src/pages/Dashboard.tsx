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

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Get the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  const userEmail = loggedInUser?.email || null;

  // Load tasks for the logged-in user on component mount
  useEffect(() => {
    if (!userEmail) return; // Prevent running if no user is logged in

    const storedTasks = localStorage.getItem(`tasks_${userEmail}`);
    setTasks(storedTasks ? JSON.parse(storedTasks) : []);
    setIsLoading(false);
  }, [userEmail]);

  // Save tasks for the logged-in user whenever tasks change
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`tasks_${userEmail}`, JSON.stringify(tasks));
    }
  }, [tasks, userEmail]);

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

  // Logout function that does not remove tasks
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Keep tasks intact
    window.location.reload();
  };

  const API_URL = "http://localhost:5000/api/tasks";

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
