import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchCart,
  removeCartItem,
  updateCartItemQuantity,
  clearCart,
} from '../store/slices/cartSlice';

///import { fetchCart, removeFromCart, updateCartItemQuantity, clearCart } from '../store/slices/cartSlice';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { formatPrice } from '../utils/currency';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch cart if user is authenticated
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ cartItemId, quantity: newQuantity }));
    }
  };

  // const handleRemoveItem = (medicineId) => {
  //   dispatch(removeFromCart(medicineId));
  // };

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeCartItem(cartItemId));
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

  console.log('Cart state:', cart);
  const cartItems = cart?.items || [];
  console.log('Cart items:', cartItems);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.medicine.price,
    0,
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Error Loading Cart
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(fetchCart())}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600">
            Add some items to your cart to see them here.
          </p>
          <button
            onClick={() => navigate('/medicines')}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Browse Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-primary mb-8 drop-shadow-lg">
        Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start animate-fade-in-up delay-200">
        <div className="lg:col-span-7">
          <div className="bg-white shadow-soft rounded-2xl overflow-hidden animate-fade-in-up">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="p-6 group">
                  <div className="flex items-center">
                    <img
                      src={item.medicine.imageUrl}
                      alt={item.medicine.name}
                      className="h-24 w-24 object-cover rounded-xl shadow-soft group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.medicine.name}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-accent-pink transition-colors duration-200 group-hover:scale-110"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.medicine.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="text-gray-500 hover:text-primary transition-colors duration-200 group-hover:scale-110"
                          >
                            <FaMinus className="h-4 w-4" />
                          </button>
                          <span className="mx-4 text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-primary transition-colors duration-200 group-hover:scale-110"
                          >
                            <FaPlus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-lg font-medium text-primary">
                          {formatPrice(item.medicine.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-6 text-right">
              <button
                onClick={handleClearCart}
                className="text-accent-purple hover:text-accent-pink font-medium transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:col-span-5 animate-fade-in-up delay-300">
          <div className="bg-gradient-to-br from-accent-purple/10 via-white to-accent-pink/10 rounded-2xl p-6 shadow-soft">
            <h2 className="text-lg font-medium text-primary mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-primary">
                  {formatPrice(cartTotal)}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium text-primary">Free</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium">
                  <p className="text-primary">Total</p>
                  <p className="text-primary">{formatPrice(cartTotal)}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-accent-purple text-white py-3 px-4 rounded-xl hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-semibold shadow-accent"
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
