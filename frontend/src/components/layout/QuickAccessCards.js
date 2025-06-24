import React from 'react';
import { Box, Grid, Paper, Typography, Chip, Tooltip, Zoom } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ScienceIcon from '@mui/icons-material/Science';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Medicine',
    icon: <img src={process.env.PUBLIC_URL + '/medicine.jpg.webp'} alt="Medicine" style={{ width: 48, height: 48, objectFit: 'contain' }} />, 
    color: 'primary.main',
    route: '/medicines',
  },
  {
    title: 'Lab Tests',
    icon: <img src={process.env.PUBLIC_URL + '/labtest.jpg.webp'} alt="Lab Tests" style={{ width: 48, height: 48, objectFit: 'contain' }} />, 
    color: 'secondary.main',
    route: '/lab-tests',
  },
  {
    title: 'Doctor Consult',
    icon: <img src={process.env.PUBLIC_URL + '/doctor.jpg.webp'} alt="Doctor Consult" style={{ width: 48, height: 48, objectFit: 'contain' }} />, 
    color: '#00bfae',
    route: '/doctor-consult',
  },
  {
    title: 'Healthcare',
    icon: <img src={process.env.PUBLIC_URL + '/healthcare.jpg.webp'} alt="Healthcare" style={{ width: 48, height: 48, objectFit: 'contain' }} />, 
    color: '#ff9800',
    route: '/healthcare',
  },
  {
    title: 'Offers',
    icon: <img src={process.env.PUBLIC_URL + '/offers.jpg.webp'} alt="Offers" style={{ width: 48, height: 48, objectFit: 'contain' }} />, 
    color: '#009688',
    route: '/offers',
  },
];

const QuickAccessCards = ({ onCardClick }) => (
  <Box sx={{ width: '100%', mt: 2, mb: 4, background: 'transparent', boxShadow: 'none', borderRadius: 0, p: 0 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 0, width: '100%', maxWidth: 1100, mx: 'auto' }}>
      {cards.map((card, idx) => (
        <Zoom in style={{ transitionDelay: `${idx * 80}ms` }} key={card.title}>
          <Link to={card.route} style={{ textDecoration: 'none' }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: '0.2s',
                minWidth: 160,
                maxWidth: 180,
                width: '100%',
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px) scale(1.04)',
                  backgroundColor: 'grey.50',
                },
                background: 'transparent',
              }}
            >
              <Box sx={{
                mb: 1,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#f5f7fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 1,
              }}>
                {card.icon}
              </Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: card.color, textAlign: 'center', fontSize: 18 }}>
                {card.title}
              </Typography>
            </Paper>
          </Link>
        </Zoom>
      ))}
    </Box>
  </Box>
);

export default QuickAccessCards; 