import React, { useState } from 'react';
import { Plus, Edit2, Power, RefreshCw, Eye, ChevronDown } from 'lucide-react';
import { JobPosting, JobPostFormData, JobPlatform, PostingStatus } from '@/types/hiring';
import { formatDistanceToNow } from 'date-fns';

interface JobPostingManagerProps {
  jobPostings: JobPosting[];
  onCreatePosting: (data: JobPostFormData) => Promise<void>;
  onUpdatePosting: (id: string, data: Partial<JobPosting>) => Promise<void>;
  onDeactivatePosting: (id: string) => Promise<void>;
  onRepostPosting: (id: string) => Promise<void>;
}

const JobPostingManager: React.FC<JobPostingManagerProps> = ({
  jobPostings,
  onCreatePosting,
  onUpdatePosting,
  onDeactivatePosting,
  onRepostPosting
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPosting, setSelectedPosting] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState<JobPostFormData>({
    title: '',
    description: '',
    location: '',
    salaryRange: { min: 0, max: 0, currency: 'USD', period: 'YEARLY' },
    jobType: 'FULL_TIME',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    platforms: [],
    department: '',
    hiringManager: ''
  });
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreatePosting(formData);
    setIsFormOpen(false);
    setFormData({
      title: '',
      description: '',
      location: '',
      salaryRange: { min: 0, max: 0, currency: 'USD', period: 'YEARLY' },
      jobType: 'FULL_TIME',
      requirements: [''],
      responsibilities: [''],
      benefits: [''],
      platforms: [],
      department: '',
      hiringManager: ''
    });
  };

  const handleArrayInput = (
    field: 'requirements' | 'responsibilities' | 'benefits',
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const togglePlatform = (platform: JobPlatform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const renderJobDescription = () => {
    if (!formData.description) return null;

    return (
      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mb-4">{formData.title}</h2>
        <p className="mb-4">{formData.description}</p>
        
        {formData.requirements.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-2">Requirements</h3>
            <ul>
              {formData.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </>
        )}

        {formData.responsibilities.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-2">Responsibilities</h3>
            <ul>
              {formData.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </>
        )}

        {formData.benefits.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-2">Benefits</h3>
            <ul>
              {formData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Job Post
        </button>
      </div>

      {/* New Job Post Form */}
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Create New Job Post</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {previewMode ? (
            <div className="bg-gray-50 p-6 rounded-lg">
              {renderJobDescription()}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Hiring Manager</label>
                  <input
                    type="text"
                    value={formData.hiringManager}
                    onChange={e => setFormData(prev => ({ ...prev, hiringManager: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Type</label>
                  <select
                    value={formData.jobType}
                    onChange={e => setFormData(prev => ({ ...prev, jobType: e.target.value as any }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={formData.salaryRange.min}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        salaryRange: { ...prev.salaryRange, min: parseInt(e.target.value) }
                      }))}
                      placeholder="Min"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      value={formData.salaryRange.max}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        salaryRange: { ...prev.salaryRange, max: parseInt(e.target.value) }
                      }))}
                      placeholder="Max"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={e => handleArrayInput('requirements', index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Requirement
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={e => handleArrayInput('responsibilities', index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('responsibilities', index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('responsibilities')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Responsibility
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={e => handleArrayInput('benefits', index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('benefits', index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('benefits')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Benefit
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posting Platforms</label>
                <div className="flex flex-wrap gap-3">
                  {(['INDEED', 'FACEBOOK', 'CRAIGSLIST', 'LINKEDIN'] as JobPlatform[]).map(platform => (
                    <label key={platform} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform)}
                        onChange={() => togglePlatform(platform)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{platform.charAt(0) + platform.slice(1).toLowerCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Post
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Active Postings Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platforms
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicants
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobPostings.map(posting => (
              <tr key={posting.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{posting.title}</div>
                  <div className="text-sm text-gray-500">{posting.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {posting.platforms.map(({ platform, status }) => (
                      <div
                        key={platform}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                          ${status === 'POSTED' ? 'bg-green-100 text-green-800' :
                          status === 'FAILED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                      >
                        {platform.charAt(0) + platform.slice(1).toLowerCase()}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(posting.createdAt), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {posting.applicantCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${posting.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    posting.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-800' :
                    posting.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                    posting.status === 'FILLED' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}`}>
                    {posting.status.charAt(0) + posting.status.slice(1).toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setSelectedPosting(posting);
                        setIsFormOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeactivatePosting(posting.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Power className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onRepostPosting(posting.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobPostingManager; 