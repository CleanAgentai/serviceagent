import OpenAI from 'openai';
import { MarketingAnalytics, BestTimeToSend, ChannelPerformance } from '@/types/marketingAnalytics';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateMarketingInsights(
  analytics: MarketingAnalytics
): Promise<{ summary: string[]; suggestions: MarketingAnalytics['aiInsights']['suggestions'] }> {
  try {
    const prompt = `Analyze this marketing performance data and provide insights:
    
    Overview Metrics:
    ${JSON.stringify(analytics.overview, null, 2)}
    
    Channel Performance:
    ${JSON.stringify(analytics.channelPerformance, null, 2)}
    
    Please provide:
    1. Key observations about performance changes
    2. Notable trends across channels
    3. Specific, actionable suggestions for improvement
    4. Opportunities for cross-channel optimization
    
    Format the response as a JSON object with 'summary' (array of strings) and 'suggestions' (array of objects with channel, suggestion, confidence, and potentialImpact).`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a marketing analytics expert who provides data-driven insights and actionable recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message?.content || '';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating marketing insights:', error);
    return {
      summary: ['Unable to generate insights at this time.'],
      suggestions: []
    };
  }
}

export async function predictBestSendTimes(
  channelPerformance: ChannelPerformance[]
): Promise<BestTimeToSend[]> {
  try {
    const prompt = `Based on this channel performance data, predict the best times to send marketing communications:
    
    ${JSON.stringify(channelPerformance, null, 2)}
    
    For each channel, determine:
    1. Best day of the week (0-6, where 0 is Sunday)
    2. Best hour of the day (0-23)
    3. Expected engagement rate
    4. Confidence level in the prediction
    
    Consider factors like:
    - Historical engagement patterns
    - Industry benchmarks
    - Target audience behavior
    
    Return the analysis as a JSON array of objects with channel, dayOfWeek, hourOfDay, expectedEngagement, and confidence properties.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a marketing optimization expert who analyzes engagement patterns to determine optimal timing."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.6,
    });

    const content = response.choices[0].message?.content || '';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error predicting best send times:', error);
    return [];
  }
}

export async function analyzeChannelSynergy(
  analytics: MarketingAnalytics
): Promise<{
  synergies: {
    channels: string[];
    impact: number;
    recommendation: string;
  }[];
}> {
  try {
    const prompt = `Analyze the performance data across marketing channels to identify potential synergies:
    
    ${JSON.stringify(analytics, null, 2)}
    
    Please identify:
    1. Channels that show correlated performance
    2. Opportunities for cross-channel campaigns
    3. Specific recommendations for channel integration
    
    Return the analysis as a JSON object with a 'synergies' array containing objects with channels, impact, and recommendation properties.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a marketing strategy expert who specializes in cross-channel optimization."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message?.content || '';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing channel synergy:', error);
    return { synergies: [] };
  }
} 