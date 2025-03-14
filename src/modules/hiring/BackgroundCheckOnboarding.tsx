import React, { useState } from 'react';
import { 
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper
} from '@mui/material';
import { Candidate } from '../../types/hiring';

interface BackgroundCheckOnboardingProps {
  candidate: Candidate;
  onComplete: (data: any) => void;
}

const steps = [
  'Personal Information',
  'Employment History',
  'Education Verification',
  'Consent & Authorization'
];

const BackgroundCheckOnboarding: React.FC<BackgroundCheckOnboardingProps> = ({
  candidate,
  onComplete
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      address: '',
      ssn: '',
      dob: ''
    },
    employmentHistory: {
      currentEmployer: candidate.experience[0]?.company || '',
      position: candidate.experience[0]?.title || '',
      startDate: candidate.experience[0]?.startDate || '',
      endDate: candidate.experience[0]?.endDate || '',
      experience: `${candidate.experience.length} years`
    },
    education: {
      institution: candidate.education[0]?.institution || '',
      degree: candidate.education[0]?.degree || '',
      graduationYear: candidate.education[0]?.graduationYear?.toString() || '',
      verificationConsent: false
    },
    consent: {
      backgroundCheck: false,
      creditCheck: false,
      criminalRecord: false,
      termsAccepted: false
    }
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onComplete(formData);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.personalInfo.fullName}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              value={formData.personalInfo.address}
              onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Employment History
            </Typography>
            <TextField
              fullWidth
              label="Current Employer"
              value={formData.employmentHistory.currentEmployer}
              onChange={(e) => handleInputChange('employmentHistory', 'currentEmployer', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Position"
              value={formData.employmentHistory.position}
              onChange={(e) => handleInputChange('employmentHistory', 'position', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Experience"
              value={formData.employmentHistory.experience}
              onChange={(e) => handleInputChange('employmentHistory', 'experience', e.target.value)}
              margin="normal"
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Education Verification
            </Typography>
            <TextField
              fullWidth
              label="Institution"
              value={formData.education.institution}
              onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Degree"
              value={formData.education.degree}
              onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Graduation Year"
              value={formData.education.graduationYear}
              onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.education.verificationConsent}
                  onChange={(e) => handleInputChange('education', 'verificationConsent', e.target.checked)}
                />
              }
              label="I authorize verification of my educational background"
            />
          </Box>
        );
      case 3:
    return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Consent & Authorization
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent.backgroundCheck}
                  onChange={(e) => handleInputChange('consent', 'backgroundCheck', e.target.checked)}
                />
              }
              label="I authorize a background check"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent.creditCheck}
                  onChange={(e) => handleInputChange('consent', 'creditCheck', e.target.checked)}
                />
              }
              label="I authorize a credit check"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent.criminalRecord}
                  onChange={(e) => handleInputChange('consent', 'criminalRecord', e.target.checked)}
                />
              }
              label="I authorize a criminal record check"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent.termsAccepted}
                  onChange={(e) => handleInputChange('consent', 'termsAccepted', e.target.checked)}
                />
              }
              label="I accept the terms and conditions"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent(activeStep)}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};

export default BackgroundCheckOnboarding; 