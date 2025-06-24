import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Forgot Password
          </Typography>

          {success && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-soft px-8 py-10 flex flex-col items-center animate-fade-in-up">
                <FaCheckCircle className="text-green-500 text-6xl animate-bounce mb-4" />
                <span className="text-2xl font-bold text-green-600 mb-2">
                  Email Sent!
                </span>
                <span className="text-gray-600">
                  Check your inbox for reset instructions.
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Send Reset Link
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
