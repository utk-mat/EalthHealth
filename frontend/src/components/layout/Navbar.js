import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-md text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img
                className="h-10 w-auto rounded-full"
                src="/download.png"
                alt="Ealth Pharmacy Logo"
              />
              <span className="text-2xl font-extrabold tracking-tight text-white">Ealth Pharmacy</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-blue-200"
              >
                Home
              </Link>
              <Link
                to="/medicines"
                className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-blue-200"
              >
                Medicines
              </Link>
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-blue-200"
                >
                  My Orders
                </Link>
              )}
              {isAuthenticated && user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className="inline-flex items-center px-1 pt-1 text-lg font-medium text-white hover:text-blue-200 transition duration-150 ease-in-out border-b-2 border-transparent hover:border-blue-200"
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
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-white hover:text-blue-200 transition duration-150 ease-in-out"
                >
                  <FaUser className="h-7 w-7" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200 transition duration-150 ease-in-out flex items-center"
                >
                  <FaSignOutAlt className="h-7 w-7 mr-1" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-blue-200 transition duration-150 ease-in-out flex items-center"
                >
                  <FaSignInAlt className="h-7 w-7 mr-1" />
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-blue-200 transition duration-150 ease-in-out flex items-center"
                >
                  <FaUserPlus className="h-7 w-7 mr-1" />
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