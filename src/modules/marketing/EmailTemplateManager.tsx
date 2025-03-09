import React, { useState } from 'react';
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  Copy,
  Wand2,
  Save,
  X,
  ChevronRight,
  Search
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import of the WYSIWYG editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  placeholders: string[];
  createdAt: string;
  updatedAt: string;
}

interface AIsuggestion {
  type: 'subject' | 'cta';
  original: string;
  suggestions: string[];
}

const EmailTemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<AIsuggestion | null>(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Editor configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean'],
      [{ 'align': [] }]
    ],
  };

  const handleCreateTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      name: 'Untitled Template',
      subject: '',
      body: '',
      placeholders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedTemplate(newTemplate);
    setIsCreating(true);
  };

  const handleUploadTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const newTemplate: EmailTemplate = {
            id: Date.now().toString(),
            name: file.name.replace('.html', ''),
            subject: '',
            body: content,
            placeholders: extractPlaceholders(content),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setTemplates([...templates, newTemplate]);
        } catch (error) {
          console.error('Error parsing template:', error);
          // Show error notification
        }
      };
      reader.readAsText(file);
    }
  };

  const extractPlaceholders = (content: string): string[] => {
    const regex = /{{([^}]+)}}/g;
    const matches = content.match(regex) || [];
    return [...new Set(matches.map(match => match.slice(2, -2)))];
  };

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      const updatedTemplate = {
        ...selectedTemplate,
        updatedAt: new Date().toISOString(),
        placeholders: extractPlaceholders(selectedTemplate.body),
      };
      
      if (isCreating) {
        setTemplates([...templates, updatedTemplate]);
      } else {
        setTemplates(templates.map(t => 
          t.id === updatedTemplate.id ? updatedTemplate : t
        ));
      }
      
      setIsCreating(false);
      setSelectedTemplate(null);
    }
  };

  const handleGetAISuggestions = async () => {
    if (!selectedTemplate) return;

    // Simulated AI API call - replace with actual API integration
    const mockSuggestions: AIsuggestion = {
      type: 'subject',
      original: selectedTemplate.subject,
      suggestions: [
        '🚀 Transform Your Business with Our Latest Solutions',
        '⭐ Exclusive Offer: Unlock Premium Features Today',
        '📈 Boost Your Results with Our Proven Strategies'
      ]
    };
    
    setAiSuggestions(mockSuggestions);
    setShowAiSuggestions(true);
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-gray-50">
      {/* Template Library Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Templates</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleCreateTemplate}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="Create new template"
              >
                <Plus className="h-5 w-5" />
              </button>
              <label className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer">
                <Upload className="h-5 w-5" />
                <input
                  type="file"
                  accept=".html"
                  className="hidden"
                  onChange={handleUploadTemplate}
                />
              </label>
            </div>
          </div>
          
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="p-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="mb-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mt-1 truncate">
                {template.subject || 'No subject'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Template Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedTemplate ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <input
                type="text"
                value={selectedTemplate.name}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  name: e.target.value
                })}
                className="text-2xl font-bold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
              />
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleGetAISuggestions}
                  className="flex items-center px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Get AI Suggestions
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={selectedTemplate.subject}
                  onChange={(e) => setSelectedTemplate({
                    ...selectedTemplate,
                    subject: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject line..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Body
                </label>
                <div className="border border-gray-300 rounded-lg">
                  <ReactQuill
                    value={selectedTemplate.body}
                    onChange={(content) => setSelectedTemplate({
                      ...selectedTemplate,
                      body: content
                    })}
                    modules={modules}
                    className="h-[500px]"
                  />
                </div>
              </div>

              {selectedTemplate.placeholders.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detected Placeholders
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.placeholders.map((placeholder) => (
                      <span
                        key={placeholder}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {`{{${placeholder}}}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Template Selected
              </h3>
              <p className="text-gray-500">
                Create a new template or select one from the library
              </p>
            </div>
          </div>
        )}
      </div>

      {/* AI Suggestions Modal */}
      {showAiSuggestions && aiSuggestions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                AI Suggestions
              </h3>
              <button
                onClick={() => setShowAiSuggestions(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Original</p>
                <p className="text-gray-900">{aiSuggestions.original}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Suggestions</p>
                <div className="space-y-2">
                  {aiSuggestions.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedTemplate(prev => prev ? {
                          ...prev,
                          subject: suggestion
                        } : null);
                        setShowAiSuggestions(false);
                      }}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateManager; 