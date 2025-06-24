import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
  MoreVert,
  LocalShipping,
  CheckCircle,
  Warning,
  Error,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalSales: 125000,
    totalOrders: 1247,
    totalCustomers: 892,
    totalProducts: 156,
    salesGrowth: 12.5,
    orderGrowth: 8.3,
    customerGrowth: 15.2,
    productGrowth: 5.7,
  });

  const [salesData, setSalesData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const generateSalesData = () => {
      const data = [];
      for (let i = 0; i < 30; i++) {
        data.push({
          date: new Date(
            Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
          ).toLocaleDateString(),
          sales: Math.floor(Math.random() * 5000) + 2000,
          orders: Math.floor(Math.random() * 50) + 20,
        });
      }
      return data;
    };

    const generateCategoryData = () => [
      { name: 'Pain Relief', value: 35, color: '#8884d8' },
      { name: 'Vitamins', value: 25, color: '#82ca9d' },
      { name: 'Antibiotics', value: 20, color: '#ffc658' },
      { name: 'Diabetes', value: 15, color: '#ff7300' },
      { name: 'Others', value: 5, color: '#8dd1e1' },
    ];

    const generateRecentOrders = () => [
      {
        id: '#ORD-001',
        customer: 'John Doe',
        amount: 1250,
        status: 'Delivered',
        date: '2024-01-15',
      },
      {
        id: '#ORD-002',
        customer: 'Jane Smith',
        amount: 890,
        status: 'Processing',
        date: '2024-01-14',
      },
      {
        id: '#ORD-003',
        customer: 'Mike Johnson',
        amount: 2100,
        status: 'Shipped',
        date: '2024-01-13',
      },
      {
        id: '#ORD-004',
        customer: 'Sarah Wilson',
        amount: 750,
        status: 'Pending',
        date: '2024-01-12',
      },
    ];

    setSalesData(generateSalesData());
    setCategoryData(generateCategoryData());
    setRecentOrders(generateRecentOrders());
  }, []);

  const MetricCard = ({ title, value, growth, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {title}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: 'bold' }}
              >
                {typeof value === 'number' && value >= 1000
                  ? `₹${(value / 1000).toFixed(1)}K`
                  : value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {growth >= 0 ? (
                  <TrendingUp
                    sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }}
                  />
                ) : (
                  <TrendingDown
                    sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }}
                  />
                )}
                <Typography
                  variant="body2"
                  color={growth >= 0 ? 'success.main' : 'error.main'}
                  sx={{ fontWeight: 600 }}
                >
                  {Math.abs(growth)}%
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ ml: 0.5 }}
                >
                  vs last month
                </Typography>
              </Box>
            </Box>
            <Avatar
              sx={{
                backgroundColor: color,
                width: 56,
                height: 56,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              {icon}
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Shipped':
        return 'info';
      case 'Processing':
        return 'warning';
      case 'Pending':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle fontSize="small" />;
      case 'Shipped':
        return <LocalShipping fontSize="small" />;
      case 'Processing':
        return <Warning fontSize="small" />;
      case 'Pending':
        return <Error fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Analytics Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Sales"
            value={analytics.totalSales}
            growth={analytics.salesGrowth}
            icon={<AttachMoney />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Orders"
            value={analytics.totalOrders}
            growth={analytics.orderGrowth}
            icon={<ShoppingCart />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Customers"
            value={analytics.totalCustomers}
            growth={analytics.customerGrowth}
            icon={<People />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Products"
            value={analytics.totalProducts}
            growth={analytics.productGrowth}
            icon={<Inventory />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Sales Trend */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sales Trend (Last 30 Days)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#1976d2"
                      fill="#1976d2"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sales by Category
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Recent Orders</Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                <List>
                  {recentOrders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'grey.100' }}>
                            {getStatusIcon(order.status)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600 }}
                              >
                                {order.id}
                              </Typography>
                              <Typography variant="h6" color="primary">
                                ₹{order.amount}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 1,
                              }}
                            >
                              <Typography variant="body2" color="textSecondary">
                                {order.customer} • {order.date}
                              </Typography>
                              <Chip
                                label={order.status}
                                color={getStatusColor(order.status)}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentOrders.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Overview
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Order Fulfillment</Typography>
                    <Typography variant="body2" color="primary">
                      85%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Customer Satisfaction
                    </Typography>
                    <Typography variant="body2" color="primary">
                      92%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={92}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Inventory Turnover</Typography>
                    <Typography variant="body2" color="primary">
                      78%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={78}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Revenue Growth</Typography>
                    <Typography variant="body2" color="primary">
                      12.5%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
