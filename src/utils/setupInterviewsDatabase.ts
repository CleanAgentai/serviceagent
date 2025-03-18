import { supabase } from '@/lib/supabase';

/**
 * Sets up the database tables required for the interview system
 */
export async function setupInterviewsDatabase() {
  try {
    console.log('Setting up interviews database...');
    
    // Check if interviews table exists
    const { error: checkInterviewsError } = await supabase
      .from('interviews')
      .select('id')
      .limit(1);
    
    // Create interviews table if it doesn't exist
    if (checkInterviewsError && checkInterviewsError.code === 'PGRST116') {
      console.log('Creating interviews table...');
      
      // Create the interviews table
      const { error: createInterviewsError } = await supabase.rpc('create_interviews_table');
      
      if (createInterviewsError) {
        console.error('Error creating interviews table:', createInterviewsError);
        
        // Fallback: Try to create the table using SQL
        const { error: sqlError } = await supabase.rpc('execute_sql', {
          sql: `
            CREATE TABLE IF NOT EXISTS public.interviews (
              id UUID PRIMARY KEY,
              user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
              title TEXT NOT NULL,
              description TEXT NOT NULL,
              language TEXT DEFAULT 'English',
              salary TEXT,
              questions JSONB NOT NULL,
              settings JSONB,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
            
            ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
            
            CREATE POLICY "Users can create their own interviews"
              ON public.interviews
              FOR INSERT
              TO authenticated
              WITH CHECK (auth.uid() = user_id);
              
            CREATE POLICY "Users can view their own interviews"
              ON public.interviews
              FOR SELECT
              TO authenticated
              USING (auth.uid() = user_id);
              
            CREATE POLICY "Users can update their own interviews"
              ON public.interviews
              FOR UPDATE
              TO authenticated
              USING (auth.uid() = user_id);
              
            CREATE POLICY "Users can delete their own interviews"
              ON public.interviews
              FOR DELETE
              TO authenticated
              USING (auth.uid() = user_id);
          `
        });
        
        if (sqlError) {
          console.error('Error creating interviews table with SQL:', sqlError);
          throw new Error('Failed to create interviews table');
        }
      }
    }
    
    // Check if responses table exists
    const { error: checkResponsesError } = await supabase
      .from('responses')
      .select('id')
      .limit(1);
    
    // Create responses table if it doesn't exist
    if (checkResponsesError && checkResponsesError.code === 'PGRST116') {
      console.log('Creating responses table...');
      
      // Create the responses table
      const { error: createResponsesError } = await supabase.rpc('create_responses_table');
      
      if (createResponsesError) {
        console.error('Error creating responses table:', createResponsesError);
        
        // Fallback: Try to create the table using SQL
        const { error: sqlError } = await supabase.rpc('execute_sql', {
          sql: `
            CREATE TABLE IF NOT EXISTS public.responses (
              id UUID PRIMARY KEY,
              interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
              candidate_name TEXT,
              candidate_email TEXT,
              answers JSONB NOT NULL,
              submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
            
            ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
            
            CREATE POLICY "Anyone can insert responses"
              ON public.responses
              FOR INSERT
              TO authenticated, anon
              WITH CHECK (true);
              
            CREATE POLICY "Users can view responses to their interviews"
              ON public.responses
              FOR SELECT
              TO authenticated
              USING (
                interview_id IN (
                  SELECT id FROM public.interviews WHERE user_id = auth.uid()
                )
              );
          `
        });
        
        if (sqlError) {
          console.error('Error creating responses table with SQL:', sqlError);
          throw new Error('Failed to create responses table');
        }
      }
    }
    
    console.log('Interviews database setup complete');
    return true;
  } catch (error) {
    console.error('Error setting up interviews database:', error);
    return false;
  }
} 