import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  Grid
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CandidateStatus } from '@/types/hiring';

interface HiringMetrics {
  funnel: {
    stages: Array<{
      stage: CandidateStatus;
      count: number;
      dropOffRate: number;
      averageDuration: number;
    }>;
    totalApplications: number;
    totalScreenings: number;
    totalInterviews: number;
    totalOffers: number;
    totalRejections: number;
  };
}

interface HiringMetricsDashboardProps {
  metrics: HiringMetrics;
  dateRange: 'week' | 'month' | 'quarter' | 'year';
  onDateRangeChange: (range: 'week' | 'month' | 'quarter' | 'year') => void;
}

const HiringMetricsDashboard: React.FC<HiringMetricsDashboardProps> = ({
  metrics,
  dateRange,
  onDateRangeChange
}) => {
    const funnelData = [
      {
      name: 'Applications',
      count: metrics.funnel.totalApplications,
      color: '#2196F3'
    },
    {
      name: 'Screenings',
      count: metrics.funnel.totalScreenings,
      color: '#4CAF50'
    },
    {
      name: 'Interviews',
      count: metrics.funnel.totalInterviews,
      color: '#FFC107'
    },
    {
      name: 'Offers',
      count: metrics.funnel.totalOffers,
      color: '#9C27B0'
    },
    {
      name: 'Rejections',
      count: metrics.funnel.totalRejections,
      color: '#F44336'
    }
  ];

  const stageData = metrics.funnel.stages.map(stage => ({
    name: stage.stage,
    count: stage.count,
    dropOffRate: stage.dropOffRate,
    averageDuration: stage.averageDuration
  }));

  const calculatePercentage = (count: number) => {
    return ((count / metrics.funnel.totalApplications) * 100).toFixed(1);
  };

    return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Hiring Pipeline Metrics
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button
            onClick={() => onDateRangeChange('week')}
            variant={dateRange === 'week' ? 'contained' : 'outlined'}
          >
            Week
          </Button>
          <Button
            onClick={() => onDateRangeChange('month')}
            variant={dateRange === 'month' ? 'contained' : 'outlined'}
          >
            Month
          </Button>
          <Button
            onClick={() => onDateRangeChange('quarter')}
            variant={dateRange === 'quarter' ? 'contained' : 'outlined'}
          >
            Quarter
          </Button>
          <Button
            onClick={() => onDateRangeChange('year')}
            variant={dateRange === 'year' ? 'contained' : 'outlined'}
          >
            Year
          </Button>
        </ButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {funnelData.map((item) => (
          <Grid item xs={12} sm={6} md={2.4} key={item.name}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="h4">
                  {item.count}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {calculatePercentage(item.count)}% of total
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, height: 400 }}>
        <Typography variant="h6" gutterBottom>
          Pipeline Conversion
        </Typography>
        <ResponsiveContainer>
          <BarChart data={stageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#2196F3" name="Count" />
            <Bar dataKey="dropOffRate" fill="#F44336" name="Drop-off Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default HiringMetricsDashboard; 