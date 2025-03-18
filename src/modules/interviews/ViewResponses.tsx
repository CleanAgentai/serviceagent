import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowUpDown,
  ExternalLink,
  Filter,
} from 'lucide-react';

interface Response {
  id: string;
  candidateName: string;
  submissionDate: string;
  duration: string;
  status: 'completed' | 'in_progress' | 'pending';
}

export function ViewResponses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchResponses = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API data
        setResponses([
          {
            id: 'demo-1',
            candidateName: 'John Doe',
            submissionDate: '2024-03-18',
            duration: '15 minutes',
            status: 'completed'
          },
          {
            id: 'demo-2',
            candidateName: 'Jane Smith',
            submissionDate: '2024-03-17',
            duration: '12 minutes',
            status: 'completed'
          },
          // Add more mock responses as needed
        ]);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleSort = (field: 'date' | 'name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredResponses = responses
    .filter(response =>
      response.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
          : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      } else {
        return sortOrder === 'asc'
          ? a.candidateName.localeCompare(b.candidateName)
          : b.candidateName.localeCompare(a.candidateName);
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
        <h1 className="text-3xl font-bold">Interview Responses</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by candidate name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-100 rounded-lg font-semibold">
          <button
            className="flex items-center gap-2"
            onClick={() => handleSort('name')}
          >
            Candidate
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2"
            onClick={() => handleSort('date')}
          >
            Submission Date
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div>Duration</div>
          <div>Actions</div>
        </div>

        {filteredResponses.map((response) => (
          <Card key={response.id} className="p-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                {response.candidateName}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {response.submissionDate}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {response.duration}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/interviews/responses/${response.id}`)}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredResponses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No responses found matching your search criteria.
        </div>
      )}
    </div>
  );
} 