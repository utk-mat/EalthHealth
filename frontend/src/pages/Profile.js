import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaHistory, FaPills, FaCalendarAlt } from 'react-icons/fa';
import { formatPrice } from '../utils/currency';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`/api/orders/user/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }
        const data = await response.json();
        setOrderHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-blue-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1 text-lg text-gray-900">{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Address</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {user.address ? (
                      <>
                        {user.address.street}
                        <br />
                        {user.address.city}, {user.address.state} {user.address.zipCode}
                      </>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaHistory className="mr-2 text-blue-600" />
                Order History
              </h2>
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading order history...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4 text-red-600">
                  {error}
                </div>
              ) : orderHistory.length === 0 ? (
                <div className="text-center py-4 text-gray-600">
                  No orders found
                </div>
              ) : (
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order._id.slice(-6)}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <FaCalendarAlt className="mr-1" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                          <FaPills className="mr-1" />
                          Items
                        </h4>
                        <ul className="space-y-2">
                          {order.items.map((item) => (
                            <li key={item._id} className="text-sm text-gray-900">
                              {item.medicine.name} x {item.quantity} - {formatPrice(item.price * item.quantity)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Total</span>
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 