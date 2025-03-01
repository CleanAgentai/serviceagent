import React, { useEffect, useRef } from 'react';

export interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number | string;
  strokeWidth?: number;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

/**
 * Sparkline component for simple visualizations within KPI cards
 * Using HTML5 Canvas for rendering
 */
export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = '#3B82F6', // default blue
  height = 36,
  width = '100%',
  strokeWidth = 2,
  className = '',
  trend = 'neutral'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set color based on trend if not explicitly provided
  const lineColor = color || 
    (trend === 'up' 
      ? '#10B981' // green
      : trend === 'down' 
        ? '#EF4444' // red
        : '#3B82F6' // blue
    );

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || data.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get container width for responsive sizing
    const containerWidth = containerRef.current.clientWidth;
    canvas.width = containerWidth;
    canvas.height = typeof height === 'number' ? height : 36;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate steps and scaling
    const step = canvas.width / (data.length - 1);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1; // Avoid division by zero
    
    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    data.forEach((value, i) => {
      const x = i * step;
      // Normalize value between 0 and 1, then scale to canvas height
      // Leave 10% padding at top and bottom
      const normalizedValue = (value - min) / range;
      const y = canvas.height - (normalizedValue * (canvas.height * 0.8) + canvas.height * 0.1);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [data, height, lineColor, strokeWidth]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}; 