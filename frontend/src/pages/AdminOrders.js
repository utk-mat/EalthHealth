import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOrders,
  updateOrderStatus,
  cancelOrder,
} from '../store/slices/orderSlice';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaTimes,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaCircleNotch,
} from 'react-icons/fa';
import useSearch from '../hooks/useSearch';
import usePagination from '../hooks/usePagination';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const { searchTerm, handleSearch, filteredItems, clearSearch } = useSearch(
    orders,
    ['_id', 'userId', 'totalAmount', 'status']
  );

  const filteredByStatus = statusFilter
    ? filteredItems.filter((order) => order.status === statusFilter)
    : filteredItems;

  const { paginatedItems, currentPage, totalPages, goToPage, nextPage, previousPage, getPageNumbers } = usePagination(filteredByStatus, 10);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const openOrderDetailsModal = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to change order status to ${newStatus}?`
      )
    ) {
      await dispatch(updateOrderStatus({ orderId, status: newStatus }));
      dispatch(fetchOrders()); // Re-fetch to update list
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      await dispatch(cancelOrder(orderId));
      dispatch(fetchOrders()); // Re-fetch to update list
    }
  };

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
        return <FaCircleNotch className="h-4 w-4" />;
      case 'processing':
        return <FaBox className="h-4 w-4" />;
      case 'shipped':
        return <FaTruck className="h-4 w-4" />;
      case 'delivered':
        return <FaCheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <FaTimesCircle className="h-4 w-4" />;
      default:
        return <FaBox className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Orders</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <div className="flex items-center">
          <FaFilter className="text-gray-400 mr-2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-center">Loading orders...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && paginatedItems.length === 0 && (
        <p className="text-center text-gray-600">No orders found.</p>
      )}

      {!loading && paginatedItems.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedItems.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      <span className="flex items-center">
                        {getStatusIcon(order.status)}<span className="ml-1">{order.status}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openOrderDetailsModal(order)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEye className="inline-block mr-1" /> View
                    </button>
                    <select
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      defaultValue=""
                      className="ml-2 p-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="" disabled>Update Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
                    {order.status !== 'CANCELLED' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        <FaTrash className="inline-block mr-1" /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(currentPage * 10, filteredByStatus.length)}</span> of <span className="font-medium">{filteredByStatus.length}</span> results
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="hidden md:flex ml-4">
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === page ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </nav>
          )}
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && currentOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">Order Details #{currentOrder._id}</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>User ID:</strong> {currentOrder.userId}</p>
              <p><strong>Total Amount:</strong> ${currentOrder.totalAmount.toFixed(2)}</p>
              <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(currentOrder.status)}`}>{currentOrder.status}</span></p>
              <p><strong>Order Date:</strong> {new Date(currentOrder.createdAt).toLocaleString()}</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Items:</h3>
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {currentOrder.items.map((item) => (
                  <li key={item._id} className="flex items-center py-3 px-4">
                    <img src={item.medicine.imageUrl} alt={item.medicine.name} className="h-12 w-12 object-cover rounded-md mr-4" />
                    <div className="flex-1">
                      <p className="font-medium">{item.medicine.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">Shipping Address:</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{currentOrder.shippingAddress.street}</p>
                <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}</p>
              </div>

              <p><strong>Payment Method:</strong> {currentOrder.paymentMethod}</p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders; 