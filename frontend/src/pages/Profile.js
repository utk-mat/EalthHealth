import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaUser,
  FaHistory,
  FaPills,
  FaCalendarAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import { formatPrice } from '../utils/currency';
import { Link } from 'react-router-dom';
import { fetchUserById, updateProfile } from '../store/slices/authSlice';
import { Alert, Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  borderRadius: '8px',
};

const SuccessPopup = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <Box sx={style}>
        <FaCheckCircle
          style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '16px' }}
        />
        <Typography
          id="success-modal-title"
          variant="h4"
          component="h2"
          sx={{ color: '#4CAF50', fontWeight: 'bold', mb: 1 }}
        >
          Yeaaah !
        </Typography>
        <Typography
          id="success-modal-description"
          sx={{ mt: 2, fontSize: '1.2rem', color: 'gray' }}
        >
          Profile Updated.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
          onClick={handleClose}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
};

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });
  const [statusMessage, setStatusMessage] = useState(null);
  const [messageType, setMessageType] = useState('info');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserById());
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
        },
      });
    }
  }, [user, dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
    setStatusMessage(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setStatusMessage(null);
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
        },
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = async () => {
    console.log('Attempting to save profile with data:', formData);
    try {
      const dataToUpdate = {
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipCode: formData.address.zipCode,
        },
      };

      await dispatch(updateProfile(dataToUpdate)).unwrap();
      setIsEditing(false);
      dispatch(fetchUserById());
      setShowSuccessPopup(true);
      console.log('Profile saved successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-700">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : user.email
                    ? user.email.charAt(0).toUpperCase()
                    : 'U'}
                </span>
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">
                {user.name || 'User'}
              </h1>
              <p className="text-blue-100">
                {user.email || 'Email not provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Personal Information
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  >
                    Edit Profile
                  </button>
                )}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  ) : (
                    <p className="mt-1 text-lg text-gray-900">
                      {user.name || 'Not provided'}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    {user.email || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  ) : (
                    <p className="mt-1 text-lg text-gray-900">
                      {user.phone || 'Not provided'}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Address
                  </label>
                  {isEditing ? (
                    <div className="space-y-2 mt-1">
                      <input
                        type="text"
                        name="address.street"
                        placeholder="Street"
                        value={formData.address.street}
                        onChange={handleFormChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                      <input
                        type="text"
                        name="address.city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleFormChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                      <input
                        type="text"
                        name="address.state"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={handleFormChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                      <input
                        type="text"
                        name="address.zipCode"
                        placeholder="Zip Code"
                        value={formData.address.zipCode}
                        onChange={handleFormChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-lg text-gray-900">
                      {user.address ? (
                        <>
                          {user.address.street}
                          <br />
                          {user.address.city}, {user.address.state}{' '}
                          {user.address.zipCode}
                        </>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>
                {isEditing && (
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={handleSaveClick}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Order History Link */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaHistory className="mr-2 text-blue-600" />
                Order History
              </h2>
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="text-gray-700 mb-4">
                  View your complete order history on the dedicated orders page.
                </p>
                <Link
                  to="/orders"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaHistory className="mr-2" />
                  Go to My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessPopup
        open={showSuccessPopup}
        handleClose={handleCloseSuccessPopup}
      />
    </div>
  );
};

export default Profile;
