import React, { useState, useEffect, useCallback } from "react";
import { Building, Upload, Trash2, ArrowRight, ChevronRight } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { ColorPicker } from '@/components/ui/color-picker';

interface CompanyProfileFormProps {
  mode: 'create' | 'update';
  onComplete?: () => void;
}

export function CompanyProfileForm({
  mode,
  onComplete,
}: CompanyProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyNiche, setCompanyNiche] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyPrimaryColour, setCompanyPrimaryColour] = useState("#0693e3");
  const [companySecondaryColour, setCompanySecondaryColour] =
    useState("#8ed1fc");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [willoKey, setWilloKey] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Load existing profile data if available
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setLoading(true); // Indicate loading
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || !isMounted) return;

        // Fetch data from company_profiles table
        const { data: companyProfile, error: profileError } = await supabase
          .from('company_profiles')
          .select('*') // Select all columns
          .eq('created_by_user_id', user.id)
          .single();

        // Also fetch company_name from profiles table (might be redundant if also in company_profiles)
        // Consider consolidating if possible in the future
        const { data: basicProfile, error: basicProfileError } = await supabase
          .from("profiles")
          .select("company_name")
          .eq("id", user.id)
          .single();

        if (!isMounted) return; // Check again after async calls

        if (profileError && profileError.code !== 'PGRST116') {
          // Ignore 'PGRST116' (single row not found)
          console.error('Error loading company profile:', profileError);
          setError('Failed to load company profile.');
        } else if (companyProfile) {
          // Set state from company_profiles data
          setCompanyLocation(companyProfile.company_location || '');
          setCompanyWebsite(companyProfile.company_website || '');
          setCompanyNiche(companyProfile.company_niche || '');
          setCompanyPrimaryColour(
            companyProfile.company_primary_colour || '#0693e3',
          );
          setCompanySecondaryColour(
            companyProfile.company_secondary_colour || '#8ed1fc',
          );
          setLogoPreview(companyProfile.company_logo_url || null);
          setWilloKey(companyProfile.willo_company_key || null);
        }

        if (basicProfileError && basicProfileError.code !== 'PGRST116') {
          console.error('Error loading basic profile:', basicProfileError);
        } else if (basicProfile) {
          setCompanyName(basicProfile.company_name || "");
        }
      } catch (error) {
        console.error('Error in loadProfile:', error);
        if (isMounted) {
          setError(
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred while loading profile.',
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Finish loading
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!firstName) {
        setError("First name is required");
        setLoading(false);
        return;
      }

      if (!lastName) {
        setError("Last name is required");
        setLoading(false);
        return;
      }

      if (!companyName) {
        setError('Company name is required');
        setLoading(false);
        return;
      }

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in to save your company profile');
        setLoading(false);
        return;
      }

      // Upload logo if provided
      let logoUrl = logoPreview;

      if (companyLogo) {
        try {
          const bucketName = 'company-assets';
          const fileExt = companyLogo.name.split('.').pop();
          const fileName = `${user.id}-logo-${Date.now()}.${fileExt}`;

          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from(bucketName)
              .upload(fileName, companyLogo, {
                cacheControl: '3600',
                upsert: true,
              });

          if (uploadError) {
            throw uploadError;
          }

          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

          logoUrl = publicUrlData.publicUrl;
        } catch (logoError) {
          console.error('Error handling logo upload:', logoError);
          toast.error('Failed to upload logo.');
        }
      }

      // Update profile with just company name
      const profileData = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
      };

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' });

      if (upsertError) {
        console.error('Error updating profile - Full error:', upsertError);
        console.error('Profile data being sent:', profileData);
        throw new Error(
          `Failed to update company profile: ${upsertError.message}`,
        );
      }

      const fullName = `${firstName} ${lastName}`.trim();
      const { error: updateUserError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          display_name: fullName,
          first_name: firstName,
          last_name: lastName
        }
      });

      if (updateUserError) {
        console.error("Error updating user metadata:", updateUserError);
        // Don't throw error here - profile was saved successfully, metadata update is secondary
      } else {
        console.log("Successfully updated user display name to:", fullName);
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

      const endpoint =
        mode === 'update' && willoKey
          ? `${apiBaseUrl}/api/departments/${willoKey}`
          : `${apiBaseUrl}/api/departments`;

      const method = mode === 'update' ? 'PATCH' : 'POST';

      console.log(endpoint);

      //  Willow BackendAPI Call
      const departmentRes = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          companyLocation,
          companyWebsite,
          companyPrimaryColour,
          companySecondaryColour,
          companyLogoUrl: logoUrl,
        }),
      });

      const departmentData = await departmentRes.json();
      if (!departmentRes.ok) {
        throw new Error(departmentData?.error || 'Failed to create department');
      }

      let niche = companyNiche;

      if (companyNiche) {
        niche = niche.toLowerCase();

        if (companyNiche == 'Restaurants and Food') {
          niche = 'food';
        }
        if(companyNiche == "Other"){
          niche = "default";
        }
      }

      // ✅ 6. company_profiles update(already the row is existing)
      const { error: companyProfileError } = await supabase
        .from('company_profiles')
        .update({
          willo_company_key: departmentData.data.key,
          company_location: companyLocation,
          company_website: companyWebsite,
          company_primary_colour: companyPrimaryColour,
          company_secondary_colour: companySecondaryColour,
          company_logo_url: logoUrl,
          company_profile_completed: true,
          company_niche: niche,
        })
        .eq('created_by_user_id', user.id); // 트리거로 만든 row 타겟팅

      if (companyProfileError) {
        console.error('Supabase update error details:', companyProfileError);
        throw new Error('Failed to update company_profiles with Willow key');
      }

      toast.success('Company profile saved successfully');

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    } finally {
      setLoading(false);
    }
  };

  const cardClassName = [
    "w-full max-w-4xl mx-auto border-0 transition-all duration-300",
    mode === "create" ? "mt-8" : "shadow-lg hover:shadow-xl",
  ].join(" ");

  return (
    <Card className={cardClassName}>
      {mode === "update" && (
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>
            Set up your company profile to customize your experience
          </CardDescription>
        </CardHeader>
      )}
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div>
                <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                <p className="text-xs text-gray-500 mt-1">Shown to candidates and on your hiring portal.</p>
              </div>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company Name"
                required
              />
            </div>

            <div className="space-y-2">
              <div>
                <Label htmlFor="companyLocation">Location <span className="text-red-500">*</span></Label>
                <p className="text-xs text-gray-500 mt-1">Shown to candidates and on your hiring portal.</p>
              </div>
              <Input
                id="companyLocation"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                placeholder="City, State"
                required
              />
            </div>

            <div className="space-y-2">
              <div>
                <Label htmlFor="companyNiche">Industry <span className="text-red-500">*</span></Label>
                <p className="text-xs text-gray-500 mt-1">We’ll tailor interviews to your industry.</p>
              </div>
              {/* Hidden input to preserve required semantics */}
              <input
                id="companyNicheHidden"
                className="sr-only"
                value={companyNiche}
                onChange={() => {}}
                required
              />
                <Select value={companyNiche} onValueChange={setCompanyNiche}>
                  <SelectTrigger id="companyNiche" className="text-[16px] text-gray-500">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cleaning">Cleaning</SelectItem>
                  <SelectItem value="Restaurants and Food">Restaurants and Food</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Staffing">Staffing</SelectItem>
                  <SelectItem value="Franchises">Franchises</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Warehouses">Warehouses</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <details className="mt-6" onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
              <summary className="group flex items-center space-x-3 cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <ChevronRight className={`w-3.5 h-3.5 text-blue-500 group-hover:text-white transition-all duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
                </div>
                 <div className="space-y-1"> 
                 <span className="text-sm whitespace-nowrap hyphens-none break-words">Advanced Settings (Optional)</span>
                 {isOpen && <p className="text-xs text-gray-500">Don't worry, you can always do this later in Settings.</p>}
                 </div>
              </summary>
              <div className="mt-4 space-y-6">
                <div className="space-y-2 pr-6">
                  <Label htmlFor="companyWebsite">Website (Optional)</Label>
                  <Input
                    id="companyWebsite"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                    className="h-10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyPrimaryColour">
                      Primary Color (Optional)
                    </Label>
                    <ColorPicker
                      id="companyPrimaryColour"
                      value={companyPrimaryColour}
                      onChange={setCompanyPrimaryColour}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySecondaryColour">
                      Secondary Color (Optional)
                    </Label>
                    <ColorPicker
                      id="companySecondaryColour"
                      value={companySecondaryColour}
                      onChange={setCompanySecondaryColour}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                  <Label htmlFor="companyLogo">Company Logo (Optional)</Label>
                  <p className="text-xs text-gray-500 mt-1">Used on your hiring portal and candidate emails.</p>
                  </div>
                  <div className="space-y-4 pr-6">
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
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum file size: 5MB. Recommended formats: PNG, JPG, SVG.
                  </p>
                </div>
              </div>
            </details>
          </div>

        </CardContent>


        <div className="px-6 space-y-2 sticky bottom-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:bg-transparent">
          <p className="text-xs text-gray-500 text-center">Takes ~60 seconds. This helps personalize your AI Hiring Assistant.</p>
        
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" disabled={loading} className="group w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="inline-flex items-center gap-2">
              {loading ? "Saving..." : mode === "create" ? "Continue to Dashboard" : "Save Company Profile"}
              {mode === "create" && !loading && (
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </span>
          </Button>


        </CardFooter>
        </div>
      </form>
    </Card>
  );
}