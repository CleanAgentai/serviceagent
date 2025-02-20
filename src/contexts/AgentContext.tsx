import React, { createContext, useContext, useState } from 'react';

interface AgentContextType {
  isAgentActive: boolean;
  startAgent: () => void;
  stopAgent: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [isAgentActive, setIsAgentActive] = useState(false);

  const startAgent = () => {
    setIsAgentActive(true);
  };

  const stopAgent = () => {
    setIsAgentActive(false);
  };

  return (
    <AgentContext.Provider value={{ isAgentActive, startAgent, stopAgent }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
} 