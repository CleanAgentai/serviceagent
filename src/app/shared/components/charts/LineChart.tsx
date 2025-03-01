import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { tokens } from '@/app/shared/styles/tokens';

export interface LineChartDataItem {
  [key: string]: any;
}

export interface LineSeriesConfig {
  dataKey: string;
  name?: string;
  color?: string;
  strokeWidth?: number;
  dot?: boolean | object;
  type?: 'monotone' | 'linear' | 'basis' | 'natural';
  activeDot?: boolean | object;
  isAnimationActive?: boolean;
  animationDuration?: number;
  hidden?: boolean;
}

export interface LineChartProps extends Omit<ChartContainerProps, 'children'> {
  data: LineChartDataItem[];
  series: LineSeriesConfig[];
  xAxisDataKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  grid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  animationDuration?: number;
  tooltipFormatter?: (value: any, name: any) => [string, string];
  areaChart?: boolean;
  connectNulls?: boolean;
  roundedCorners?: boolean;
}

/**
 * LineChart component for displaying line charts
 * Built on recharts and ChartContainer
 */
export const LineChart: React.FC<LineChartProps> = ({
  data,
  series,
  xAxisDataKey,
  xAxisLabel,
  yAxisLabel,
  grid = true,
  showLegend = true,
  showTooltip = true,
  animationDuration = 800,
  tooltipFormatter,
  areaChart = false,
  connectNulls = true,
  roundedCorners = true,
  title,
  subtitle,
  loading = false,
  error,
  height = 300,
  className = '',
  action,
  noData = data.length === 0,
  noDataMessage = 'No data available for this chart',
}) => {
  // Generate a set of default colors from our design tokens
  const defaultColors = [
    tokens.colors.primary.blue, 
    tokens.colors.primary.teal,
    tokens.colors.status.success,
    tokens.colors.status.error,
    tokens.colors.status.warning,
    '#8884d8', // purple
    '#82ca9d', // green
    '#ffc658', // yellow
  ];

  // Custom tooltip formatter to handle date/time and number formatting
  const defaultTooltipFormatter = (value: any, name: string) => {
    // Format numbers with commas and 2 decimal places if needed
    if (typeof value === 'number') {
      return [
        new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 2
        }).format(value),
        name
      ];
    }
    return [value, name];
  };

  return (
    <ChartContainer
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      height={height}
      className={className}
      action={action}
      noData={noData}
      noDataMessage={noDataMessage}
    >
      <RechartsLineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {grid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
        
        <XAxis 
          dataKey={xAxisDataKey} 
          stroke="#6b7280"
          label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined}
          tick={{ fontSize: 12 }}
        />
        
        <YAxis 
          stroke="#6b7280"
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
          tick={{ fontSize: 12 }}
        />
        
        {showTooltip && (
          <Tooltip 
            formatter={tooltipFormatter || defaultTooltipFormatter} 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderColor: '#e5e7eb',
              borderRadius: '4px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{ padding: '4px 0' }}
          />
        )}
        
        {showLegend && (
          <Legend 
            wrapperStyle={{ paddingTop: 10 }} 
            verticalAlign="bottom"
            height={36}
          />
        )}
        
        {series.filter(s => !s.hidden).map((serie, index) => (
          <Line
            key={serie.dataKey}
            type={serie.type || 'monotone'}
            dataKey={serie.dataKey}
            name={serie.name || serie.dataKey}
            stroke={serie.color || defaultColors[index % defaultColors.length]}
            strokeWidth={serie.strokeWidth || 2}
            dot={serie.dot !== undefined ? serie.dot : { r: 3 }}
            activeDot={serie.activeDot !== undefined ? serie.activeDot : { r: 7 }}
            isAnimationActive={serie.isAnimationActive !== undefined ? serie.isAnimationActive : true}
            animationDuration={serie.animationDuration || animationDuration}
            connectNulls={connectNulls}
            strokeLinecap={roundedCorners ? 'round' : undefined}
            strokeLinejoin={roundedCorners ? 'round' : undefined}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}; 