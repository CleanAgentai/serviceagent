import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Clock, TrendingUp, Users } from 'lucide-react';
import { Platform } from '@/types/social';
import { getContentSuggestions, getBestPostingTimes } from '@/services/ai/socialAI';

interface ContentSuggestion {
  content: string;
  recommendedTime: Date;
  estimatedEngagement: number;
  targetAudience: string[];
  platforms: Platform[];
}

interface AIContentSuggestionsProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySuggestion: (suggestion: ContentSuggestion) => void;
}

export const AIContentSuggestions: React.FC<AIContentSuggestionsProps> = ({
  isOpen,
  onClose,
  onApplySuggestion,
}) => {
  const [topic, setTopic] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSuggestions = async () => {
    if (!topic || selectedPlatforms.length === 0) return;

    setIsLoading(true);
    try {
      const contentSuggestions = await getContentSuggestions({
        topic,
        platforms: selectedPlatforms,
      });

      const bestTimes = await getBestPostingTimes({
        platforms: selectedPlatforms,
      });

      // Combine content suggestions with optimal posting times
      const combinedSuggestions = contentSuggestions.map((suggestion, index) => ({
        ...suggestion,
        recommendedTime: bestTimes[index % bestTimes.length],
      }));

      setSuggestions(combinedSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
    setIsLoading(false);
  };

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold">
              AI Content Suggestions
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic or Keywords
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic or keywords..."
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Platforms
                </label>
                <div className="flex space-x-4">
                  {Object.entries(platformIcons).map(([platform, Icon]) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handlePlatformToggle(platform as Platform)}
                      className={`p-3 rounded-lg flex items-center justify-center ${
                        selectedPlatforms.includes(platform as Platform)
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateSuggestions}
                disabled={isLoading || !topic || selectedPlatforms.length === 0}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Generating...' : 'Generate Suggestions'}
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Suggested Posts
                </h3>
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
                      onClick={() => onApplySuggestion(suggestion)}
                    >
                      <p className="text-gray-900 mb-3">{suggestion.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(suggestion.recommendedTime).toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {suggestion.estimatedEngagement}% engagement
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {suggestion.targetAudience.join(', ')}
                        </div>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        {suggestion.platforms.map((platform) => {
                          const Icon = platformIcons[platform];
                          return (
                            <Icon
                              key={platform}
                              className="w-4 h-4 text-gray-400"
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 