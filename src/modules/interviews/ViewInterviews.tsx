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
  Plus,
  Copy,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from '@/lib/supabase';

interface Interview {
  id: string;
  title: string;
  createdAt: string;
  duration: string;
  status: 'active' | 'draft' | 'archived';
  totalResponses: number;
}

export function ViewInterviews() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  // Copy interview link to clipboard
  const copyLinkToClipboard = (id: string) => {
    const link = `${window.location.origin}/interview/${id}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopiedLinkId(id);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopiedLinkId(null), 2000);
      })
      .catch(() => toast.error('Failed to copy link'));
  };

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchInterviews = async () => {
      try {
        // Attempt to fetch from the database
        const { data, error } = await supabase
          .from('interviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching interviews from database:', error);
          
          // Fallback to mock data if there's an error (database doesn't exist, etc.)
          // This ensures the UI still works even if the database isn't set up
          setInterviews([
            {
              id: 'int-1',
              title: 'Software Engineer Position',
              createdAt: '2024-03-18',
              duration: '30 minutes',
              status: 'active',
              totalResponses: 5
            },
            {
              id: 'int-2',
              title: 'Product Manager Interview',
              createdAt: '2024-03-17',
              duration: '45 minutes',
              status: 'active',
              totalResponses: 3
            },
          ]);
        } else if (data && data.length > 0) {
          // Map database data to our interface
          const formattedInterviews = data.map(interview => ({
            id: interview.id,
            title: interview.title,
            createdAt: new Date(interview.created_at).toISOString().split('T')[0],
            duration: '30 minutes', // Default or calculate based on questions
            status: 'active' as const,
            totalResponses: 0 // This would need to be calculated from responses table
          }));
          
          setInterviews(formattedInterviews);
        } else {
          // No interviews found, use empty array
          setInterviews([]);
        }
      } catch (error) {
        console.error('Error fetching interviews:', error);
        // Fallback to empty state
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
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => navigate('/interviews/create')}
          >
            <Plus className="w-4 h-4" />
            Create Interview
          </Button>
        </div>
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

      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-100 rounded-lg font-semibold">
          <button
            className="flex items-center gap-2"
            onClick={() => handleSort('title')}
          >
            Title
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2"
            onClick={() => handleSort('date')}
          >
            Created Date
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div>Link</div>
          <div>Actions</div>
        </div>

        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="p-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                {interview.title}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {interview.createdAt}
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Link
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Interview Link</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center mt-4 p-3 bg-gray-50 border rounded-md">
                      <input 
                        type="text" 
                        value={`${window.location.origin}/interview/${interview.id}`}
                        readOnly 
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyLinkToClipboard(interview.id)}
                        className="ml-2"
                      >
                        {copiedLinkId === interview.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="mt-4">
                      <Button 
                        className="w-full"
                        onClick={() => window.open(`/interview/${interview.id}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Interview
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/interviews/${interview.id}`)}
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

      {filteredInterviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No interviews found matching your search criteria.
        </div>
      )}
    </div>
  );
} 