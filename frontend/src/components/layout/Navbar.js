import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [pincode, setPincode] = useState(localStorage.getItem('pincode') || '');
  const [showPincodeInput, setShowPincodeInput] = useState(false);

  const userName =
    isAuthenticated && user ? user.name || user.email.split('@')[0] : 'Guest';
  const userInitial =
    isAuthenticated && user && user.name
      ? user.name.charAt(0).toUpperCase()
      : 'G';

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

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handlePincodeSave = () => {
    localStorage.setItem('pincode', pincode);
    setShowPincodeInput(false);
  };

  return (
    <>
      {/* Main Navbar (Home, Login, Cart, etc.) */}
      <nav className="bg-gradient-to-r from-primary to-accent-purple shadow-lg text-white py-3 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <img
                  className="h-10 w-auto rounded-full mr-2 shadow-accent transition-transform duration-300 group-hover:scale-110"
                  src="/download.png"
                  alt="Health Pharmacy Logo"
                />
                <span className="text-2xl font-extrabold tracking-tight drop-shadow-lg text-white">
                  Health Pharmacy
                </span>
              </Link>
              <div className="sm:ml-10 flex items-center space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-accent-pink transition-all duration-200 ease-in-out">Home</Link>
                {/* Pincode/Express Delivery Inline */}
                <div
                  className="flex items-center ml-6 px-3 py-1 rounded-lg text-gray-900 text-base font-medium shadow-sm"
                  style={{
                    background: 'linear-gradient(90deg, #ffe4f7 0%, #fff0f6 100%)',
                  }}
                >
                  <LocationOnIcon className="mr-1 text-primary" />
                  {pincode ? (
                    <>
                      Express delivery to <span className="font-bold mx-1">{pincode}</span>
                      <button
                        className="ml-2 underline text-blue-700 hover:text-blue-900"
                        onClick={() => setShowPincodeInput(true)}
                      >
                        Change
                      </button>
                    </>
                  ) : (
                    <>
                      <span>Please select your delivery pincode.</span>
                      <button
                        className="ml-2 underline text-blue-700 hover:text-blue-900"
                        onClick={() => setShowPincodeInput(true)}
                      >
                        Select Pincode
                      </button>
                    </>
                  )}
                  {showPincodeInput && (
                    <div className="ml-4 flex items-center">
                      <input
                        type="text"
                        value={pincode}
                        onChange={handlePincodeChange}
                        placeholder="Enter Pincode"
                        className="border rounded px-2 py-1 text-sm mr-2"
                        maxLength={6}
                        style={{ width: 100 }}
                      />
                      <button
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-accent-purple text-xs"
                        onClick={handlePincodeSave}
                      >
                        Save
                      </button>
                      <button
                        className="ml-2 text-xs text-gray-600 hover:text-red-500"
                        onClick={() => setShowPincodeInput(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/cart"
                className="relative text-white hover:text-accent-pink transition-transform duration-200 ease-in-out group"
              >
                <FaShoppingCart className="h-7 w-7 group-hover:scale-125 group-hover:text-accent-yellow transition-transform duration-200" />
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-5 w-5 px-1 py-0.5 text-xs font-bold leading-none text-white bg-accent-pink rounded-full animate-bounce shadow-accent">
                    {cart.items.length}
                  </span>
                )}
              </Link>
              {!isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-white hover:text-accent-purple transition-all duration-150 ease-in-out flex items-center"
                  >
                    <span className="mr-1">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="text-white hover:text-accent-teal transition-all duration-150 ease-in-out flex items-center"
                  >
                    <span className="mr-1">Register</span>
                  </Link>
                </div>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      mr: 1,
                      color: 'inherit',
                      textShadow: '0 2px 8px rgba(59,130,246,0.15)',
                    }}
                  >
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
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'secondary.main',
                        width: 32,
                        height: 32,
                        boxShadow: '0 2px 8px 0 rgba(34,197,94,0.15)',
                      }}
                    >
                      <FaUserCircle size={24} />
                    </Avatar>
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
                    <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                    <MenuItem onClick={handleMyOrders}>My Orders</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Category Navigation Bar */}
      <div className="bg-gradient-to-r from-accent-purple to-accent-teal text-white py-2 px-2 shadow-md w-full overflow-x-auto">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-10 text-lg font-semibold whitespace-nowrap">
          <Link to="/medicines" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">Medicines</Link>
          <Link to="/lab-tests" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">Lab Tests</Link>
          <Link to="/doctor-consult" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">Doctor Consult</Link>
          <Link to="/healthcare" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">Healthcare</Link>
          <Link to="/health-blogs" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">Health Blogs</Link>
          <Link to="/plus" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">PLUS</Link>
          <Link to="/offers" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">Offers</Link>
          <Link to="/value-store" className="px-2 py-1 hover:text-accent-yellow transition-colors duration-150">Value Store</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
