import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Candidate } from '../../../types/hiring';

interface CandidateDetailModalProps {
  open: boolean;
  onClose: () => void;
  selectedCandidate: Candidate;
}

const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  open,
  onClose,
  selectedCandidate
}) => {
  if (!selectedCandidate) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'error';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Candidate Details</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="body1">{selectedCandidate.name}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Position
          </Typography>
          <Typography variant="body1">{selectedCandidate.appliedFor}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1">{selectedCandidate.email}</Typography>
          <Typography variant="body1">{selectedCandidate.phone}</Typography>
          <Typography variant="body1">{selectedCandidate.location}</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Experience
          </Typography>
          {selectedCandidate.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" fontWeight="medium">
                {exp.title} at {exp.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.startDate} - {exp.endDate || 'Present'}
              </Typography>
              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Education
          </Typography>
          {selectedCandidate.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" fontWeight="medium">
                {edu.degree} in {edu.field}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.institution}, {edu.graduationYear}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedCandidate.skills.map((skill, index) => (
              <Chip key={index} label={skill} />
            ))}
          </Box>
        </Box>

        {selectedCandidate.interviews.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Interviews
            </Typography>
            {selectedCandidate.interviews.map((interview, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="medium">
                  {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(interview.scheduledAt).toLocaleDateString()}
                </Typography>
                {interview.feedback && (
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={`Rating: ${interview.feedback.rating}/10`}
                      color={getScoreColor(interview.feedback.rating)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2">{interview.feedback.notes}</Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}

        {selectedCandidate.notes && selectedCandidate.notes.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Notes
            </Typography>
            {selectedCandidate.notes.map((note, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2">{note.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(note.createdAt).toLocaleDateString()} by {note.createdBy}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetailModal; 