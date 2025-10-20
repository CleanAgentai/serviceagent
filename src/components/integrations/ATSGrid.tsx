import * as React from 'react';

export type ATSIntegration = {
  id: string;
  name: string;
  category: string;
  logo: string;
  isConnected: boolean;
};

export const atsIntegrations: ATSIntegration[] = [
  { id: 'greenhouse', name: 'Greenhouse', category: 'ATS API', logo: '/ATS/greenhouse_logo.svg', isConnected: false },
  { id: 'lever', name: 'Lever', category: 'ATS API', logo: '/ATS/lever_logo.svg', isConnected: false },
  { id: 'bamboohr', name: 'BambooHR', category: 'ATS API', logo: '/ATS/bamboo_logo.svg', isConnected: false },
  { id: 'workable', name: 'Workable', category: 'ATS API', logo: '/ATS/workable_logo.svg', isConnected: false },
  { id: 'ashby', name: 'Ashby', category: 'ATS API', logo: '/ATS/ashby_logo.svg', isConnected: false },
  { id: 'jobvite', name: 'Jobvite', category: 'ATS API', logo: '/ATS/jobvite_logo.svg', isConnected: false },
  { id: 'oracle', name: 'Oracle Recruiting', category: 'ATS API', logo: '/ATS/oracle_logo.svg', isConnected: false },
  { id: 'smartrecruiters', name: 'SmartRecruiters', category: 'ATS API', logo: '/ATS/Smartrecruiters_logo.svg', isConnected: false },
  { id: 'successfactors', name: 'SuccessFactors', category: 'ATS API', logo: '/ATS/SAP_SuccessFactors_logo.svg', isConnected: false },
  { id: 'taleo', name: 'Oracle Taleo', category: 'ATS API', logo: '/ATS/oracle_taleo_logo.svg', isConnected: false },
  { id: 'teamtailor', name: 'Teamtailor', category: 'ATS API', logo: '/ATS/team_tailor_logo.svg', isConnected: false },
  { id: 'ukg', name: 'UKG Pro Recruiting', category: 'ATS API', logo: '/ATS/ukg_logo.svg', isConnected: false },
  { id: 'cornerstone', name: 'Cornerstone', category: 'ATS API', logo: '/ATS/Cornerstone_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'cats', name: 'CATS', category: 'ATS API', logo: '/ATS/CATS_Square_Logo_J4NkqoE-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'fountain', name: 'Fountain', category: 'ATS API', logo: '/ATS/Fountain_Square_Logo-thumbnail-144x144.png', isConnected: false },
  { id: 'hrcloud', name: 'HR Cloud', category: 'ATS API', logo: '/ATS/HR_Cloud_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'pinpoint', name: 'Pinpoint', category: 'ATS API', logo: '/ATS/Pinpoint_square-thumbnail-144x144.png', isConnected: false },
];

export function ATSGrid({
  items,
  title = 'Available Integrations',
  className = '',
}: {
  items: ATSIntegration[];
  title?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-center text-2xl font-semibold text-gray-900 mb-8">
        {title}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
        maxWidth: '600px',
        margin: '0 auto 32px auto'
      }}>
        {items.map((integration) => (
          <div
            key={integration.id}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <img
              src={integration.logo}
              alt={integration.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
            <span style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#64748b',
              textAlign: 'center'
            }}>
              {integration.name}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 font-italic">
        + more integrations available
      </p>
    </div>
  );
}

export default ATSGrid;