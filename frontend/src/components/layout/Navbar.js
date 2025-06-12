import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FaShoppingCart } from 'react-icons/fa';
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Box,
} from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  let userName = 'Guest';
  let userInitial = 'G';
  if (isAuthenticated && user && user.name) {
    userName = user.name.split(' ')[0]; // Get first name
    userInitial = user.name.charAt(0).toUpperCase();
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const handleMyOrders = () => {
    handleMenuClose();
    navigate('/orders');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-md text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto rounded-full mr-2"
                src="/download.png"
                alt="Health Pharmacy Logo"
              />
              <span className="text-2xl font-extrabold tracking-tight">Health Pharmacy</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/medicines"
                className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out"
              >
                Medicines
              </Link>
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out"
                >
                  My Orders
                </Link>
              )}
              {isAuthenticated && user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative text-white hover:text-blue-200 transition duration-150 ease-in-out"
            >
              <FaShoppingCart className="h-7 w-7" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-5 w-5 px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full animate-pulse">
                  {items.length}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Typography variant="body1" sx={{ mr: 1, color: 'inherit' }}>
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
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '1rem' }}>{userInitial}</Avatar>
                </IconButton>
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
              </Box>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-blue-200 transition duration-150 ease-in-out flex items-center"
                >
                  <span className="mr-1">Login</span>
                  {/* <FaSignInAlt className="h-7 w-7 mr-1" /> */}
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-blue-200 transition duration-150 ease-in-out flex items-center"
                >
                  <span className="mr-1">Register</span>
                  {/* <FaUserPlus className="h-7 w-7 mr-1" /> */}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 