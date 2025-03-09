import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { tokens } from '@/app/shared/styles/tokens';

export interface PieChartDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps extends Omit<ChartContainerProps, 'children'> {
  data: PieChartDataItem[];
  dataKey?: string;
  nameKey?: string;
  innerRadius?: number | string;
  outerRadius?: number | string;
  cornerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  labelType?: 'percent' | 'value' | 'name';
  tooltipFormatter?: (value: any, name: any, props: any) => [string, string];
  animationDuration?: number;
  isDonut?: boolean;
  activeIndex?: number;
  colorScheme?: string[];
}

/**
 * PieChart component for displaying pie/donut charts
 * Built on recharts and ChartContainer
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  innerRadius = 0,
  outerRadius = '80%',
  cornerRadius = 0,
  startAngle = 0,
  endAngle = 360,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  labelType = 'percent',
  tooltipFormatter,
  animationDuration = 800,
  isDonut = false,
  activeIndex,
  colorScheme,
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
  // If isDonut is true, set innerRadius to 60%
  const finalInnerRadius = isDonut ? '60%' : innerRadius;

  // Generate a set of default colors from our design tokens
  const defaultColors = colorScheme || [
    tokens.colors.primary.blue, 
    tokens.colors.primary.teal,
    tokens.colors.status.success,
    tokens.colors.status.warning,
    tokens.colors.status.error,
    '#8884d8', // purple
    '#82ca9d', // green
    '#ffc658', // yellow
  ];

  // Calculate percentage for labels
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Custom label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Skip labels for small sections (less than 5%)
    if (percent < 0.05) return null;

    let labelText = '';
    switch (labelType) {
      case 'percent':
        labelText = `${(percent * 100).toFixed(0)}%`;
        break;
      case 'value':
        labelText = value.toString();
        break;
      case 'name':
        labelText = name;
        break;
    }

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {labelText}
      </text>
    );
  };

  // Custom tooltip formatter to handle formatting
  const defaultTooltipFormatter = (value: any, name: string, props: any) => {
    // Format numbers with commas and add % for percent
    if (typeof value === 'number') {
      const formattedValue = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2
      }).format(value);
      
      const percentage = ((value / total) * 100).toFixed(1);
      
      return [
        `${formattedValue} (${percentage}%)`,
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
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={showLabels ? renderCustomizedLabel : undefined}
          outerRadius={outerRadius}
          innerRadius={finalInnerRadius}
          cornerRadius={cornerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          dataKey={dataKey}
          nameKey={nameKey}
          isAnimationActive={true}
          animationDuration={animationDuration}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || defaultColors[index % defaultColors.length]}
              opacity={activeIndex !== undefined && activeIndex !== index ? 0.6 : 1}
            />
          ))}
        </Pie>
        
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
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 20 }}
          />
        )}
      </RechartsPieChart>
    </ChartContainer>
  );
}; 