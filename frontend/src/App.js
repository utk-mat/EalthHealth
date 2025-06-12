import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/layout/Navbar';
import MedicineList from './pages/MedicineList';
import MedicineDetail from './components/MedicineDetail';
import Cart from './components/Cart';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import ShippingDelivery from './pages/ShippingDelivery';
import ReturnsExchange from './pages/ReturnsExchange';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Checkout from './pages/Checkout';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminMedicines from './pages/AdminMedicines';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/medicines" element={<MedicineList />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/medicines/:id"
                  element={
                    <ProtectedRoute>
                      <MedicineDetail />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute element={Orders} />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute element={Profile} />
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute element={AdminDashboard} adminOnly />
                  }
                />
                <Route
                  path="/admin/medicines"
                  element={
                    <PrivateRoute element={AdminMedicines} adminOnly />
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <PrivateRoute element={AdminOrders} adminOnly />
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <PrivateRoute element={AdminUsers} adminOnly />
                  }
                />

                {/* New Pages */}
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping-delivery" element={<ShippingDelivery />} />
                <Route path="/returns-exchange" element={<ReturnsExchange />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 