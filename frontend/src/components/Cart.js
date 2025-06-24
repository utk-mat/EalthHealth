import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Divider,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItemQuantity, clearCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ cartItemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (medicineId) => {
    dispatch(removeFromCart(medicineId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
    } else {
      navigate('/checkout');
    }
  };

  const cartItems = cart?.items || [];
  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity * item.medicine.price, 0);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Loading cart...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Error Loading Cart
          </Typography>
          <Typography color="error">{error}</Typography>
          <Button onClick={() => dispatch(fetchCart())} variant="contained" color="primary" sx={{ mt: 2 }}>
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/medicines')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {cartItems.map((item) => (
              <Box key={item.id}>
                <Grid container spacing={2} alignItems="center" sx={{ py: 2 }}>
                  <Grid item xs={12} sm={3}>
                    <Box
                      component="img"
                      src={item.medicine.imageUrl}
                      alt={item.medicine.name}
                      sx={{ width: '100%', height: 'auto', maxHeight: 100, objectFit: 'contain' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6">{item.medicine.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.medicine.dosageForm} - {item.medicine.strength}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(item.medicine.price)} each
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      label="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      inputProps={{ min: 1 }}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {formatPrice(item.medicine.price * item.quantity)}
                      </Typography>
                      <IconButton color="error" onClick={() => handleRemoveItem(item.medicine._id || item.medicine.id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography>{formatPrice(cartTotal)}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" color="primary">
                    {formatPrice(cartTotal)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
