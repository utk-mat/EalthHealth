import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register, logout } from '../store/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const handleRegister = async (userData) => {
    try {
      await dispatch(register(userData)).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      throw err;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'ADMIN';

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};

export default useAuth;
