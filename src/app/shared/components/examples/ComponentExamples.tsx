import React, { useState } from 'react';
import { Card } from '../Card';
import { Modal } from '../Modal';
import { IntegrationModal, IntegrationConfig, ConnectionStatus } from '../integrations/IntegrationModal';
import { 
  Form, 
  TextField, 
  SelectDropdown, 
  DatePicker, 
  CheckBox, 
  RadioGroup, 
  FileUpload 
} from '../form';
import { LineChart, BarChart, PieChart } from '../charts';
import { 
  Calendar, 
  Mail, 
  User, 
  Lock, 
  Save, 
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { primaryGradientClass } from '@/app/shared/styles/theme';

const ComponentExamples: React.FC = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    subscribe: false,
    agreeToTerms: false,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Integration Modal state
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [connectionError, setConnectionError] = useState<string>('');

  // Sample data for charts
  const lineChartData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300 },
  ];

  const barChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const pieChartData = [
    { name: 'Completed', value: 540 },
    { name: 'In Progress', value: 320 },
    { name: 'Failed', value: 90 },
    { name: 'Pending', value: 200 },
  ];

  // Sample integration config
  const sampleIntegration: IntegrationConfig = {
    name: 'HubSpot CRM',
    logo: 'https://cdn.worldvectorlogo.com/logos/hubspot-2.svg',
    description: 'Connect to your HubSpot account to sync contacts, companies, and deals.',
    fields: [
      {
        id: 'apiKey',
        label: 'API Key',
        placeholder: 'Enter your HubSpot API key',
        type: 'password',
        required: true,
        helperText: 'You can find your API key in your HubSpot account settings.'
      },
      {
        id: 'syncContacts',
        label: 'Sync contacts',
        type: 'checkbox',
        helperText: 'Allow CleanAgent to sync contact data with HubSpot'
      },
      {
        id: 'syncCompanies',
        label: 'Sync companies',
        type: 'checkbox',
        helperText: 'Allow CleanAgent to sync company data with HubSpot'
      }
    ],
    isOAuth: false,
    learnMoreUrl: 'https://hubspot.com/api',
    documentationUrl: 'https://developers.hubspot.com/docs/api/overview'
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormValues({
      ...formValues,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
  };

  // Handle integration connect
  const handleConnect = async (formData: Record<string, any>) => {
    console.log('Connecting with:', formData);
    setConnectionStatus('connecting');
    
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (formData.apiKey === 'valid-key') {
          setConnectionStatus('connected');
          resolve(true);
        } else {
          setConnectionStatus('error');
          setConnectionError('Invalid API key. Please check your credentials.');
          resolve(false);
        }
      }, 2000);
    });
  };

  // Handle integration disconnect
  const handleDisconnect = async () => {
    setConnectionStatus('disconnected');
    return Promise.resolve(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold">Component Examples</h1>
      
      {/* Form Components */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Form Components</h2>
        
        <Card 
          title="Registration Form" 
          description="Complete this form to create your account"
          shadow="md"
          rounded="lg"
          className="max-w-2xl"
        >
          <Form
            onSubmit={handleSubmit}
            className="space-y-6"
            submitButton={
              <button
                type="submit"
                className={`
                  ${primaryGradientClass} text-white rounded-md py-2 px-6
                  text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
              >
                Create Account
              </button>
            }
            resetButton={
              <button
                type="button"
                onClick={() => setFormValues({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  birthDate: '',
                  gender: '',
                  subscribe: false,
                  agreeToTerms: false,
                })}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Reset
              </button>
            }
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <TextField
                id="name"
                label="Full Name"
                icon={<User className="h-5 w-5" />}
                required
                value={formValues.name}
                onChange={handleInputChange}
                validation={{
                  minLength: 3,
                  maxLength: 50
                }}
              />
              
              <TextField
                id="email"
                label="Email Address"
                icon={<Mail className="h-5 w-5" />}
                type="email"
                required
                value={formValues.email}
                onChange={handleInputChange}
                validation={{
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                }}
                helperText="We'll never share your email."
              />
              
              <TextField
                id="password"
                label="Password"
                icon={<Lock className="h-5 w-5" />}
                type="password"
                required
                value={formValues.password}
                onChange={handleInputChange}
                validation={{
                  minLength: 8,
                  validate: (value) => {
                    if (!/\d/.test(value)) {
                      return 'Password must contain at least one number';
                    }
                    if (!/[A-Z]/.test(value)) {
                      return 'Password must contain at least one uppercase letter';
                    }
                    return undefined;
                  }
                }}
              />
              
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                icon={<Lock className="h-5 w-5" />}
                type="password"
                required
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                validation={{
                  validate: (value) => value === formValues.password ? undefined : 'Passwords do not match'
                }}
              />
              
              <DatePicker
                id="birthDate"
                label="Date of Birth"
                required
                value={formValues.birthDate}
                onChange={handleInputChange}
                maxDate={new Date().toISOString().split('T')[0]}
              />
              
              <SelectDropdown
                id="gender"
                label="Gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'non-binary', label: 'Non-binary' },
                  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                ]}
                value={formValues.gender}
                onChange={handleInputChange}
              />
            </div>
            
            <RadioGroup
              id="notification-preference"
              name="notification-preference"
              label="Notification Preference"
              options={[
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' },
                { value: 'push', label: 'Push Notifications' },
                { value: 'none', label: 'None' }
              ]}
              direction="horizontal"
            />
            
            <FileUpload
              id="profilePicture"
              label="Profile Picture (Optional)"
              accept="image/*"
              maxFileSize={5 * 1024 * 1024} // 5MB
              helperText="Maximum file size: 5MB"
            />
            
            <CheckBox
              id="subscribe"
              label="Subscribe to newsletter"
              helperText="Get weekly updates on new features and promotions."
              checked={formValues.subscribe}
              onChange={handleInputChange}
            />
            
            <CheckBox
              id="agreeToTerms"
              label="I agree to the Terms of Service and Privacy Policy"
              required
              checked={formValues.agreeToTerms}
              onChange={handleInputChange}
            />
          </Form>
        </Card>
      </section>
      
      {/* Charts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Charts & Graphs</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <LineChart
            title="Sales vs Revenue"
            subtitle="Monthly comparison"
            data={lineChartData}
            series={[
              { dataKey: 'sales', name: 'Sales', color: '#3b82f6' },
              { dataKey: 'revenue', name: 'Revenue', color: '#14b8a6' }
            ]}
            xAxisDataKey="name"
            xAxisLabel="Month"
            yAxisLabel="Amount ($)"
            height={300}
          />
          
          <BarChart
            title="Group Comparison"
            subtitle="Value by group"
            data={barChartData}
            series={[
              { dataKey: 'value', name: 'Value' }
            ]}
            xAxisDataKey="name"
            height={300}
          />
          
          <PieChart
            title="Task Status"
            subtitle="Distribution of tasks by status"
            data={pieChartData}
            showLabels
            labelType="percent"
            isDonut
            height={300}
          />
        </div>
      </section>
      
      {/* Cards & Modals */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Cards & Modals</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Basic Card"
            description="A simple card with title and description."
            shadow="sm"
            hoverEffect
          >
            <p className="text-gray-600">
              This is the content of a basic card. You can put any content here.
            </p>
          </Card>
          
          <Card
            title="Card with Actions"
            description="A card with header actions and footer."
            headerActions={
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </button>
            }
            footer={
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeft className="mr-1.5 h-3 w-3" />
                  Back
                </button>
                <button
                  type="button"
                  className={`
                    inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md
                    text-white ${primaryGradientClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  `}
                >
                  <Save className="mr-1.5 h-3 w-3" />
                  Save
                </button>
              </div>
            }
          >
            <p className="text-gray-600">
              This card demonstrates header actions and a footer with buttons.
            </p>
          </Card>
          
          <Card
            title="Modal Example"
            description="Click the button to open a modal dialog."
          >
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`
                  w-full ${primaryGradientClass} text-white rounded-md py-2 px-4
                  text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
              >
                Open Modal
              </button>
            </div>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              size="md"
              footer={
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`
                      inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                      text-white ${primaryGradientClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    `}
                  >
                    Confirm
                  </button>
                </div>
              }
            >
              <p className="text-gray-600">
                This is a modal dialog. It can be used for various purposes like confirmation, forms, or displaying information.
              </p>
              <p className="mt-4 text-gray-600">
                Click the "Confirm" or "Cancel" button to close the modal.
              </p>
            </Modal>
          </Card>
        </div>
      </section>
      
      {/* Integration Modal */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Integration Modal</h2>
        
        <Card
          title="Third-Party Integrations"
          description="Connect your CleanAgent account to other services."
        >
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setIsIntegrationModalOpen(true)}
              className={`
                ${primaryGradientClass} text-white rounded-md py-2 px-4
                text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              `}
            >
              Connect to HubSpot
            </button>
            
            <div className="mt-2 text-sm text-gray-500">
              <p>
                For testing, use "valid-key" as the API key to simulate a successful connection.
              </p>
            </div>
          </div>
          
          <IntegrationModal
            isOpen={isIntegrationModalOpen}
            onClose={() => setIsIntegrationModalOpen(false)}
            integration={sampleIntegration}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            connectionStatus={connectionStatus}
            connectionError={connectionError}
          />
        </Card>
      </section>
    </div>
  );
};

export default ComponentExamples; 