import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeadsPage from '@/modules/sales/LeadsPage';

const SalesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="leads" element={<LeadsPage />} />
      <Route path="*" element={<LeadsPage />} />
    </Routes>
  );
};

export default SalesRoutes; 