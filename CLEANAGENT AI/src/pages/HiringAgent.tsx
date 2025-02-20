import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, BarChart, Users, Target, MessageSquare, Settings, FileText, CheckSquare } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function HiringAgent() {
  const navigate = useNavigate();

  const handleChatRedirect = () => {
    navigate('/chat', {
      state: {
        agentType: 'hiring',
        autoStart: true
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hiring Agent</h1>
          <p className="text-gray-500">Your AI-powered hiring assistant</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Configure
          </Button>
          <Button
            className="gap-2"
            onClick={handleChatRedirect}
          >
            <MessageSquare className="w-4 h-4" />
            Talk to Hiring Agent
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="metrics" className="gap-2">
            <BarChart className="w-4 h-4" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="candidates" className="gap-2">
            <Users className="w-4 h-4" />
            Candidates
          </TabsTrigger>
          <TabsTrigger value="jobs" className="gap-2">
            <FileText className="w-4 h-4" />
            Job Posts
          </TabsTrigger>
          <TabsTrigger value="interviews" className="gap-2">
            <CheckSquare className="w-4 h-4" />
            Interviews
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-2">
            <Target className="w-4 h-4" />
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Hiring Assistant</h2>
                <p className="text-gray-500">Chat with your AI hiring assistant</p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Get instant help with job postings, candidate screening, and interview scheduling.
              </p>
              <Button
                onClick={handleChatRedirect}
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Start Chat
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card className="p-6">
            {/* Metrics content */}
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <Card className="p-6">
            {/* Candidates management */}
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card className="p-6">
            {/* Job posts management */}
          </Card>
        </TabsContent>

        <TabsContent value="interviews">
          <Card className="p-6">
            {/* Interview scheduling and management */}
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card className="p-6">
            {/* Goals content */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 