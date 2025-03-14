import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';

const SalesSetup: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sales Setup
      </Typography>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Welcome to Sales Setup
            </Typography>
            <Typography variant="body1">
              Configure your sales preferences and settings here.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

// Export the routes configuration
const SalesRoutes = () => {
  return (
    <Routes>
      <Route path="/sales/setup" element={<SalesSetup />} />
    </Routes>
  );
};

export default SalesRoutes; 