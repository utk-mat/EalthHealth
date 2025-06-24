import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const token = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  let userName = 'Guest';
  let userInitial = 'G';
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      userName = user.name.split(' ')[0]; // Get first name
      userInitial = user.name.charAt(0).toUpperCase();
    }
  } catch (e) {
    console.error('Failed to parse user from localStorage', e);
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleMenuClose();
    navigate('/login');
  };

  const handleMyOrders = () => {
    handleMenuClose();
    navigate('/orders'); // Assuming you will have an /orders route
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Health Pharmacy
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={cart?.items?.length || 0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {token ? (
            <>
              <Button color="inherit" component={RouterLink} to="/medicines">
                Medicines
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  Hi, {userName}
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {userInitial}
                  </Avatar>
                </IconButton>
              </Box>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMyOrders}>My Orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
