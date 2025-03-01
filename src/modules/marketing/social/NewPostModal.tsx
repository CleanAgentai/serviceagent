import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Image as ImageIcon, Hash, Clock, Wand2 } from 'lucide-react';
import { Platform, SocialPost } from '@/types/social';
import { generatePostSuggestions, generateHashtags } from '@/services/ai/socialAI';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<SocialPost, 'id'>) => void;
  initialData?: SocialPost | null;
  selectedDate?: Date | null;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  selectedDate,
}) => {
  const [content, setContent] = useState(initialData?.content || '');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(
    initialData?.platforms || []
  );
  const [scheduledTime, setScheduledTime] = useState<Date>(
    selectedDate || initialData?.scheduledTime || new Date()
  );
  const [hashtags, setHashtags] = useState<string[]>(initialData?.hashtags || []);
  const [images, setImages] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      const suggestions = await generatePostSuggestions({
        platforms: selectedPlatforms,
        topic: content || 'general update',
      });
      setContent(suggestions[0]); // Use the first suggestion
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setIsGenerating(false);
  };

  const handleGenerateHashtags = async () => {
    setIsGenerating(true);
    try {
      const suggestedHashtags = await generateHashtags({
        content,
        platforms: selectedPlatforms,
      });
      setHashtags(suggestedHashtags);
    } catch (error) {
      console.error('Error generating hashtags:', error);
    }
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content,
      platforms: selectedPlatforms,
      scheduledTime,
      hashtags,
      images: images.map((file) => URL.createObjectURL(file)),
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold">
              {initialData ? 'Edit Post' : 'Create New Post'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms
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

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateContent}
                    disabled={isGenerating}
                    className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                  >
                    <Wand2 className="w-4 h-4 mr-1" />
                    Generate
                  </button>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your post content..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Hashtags
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateHashtags}
                    disabled={isGenerating}
                    className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                  >
                    <Wand2 className="w-4 h-4 mr-1" />
                    Generate
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add hashtag..."
                    className="px-3 py-1 border rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = (e.target as HTMLInputElement).value.trim();
                        if (value && !hashtags.includes(value)) {
                          setHashtags([...hashtags, value]);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule
                </label>
                <input
                  type="datetime-local"
                  value={moment(scheduledTime).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setScheduledTime(new Date(e.target.value))}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <ImageIcon className="w-5 h-5 mr-2" />
                      <span>Upload Images</span>
                    </div>
                  </label>
                  <div className="flex space-x-2">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {initialData ? 'Update Post' : 'Schedule Post'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 