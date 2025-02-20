import React, { useState, useEffect } from 'react';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    value: '',
    source: 'website',
    notes: ''
  });
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [pipelineValue, setPipelineValue] = useState(0);

  const calculatePipelineValue = (leads: any[]) => {
    return leads.reduce((total, lead) => {
      return total + (Number(lead.value) || 0);
    }, 0);
  };

  const handleAddLead = () => {
    if (!newLead.name || !newLead.company) return;

    const lead = {
      id: leads.length + 1,
      ...newLead,
      status: 'new',
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    };

    const updatedLeads = [lead, ...leads];
    setLeads(updatedLeads);
    setPipelineValue(calculatePipelineValue(updatedLeads));
    
    setNewLead({
      name: '',
      company: '',
      email: '',
      phone: '',
      value: '',
      source: 'website',
      notes: ''
    });
    setShowNewLeadModal(false);
  };

  useEffect(() => {
    // Calculate initial pipeline value
    setPipelineValue(calculatePipelineValue(leads));
  }, []);

  return (
    // ... rest of the component code ...
  );
} 