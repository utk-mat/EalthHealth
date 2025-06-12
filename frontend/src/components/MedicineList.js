import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
}));

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/medicines');
        setMedicines(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch medicines. Please try again later.');
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Medicines
      </Typography>
      <Grid container spacing={4}>
        {medicines.map((medicine) => (
          <Grid item key={medicine.id} xs={12} sm={6} md={4}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={medicine.imageUrl}
                alt={medicine.name}
                sx={{ objectFit: 'contain', bgcolor: 'grey.100', p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {medicine.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {medicine.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={medicine.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {medicine.requiresPrescription && (
                    <Chip
                      label="Prescription Required"
                      size="small"
                      color="warning"
                    />
                  )}
                </Box>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  ${medicine.price}
                </Typography>
                <Button
                  component={Link}
                  to={`/medicines/${medicine.id}`}
                  variant="contained"
                  fullWidth
                >
                  View Details
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MedicineList; 