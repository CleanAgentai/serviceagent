import React, { useState, useEffect, useRef } from 'react';
import { Edit, RefreshCw, Check, X, Sparkles, Copy, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Card } from '../Card';

export interface AIEditableContentProps {
  content: string;
  loading?: boolean;
  onAccept?: (content: string) => void;
  onRegenerate?: () => Promise<string>;
  onEdit?: (content: string) => void;
  className?: string;
  title?: string;
  showControls?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  showVersionControls?: boolean;
  onCopy?: (content: string) => void;
  error?: string;
}

/**
 * AIEditableContent component that displays AI-generated content
 * and allows users to edit, regenerate, or accept it
 */
export const AIEditableContent: React.FC<AIEditableContentProps> = ({
  content: initialContent,
  loading = false,
  onAccept,
  onRegenerate,
  onEdit,
  className = '',
  title = 'AI Generated Content',
  showControls = true,
  readOnly = false,
  placeholder = 'AI will generate content here...',
  multiline = true,
  rows = 5,
  showVersionControls = false,
  onCopy,
  error,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [contentHistory, setContentHistory] = useState<string[]>([initialContent]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update content when prop changes
  useEffect(() => {
    if (initialContent !== contentHistory[currentVersionIndex]) {
      setContent(initialContent);
      setContentHistory([...contentHistory, initialContent]);
      setCurrentVersionIndex(contentHistory.length);
    }
  }, [initialContent]);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  // Handle content edit
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Start editing mode
  const handleStartEditing = () => {
    if (readOnly) return;
    setIsEditing(true);
  };

  // Save edited content
  const handleSaveEdit = () => {
    setIsEditing(false);
    onEdit?.(content);
    
    // Add to history if different from current version
    if (content !== contentHistory[currentVersionIndex]) {
      const newHistory = [...contentHistory.slice(0, currentVersionIndex + 1), content];
      setContentHistory(newHistory);
      setCurrentVersionIndex(newHistory.length - 1);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setContent(contentHistory[currentVersionIndex]);
  };

  // Regenerate content
  const handleRegenerate = async () => {
    if (!onRegenerate) return;
    
    setIsRegenerating(true);
    try {
      const newContent = await onRegenerate();
      setContent(newContent);
      
      // Add to history
      const newHistory = [...contentHistory, newContent];
      setContentHistory(newHistory);
      setCurrentVersionIndex(newHistory.length - 1);
    } catch (err) {
      console.error('Failed to regenerate content:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Accept content
  const handleAccept = () => {
    onAccept?.(content);
  };

  // Copy content to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    onCopy?.(content);
  };

  // Navigate through content versions
  const navigateHistory = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentVersionIndex - 1)
      : Math.min(contentHistory.length - 1, currentVersionIndex + 1);
    
    setCurrentVersionIndex(newIndex);
    setContent(contentHistory[newIndex]);
  };

  return (
    <Card
      className={`border border-blue-100 ${className}`}
      shadow="sm"
      headerClassName="bg-gradient-to-r from-blue-50 to-violet-50"
      title={
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
          <span>{title}</span>
        </div>
      }
      headerActions={
        showVersionControls && contentHistory.length > 1 ? (
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => navigateHistory('prev')}
              disabled={currentVersionIndex === 0 || loading || isRegenerating}
              className="p-1 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous version"
              title="Previous version"
            >
              <ArrowLeft className="h-4 w-4 text-blue-600" />
            </button>
            <span className="text-xs text-gray-500">
              {currentVersionIndex + 1}/{contentHistory.length}
            </span>
            <button
              type="button"
              onClick={() => navigateHistory('next')}
              disabled={currentVersionIndex === contentHistory.length - 1 || loading || isRegenerating}
              className="p-1 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next version"
              title="Next version"
            >
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </button>
          </div>
        ) : null
      }
    >
      {/* Loading State */}
      {(loading || isRegenerating) && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-b-lg">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">
              {isRegenerating ? 'Regenerating content...' : 'Loading content...'}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && !isRegenerating && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3 text-red-700 text-sm">
          <p className="flex items-center">
            <X className="h-4 w-4 mr-2 flex-shrink-0" />
            {error}
          </p>
        </div>
      )}

      {/* Content Display/Edit Area */}
      <div className="relative">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            className="w-full border border-blue-300 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            rows={rows}
            placeholder={placeholder}
          />
        ) : (
          <div
            className={`
              w-full p-3 border border-gray-200 rounded-md text-gray-800 bg-white
              ${!readOnly ? 'cursor-pointer hover:border-blue-300' : ''}
              ${multiline ? 'whitespace-pre-wrap' : 'whitespace-nowrap overflow-x-auto'}
              text-sm min-h-[${rows * 1.5}rem]
            `}
            onClick={handleStartEditing}
          >
            {content || <span className="text-gray-400">{placeholder}</span>}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {showControls && (
        <div className="flex justify-between mt-3">
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={handleStartEditing}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={loading || isRegenerating}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </button>
                )}
                {onRegenerate && (
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={loading || isRegenerating}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Regenerate
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading || isRegenerating || !content}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy
                </button>
              </>
            )}
          </div>
          
          {onAccept && !isEditing && (
            <button
              type="button"
              onClick={handleAccept}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading || isRegenerating || !content}
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Accept
            </button>
          )}
        </div>
      )}
    </Card>
  );
}; 