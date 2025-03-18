import { supabase } from '@/lib/supabase';
import { setupInterviewsDatabase } from './setupInterviewsDatabase';

/**
 * Sets up the database by ensuring the profiles table exists
 * This function should be called once when the application starts
 */
export async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Check if profiles table exists
    const { error: checkError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true });
    
    if (checkError && checkError.code === '42P01') {
      console.log('Profiles table does not exist. Creating it...');
      await createMinimalProfilesTable();
    } else if (checkError) {
      console.error('Error checking profiles table:', checkError);
    } else {
      console.log('Profiles table already exists');
      
      // Try to add company columns, but don't worry if it fails
      await tryAddCompanyColumns();
    }
    
    // Check if storage bucket exists, but don't try to create it
    await checkStorageBucket('company-assets');
    
    // Set up interviews database tables
    await setupInterviewsDatabase();
    
    console.log('Database setup completed');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

/**
 * Creates a minimal profiles table with just the essential columns
 */
async function createMinimalProfilesTable() {
  try {
    // Create a minimal profiles table with just id and updated_at
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
      
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Users can view their own profile"
        ON public.profiles FOR SELECT
        USING (auth.uid() = id);
        
      CREATE POLICY "Users can update their own profile"
        ON public.profiles FOR UPDATE
        USING (auth.uid() = id);
        
      CREATE POLICY "Users can insert their own profile"
        ON public.profiles FOR INSERT
        WITH CHECK (auth.uid() = id);
    `;
    
    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    if (createError) {
      console.error('Error creating minimal profiles table:', createError);
    } else {
      console.log('Created minimal profiles table successfully');
    }
  } catch (error) {
    console.error('Error in createMinimalProfilesTable:', error);
  }
}

/**
 * Tries to add company-related columns to the profiles table
 */
async function tryAddCompanyColumns() {
  try {
    console.log('Attempting to add company columns to profiles table...');
    
    // Define the columns we want to add
    const columnsToAdd = [
      { name: 'company_name', type: 'TEXT' },
      { name: 'company_industry', type: 'TEXT' },
      { name: 'company_location', type: 'TEXT' },
      { name: 'company_website', type: 'TEXT' },
      { name: 'company_primary_colour', type: 'TEXT' },
      { name: 'company_secondary_colour', type: 'TEXT' },
      { name: 'company_logo_url', type: 'TEXT' },
      { name: 'company_profile_completed', type: 'BOOLEAN DEFAULT FALSE' }
    ];
    
    // Try to add each column individually
    for (const { name, type } of columnsToAdd) {
      try {
        const alterSQL = `
          ALTER TABLE public.profiles 
          ADD COLUMN IF NOT EXISTS ${name} ${type};
        `;
        
        const { error } = await supabase.rpc('exec_sql', { sql: alterSQL });
        
        if (error) {
          console.warn(`Could not add column ${name}:`, error);
        } else {
          console.log(`Added column ${name} to profiles table`);
        }
      } catch (columnError) {
        console.warn(`Error adding column ${name}:`, columnError);
      }
    }
  } catch (error) {
    console.error('Error in tryAddCompanyColumns:', error);
  }
}

/**
 * Checks if a storage bucket exists, but doesn't try to create it
 * This avoids RLS policy violations for regular users
 */
async function checkStorageBucket(bucketName: string) {
  try {
    // Just check if we can list buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      // If we can't list buckets due to permissions, that's expected for regular users
      console.log('Cannot list storage buckets due to permissions (expected for regular users)');
      return;
    }
    
    // If we can list buckets, check if our bucket exists
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (bucketExists) {
      console.log(`Storage bucket ${bucketName} exists`);
    } else {
      console.log(`Storage bucket ${bucketName} does not exist, but we won't try to create it`);
      console.log('An admin should create this bucket with public access for logo uploads to work');
    }
  } catch (error) {
    console.error(`Error checking bucket ${bucketName}:`, error);
  }
}

export default setupDatabase; 