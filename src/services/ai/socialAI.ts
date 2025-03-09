import { Platform, ContentSuggestion, PostingTimeRecommendation, HashtagAnalytics } from '@/types/social';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface GenerateContentParams {
  topic: string;
  platforms: Platform[];
  tone?: 'professional' | 'casual' | 'friendly' | 'humorous';
  targetAudience?: string[];
  contentType?: 'text' | 'image' | 'video' | 'carousel';
}

export async function getContentSuggestions({
  topic,
  platforms,
  tone = 'professional',
  targetAudience = ['professionals', 'decision-makers'],
  contentType = 'text'
}: GenerateContentParams): Promise<ContentSuggestion[]> {
  try {
    const prompt = `Generate 3 engaging social media posts about "${topic}" for ${platforms.join(', ')}. 
    Tone: ${tone}
    Target Audience: ${targetAudience.join(', ')}
    Content Type: ${contentType}
    
    Include relevant hashtags and estimate engagement rates.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a social media expert who creates engaging content optimized for different platforms."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    // Process and structure the AI response into ContentSuggestion objects
    const suggestions: ContentSuggestion[] = response.choices.map(choice => {
      const content = choice.message?.content || '';
      return {
        content: content.split('#')[0].trim(),
        hashtags: extractHashtags(content),
        platforms,
        estimatedEngagement: Math.floor(Math.random() * 30) + 20, // Mock engagement rate
        targetAudience,
        mediaRecommendations: contentType !== 'text' ? [{
          type: contentType as 'image' | 'video' | 'carousel',
          description: 'AI-generated media recommendation'
        }] : undefined
      };
    });

    return suggestions;
  } catch (error) {
    console.error('Error generating content suggestions:', error);
    throw error;
  }
}

export async function getBestPostingTimes({
  platforms,
  timezone = 'UTC'
}: {
  platforms: Platform[];
  timezone?: string;
}): Promise<Date[]> {
  // Mock implementation - in production, this would analyze historical data
  const now = new Date();
  const recommendations: Date[] = [];

  for (let i = 0; i < 3; i++) {
    const date = new Date(now);
    date.setHours(9 + i * 3); // 9am, 12pm, 3pm
    date.setMinutes(0);
    recommendations.push(date);
  }

  return recommendations;
}

export async function generateHashtags({
  content,
  platforms
}: {
  content: string;
  platforms: Platform[];
}): Promise<string[]> {
  try {
    const prompt = `Generate relevant hashtags for this social media post:
    "${content}"
    Platforms: ${platforms.join(', ')}
    Include both popular and niche hashtags.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a social media hashtag expert who knows the best tags for maximum reach and engagement."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.6,
    });

    const hashtags = extractHashtags(response.choices[0].message?.content || '');
    return hashtags;
  } catch (error) {
    console.error('Error generating hashtags:', error);
    throw error;
  }
}

export async function analyzeHashtags(tags: string[]): Promise<HashtagAnalytics[]> {
  // Mock implementation - in production, this would call social media APIs
  return tags.map(tag => ({
    tag,
    volume: Math.floor(Math.random() * 1000000),
    engagement: Math.random() * 5,
    relevance: Math.random() * 100,
    trending: Math.random() > 0.7,
    relatedTags: ['business', 'marketing', 'success'].map(t => tag + t),
    competitorUsage: Math.floor(Math.random() * 100)
  }));
}

function extractHashtags(text: string): string[] {
  const hashtags = text.match(/#[\w\u0590-\u05ff]+/g) || [];
  return hashtags.map(tag => tag.slice(1)); // Remove # prefix
}

export async function analyzePostPerformance(content: string): Promise<{
  sentiment: number;
  clarity: number;
  engagement: number;
  suggestions: string[];
}> {
  try {
    const prompt = `Analyze this social media post and provide feedback:
    "${content}"
    
    Consider:
    1. Sentiment and tone
    2. Clarity and readability
    3. Potential engagement
    4. Suggestions for improvement`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a social media analytics expert who provides detailed content analysis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
    });

    // Mock scoring based on AI feedback
    return {
      sentiment: Math.random() * 100,
      clarity: Math.random() * 100,
      engagement: Math.random() * 100,
      suggestions: response.choices[0].message?.content?.split('\n') || []
    };
  } catch (error) {
    console.error('Error analyzing post:', error);
    throw error;
  }
} 