
import React, { useState } from 'react';
import { Task } from './TaskItem';
import TaskItem from './TaskItem';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'newest' | 'oldest'>('priority');

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      // Apply tab filter
      if (filter === 'pending' && task.completed) return false;
      if (filter === 'completed' && !task.completed) return false;
      
      // Apply search filter (case insensitive)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          task.title.toLowerCase().includes(term) ||
          (task.description && task.description.toLowerCase().includes(term))
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'priority') return b.priority - a.priority;
      if (sortBy === 'newest') return b.createdAt.getTime() - a.createdAt.getTime();
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm bg-background/50 border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="priority">Priority</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="all" value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <TaskGrid
            tasks={filteredTasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            emptyMessage="No tasks found"
          />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <TaskGrid
            tasks={filteredTasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            emptyMessage="No pending tasks"
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <TaskGrid
            tasks={filteredTasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            emptyMessage="No completed tasks"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TaskGridProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (id: string) => void;
  emptyMessage: string;
}

const TaskGrid: React.FC<TaskGridProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
  emptyMessage,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
