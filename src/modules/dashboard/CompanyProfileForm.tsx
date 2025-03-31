import React, { useState, useEffect, useCallback } from "react";
import { Building, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ColorPicker } from "@/components/ui/color-picker";

interface CompanyProfileFormProps {
  onComplete?: () => void;
}

export function CompanyProfileForm({ onComplete }: CompanyProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyPrimaryColour, setCompanyPrimaryColour] = useState("#0693e3");
  const [companySecondaryColour, setCompanySecondaryColour] =
    useState("#8ed1fc");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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
          .from("company_profiles")
          .select("*") // Select all columns
          .eq("created_by_user_id", user.id)
          .single();

        // Also fetch company_name from profiles table (might be redundant if also in company_profiles)
        // Consider consolidating if possible in the future
        const { data: basicProfile, error: basicProfileError } = await supabase
          .from("profiles")
          .select("company_name")
          .eq("id", user.id)
          .single();

        if (!isMounted) return; // Check again after async calls

        if (profileError && profileError.code !== "PGRST116") {
          // Ignore 'PGRST116' (single row not found)
          console.error("Error loading company profile:", profileError);
          setError("Failed to load company profile.");
        } else if (companyProfile) {
          // Set state from company_profiles data
          setCompanyLocation(companyProfile.company_location || "");
          setCompanyWebsite(companyProfile.company_website || "");
          setCompanyPrimaryColour(
            companyProfile.company_primary_colour || "#0693e3"
          );
          setCompanySecondaryColour(
            companyProfile.company_secondary_colour || "#8ed1fc"
          );
          setLogoPreview(companyProfile.company_logo_url || null);
        }

        if (basicProfileError && basicProfileError.code !== "PGRST116") {
          console.error("Error loading basic profile:", basicProfileError);
        } else if (basicProfile) {
          setCompanyName(basicProfile.company_name || "");
        }
      } catch (error) {
        console.error("Error in loadProfile:", error);
        if (isMounted) {
          setError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading profile."
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
          toast.error("Logo file size must be less than 5MB");
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
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!companyName) {
        setError("Company name is required");
        setLoading(false);
        return;
      }

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to save your company profile");
        setLoading(false);
        return;
      }

      // Upload logo if provided
      let logoUrl = logoPreview;

      /* Temporarily disabled
      if (companyLogo) {
        try {
          const bucketName = 'company-assets';
          const fileExt = companyLogo.name.split('.').pop();
          const fileName = `${user.id}-logo-${Date.now()}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(fileName, companyLogo, {
              cacheControl: '3600',
              upsert: true
            });
          
          if (!uploadError && uploadData) {
            const { data: publicUrlData } = supabase.storage
              .from(bucketName)
              .getPublicUrl(fileName);
            
            logoUrl = publicUrlData.publicUrl;
          }
        } catch (logoError) {
          console.error('Error handling logo upload:', logoError);
        }
      }
      */

      // Update profile with just company name
      const profileData = {
        id: user.id,
        company_name: companyName,
      };

      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert(profileData, { onConflict: "id" });

      if (upsertError) {
        console.error("Error updating profile - Full error:", upsertError);
        console.error("Profile data being sent:", profileData);
        throw new Error(
          `Failed to update company profile: ${upsertError.message}`
        );
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      //  Willow BackendAPI Call
      const departmentRes = await fetch(`${apiBaseUrl}/api/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        throw new Error(departmentData?.error || "Failed to create department");
      }

      // ✅ 6. company_profiles update(already the row is existing)
      const { error: companyProfileError } = await supabase
        .from("company_profiles")
        .update({
          willo_company_key: departmentData.data.key,
          company_location: companyLocation,
          company_website: companyWebsite,
          company_primary_colour: companyPrimaryColour,
          company_secondary_colour: companySecondaryColour,
          company_logo_url: logoUrl,
          company_profile_completed: true,
        })
        .eq("created_by_user_id", user.id); // 트리거로 만든 row 타겟팅

      if (companyProfileError) {
        console.error("Supabase update error details:", companyProfileError);
        throw new Error("Failed to update company_profiles with Willow key");
      }

      toast.success("Company profile saved successfully");

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
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
            {loading ? "Saving..." : "Save Company Profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
