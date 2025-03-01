import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { tokens } from '@/app/shared/styles/tokens';

export interface BarChartDataItem {
  [key: string]: any;
}

export interface BarSeriesConfig {
  dataKey: string;
  name?: string;
  color?: string;
  barSize?: number;
  stackId?: string;
  isAnimationActive?: boolean;
  animationDuration?: number;
  hidden?: boolean;
  radius?: number | [number, number, number, number];
}

export interface BarChartProps extends Omit<ChartContainerProps, 'children'> {
  data: BarChartDataItem[];
  series: BarSeriesConfig[];
  xAxisDataKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  grid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  animationDuration?: number;
  tooltipFormatter?: (value: any, name: any) => [string, string];
  layout?: 'vertical' | 'horizontal';
  isStacked?: boolean;
  barRadius?: number;
  activeBar?: number;
}

/**
 * BarChart component for displaying bar charts
 * Built on recharts and ChartContainer
 */
export const BarChart: React.FC<BarChartProps> = ({
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
  layout = 'horizontal',
  isStacked = false,
  barRadius = 4,
  activeBar,
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
    tokens.colors.status.warning,
    tokens.colors.status.error,
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
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {grid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
        
        <XAxis 
          dataKey={layout === 'horizontal' ? xAxisDataKey : undefined}
          type={layout === 'horizontal' ? 'category' : 'number'}
          stroke="#6b7280"
          label={xAxisLabel && layout === 'horizontal' ? { 
            value: xAxisLabel, 
            position: 'insideBottom', 
            offset: -5 
          } : undefined}
          tick={{ fontSize: 12 }}
        />
        
        <YAxis 
          dataKey={layout === 'vertical' ? xAxisDataKey : undefined}
          type={layout === 'vertical' ? 'category' : 'number'}
          stroke="#6b7280"
          label={
            layout === 'horizontal' && yAxisLabel ? { 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft' 
            } : layout === 'vertical' && xAxisLabel ? {
              value: xAxisLabel,
              position: 'insideLeft',
              offset: 10
            } : undefined
          }
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
          <Bar
            key={serie.dataKey}
            dataKey={serie.dataKey}
            name={serie.name || serie.dataKey}
            fill={serie.color || defaultColors[index % defaultColors.length]}
            barSize={serie.barSize}
            stackId={isStacked ? (serie.stackId || 'stack') : undefined}
            isAnimationActive={serie.isAnimationActive !== undefined ? serie.isAnimationActive : true}
            animationDuration={serie.animationDuration || animationDuration}
            radius={serie.radius || barRadius}
          >
            {activeBar !== undefined && data.map((entry, i) => (
              <Cell 
                key={`cell-${i}`} 
                fill={i === activeBar 
                  ? serie.color || defaultColors[index % defaultColors.length] 
                  : `${serie.color || defaultColors[index % defaultColors.length]}80`} 
              />
            ))}
          </Bar>
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}; 