import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  BarChart, 
  Target, 
  MessageSquare, 
  Settings, 
  GitBranch, 
  Clock,
  Filter,
  Search,
  Calendar,
  Plus,
  Sparkles,
  Workflow,
  ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Input from '../components/common/Input';

export default function OperationsAgent() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const handleChatRedirect = () => {
    navigate('/chat', {
      state: {
        agentType: 'operations',
        autoStart: true
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Operations Agent</h1>
          <p className="text-gray-500 mt-1">Your AI-powered operations assistant</p>
        </div>
        <div className="flex gap-3">
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
            Talk to Operations Agent
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-3 text-sm font-medium"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 Days
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 px-3 text-sm font-medium"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="h-4 w-px bg-gray-200 mx-2" />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-gray-500 hover:text-gray-900"
          >
            <ArrowRight className="w-4 h-4 rotate-45" />
          </Button>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search operations..."
              className="pl-10 w-full h-8"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tasks Overview</h3>
              <p className="text-gray-500 text-sm">Current task status</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Tasks</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Today</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Review</span>
              <span className="font-semibold">3</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Workflows</h3>
              <p className="text-gray-500 text-sm">Active workflow status</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">In Progress</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed</span>
              <span className="font-semibold">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Scheduled</span>
              <span className="font-semibold">7</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <BarChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Performance</h3>
              <p className="text-gray-500 text-sm">Key metrics</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Efficiency Rate</span>
              <span className="font-semibold">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">On-time Completion</span>
              <span className="font-semibold">88%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Resource Utilization</span>
              <span className="font-semibold">85%</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Tasks</h2>
            <Button 
              variant="default" 
              size="sm" 
              className="h-8 px-3 text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 w-full h-8"
            />
          </div>
        </div>
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50 text-cyan-600 rounded-full mb-4 shadow-inner transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 bg-clip-text text-transparent">
              Time to level up your tasks! ⚡
            </h3>
            <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
              Let's streamline your workflow with smart task management. Your efficiency journey starts here! 💫
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <Button 
                size="lg"
                className="flex-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-700 hover:via-blue-700 hover:to-sky-700 text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 gap-2 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                New Task
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="flex-1 border-blue-200 hover:bg-blue-50 text-blue-600 gap-2 group transition-all duration-300"
              >
                View Templates
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Workflows</h2>
            <Button 
              variant="default" 
              size="sm" 
              className="h-8 px-3 text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Workflow
            </Button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search workflows..."
              className="pl-10 w-full h-8"
            />
          </div>
        </div>
        <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50 text-fuchsia-600 rounded-full mb-4 shadow-inner transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <Workflow className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              Automation awaits! 🌟
            </h3>
            <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
              Transform your operations with intelligent workflows. Ready to make magic happen? ✨
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <Button 
                size="lg"
                className="flex-1 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 hover:from-fuchsia-700 hover:via-purple-700 hover:to-violet-700 text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 gap-2 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Create Flow
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="flex-1 border-purple-200 hover:bg-purple-50 text-purple-600 gap-2 group transition-all duration-300"
              >
                Browse Flows
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Operations Assistant</h2>
              <p className="text-gray-500">Chat with your AI operations assistant</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Get instant help with workflow optimization, task management, and operational efficiency.
            </p>
            <Button
              onClick={handleChatRedirect}
              className="gap-2 group hover:bg-orange-600"
            >
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Start Chat
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 