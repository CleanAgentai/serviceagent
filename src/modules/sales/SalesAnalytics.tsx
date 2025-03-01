import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { AlertCircle, TrendingUp, DollarSign, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import { Lead } from '@/types/leads';

interface SalesAnalyticsProps {
  leads: Lead[];
  marketingSpend?: Record<string, number>; // Optional marketing spend data by source
}

// Custom colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const RADIAN = Math.PI / 180;

const SalesAnalytics: React.FC<SalesAnalyticsProps> = ({ leads, marketingSpend }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('bar');

  // Calculate funnel data
  const funnelData = useMemo(() => {
    const totalLeads = leads.length;
    const contactedLeads = leads.filter(lead => lead.status !== 'New').length;
    const qualifiedLeads = leads.filter(lead => ['Qualified', 'Converted'].includes(lead.status)).length;
    const closedDeals = leads.filter(lead => lead.status === 'Converted').length;

    return [
      { name: 'Total Leads', value: totalLeads },
      { name: 'Contacted', value: contactedLeads },
      { name: 'Qualified', value: qualifiedLeads },
      { name: 'Closed Deals', value: closedDeals }
    ];
  }, [leads]);

  // Calculate drop-off percentages
  const dropOffInsights = useMemo(() => {
    const insights = [];
    
    if (funnelData[0].value > 0) {
      const contactDropOff = 100 - (funnelData[1].value / funnelData[0].value * 100);
      if (contactDropOff > 50) {
        insights.push({
          stage: 'Contact',
          message: 'High drop-off at contact stage—review initial outreach strategy.',
          severity: 'high'
        });
      }
    }
    
    if (funnelData[1].value > 0) {
      const qualificationDropOff = 100 - (funnelData[2].value / funnelData[1].value * 100);
      if (qualificationDropOff > 60) {
        insights.push({
          stage: 'Qualification',
          message: 'High drop-off at qualification stage—review qualification criteria.',
          severity: 'high'
        });
      }
    }
    
    if (funnelData[2].value > 0) {
      const closingDropOff = 100 - (funnelData[3].value / funnelData[2].value * 100);
      if (closingDropOff > 70) {
        insights.push({
          stage: 'Closing',
          message: 'High drop-off at closing stage—review sales pitch and negotiation tactics.',
          severity: 'high'
        });
      }
    }
    
    return insights;
  }, [funnelData]);

  // Calculate source data
  const sourceData = useMemo(() => {
    const sourceCounts: Record<string, { count: number, converted: number }> = {};
    
    leads.forEach(lead => {
      const source = lead.source || 'Unknown';
      if (!sourceCounts[source]) {
        sourceCounts[source] = { count: 0, converted: 0 };
      }
      sourceCounts[source].count++;
      if (lead.status === 'Converted') {
        sourceCounts[source].converted++;
      }
    });
    
    return Object.entries(sourceCounts).map(([source, data]) => ({
      name: source,
      leads: data.count,
      converted: data.converted,
      conversionRate: data.count > 0 ? (data.converted / data.count * 100).toFixed(1) : '0',
      costPerLead: marketingSpend && marketingSpend[source] ? 
        (marketingSpend[source] / data.count).toFixed(2) : undefined
    }));
  }, [leads, marketingSpend]);

  // Custom renderer for active segment in pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} leads`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-8">
      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel</h2>
          <div className="text-sm text-gray-500">
            Overall Conversion Rate: {funnelData[0].value > 0 
              ? `${(funnelData[3].value / funnelData[0].value * 100).toFixed(1)}%` 
              : '0%'}
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={funnelData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value} leads`, 'Count']}
                labelFormatter={(label) => `Stage: ${label}`}
              />
              <Bar dataKey="value" fill="#3b82f6" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* AI Insights */}
        {dropOffInsights.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-700">AI Insights</h3>
            {dropOffInsights.map((insight, index) => (
              <div 
                key={index} 
                className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-md"
              >
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">{insight.stage} Stage</p>
                  <p className="text-sm text-amber-700">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Lead Source Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Lead Source Performance</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-md ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <BarChartIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`p-1.5 rounded-md ${chartType === 'pie' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <PieChartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart
                width={500}
                height={300}
                data={sourceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'conversionRate') return [`${value}%`, 'Conversion Rate'];
                    return [value, name === 'leads' ? 'Total Leads' : 'Converted Leads'];
                  }}
                  labelFormatter={(label) => `Source: ${label}`}
                />
                <Legend />
                <Bar dataKey="leads" fill="#3b82f6" name="Total Leads" />
                <Bar dataKey="converted" fill="#10b981" name="Converted" />
              </BarChart>
            ) : (
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="leads"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Source Performance Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leads
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Converted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                {marketingSpend && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost Per Lead
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sourceData.map((source, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {source.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.leads}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.converted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className={`mr-2 ${Number(source.conversionRate) > 20 ? 'text-green-600' : 'text-gray-600'}`}>
                        {source.conversionRate}%
                      </span>
                      {Number(source.conversionRate) > 20 && (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </td>
                  {marketingSpend && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {source.costPerLead ? (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                          {source.costPerLead}
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics; 