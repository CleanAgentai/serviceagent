import React, { useState } from 'react';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from '@/lib/utils';

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
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              size="icon"
              className="h-10 w-10 border-2"
              style={{ backgroundColor: value }}
              aria-label="Pick a color"
            />
          </PopoverTrigger>
          <PopoverContent className="w-64">
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
                {['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
                  '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
                  '#795548', '#9e9e9e', '#607d8b', '#000000', '#ffffff'].map((color) => (
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
        <Input
          value={value}
          onChange={handleInputChange}
          className="flex-1"
          placeholder="#000000"
        />
      </div>
    </div>
  );
} 