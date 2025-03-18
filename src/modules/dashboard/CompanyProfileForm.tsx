import React, { useState, useEffect } from 'react';
import { Building, Upload, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { industries } from '@/lib/constants';
import { ColorPicker } from '@/components/ui/color-picker';

interface CompanyProfileFormProps {
  onComplete?: () => void;
}

export function CompanyProfileForm({ onComplete }: CompanyProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyPrimaryColour, setCompanyPrimaryColour] = useState('#4f46e5');
  const [companySecondaryColour, setCompanySecondaryColour] = useState('#818cf8');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // Load existing profile data if available
  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log('No user found');
          return;
        }
        
        // First check if the profile exists at all
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          if (profileError.code === 'PGRST116') {
            console.log('No profile found for user, will create one on save');
          } else {
            console.error('Error loading profile:', profileError);
          }
          return;
        }
        
        if (profile) {
          // Only set values if they exist in the profile
          if (profile.company_name) setCompanyName(profile.company_name);
          if (profile.company_industry) setCompanyIndustry(profile.company_industry);
          if (profile.company_location) setCompanyLocation(profile.company_location);
          if (profile.company_website) setCompanyWebsite(profile.company_website);
          if (profile.company_primary_colour) setCompanyPrimaryColour(profile.company_primary_colour);
          if (profile.company_secondary_colour) setCompanySecondaryColour(profile.company_secondary_colour);
          
          if (profile.company_logo_url) {
            setLogoPreview(profile.company_logo_url);
          }
        }
      } catch (error) {
        console.error('Error in loadProfile:', error);
      }
    }
    
    loadProfile();
  }, []);
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Logo file size must be less than 5MB');
        return;
      }
      
      setCompanyLogo(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!companyName) {
        setError('Company name is required');
        setLoading(false);
        return;
      }
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting user:', userError);
        setError('Authentication error. Please try again.');
        setLoading(false);
        return;
      }
      
      if (!user) {
        setError('You must be logged in to save your company profile');
        setLoading(false);
        return;
      }
      
      // Upload logo if provided
      let logoUrl = logoPreview;
      
      if (companyLogo) {
        try {
          // Check if we can access the bucket first
          const bucketName = 'company-assets';
          const { data: bucketFiles, error: listError } = await supabase.storage
            .from(bucketName)
            .list();
          
          // If we can list files, we can probably upload
          if (!listError) {
            const fileExt = companyLogo.name.split('.').pop();
            const fileName = `${user.id}-logo-${Date.now()}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from(bucketName)
              .upload(fileName, companyLogo, {
                cacheControl: '3600',
                upsert: true
              });
            
            if (uploadError) {
              console.error('Error uploading logo:', uploadError);
              // Continue without logo
              toast.error('Could not upload logo, but will save other profile data');
            } else {
              // Get public URL
              const { data: publicUrlData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName);
              
              logoUrl = publicUrlData.publicUrl;
            }
          } else {
            console.error('Cannot access storage bucket:', listError);
            toast.error('Could not access storage for logo upload, but will save other profile data');
          }
        } catch (logoError) {
          console.error('Error handling logo upload:', logoError);
          // Continue without logo
          toast.error('Could not upload logo, but will save other profile data');
        }
      }
      
      // First, check if the profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      let profileExists = false;
      
      if (checkError) {
        if (checkError.code === 'PGRST116') {
          // No profile found, we'll need to create one
          profileExists = false;
        } else {
          console.error('Error checking if profile exists:', checkError);
          // Assume profile doesn't exist to be safe
          profileExists = false;
        }
      } else {
        // Profile exists
        profileExists = true;
      }
      
      // Prepare minimal data for initial save
      const minimalProfileData = {
        id: user.id,
        updated_at: new Date().toISOString()
      };
      
      // If profile doesn't exist, create it with minimal data
      if (!profileExists) {
        const { error: createError } = await supabase
          .from('profiles')
          .insert(minimalProfileData);
        
        if (createError) {
          console.error('Error creating profile:', createError);
          setError('Could not create your profile. Please try again later.');
          setLoading(false);
          return;
        }
      }
      
      // Now try to update with company data one field at a time
      const updateFields = [
        { field: 'company_name', value: companyName },
        { field: 'company_industry', value: companyIndustry },
        { field: 'company_location', value: companyLocation },
        { field: 'company_website', value: companyWebsite },
        { field: 'company_primary_colour', value: companyPrimaryColour },
        { field: 'company_secondary_colour', value: companySecondaryColour },
        { field: 'company_logo_url', value: logoUrl }
      ];
      
      let successCount = 0;
      
      // Update each field individually to handle missing columns
      for (const { field, value } of updateFields) {
        if (value !== null && value !== undefined) {
          try {
            const updateData = {};
            updateData[field] = value;
            
            const { error: fieldUpdateError } = await supabase
              .from('profiles')
              .update(updateData)
              .eq('id', user.id);
            
            if (fieldUpdateError) {
              console.warn(`Could not update field ${field}:`, fieldUpdateError);
              // Continue with other fields
            } else {
              successCount++;
            }
          } catch (updateError) {
            console.error(`Error updating field ${field}:`, updateError);
            // Continue with other fields
          }
        }
      }
      
      // Try to update the company_profile_completed field
      try {
        const { error: completedError } = await supabase
          .from('profiles')
          .update({ company_profile_completed: true })
          .eq('id', user.id);
        
        if (completedError) {
          console.warn('Could not update company_profile_completed:', completedError);
        }
      } catch (completedError) {
        console.error('Error updating company_profile_completed:', completedError);
      }
      
      // Update user metadata - this is the most important part as we use it for profile completion check
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          company_name: companyName,
          company_industry: companyIndustry,
          company_location: companyLocation,
          company_profile_completed: true
        }
      });
      
      if (updateError) {
        console.error('Error updating user metadata:', updateError);
        // Continue anyway as we tried to save the profile
      }
      
      if (successCount > 0 || !updateError) {
        toast.success('Company profile saved successfully');
        
        if (onComplete) {
          onComplete();
        }
      } else {
        setError('Could not save any profile data. Please try again later.');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>
          Set up your company profile to customize your experience
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Inc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyIndustry">Industry *</Label>
              <Select value={companyIndustry} onValueChange={setCompanyIndustry}>
                <SelectTrigger id="companyIndustry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyLocation">Location *</Label>
              <Input
                id="companyLocation"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                placeholder="City, Country"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Website (Optional)</Label>
              <Input
                id="companyWebsite"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                placeholder="https://example.com"
                type="url"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyPrimaryColour">Primary Color (Optional)</Label>
              <ColorPicker
                id="companyPrimaryColour"
                value={companyPrimaryColour}
                onChange={setCompanyPrimaryColour}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companySecondaryColour">Secondary Color (Optional)</Label>
              <ColorPicker
                id="companySecondaryColour"
                value={companySecondaryColour}
                onChange={setCompanySecondaryColour}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyLogo">Company Logo (Optional)</Label>
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="w-16 h-16 rounded overflow-hidden border border-gray-200">
                  <img
                    src={logoPreview}
                    alt="Company logo preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <Input
                id="companyLogo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum file size: 5MB. Recommended formats: PNG, JPG, SVG.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Company Profile'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 