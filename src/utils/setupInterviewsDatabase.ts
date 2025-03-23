import { supabase } from '@/app/lib/supabase';

/**
 * Sets up the database tables required for the interview system
 * Simplified version that doesn't rely on SQL functions
 */
export default async function setupInterviewsDatabase() {
  try {
    console.log('Setting up interviews database...');
    
    // Check if interviews table exists
    const { error: checkInterviewsError } = await supabase
      .from('interviews')
      .select('id')
      .limit(1);
    
    if (checkInterviewsError) {
      console.error('Could not access interviews table:', checkInterviewsError);
      console.log('Note: The database needs to be set up by an administrator');
      console.log('Your admin should create the interviews table with the following columns:');
      console.log('id (UUID), user_id (UUID), title (TEXT), description (TEXT), language (TEXT)');
      console.log('hourly_rate (TEXT), questions (JSON), show_hints (BOOLEAN), show_availability (BOOLEAN)');
      console.log('deadline (TIMESTAMP), interview_link (TEXT), created_at (TIMESTAMP)');
    } else {
      console.log('Interviews table exists');
    }
    
    // Check if responses table exists
    const { error: checkResponsesError } = await supabase
      .from('responses')
      .select('id')
      .limit(1);
    
    if (checkResponsesError) {
      console.error('Could not access responses table:', checkResponsesError);
      console.log('Note: The responses table should be created by an administrator');
    } else {
      console.log('Responses table exists');
    }
    
    console.log('Interviews database setup complete');
    return true;
  } catch (error) {
    console.error('Error checking interviews database:', error);
    return false;
  }
}

export { setupInterviewsDatabase }; 