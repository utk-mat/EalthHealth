import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../store/slices/orderSlice';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, user]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaBox className="h-5 w-5" />;
      case 'processing':
        return <FaBox className="h-5 w-5" />;
      case 'shipped':
        return <FaTruck className="h-5 w-5" />;
      case 'delivered':
        return <FaCheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <FaTimesCircle className="h-5 w-5" />;
      default:
        return <FaBox className="h-5 w-5" />;
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Please log in to view your orders
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Orders Found
          </h2>
          <p className="text-gray-600">
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order #{order._id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on{' '}
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div
                  className={`flex items-center px-3 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  <span className="ml-2 text-sm font-medium">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item.medicine.imageUrl}
                        alt={item.medicine.name}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.medicine.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.shippingAddress.street}
                      <br />
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.zipCode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 