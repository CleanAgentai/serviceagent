import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  MessageSquare,
  Filter,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { DataTable, DataTableColumn } from '../../app/shared/components/tables/DataTable';
import { Sparkline } from '../../app/shared/components/charts/Sparkline';
import { AIInsightsPanel, InsightItem } from '../../app/shared/components/ai';

// Add threshold types
interface ThresholdAlert {
  value: number;
  type: 'warning' | 'success';
  message: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon?: React.ReactNode;
  iconColor?: string;
  sparklineData?: number[];
  prefix?: string;
  suffix?: string;
  loading?: boolean;
  threshold?: ThresholdAlert; // Add threshold prop
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon,
  iconColor = 'bg-blue-50',
  sparklineData,
  prefix = '',
  suffix = '',
  loading = false,
  threshold
}) => (
  <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${threshold ? threshold.type === 'warning' ? 'border-2 border-red-300' : threshold.type === 'success' ? 'border-2 border-green-300' : '' : ''}`}>
    {loading ? (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-xl bg-gray-200 animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-9 bg-gray-200 rounded animate-pulse mt-3"></div>
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${iconColor}`}>
            {icon}
          </div>
          <span className={`flex items-center text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {change}
          </span>
        </div>
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline">
          {prefix && <span className="text-gray-500 mr-1">{prefix}</span>}
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {suffix && <span className="text-gray-500 ml-1">{suffix}</span>}
        </div>
        
        {/* Threshold Alert */}
        {threshold && (
          <div className={`mt-3 flex items-center px-3 py-2 rounded-md text-sm ${
            threshold.type === 'warning' 
              ? 'bg-red-50 text-red-700' 
              : 'bg-green-50 text-green-700'
          }`}>
            {threshold.type === 'warning' 
              ? <AlertTriangle className="h-4 w-4 mr-2" /> 
              : <CheckCircle className="h-4 w-4 mr-2" />
            }
            <span>{threshold.message}</span>
          </div>
        )}
        
        {/* Sparkline */}
        {sparklineData && (
          <div className="mt-3 h-9">
            <Sparkline 
              data={sparklineData} 
              trend={trend} 
              height={36}
            />
          </div>
        )}
      </>
    )}
  </div>
);

// Time range related interfaces
type TimeRange = '7d' | '30d' | '90d';

interface TimeRangeOption {
  value: TimeRange;
  label: string;
}

interface ChartCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, value, change, trend, children }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-gray-900 font-semibold mb-1">{title}</h3>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900 mr-3">{value}</span>
          <span className={`flex items-center text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {change}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Download className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Filter className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
    {children}
  </div>
);

// Interfaces
interface MetricsSummary {
  spend: string;
  revenue: string;
  roas: string;
  conversionRate: string;
}

interface MetricsData {
  summary: MetricsSummary;
  detailed: DetailedMetric[];
}

interface DetailedMetric {
  name: string;
  spend: string;
  cpc: string;
  ctr: string;
  conversions: number;
  cpa: string;
  trend: number[];
  change: string;
}

// Helper functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Generate sparkline data based on metric type and time range
const generateSparklineData = (timeRange: TimeRange, type: 'spend' | 'revenue' | 'growth' | 'conversion'): number[] => {
  // Determine number of data points based on time range
  const dataPoints = timeRange === '7d' ? 7 : timeRange === '30d' ? 10 : 12;
  
  // Set base values and volatility based on metric type
  let baseValue: number;
  let volatility: number;
  
  switch (type) {
    case 'spend':
      baseValue = 1000;
      volatility = 0.2;
      break;
    case 'revenue':
      baseValue = 5000;
      volatility = 0.15;
      break;
    case 'growth':
      baseValue = 10;
      volatility = 0.3;
      break;
    case 'conversion':
      baseValue = 3;
      volatility = 0.1;
      break;
    default:
      baseValue = 100;
      volatility = 0.2;
  }
  
  // Generate random data with slight upward trend
  return Array.from({ length: dataPoints }, (_, i) => {
    // Add slight upward trend
    const trendFactor = 1 + (i / dataPoints) * 0.2;
    // Add random variation
    const randomFactor = 1 + (Math.random() * 2 - 1) * volatility;
    return baseValue * trendFactor * randomFactor;
  });
};

// Generate insights based on metrics data
const generateInsights = (metricsData: MetricsData | null, timeRange: TimeRange): InsightItem[] => {
  if (!metricsData) return [];
  
  const insights: InsightItem[] = [];
  
  // Parse summary metrics for numerical comparisons
  const spend = parseFloat(metricsData.summary.spend.replace(/[^0-9.-]+/g, ''));
  const revenue = parseFloat(metricsData.summary.revenue.replace(/[^0-9.-]+/g, ''));
  const roas = parseFloat(metricsData.summary.roas);
  const conversionRate = parseFloat(metricsData.summary.conversionRate);
  
  // Budget insight
  insights.push({
    id: 'budget-insight',
    title: 'Budget Analysis',
    description: `This ${timeRange === '7d' ? 'week' : timeRange === '30d' ? 'month' : 'quarter'}'s spend is ${
      Math.random() > 0.5 ? '15% higher' : '10% lower'
    } than average. ${
      Math.random() > 0.5 ? 'Consider adjusting marketing budgets.' : 'Budget allocation is on target.'
    }`,
    category: 'Budget',
    priority: 'medium',
    actionable: true,
    action: {
      label: 'Review Budget',
      onClick: () => console.log('Review budget clicked')
    }
  });
  
  // Campaign correlation insight
  insights.push({
    id: 'correlation-insight',
    title: 'Campaign Correlation',
    description: `When ${metricsData.detailed[Math.floor(Math.random() * metricsData.detailed.length)].name} spend increased by ${
      Math.floor(Math.random() * 30) + 10
    }%, conversions rose by ${
      Math.floor(Math.random() * 15) + 5
    }%. Consider increasing allocation to this campaign.`,
    category: 'Performance',
    priority: 'high',
    actionable: true,
    action: {
      label: 'Optimize Campaigns',
      onClick: () => console.log('Optimize campaigns clicked')
    }
  });
  
  // ROI recommendation
  insights.push({
    id: 'roi-recommendation',
    title: 'ROI Optimization',
    description: `${metricsData.detailed[0].name} has the highest ROI among all campaigns. Focus on this campaign for better returns.`,
    category: 'Recommendation',
    priority: 'high',
    actionable: true,
    action: {
      label: 'View Campaign',
      onClick: () => console.log('View campaign clicked')
    }
  });
  
  // Add threshold-specific insights based on data
  if (spend > 40000) {
    insights.push({
      id: 'spend-threshold-warning',
      title: 'Spend Threshold Alert',
      description: `Your total ad spend of ${metricsData.summary.spend} has exceeded your quarterly budget threshold of $40,000. Consider reallocating budget or pausing low-performing campaigns.`,
      category: 'Warning',
      priority: 'high',
      actionable: true,
      action: {
        label: 'Adjust Budget',
        onClick: () => console.log('Adjust budget clicked')
      }
    });
  }
  
  if (revenue > 80000) {
    insights.push({
      id: 'revenue-threshold-success',
      title: 'Revenue Target Achieved',
      description: `Congratulations! Your revenue of ${metricsData.summary.revenue} has surpassed your quarterly target of $80,000. Consider increasing investments in your top-performing channels.`,
      category: 'Success',
      priority: 'medium',
      actionable: true,
      action: {
        label: 'Scale Strategy',
        onClick: () => console.log('Scale strategy clicked')
      }
    });
  }
  
  // Check for high-performing or underperforming campaigns
  const highPerformingCampaigns = metricsData.detailed.filter(metric => {
    const changeValue = parseFloat(metric.change);
    return changeValue > 25;
  });
  
  if (highPerformingCampaigns.length > 0) {
    const campaignNames = highPerformingCampaigns.map(c => c.name).join(', ');
    insights.push({
      id: 'high-performing-campaigns',
      title: 'High Growth Detected',
      description: `The following campaigns are showing exceptional growth: ${campaignNames}. Consider allocating more resources to maximize their potential.`,
      category: 'Opportunity',
      priority: 'high',
      actionable: true,
      action: {
        label: 'Scale Campaigns',
        onClick: () => console.log('Scale campaigns clicked')
      }
    });
  }
  
  const underperformingCampaigns = metricsData.detailed.filter(metric => {
    const changeValue = parseFloat(metric.change);
    return changeValue < -15;
  });
  
  if (underperformingCampaigns.length > 0) {
    const campaignNames = underperformingCampaigns.map(c => c.name).join(', ');
    insights.push({
      id: 'underperforming-campaigns',
      title: 'Performance Drop Detected',
      description: `The following campaigns are showing significant decline: ${campaignNames}. Review and optimize or consider pausing to prevent budget waste.`,
      category: 'Warning',
      priority: 'high',
      actionable: true,
      action: {
        label: 'Review Campaigns',
        onClick: () => console.log('Review campaigns clicked')
      }
    });
  }
  
  // Data source acknowledgment
  insights.push({
    id: 'data-source',
    title: 'Data Sources',
    description: 'These insights are derived from Google Ads, Facebook Ads, and internal analytics data for the selected time period.',
    category: 'Information',
    priority: 'low'
  });
  
  return insights;
};

// Add utility function to check thresholds
const checkThreshold = (
  metricName: string,
  value: string | number,
  change: string
): ThresholdAlert | undefined => {
  // Parse values
  let numValue: number;
  let changeValue: number;
  
  if (typeof value === 'string') {
    // Handle currency formatting
    if (value.startsWith('$')) {
      numValue = parseFloat(value.replace(/[$,]/g, ''));
    } else if (value.endsWith('%')) {
      numValue = parseFloat(value.replace('%', ''));
    } else {
      numValue = parseFloat(value);
    }
  } else {
    numValue = value;
  }
  
  // Parse change percentage
  changeValue = parseFloat(change.replace('%', ''));
  
  // Set thresholds based on metric type
  switch (metricName) {
    case 'Total Ad Spend':
      if (numValue > 40000) {
        return {
          value: numValue,
          type: 'warning',
          message: 'Spend exceeds budget threshold'
        };
      }
      break;
    case 'Total Revenue':
      if (numValue > 80000) {
        return {
          value: numValue,
          type: 'success',
          message: 'Revenue above quarterly target'
        };
      }
      break;
    case 'ROAS':
      if (numValue < 2.5) {
        return {
          value: numValue,
          type: 'warning',
          message: 'ROAS below target threshold'
        };
      } else if (numValue > 4) {
        return {
          value: numValue,
          type: 'success',
          message: 'ROAS exceeds performance target'
        };
      }
      break;
    case 'Conversion Rate':
      if (changeValue < -2) {
        return {
          value: numValue,
          type: 'warning',
          message: 'Declining conversion rate'
        };
      } else if (changeValue > 10) {
        return {
          value: numValue,
          type: 'success',
          message: 'Conversion rate growing significantly'
        };
      }
      break;
  }
  
  return undefined;
};

export default function Metrics() {
  // Time range state
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Time range options
  const timeRangeOptions = [
    { value: '7d', label: 'Weekly' },
    { value: '30d', label: 'Monthly' },
    { value: '90d', label: '90 Days' }
  ];

  // Fetch metrics data
  const fetchMetricsData = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate summary metrics
    const summary: MetricsSummary = {
      spend: formatCurrency(Math.random() * 50000 + 10000),
      revenue: formatCurrency(Math.random() * 100000 + 50000),
      roas: (Math.random() * 3 + 2).toFixed(2),
      conversionRate: `${(Math.random() * 5 + 2).toFixed(2)}%`,
    };
    
    // Generate detailed metrics
    const detailed: DetailedMetric[] = [
      {
        name: 'Ad Spend',
        spend: formatCurrency(Math.random() * 20000 + 5000),
        cpc: formatCurrency(Math.random() * 2 + 0.5),
        ctr: `${(Math.random() * 3 + 1).toFixed(2)}%`,
        conversions: Math.floor(Math.random() * 500 + 100),
        cpa: formatCurrency(Math.random() * 50 + 10),
        trend: generateSparklineData(timeRange, 'spend'),
        change: `${(Math.random() * 30 - 10).toFixed(1)}%`
      },
      {
        name: 'Revenue',
        spend: formatCurrency(Math.random() * 40000 + 10000),
        cpc: formatCurrency(Math.random() * 2 + 0.5),
        ctr: `${(Math.random() * 3 + 1).toFixed(2)}%`,
        conversions: Math.floor(Math.random() * 800 + 200),
        cpa: formatCurrency(Math.random() * 40 + 15),
        trend: generateSparklineData(timeRange, 'revenue'),
        change: `${(Math.random() * 40).toFixed(1)}%`
      },
      {
        name: 'Growth',
        spend: formatCurrency(Math.random() * 15000 + 3000),
        cpc: formatCurrency(Math.random() * 1.5 + 0.3),
        ctr: `${(Math.random() * 4 + 2).toFixed(2)}%`,
        conversions: Math.floor(Math.random() * 300 + 50),
        cpa: formatCurrency(Math.random() * 30 + 20),
        trend: generateSparklineData(timeRange, 'growth'),
        change: `${(Math.random() * 50 + 10).toFixed(1)}%`
      },
      {
        name: 'Conversion',
        spend: formatCurrency(Math.random() * 25000 + 8000),
        cpc: formatCurrency(Math.random() * 1.8 + 0.6),
        ctr: `${(Math.random() * 3.5 + 1.5).toFixed(2)}%`,
        conversions: Math.floor(Math.random() * 600 + 150),
        cpa: formatCurrency(Math.random() * 35 + 15),
        trend: generateSparklineData(timeRange, 'conversion'),
        change: `${(Math.random() * 35 + 5).toFixed(1)}%`
      }
    ];
    
    setMetricsData({ summary, detailed });
    setIsLoading(false);
  }, [timeRange]);

  // Fetch metrics data on mount and when timeRange changes
  useEffect(() => {
    fetchMetricsData();
  }, [fetchMetricsData]);

  return (
    <div className="space-y-8 p-6">
      {/* Header with Time Range Switcher */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your business performance metrics</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Time Range Switcher */}
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTimeRange(option.value as '7d' | '30d' | '90d')}
                  className={`px-4 py-2 text-sm font-medium ${
                    timeRange === option.value
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } ${
                    option.value === '7d' 
                      ? 'rounded-l-lg border border-r-0 border-gray-300' 
                      : option.value === '90d'
                        ? 'rounded-r-lg border border-gray-300'
                        : 'border border-r-0 border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </button>
            
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Ad Spend"
          value={metricsData?.summary.spend || '$0'}
          change={"+12.3%"}
          trend="up"
          loading={isLoading}
          icon={<DollarSign className="h-6 w-6 text-blue-500" />}
          iconColor="bg-blue-50"
          sparklineData={metricsData ? generateSparklineData(timeRange, 'spend') : []}
          threshold={metricsData ? checkThreshold("Total Ad Spend", metricsData.summary.spend, "+12.3%") : undefined}
        />
        <MetricCard
          title="Total Revenue"
          value={metricsData?.summary.revenue || '$0'}
          change={"+8.7%"}
          trend="up"
          loading={isLoading}
          icon={<DollarSign className="h-6 w-6 text-green-500" />}
          iconColor="bg-green-50"
          sparklineData={metricsData ? generateSparklineData(timeRange, 'revenue') : []}
          threshold={metricsData ? checkThreshold("Total Revenue", metricsData.summary.revenue, "+8.7%") : undefined}
        />
        <MetricCard
          title="ROAS"
          value={metricsData?.summary.roas || '0'}
          change={"+5.2%"}
          trend="up"
          loading={isLoading}
          icon={<Target className="h-6 w-6 text-yellow-500" />}
          iconColor="bg-yellow-50"
          sparklineData={metricsData ? generateSparklineData(timeRange, 'growth') : []}
          threshold={metricsData ? checkThreshold("ROAS", metricsData.summary.roas, "+5.2%") : undefined}
        />
        <MetricCard
          title="Conversion Rate"
          value={metricsData?.summary.conversionRate || '0%'}
          change={"-2.1%"}
          trend="down"
          loading={isLoading}
          icon={<MessageSquare className="h-6 w-6 text-pink-500" />}
          iconColor="bg-pink-50"
          sparklineData={metricsData ? generateSparklineData(timeRange, 'conversion') : []}
          threshold={metricsData ? checkThreshold("Conversion Rate", metricsData.summary.conversionRate, "-2.1%") : undefined}
        />
      </div>
      
      {/* AI Insights Panel */}
      <AIInsightsPanel
        title="AI Insights & Recommendations"
        insights={generateInsights(metricsData, timeRange)}
        loading={isLoading}
        className="mb-6"
        collapsible={true}
        initiallyCollapsed={false}
        onFeedback={(insightId, isHelpful) => {
          console.log(`Insight ${insightId} was ${isHelpful ? 'helpful' : 'not helpful'}`);
        }}
      />

      {/* Detailed Metrics Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Detailed Metrics
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Breakdown by campaign type
          </p>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <DataTable
              data={metricsData?.detailed || []}
              columns={[
                { key: 'name', header: 'Campaign' },
                { 
                  key: 'spend', 
                  header: 'Spend',
                  format: (value, row) => {
                    // Parse value
                    const numericValue = parseFloat(value.replace(/[$,]/g, ''));
                    // Check threshold
                    const isHighSpend = numericValue > 15000;
                    
                    return (
                      <div className={`${isHighSpend ? 'relative' : ''}`}>
                        <span className={isHighSpend ? 'font-medium text-red-600' : ''}>{value}</span>
                        {isHighSpend && (
                          <div className="absolute -right-2 -top-1">
                            <span className="flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                },
                { key: 'cpc', header: 'CPC' },
                { key: 'ctr', header: 'CTR' },
                { 
                  key: 'conversions', 
                  header: 'Conversions',
                  format: (value) => {
                    // Check threshold
                    const isHighConversion = value > 500;
                    
                    return (
                      <div className={`${isHighConversion ? 'relative' : ''}`}>
                        <span className={isHighConversion ? 'font-medium text-green-600' : ''}>{value}</span>
                        {isHighConversion && (
                          <div className="absolute -right-2 -top-1">
                            <span className="flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                },
                { key: 'cpa', header: 'CPA' },
                { 
                  key: 'trend', 
                  header: 'Trend',
                  format: (value) => (
                    <div className="w-24 h-8">
                      <Sparkline data={value} />
                    </div>
                  )
                },
                { 
                  key: 'change', 
                  header: 'Change',
                  format: (value) => {
                    const numValue = parseFloat(value);
                    const isPositive = numValue >= 0;
                    // Check thresholds
                    const isHighGrowth = numValue > 25;
                    const isSignificantDrop = numValue < -15;
                    
                    let textColor = isPositive ? 'text-green-600' : 'text-red-600';
                    if (isHighGrowth) textColor = 'text-green-700 font-bold';
                    if (isSignificantDrop) textColor = 'text-red-700 font-bold';
                    
                    return (
                      <div className="inline-flex items-center">
                        <span className={textColor}>
                          {isPositive ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          {value}
                          {isHighGrowth && (
                            <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
                          )}
                          {isSignificantDrop && (
                            <AlertTriangle className="h-4 w-4 ml-1 text-red-500" />
                          )}
                        </span>
                      </div>
                    );
                  }
                },
              ]}
              title="Detailed Metrics"
              pageSize={10}
              exportFilename={`metrics_${timeRange}`}
            />
          )}
        </div>
      </div>
      
      {/* Add a legend for the threshold indicators */}
      <div className="bg-white rounded-lg shadow overflow-hidden p-4 mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-3">Alert Legend</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="mr-2 w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700">High Spend Alert (&gt;$15,000)</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">High Conversion Alert (&gt;500)</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm text-gray-700">High Growth Alert (&gt;25%)</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-sm text-gray-700">Significant Drop Alert (&gt;15%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}