import React, { useState, useRef, useEffect } from 'react';
import { User, Upload, Trash2, Save, X, Loader2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { cn } from '../../lib/utils';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  profilePicture: string | null;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    profilePicture: null
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // Add effect to simulate loading initial data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        // Simulate API call to load profile data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfile({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          company: 'Acme Inc',
          role: 'Software Engineer',
          profilePicture: null
        });
      } catch (error) {
        setSaveError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {};
    
    if (!profile.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profile.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(profile.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError('Failed to save profile changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSaveError('File size must be less than 5MB');
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile(prev => ({
            ...prev,
            profilePicture: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setSaveError('Failed to upload image. Please try again.');
      }
    }
  };

  const handleRemovePhoto = () => {
    setProfile(prev => ({
      ...prev,
      profilePicture: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-500">Loading profile...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <div className="flex items-center gap-3">
            {saveError && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-3 py-1 rounded-md">
                <X size={16} />
                <span>{saveError}</span>
              </div>
            )}
            {saveSuccess && (
              <div className="flex items-center gap-2 text-green-500 text-sm bg-green-50 px-3 py-1 rounded-md">
                <Save size={16} />
                <span>Changes saved successfully</span>
              </div>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="relative transition-all duration-200 hover:scale-105"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center bg-gray-100",
              "border-2 border-gray-200 overflow-hidden transition-all duration-200",
              "group-hover:border-blue-500 group-hover:shadow-lg"
            )}>
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
              >
                <Upload size={16} className="mr-2" />
                Upload Photo
              </Button>
              {profile.profilePicture && (
                <Button
                  variant="outline"
                  onClick={handleRemovePhoto}
                  className="transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={16} className="mr-2" />
                  Remove
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Recommended: Square image, at least 400x400px (max 5MB)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={profile.firstName}
              onChange={e => setProfile({ ...profile, firstName: e.target.value })}
              placeholder="Enter your first name"
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={profile.lastName}
              onChange={e => setProfile({ ...profile, lastName: e.target.value })}
              placeholder="Enter your last name"
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
              placeholder="Enter your email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <Input
              type="tel"
              value={profile.phone}
              onChange={e => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Company
            </label>
            <Input
              value={profile.company}
              onChange={e => setProfile({ ...profile, company: e.target.value })}
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Role
            </label>
            <Input
              value={profile.role}
              onChange={e => setProfile({ ...profile, role: e.target.value })}
              placeholder="Enter your role"
            />
          </div>
        </div>
      </div>
    </Card>
  );
} 



