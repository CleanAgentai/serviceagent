import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, MoreHorizontal, Edit, Trash, Tag } from 'lucide-react';
import { Lead, LeadStatus } from '@/types/leads';
import LeadScoreIndicator from './LeadScoreIndicator';

interface LeadTableProps {
  leads: Lead[];
  onEditLead: (lead: Lead) => void;
  onDeleteLead: (leadId: string) => void;
  onViewDetails: (lead: Lead) => void;
}

type SortField = 'name' | 'createdAt' | 'score' | 'status';
type SortDirection = 'asc' | 'desc';

const statusColors: Record<LeadStatus, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Lost': 'bg-gray-100 text-gray-800',
  'Converted': 'bg-purple-100 text-purple-800'
};

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onEditLead, onDeleteLead, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleDropdown = (leadId: string) => {
    setDropdownOpen(dropdownOpen === leadId ? null : leadId);
  };

  const filteredLeads = useMemo(() => {
    return leads
      .filter(lead => {
        const searchLower = searchTerm.toLowerCase();
        return (
          lead.name.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          (lead.company && lead.company.toLowerCase().includes(searchLower)) ||
          lead.source.toLowerCase().includes(searchLower) ||
          lead.status.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        let comparison = 0;
        
        switch (sortField) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'createdAt':
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          case 'score':
            comparison = a.score - b.score;
            break;
          case 'status':
            comparison = a.status.localeCompare(b.status);
            break;
          default:
            comparison = 0;
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [leads, searchTerm, sortField, sortDirection]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Leads</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads..."
              className="block w-64 pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Lead Name</span>
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center space-x-1">
                  <span>Score</span>
                  {sortField === 'score' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center space-x-1">
                  <span>Created</span>
                  {sortField === 'createdAt' && (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onViewDetails(lead)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    {lead.company && (
                      <div className="text-sm text-gray-500">{lead.company}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                    {lead.phone && (
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <LeadScoreIndicator score={lead.score} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(lead.id);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    
                    {dropdownOpen === lead.id && (
                      <div 
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            onClick={() => {
                              onEditLead(lead);
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <Edit className="mr-3 h-4 w-4 text-gray-400" />
                            Edit Lead
                          </button>
                          {lead.tags && lead.tags.length > 0 && (
                            <div className="px-4 py-2 text-sm text-gray-700">
                              <div className="flex items-center mb-1">
                                <Tag className="mr-3 h-4 w-4 text-gray-400" />
                                <span>Tags</span>
                              </div>
                              <div className="ml-7 flex flex-wrap gap-1">
                                {lead.tags.map((tag, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <button
                            onClick={() => {
                              onDeleteLead(lead.id);
                              setDropdownOpen(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <Trash className="mr-3 h-4 w-4 text-red-400" />
                            Delete Lead
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable; 