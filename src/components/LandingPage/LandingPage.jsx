import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// MUI imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>Welcome to Barbacker! Please log in or register to continue.</h2>
          <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <Button size="small" variant="contained" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
  );
}

export default LandingPage;
