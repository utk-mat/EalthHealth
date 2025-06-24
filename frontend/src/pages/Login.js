import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserById } from '../store/slices/authSlice';
import { FaCheckCircle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading: authLoading, error: authError } = useSelector(
    (state) => state.auth,
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const loginResponse = await dispatch(login(formData)).unwrap();
      console.log('User object after login:', loginResponse.user);
      const userId = loginResponse.user._id;
      await dispatch(fetchUserById(userId));
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const isLoading = authLoading;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>

          {success && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-soft px-8 py-10 flex flex-col items-center animate-fade-in-up">
                <FaCheckCircle className="text-green-500 text-6xl animate-bounce mb-4" />
                <span className="text-2xl font-bold text-green-600 mb-2">
                  Login Successful!
                </span>
                <span className="text-gray-600">Redirecting...</span>
              </div>
            </div>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              <RouterLink
                to="/forgot-password"
                style={{ textDecoration: 'none', color: '#1976d2' }}
              >
                Forgot Password?
              </RouterLink>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Don't have an account?{' '}
              <RouterLink to="/register">Register here</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
