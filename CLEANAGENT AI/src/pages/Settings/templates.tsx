import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Plus, ArrowLeft, ChevronRight, Edit2, Trash2, Copy, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  lastModified: Date;
  status: 'active' | 'draft' | 'archived';
}

export default function EmailTemplates() {
  const navigate = useNavigate();
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to Our Platform',
      category: 'onboarding',
      lastModified: new Date(),
      status: 'active'
    },
    {
      id: '2',
      name: 'Interview Invitation',
      subject: 'Interview Invitation for [Position]',
      category: 'hiring',
      lastModified: new Date(),
      status: 'active'
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    category: '',
    content: ''
  });

  const categories = [
    { value: 'onboarding', label: 'Onboarding' },
    { value: 'hiring', label: 'Hiring' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' }
  ];

  const handleCreateTemplate = () => {
    const template: EmailTemplate = {
      id: String(templates.length + 1),
      name: newTemplate.name,
      subject: newTemplate.subject,
      category: newTemplate.category,
      lastModified: new Date(),
      status: 'draft'
    };
    setTemplates(prev => [...prev, template]);
    setNewTemplate({ name: '', subject: '', category: '', content: '' });
    setShowNewTemplate(false);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: String(templates.length + 1),
      name: `${template.name} (Copy)`,
      lastModified: new Date(),
      status: 'draft'
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

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
          <h1 className="text-2xl font-bold">Email Templates</h1>
        </div>
        <Button
          onClick={() => setShowNewTemplate(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Template
        </Button>
      </div>

      {/* Template List */}
      <div className="space-y-4">
        {templates.map(template => (
          <Card key={template.id}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={template.status === 'active' ? 'success' : 'default'}>
                        {template.status === 'active' ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </div>
                        ) : (
                          template.status
                        )}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Last modified: {template.lastModified.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{template.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDuplicateTemplate(template)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* New Template Form */}
      {showNewTemplate && (
        <Card>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Create New Template</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Template Name</label>
                <Input
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Welcome Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject Line</label>
                <Input
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g., Welcome to [Company Name]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  value={newTemplate.category}
                  onChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                  options={categories}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  className="w-full h-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter your email content here..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNewTemplate(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTemplate}
                disabled={!newTemplate.name || !newTemplate.subject || !newTemplate.category}
              >
                Create Template
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Template Editor Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Edit Template</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template Name</label>
                  <Input
                    value={selectedTemplate.name}
                    onChange={(e) => setSelectedTemplate(prev => ({ ...prev!, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject Line</label>
                  <Input
                    value={selectedTemplate.subject}
                    onChange={(e) => setSelectedTemplate(prev => ({ ...prev!, subject: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select
                    value={selectedTemplate.category}
                    onChange={(value) => setSelectedTemplate(prev => ({ ...prev!, category: value }))}
                    options={categories}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTemplate(null)}
                >
                  Cancel
                </Button>
                <Button onClick={() => {
                  setTemplates(prev => prev.map(t => 
                    t.id === selectedTemplate.id ? { ...selectedTemplate, lastModified: new Date() } : t
                  ));
                  setSelectedTemplate(null);
                }}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 