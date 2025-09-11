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
  label,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('flex flex-col space-y-1.5', className)}>
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
                {[
                  '#ff6900',
                  '#fcb900',
                  '#7bdcb5',
                  '#00d084',
                  '#8ed1fc',
                  '#0693e3',
                  '#abb8c3',
                  '#eb144c',
                  '#f78da7',
                  '#9900ef',
                ].map((color) => (
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
