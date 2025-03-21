import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Calendar,
  ArrowUpDown,
  Link as LinkIcon,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Interview {
  id: string;
  title: string;
  createdAt: string;
  deadline: string;
}

export function ViewInterviews() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const { data, error } = await supabase
          .from('interviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching interviews:', error);
          setInterviews([
            {
              id: '1',
              title: 'Interview for House Cleaner',
              createdAt: '2024-03-18',
              deadline: '31/03/2025'
            },
            {
              id: '2',
              title: 'Interview for House Cleaner',
              createdAt: '2024-03-17',
              deadline: '31/03/2025'
            },
          ]);
        } else if (data && data.length > 0) {
          const formattedInterviews = data.map(interview => ({
            id: interview.id,
            title: interview.title,
            createdAt: new Date(interview.created_at).toISOString().split('T')[0],
            deadline: interview.deadline ? new Date(interview.deadline).toLocaleDateString('en-GB') : 'No deadline'
          }));
          
          setInterviews(formattedInterviews);
        } else {
          setInterviews([]);
        }
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleSort = (field: 'date' | 'title') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredInterviews = interviews
    .filter(interview =>
      interview.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interviews</h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate('/interviews/create')}
        >
          Create Interview
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search interviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center gap-2"
                  onClick={() => handleSort('title')}
                >
                  Title
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center gap-2"
                  onClick={() => handleSort('date')}
                >
                  Created Date
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInterviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {interview.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {interview.createdAt}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {interview.deadline}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => window.open(`/interview/${interview.id}`, '_blank')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No interviews found matching your search criteria.
        </div>
      )}
    </div>
  );
} 