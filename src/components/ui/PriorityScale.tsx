
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PriorityScaleProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const PriorityScale: React.FC<PriorityScaleProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    updateValue(e);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateValue(e);
    } else {
      updateHoverValue(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(false);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  const updateValue = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const boundedValue = Math.max(min, Math.min(max, steppedValue));
    
    onChange(boundedValue);
  };

  const updateHoverValue = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const boundedValue = Math.max(min, Math.min(max, steppedValue));
    
    setHoverValue(boundedValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;
  
  const getPriorityColor = (value: number) => {
    // Calculate percentage of the value across the scale
    const percentage = (value - min) / (max - min);
    
    if (percentage < 0.3) return 'bg-green-500';
    if (percentage < 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const labelText = () => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const percentage = (displayValue - min) / (max - min);
    
    if (percentage < 0.3) return 'Low Priority';
    if (percentage < 0.7) return 'Medium Priority';
    return 'High Priority';
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span>Low</span>
        <span className="font-medium">{labelText()} ({hoverValue !== null ? hoverValue : value})</span>
        <span>High</span>
      </div>
      <div
        ref={trackRef}
        className="priority-scale-track h-2 cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            "h-full transition-all ease-out duration-200",
            getPriorityColor(value)
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className={cn(
          "priority-scale-thumb absolute transform -translate-y-1/2",
          getPriorityColor(value)
        )}
        style={{ left: `calc(${percentage}% - 10px)`, top: '1rem' }}
      />
    </div>
  );
};

export default PriorityScale;
