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
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/currency';
import { fetchMedicines } from '../store/slices/medicineSlice';

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { medicines, loading: loadingAll } = useSelector(
    (state) => state.medicine,
  );
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
        const response = await axios.get(
          `http://localhost:8080/api/medicines/${id}`,
        );
        setMedicine(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch medicine details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

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

    dispatch(addToCart({ medicineId: medicine.id, quantity }))
      .unwrap()
      .then(() => {
        dispatch(fetchCart());
        setSnackbar({
          open: true,
          message: 'Added to cart successfully!',
          severity: 'success',
        });
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: err || 'Failed to add to cart.',
          severity: 'error',
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getRecommendations = () => {
    if (!medicine || !medicines || medicines.length === 0) return [];
    const others = medicines.filter((m) => m.id !== medicine.id);
    const scored = others.map((m) => {
      let score = 0;
      if (m.category === medicine.category) score += 2;
      if (m.manufacturer === medicine.manufacturer) score += 1;
      const nameWords = medicine.name.toLowerCase().split(/\s+/);
      const otherWords = m.name.toLowerCase().split(/\s+/);
      score += nameWords.filter((w) => otherWords.includes(w)).length * 0.5;
      return { ...m, _score: score };
    });
    return scored.sort((a, b) => b._score - a._score).slice(0, 4);
  };

  const recommendations = getRecommendations();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!medicine) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
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
              <Chip label={medicine.category} sx={{ mr: 1 }} />
              {medicine.requiresPrescription && (
                <Chip label="Prescription Required" color="warning" />
              )}
            </Box>

            <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
              {formatPrice(medicine.price)}
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
                <Typography variant="body1">{medicine.manufacturer}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Dosage Form
                </Typography>
                <Typography variant="body1">{medicine.dosageForm}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Strength
                </Typography>
                <Typography variant="body1">{medicine.strength}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Stock Available
                </Typography>
                <Typography variant="body1">{medicine.stock} units</Typography>
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

      {/* AI-powered Recommendations */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          You may also like
        </Typography>
        {loadingAll ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={120}
          >
            <CircularProgress />
          </Box>
        ) : recommendations.length === 0 ? (
          <Typography color="text.secondary">
            No similar medicines found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {recommendations.map((rec) => (
              <Grid item xs={12} sm={6} md={3} key={rec.id}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    height: '100%',
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { boxShadow: 6, transform: 'scale(1.03)' },
                  }}
                  onClick={() => navigate(`/medicines/${rec.id}`)}
                >
                  <Box
                    component="img"
                    src={rec.imageUrl}
                    alt={rec.name}
                    sx={{
                      width: '100%',
                      height: 120,
                      objectFit: 'contain',
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: 'grey.100',
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {rec.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {rec.manufacturer}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight={700}
                    sx={{ mt: 1 }}
                  >
                    {formatPrice(rec.price)}
                  </Typography>
                  {rec.requiresPrescription && (
                    <Chip
                      label="Prescription"
                      color="warning"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

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
