
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PriorityScale from '@/components/ui/PriorityScale';
import { Task } from './TaskItem';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    
    // Simulating async operation
    setTimeout(() => {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: false,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority(5);
      setIsExpanded(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority(5);
    setIsExpanded(false);
  };

  return (
    <Card className="glass-panel w-full shadow-sm transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <CardHeader className={isExpanded ? "pb-0" : "pb-0"}>
          <CardTitle className="text-xl font-medium">
            {isExpanded ? "Create New Task" : "What needs to be prioritized?"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
            required
            disabled={isSubmitting}
            className="bg-background/50 text-base"
          />
          
          {isExpanded && (
            <>
              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                className="bg-background/50 resize-none min-h-[80px]"
              />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Priority Level</p>
                <PriorityScale
                  value={priority}
                  onChange={setPriority}
                  min={1}
                  max={10}
                />
              </div>
            </>
          )}
        </CardContent>
        
        {isExpanded && (
          <CardFooter className="flex justify-end space-x-2 pt-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="inline-flex items-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Plus className="mr-1 h-4 w-4" />
              )}
              Add Task
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
};

export default TaskForm;
