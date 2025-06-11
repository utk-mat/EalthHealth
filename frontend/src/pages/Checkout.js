import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';
import { FaLock, FaCreditCard, FaPaypal } from 'react-icons/fa';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        items: items.map((item) => ({
          medicine: item.medicine._id,
          quantity: item.quantity,
          price: item.medicine.price,
        })),
        shippingAddress: user.address,
        paymentMethod,
        totalAmount: total,
      };

      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate('/orders');
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Please log in to checkout
          </h2>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600">
            Add some items to your cart before checking out.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-900">
                  {user.address?.street}
                  <br />
                  {user.address?.city}, {user.address?.state}{' '}
                  {user.address?.zipCode}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Payment Method
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="credit"
                    className="ml-3 flex items-center text-gray-700"
                  >
                    <FaCreditCard className="h-5 w-5 mr-2" />
                    Credit Card
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="paypal"
                    className="ml-3 flex items-center text-gray-700"
                  >
                    <FaPaypal className="h-5 w-5 mr-2" />
                    PayPal
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaLock className="mr-2" />
                  Place Order
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.medicine._id} className="flex py-4">
                    <img
                      src={item.medicine.imageUrl}
                      alt={item.medicine.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.medicine.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ${(item.medicine.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium text-gray-900">Free</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-medium">
                  <p className="text-gray-900">Total</p>
                  <p className="text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 