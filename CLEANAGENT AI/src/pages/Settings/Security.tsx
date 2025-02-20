import React, { useState } from 'react';
import { Shield, Lock, Clock, Smartphone, Loader2, Check, X, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Switch from '../../components/common/Switch';
import { cn } from '../../lib/utils';

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  lastActive: string;
  location: string;
  isCurrent: boolean;
}

export default function Security() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([
    {
      id: '1',
      name: 'Windows PC - Chrome',
      type: 'desktop',
      lastActive: '2024-01-28T10:30:00',
      location: 'New York, US',
      isCurrent: true
    },
    {
      id: '2',
      name: 'iPhone 13 - Safari',
      type: 'mobile',
      lastActive: '2024-01-27T15:45:00',
      location: 'New York, US',
      isCurrent: false
    }
  ]);

  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' },
    { value: '480', label: '8 hours' }
  ];

  const validatePasswordForm = () => {
    const errors: typeof passwordErrors = {};

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.confirmPassword !== passwordForm.newPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveSuccess(true);
      setShowPasswordForm(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError('Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle2FA = async () => {
    if (!twoFactorEnabled) {
      setShow2FASetup(true);
    } else {
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(false);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTwoFactorEnabled(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (error) {
        setSaveError('Failed to disable 2FA');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleRevokeDevice = async (deviceId: string) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnectedDevices(prev => prev.filter(device => device.id !== deviceId));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError('Failed to revoke device access');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Redirect to logout or home page after account deletion
    } catch (error) {
      setSaveError('Failed to delete account');
    } finally {
      setIsSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <Card>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                  disabled={isSaving}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Password Settings */}
      <Card>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Lock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Change your password or update your security settings
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordForm(true)}
                  disabled={isSaving}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Session Settings */}
      <Card>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Session Timeout</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Set how long until your session expires due to inactivity
                  </p>
                </div>
                <div className="w-48">
                  <Select
                    value={sessionTimeout}
                    onChange={setSessionTimeout}
                    options={sessionTimeoutOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Connected Devices */}
      <Card>
        <div className="p-6">
          <h3 className="font-medium mb-4">Connected Devices</h3>
          <div className="space-y-4">
            {connectedDevices.map(device => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Smartphone className="text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {device.name}
                      {device.isCurrent && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          Current Device
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last active: {new Date(device.lastActive).toLocaleString()} • {device.location}
                    </p>
                  </div>
                </div>
                {!device.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeDevice(device.id)}
                    disabled={isSaving}
                  >
                    Revoke Access
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card>
        <div className="p-6 border-t-4 border-red-500">
          <h3 className="font-medium text-red-600 mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isSaving}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Password Change Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPasswordForm(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                    className={passwordErrors.currentPassword ? 'border-red-500' : ''}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.currentPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                    className={passwordErrors.newPassword ? 'border-red-500' : ''}
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                    className={passwordErrors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordForm(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Set Up 2FA</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShow2FASetup(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Scan the QR code with your authenticator app to get started
                </p>

                <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                  {/* QR Code placeholder */}
                  <div className="w-48 h-48 bg-gray-200 rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Enter Verification Code
                  </label>
                  <Input placeholder="Enter 6-digit code" />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShow2FASetup(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setTwoFactorEnabled(true);
                      setShow2FASetup(false);
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 3000);
                    }}
                  >
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
              </div>

              <p className="text-gray-500 mb-4">
                This action cannot be undone. This will permanently delete your account
                and remove all associated data from our servers.
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Account'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Success/Error Toast */}
      {(saveSuccess || saveError) && (
        <div className={cn(
          "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-2",
          saveSuccess ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        )}>
          {saveSuccess ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertTriangle className="w-4 h-4" />
          )}
          <span>{saveSuccess ? 'Changes saved successfully' : saveError}</span>
        </div>
      )}
    </div>
  );
} 