import { supabase } from '@/app/lib/supabase';
import setupInterviewsDatabase from './setupInterviewsDatabase';

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
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('Error checking profiles table:', checkError);
      console.log('The profiles table needs to be created by an administrator');
    } else {
      console.log('Profiles table exists');
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