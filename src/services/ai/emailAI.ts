import OpenAI from 'openai';
import { ReminderTemplate } from '@/types/referral';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface GenerateEmailParams {
  type: 'referral_reminder' | 'welcome' | 'conversion' | 'reward';
  frequency?: 'monthly' | 'quarterly';
  audience?: string;
  variables?: {
    [key: string]: string;
  };
}

export async function generateEmailTemplate({
  type,
  frequency,
  audience,
  variables,
}: GenerateEmailParams): Promise<ReminderTemplate> {
  try {
    const prompt = `Generate an engaging email template for a ${type} email.
    ${frequency ? `Frequency: ${frequency}` : ''}
    ${audience ? `Target Audience: ${audience}` : ''}
    ${variables ? `Available Variables: ${Object.keys(variables).join(', ')}` : ''}
    
    The email should be professional but friendly, and include:
    1. An attention-grabbing subject line
    2. A preview text that encourages opens
    3. A compelling main message
    4. A clear call-to-action
    
    Please format the response as a JSON object with subject, previewText, and body fields.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an email marketing expert who creates engaging and conversion-optimized email templates."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message?.content || '';
    let template: ReminderTemplate;

    try {
      template = JSON.parse(content);
    } catch (error) {
      // If parsing fails, create a template from the raw content
      template = {
        subject: "Refer Friends & Earn Rewards",
        previewText: "Don't miss out on earning rewards through our referral program",
        body: content,
      };
    }

    return template;
  } catch (error) {
    console.error('Error generating email template:', error);
    throw error;
  }
}

export async function personalizeTemplate(
  template: ReminderTemplate,
  variables: { [key: string]: string }
): Promise<string> {
  try {
    const prompt = `Personalize this email template with the following variables:
    Template: ${template.body}
    Variables: ${JSON.stringify(variables)}
    
    Please replace all variable placeholders with their corresponding values and ensure the tone remains consistent.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an email personalization expert who creates engaging and personalized email content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
    });

    return response.choices[0].message?.content || template.body;
  } catch (error) {
    console.error('Error personalizing template:', error);
    // Return the original template if personalization fails
    return template.body;
  }
}

export async function generateSubjectLines(
  topic: string,
  count: number = 3
): Promise<string[]> {
  try {
    const prompt = `Generate ${count} attention-grabbing email subject lines for the following topic:
    ${topic}
    
    The subject lines should:
    1. Create curiosity
    2. Be concise (under 50 characters)
    3. Avoid spam trigger words
    4. Use action-oriented language
    
    Please return only the subject lines, one per line.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an email marketing expert who creates high-converting subject lines."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
    });

    const content = response.choices[0].message?.content || '';
    return content.split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('Error generating subject lines:', error);
    throw error;
  }
}

export async function analyzeEmailPerformance(
  subject: string,
  body: string
): Promise<{
  score: number;
  suggestions: string[];
  spamRisk: 'low' | 'medium' | 'high';
  improvements: {
    category: string;
    suggestion: string;
  }[];
}> {
  try {
    const prompt = `Analyze this email content for effectiveness and potential improvements:
    Subject: ${subject}
    Body: ${body}
    
    Please evaluate:
    1. Overall effectiveness
    2. Subject line strength
    3. Call-to-action clarity
    4. Spam trigger risks
    5. Personalization opportunities
    6. Specific improvement suggestions
    
    Format the response as a JSON object with score, suggestions, spamRisk, and improvements fields.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an email marketing analyst who provides detailed content analysis and improvement suggestions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
    });

    const content = response.choices[0].message?.content || '';
    
    try {
      return JSON.parse(content);
    } catch (error) {
      // Return a default analysis if parsing fails
      return {
        score: 70,
        suggestions: ['Make the subject line more compelling', 'Add more personalization'],
        spamRisk: 'low',
        improvements: [
          {
            category: 'Subject Line',
            suggestion: 'Use more action-oriented language'
          }
        ]
      };
    }
  } catch (error) {
    console.error('Error analyzing email:', error);
    throw error;
  }
} 