import { supabase } from '@/app/lib/supabase';
import setupInterviewsDatabase from './setupInterviewsDatabase';

const EXPECTED_PROFILE_COLUMNS = [
  'id',
  'updated_at',
  'username',
  'full_name',
  'avatar_url',
  'company_name',
  'company_industry',
  'company_location',
  'company_website',
  'company_primary_colour',
  'company_secondary_colour',
  'company_logo_url',
  'company_profile_completed',
];

/**
 * Sets up the database by ensuring the profiles table exists
 * This function should be called once when the application starts
 */
export async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Check if 'profiles' table exists
    try {
      console.log('Checking profiles table structure...');
      // Commented out the non-existent RPC call
      // const { data, error } = await supabase
      //  .rpc('describe_table', { table_name: 'profiles' });

      // console.log("Table description fetched:", data);
      // if (error) throw error;
      // if (!data) throw new Error('Profiles table does not exist or is inaccessible.');
      console.log('Skipping describe_table check as function may not exist.'); // Added info log
    } catch (error) {
      console.error('Error checking profiles table structure:', error);
      console.log('The profiles table needs to be created by an administrator');
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
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) {
      // If we can't list buckets due to permissions, that's expected for regular users
      console.log(
        'Cannot list storage buckets due to permissions (expected for regular users)',
      );
      return;
    }

    // If we can list buckets, check if our bucket exists
    const bucketExists = buckets.some((bucket) => bucket.name === bucketName);

    if (bucketExists) {
      console.log(`Storage bucket ${bucketName} exists`);
    } else {
      console.log(
        `Storage bucket ${bucketName} does not exist, but we won't try to create it`,
      );
      console.log(
        'An admin should create this bucket with public access for logo uploads to work',
      );
    }
  } catch (error) {
    console.error(`Error checking bucket ${bucketName}:`, error);
  }
}

export default setupDatabase;
