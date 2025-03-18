import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, List, Users } from 'lucide-react';

export function InterviewNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Card className="p-4 mb-6 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Interview Management</h1>
        <div className="flex space-x-2">
          <Button
            variant={currentPath === '/interviews' ? 'default' : 'outline'}
            onClick={() => navigate('/interviews')}
            className="flex items-center gap-2"
          >
            <List size={16} />
            View Interviews
          </Button>
          <Button
            variant={currentPath === '/interviews/create' ? 'default' : 'outline'}
            onClick={() => navigate('/interviews/create')}
            className="flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Create Interview
          </Button>
          <Button
            variant={currentPath === '/interviews/responses' ? 'default' : 'outline'}
            onClick={() => navigate('/interviews/responses')}
            className="flex items-center gap-2"
          >
            <Users size={16} />
            View Responses
          </Button>
        </div>
      </div>
    </Card>
  );
} 