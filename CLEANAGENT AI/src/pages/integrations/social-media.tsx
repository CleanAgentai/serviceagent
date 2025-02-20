import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ArrowLeft, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ElementType;
  connected: boolean;
  lastSync?: Date;
  status: 'connected' | 'disconnected' | 'error';
}

export default function SocialMediaIntegration() {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      connected: false,
      status: 'disconnected'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      connected: false,
      status: 'disconnected'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      connected: false,
      status: 'disconnected'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      connected: false,
      status: 'disconnected'
    }
  ]);

  const handleConnect = (platformId: string) => {
    // Simulate connection process
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId
        ? { 
            ...platform, 
            connected: true, 
            status: 'connected',
            lastSync: new Date()
          }
        : platform
    ));
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId
        ? { 
            ...platform, 
            connected: false, 
            status: 'disconnected',
            lastSync: undefined
          }
        : platform
    ));
  };

  const progress = (platforms.filter(p => p.connected).length / platforms.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/launchpad')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Connect Social Media Accounts</h1>
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(progress)}% Complete
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-2 bg-gray-100 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {platforms.map(platform => (
          <Card key={platform.id}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    platform.connected ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <platform.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{platform.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          platform.status === 'connected' ? 'success' :
                          platform.status === 'error' ? 'error' :
                          'default'
                        }
                      >
                        {platform.status === 'connected' ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Connected</span>
                          </div>
                        ) : platform.status === 'error' ? (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Error</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            <span>Not Connected</span>
                          </div>
                        )}
                      </Badge>
                      {platform.lastSync && (
                        <span className="text-sm text-gray-500">
                          Last synced: {platform.lastSync.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {platform.connected ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleDisconnect(platform.id)}
                      >
                        Disconnect
                      </Button>
                      <Button>
                        Configure
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleConnect(platform.id)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => navigate('/launchpad')}
        >
          Cancel
        </Button>
        <Button
          onClick={() => navigate('/launchpad')}
          disabled={platforms.every(p => !p.connected)}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
} 