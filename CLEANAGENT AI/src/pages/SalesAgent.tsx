import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, BarChart, Users, Target, MessageSquare, Settings } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function SalesAgent() {
  const navigate = useNavigate();

  const handleChatRedirect = () => {
    // Navigate to chat page with sales agent auto-start configuration
    navigate('/chat', {
      state: {
        agentType: 'sales',
        autoStart: true
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Sales Agent</h1>
          <p className="text-gray-500">Your AI-powered sales assistant</p>
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
            Talk to Sales Agent
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
          <TabsTrigger value="leads" className="gap-2">
            <Users className="w-4 h-4" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-2">
            <Target className="w-4 h-4" />
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Sales Assistant</h2>
                <p className="text-gray-500">Chat with your AI sales assistant</p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Get instant help with lead generation, pipeline management, and sales strategies.
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

        <TabsContent value="leads">
          <Card className="p-6">
            {/* Leads content */}
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