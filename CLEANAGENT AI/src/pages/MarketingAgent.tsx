import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Megaphone, BarChart, Target, MessageSquare, Settings, Newspaper, Share2 } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function MarketingAgent() {
  const navigate = useNavigate();

  const handleChatRedirect = () => {
    navigate('/chat', {
      state: {
        agentType: 'marketing',
        autoStart: true
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Marketing Agent</h1>
          <p className="text-gray-500">Your AI-powered marketing assistant</p>
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
            Talk to Marketing Agent
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
          <TabsTrigger value="content" className="gap-2">
            <Newspaper className="w-4 h-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="gap-2">
            <Share2 className="w-4 h-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-2">
            <Target className="w-4 h-4" />
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Marketing Assistant</h2>
                <p className="text-gray-500">Chat with your AI marketing assistant</p>
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Get instant help with campaign planning, content creation, and marketing analytics.
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

        <TabsContent value="content">
          <Card className="p-6">
            {/* Content creation tools */}
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card className="p-6">
            {/* Campaign management */}
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