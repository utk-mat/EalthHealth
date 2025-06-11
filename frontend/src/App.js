import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';

// Components
import Navbar from './components/layout/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MedicineList from './pages/MedicineList';
import MedicineDetail from './pages/MedicineDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminMedicines from './pages/AdminMedicines';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/medicines" element={<MedicineList />} />
              <Route path="/medicines/:id" element={<MedicineDetail />} />

              {/* Protected Routes */}
              <Route
                path="/cart"
                element={
                  <PrivateRoute element={Cart} />
                }
              />
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
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 