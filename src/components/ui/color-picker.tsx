import React, { useState } from 'react';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from '@/app/lib/utils';

interface ColorPickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export function ColorPicker({
  id,
  value,
  onChange,
  className,
  label
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className="h-10 w-40 justify-start gap-2 border-2 bg-gray-50 hover:bg-gray-100"
            aria-label="Pick a color"
          >
            <div 
              className="h-4 w-4 rounded border border-gray-300 flex-shrink-0" 
              style={{ backgroundColor: value }}
            />
            <span className="text-xs font-medium text-gray-700 truncate">
              {value.toUpperCase()}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 max-w-[calc(100vw-2rem)]">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Select Color</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
            <input
              type="color"
              value={value}
              onChange={handleInputChange}
              className="w-full h-8 cursor-pointer"
            />
            <div className="grid grid-cols-8 gap-1">
              {['#ff6900', '#fcb900', '#7bdcb5', '#00d084', '#8ed1fc', '#0693e3', '#abb8c3',
                '#eb144c', '#f78da7', '#9900ef'].map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-sm p-0 border"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onChange(color);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 