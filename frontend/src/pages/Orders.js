import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../store/slices/orderSlice';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { formatPrice } from '../utils/currency';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders: realOrders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  // Dummy data for demonstration
  const dummyOrders = [
    {
      _id: 'ORDER-001',
      createdAt: '2023-10-26T10:00:00Z',
      status: 'Delivered',
      totalAmount: 1250.50,
      shippingAddress: {
        street: '123 Health Ave',
        city: 'Wellness City',
        state: 'MH',
        zipCode: '400001',
      },
      items: [
        {
          _id: 'ITEM-001',
          medicine: {
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
            name: 'Pain Relief Tablet',
          },
          quantity: 2,
          price: 150.00,
        },
        {
          _id: 'ITEM-002',
          medicine: {
            imageUrl: 'https://images.unsplash.com/photo-1590480398031-ac0705a3962b?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
            name: 'Vitamin C 1000mg',
          },
          quantity: 1,
          price: 950.50,
        },
      ],
    },
    {
      _id: 'ORDER-002',
      createdAt: '2023-11-15T14:30:00Z',
      status: 'Processing',
      totalAmount: 520.00,
      shippingAddress: {
        street: '456 Pharmacy St',
        city: 'Medi Town',
        state: 'DL',
        zipCode: '110001',
      },
      items: [
        {
          _id: 'ITEM-003',
          medicine: {
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
            name: 'Antiseptic Liquid',
          },
          quantity: 1,
          price: 220.00,
        },
        {
          _id: 'ITEM-004',
          medicine: {
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
            name: 'Cough Syrup',
          },
          quantity: 1,
          price: 300.00,
        },
      ],
    },
  ];

  // Use real orders if available, otherwise use dummy orders for demo
  const orders = realOrders && realOrders.length > 0 ? realOrders : dummyOrders;

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
                        {formatPrice(item.price * item.quantity)}
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
                      {formatPrice(order.totalAmount)}
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