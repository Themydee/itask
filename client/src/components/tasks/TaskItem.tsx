import React, { useState } from 'react';
import { CheckCircle, Clock, Edit, Trash, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import PriorityScale from '@/components/ui/PriorityScale';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: number;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedPriority, setEditedPriority] = useState(task.priority);

  // Toggle task completion
  const handleToggleComplete = () => {
    onUpdate({ ...task, completed: !task.completed });
  };

  // Edit mode toggle
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save edited task
  const handleSave = () => {
    onUpdate({
      ...task,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
    });
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Get priority label and color
  const getPriorityLabel = (priority: number) => {
    if (priority <= 3) return { label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' };
    if (priority <= 7) return { label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    return { label: 'High', color: 'bg-red-100 text-red-800 border-red-200' };
  };

  const priorityInfo = getPriorityLabel(task.priority);

  // Generate Google Calendar event link
  const getGoogleCalendarLink = (task: Task) => {
    const startDate = new Date(task.createdAt).toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(new Date(task.createdAt).getTime() + 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d+/g, '');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      task.title
    )}&details=${encodeURIComponent(task.description || '')}&dates=${startDate}/${endDate}`;
  };

  return (
    <Card className={cn(
      "task-card overflow-hidden animate-fade-in border transition-all duration-200",
      task.completed ? "opacity-70" : "",
      isEditing ? "ring-2 ring-primary/20" : ""
    )}>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 text-lg font-medium border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Task title"
              autoFocus
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Task description (optional)"
              rows={3}
            />
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Priority Level</p>
              <PriorityScale 
                value={editedPriority} 
                onChange={setEditedPriority}
                min={1}
                max={10}
                className="mt-2"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={cn(
                  "text-lg font-medium transition-all",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={cn(
                    "text-sm mt-1 text-muted-foreground",
                    task.completed && "line-through opacity-70"
                  )}>
                    {task.description}
                  </p>
                )}
              </div>
              <Badge className={cn("ml-2 shrink-0", priorityInfo.color)}>
                {priorityInfo.label} ({task.priority})
              </Badge>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(task.createdAt)}</span>
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="p-3 pt-0 flex justify-between items-center border-t bg-muted/30">
        {/* Add to Calendar Link */}
        <a
          href={getGoogleCalendarLink(task)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm flex items-center gap-1"
        >
          📅 Add to Calendar
        </a>

        {/* Task Actions */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <CheckCircle className="h-4 w-4 mr-1" /> Save
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="icon" 
                variant="outline" 
                onClick={handleToggleComplete}
                className={task.completed ? "text-green-600" : "text-muted-foreground"}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="text-destructive" onClick={() => onDelete(task.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
