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
  const [companyPrimaryColour, setCompanyPrimaryColour] = useState("#4f46e5");
  const [companySecondaryColour, setCompanySecondaryColour] =
    useState("#818cf8");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Load existing profile data if available
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user || !isMounted) return;

        // Get profile data
        const { data: profile } = await supabase
          .from("profiles")
          .select("company_name")
          .eq("id", user.id)
          .single();

        // Load company data from user metadata
        const metadata = user.user_metadata || {};

        if (profile && isMounted) {
          if (profile.company_name) setCompanyName(profile.company_name);
        }

        // Load additional fields from metadata
        if (metadata.company_location)
          setCompanyLocation(metadata.company_location);
        if (metadata.company_website)
          setCompanyWebsite(metadata.company_website);
        if (metadata.company_primary_colour)
          setCompanyPrimaryColour(metadata.company_primary_colour);
        if (metadata.company_secondary_colour)
          setCompanySecondaryColour(metadata.company_secondary_colour);
        if (metadata.company_logo_url)
          setLogoPreview(metadata.company_logo_url);
      } catch (error) {
        console.error("Error in loadProfile:", error);
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

      //  Willow BackendAPI Call
      const departmentRes = await fetch(
        "http://localhost:5000/api/departments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyName }),
        }
      );

      const departmentData = await departmentRes.json();
      if (!departmentRes.ok) {
        throw new Error(departmentData?.error || "Failed to create department");
      }

      // ✅ 6. company_profiles 업데이트 (이미 row 있음)
      const { error: companyProfileError } = await supabase
        .from("company_profiles")
        .update({
          willo_company_key: departmentData.key,
          company_location: companyLocation,
          company_website: companyWebsite,
          company_primary_colour: companyPrimaryColour,
          company_secondary_colour: companySecondaryColour,
          company_logo_url: logoUrl,
          company_profile_completed: true,
        })
        .eq("created_by_user_id", user.id); // 트리거로 만든 row 타겟팅

      if (companyProfileError) {
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
