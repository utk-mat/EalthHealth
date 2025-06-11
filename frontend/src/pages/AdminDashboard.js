import React from 'react';
import { Link } from 'react-router-dom';
import { FaPills, FaShoppingCart, FaUsers, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  const adminLinks = [
    {
      name: 'Manage Medicines',
      path: '/admin/medicines',
      icon: <FaPills className="text-blue-500 text-3xl" />,
      description: 'View, add, edit, and delete medicines.',
    },
    {
      name: 'Manage Orders',
      path: '/admin/orders',
      icon: <FaShoppingCart className="text-green-500 text-3xl" />,
      description: 'Track and update customer orders.',
    },
    {
      name: 'Manage Users',
      path: '/admin/users',
      icon: <FaUsers className="text-purple-500 text-3xl" />,
      description: 'View and manage user accounts and roles.',
    },
    {
      name: 'Reports & Analytics',
      path: '/admin/reports',
      icon: <FaChartLine className="text-red-500 text-3xl" />,
      description: 'Access sales data and website performance.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200"
          >
            <div className="mb-4">{link.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {link.name}
            </h2>
            <p className="text-gray-600 text-sm">{link.description}</p>
          </Link>
        ))}
      </div>

      {/* Future sections for quick stats, recent activities, etc. */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
            <p className="text-blue-700 text-sm font-medium">Total Orders</p>
            <p className="text-3xl font-bold text-blue-900">1,234</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow-sm">
            <p className="text-green-700 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-green-900">567</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 shadow-sm">
            <p className="text-yellow-700 text-sm font-medium">Medicines in Stock</p>
            <p className="text-3xl font-bold text-yellow-900">890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 