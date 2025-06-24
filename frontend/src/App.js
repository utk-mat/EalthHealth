import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import store from './store';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from './context/ThemeContext';
import ChatSupport from './components/common/ChatSupport';
import Cart from './components/Cart';
import MedicineList from './pages/MedicineList';
import MedicineDetail from './components/MedicineDetail';

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
import ForgotPassword from './pages/ForgotPassword';
import LabTests from './pages/LabTests';
import DoctorConsult from './pages/DoctorConsult';
import Healthcare from './pages/Healthcare';
import Offers from './pages/Offers';
import HealthBlogs from './pages/HealthBlogs';
import Plus from './pages/Plus';
import ValueStore from './pages/ValueStore';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminMedicines from './pages/AdminMedicines';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
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

function AppContent() {
  const { theme } = useTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
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
              element={<PrivateRoute element={Orders} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={Profile} />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<PrivateRoute element={AdminDashboard} adminOnly />}
            />
            <Route
              path="/admin/medicines"
              element={<PrivateRoute element={AdminMedicines} adminOnly />}
            />
            <Route
              path="/admin/orders"
              element={<PrivateRoute element={AdminOrders} adminOnly />}
            />
            <Route
              path="/admin/users"
              element={<PrivateRoute element={AdminUsers} adminOnly />}
            />

            {/* New Pages */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/returns-exchange" element={<ReturnsExchange />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/doctor-consult" element={<DoctorConsult />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/health-blogs" element={<HealthBlogs />} />
            <Route path="/plus" element={<Plus />} />
            <Route path="/value-store" element={<ValueStore />} />
          </Routes>
        </Layout>

        {/* Global Components */}
        <ChatSupport />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4caf50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#f44336',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </MuiThemeProvider>
  );
}

function App() {
  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <CustomThemeProvider>
            <AppContent />
          </CustomThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
