import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Agent, agents as initialAgents } from '../config/agents';
import { AgentError, StorageError, handleError } from '../utils/errors';

interface AgentContextType {
  agents: Agent[];
  activeAgents: string[];
  activateAgent: (agentId: string) => void;
  deactivateAgent: (agentId: string) => void;
  getAgentById: (agentId: string) => Agent | undefined;
  isAgentActive: (agentId: string) => boolean;
  executeCommand: (agentId: string, command: string) => Promise<void>;
  isExecuting: boolean;
  error: Error | null;
  clearError: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const STORAGE_KEY = 'cleanagent_active_agents';
const COMMAND_TIMEOUT = 30000; // 30 seconds

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Initialize active agents from localStorage or defaults
    try {
      const storedActiveAgents = localStorage.getItem(STORAGE_KEY);
      if (storedActiveAgents) {
        const parsed = JSON.parse(storedActiveAgents);
        if (Array.isArray(parsed)) {
          setActiveAgents(parsed);
        } else {
          throw new StorageError('Invalid stored agents format', STORAGE_KEY);
        }
      } else {
        // Set default active agents
        const defaultActive = agents
          .filter(agent => agent.isActive)
          .map(agent => agent.id);
        setActiveAgents(defaultActive);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultActive));
      }
    } catch (err) {
      const error = handleError(err);
      console.error('Error loading active agents:', error);
      // Reset to defaults on error
      const defaultActive = agents
        .filter(agent => agent.isActive)
        .map(agent => agent.id);
      setActiveAgents(defaultActive);
      setError(error);
    }

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const saveActiveAgents = useCallback((newActiveAgents: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newActiveAgents));
    } catch (err) {
      const error = new StorageError('Failed to save active agents', STORAGE_KEY);
      console.error(error);
      setError(error);
      throw error;
    }
  }, []);

  const activateAgent = useCallback((agentId: string) => {
    if (!activeAgents.includes(agentId)) {
      const newActiveAgents = [...activeAgents, agentId];
      setActiveAgents(newActiveAgents);
      try {
        saveActiveAgents(newActiveAgents);
      } catch (err) {
        // Revert state if save fails
        setActiveAgents(activeAgents);
        throw err;
      }
    }
  }, [activeAgents, saveActiveAgents]);

  const deactivateAgent = useCallback((agentId: string) => {
    const newActiveAgents = activeAgents.filter(id => id !== agentId);
    setActiveAgents(newActiveAgents);
    try {
      saveActiveAgents(newActiveAgents);
    } catch (err) {
      // Revert state if save fails
      setActiveAgents(activeAgents);
      throw err;
    }
  }, [activeAgents, saveActiveAgents]);

  const getAgentById = useCallback((agentId: string) => {
    return agents.find(agent => agent.id === agentId);
  }, [agents]);

  const isAgentActive = useCallback((agentId: string) => {
    return activeAgents.includes(agentId);
  }, [activeAgents]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeCommand = useCallback(async (agentId: string, command: string) => {
    if (isExecuting) {
      throw new AgentError('Another command is already executing');
    }

    const agent = getAgentById(agentId);
    if (!agent) {
      throw new AgentError(`Agent ${agentId} not found`, agentId);
    }

    if (!isAgentActive(agentId)) {
      throw new AgentError(`Agent ${agentId} is not active`, agentId);
    }

    setIsExecuting(true);
    setError(null);

    // Create new AbortController for this execution
    abortControllerRef.current = new AbortController();

    try {
      // Here we would typically make an API call to N8n/Make.com
      console.log(`Executing command "${command}" with agent ${agent.name}`);
      
      // Add timeout to the execution
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new AgentError('Command execution timed out', agentId)), COMMAND_TIMEOUT);
      });

      // Simulate API call with timeout
      await Promise.race([
        new Promise(resolve => setTimeout(resolve, 1000)),
        timeoutPromise
      ]);

    } catch (err) {
      const error = err instanceof AgentError ? err : new AgentError('Unknown error occurred', agentId);
      setError(error);
      throw error;
    } finally {
      setIsExecuting(false);
      abortControllerRef.current = null;
    }
  }, [isExecuting, getAgentById, isAgentActive]);

  return (
    <AgentContext.Provider
      value={{
        agents,
        activeAgents,
        activateAgent,
        deactivateAgent,
        getAgentById,
        isAgentActive,
        executeCommand,
        isExecuting,
        error,
        clearError,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new AgentError('useAgent must be used within an AgentProvider');
  }
  return context;
} 