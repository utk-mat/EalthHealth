import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../context/CartContext';

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/medicines/${id}`);
        setMedicine(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch medicine details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= medicine.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (medicine.requiresPrescription) {
      setSnackbar({
        open: true,
        message: 'This medicine requires a prescription.',
        severity: 'warning',
      });
      return;
    }

    if (quantity > medicine.stock) {
      setSnackbar({
        open: true,
        message: 'Requested quantity exceeds available stock.',
        severity: 'error',
      });
      return;
    }

    addToCart(medicine, quantity);
    setSnackbar({
      open: true,
      message: 'Added to cart successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!medicine) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>Medicine not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/medicines')}
        sx={{ mb: 3 }}
      >
        Back to Medicines
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={medicine.imageUrl}
              alt={medicine.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                objectFit: 'contain',
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 1,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {medicine.name}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip
                label={medicine.category}
                sx={{ mr: 1 }}
              />
              {medicine.requiresPrescription && (
                <Chip
                  label="Prescription Required"
                  color="warning"
                />
              )}
            </Box>

            <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
              ${medicine.price}
            </Typography>

            <Typography variant="body1" paragraph>
              {medicine.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Manufacturer
                </Typography>
                <Typography variant="body1">
                  {medicine.manufacturer}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Dosage Form
                </Typography>
                <Typography variant="body1">
                  {medicine.dosageForm}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Strength
                </Typography>
                <Typography variant="body1">
                  {medicine.strength}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Stock Available
                </Typography>
                <Typography variant="body1">
                  {medicine.stock} units
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Expiry Date
                </Typography>
                <Typography variant="body1">
                  {new Date(medicine.expiryDate).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1, max: medicine.stock }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={medicine.requiresPrescription}
                  >
                    {medicine.requiresPrescription
                      ? 'Prescription Required'
                      : 'Add to Cart'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MedicineDetail; 