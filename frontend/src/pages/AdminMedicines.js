import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from '../store/slices/medicineSlice';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import useForm from '../hooks/useForm';
import useSearch from '../hooks/useSearch';
import usePagination from '../hooks/usePagination';

const AdminMedicines = () => {
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.medicine);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);

  const {
    searchTerm,
    handleSearch,
    filteredItems,
    handleFilter,
    clearSearch,
    clearFilters,
  } = useSearch(medicines, ['name', 'category', 'description']);
  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    getPageNumbers,
  } = usePagination(filteredItems, 10);

  const initialFormValues = {
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    inStock: true,
    requiresPrescription: false,
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.description) errors.description = 'Description is required';
    if (!values.price || values.price <= 0)
      errors.price = 'Price must be a positive number';
    if (!values.category) errors.category = 'Category is required';
    if (!values.imageUrl) errors.imageUrl = 'Image URL is required';
    return errors;
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
  } = useForm(initialFormValues, validateForm);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const openAddModal = () => {
    setCurrentMedicine(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (medicine) => {
    setCurrentMedicine(medicine);
    setFieldValue('name', medicine.name);
    setFieldValue('description', medicine.description);
    setFieldValue('price', medicine.price);
    setFieldValue('category', medicine.category);
    setFieldValue('imageUrl', medicine.imageUrl);
    setFieldValue('inStock', medicine.inStock);
    setFieldValue('requiresPrescription', medicine.requiresPrescription);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMedicine(null);
    resetForm();
  };

  const onSubmitForm = async () => {
    if (currentMedicine) {
      await dispatch(
        updateMedicine({ id: currentMedicine._id, medicineData: values }),
      );
    } else {
      await dispatch(createMedicine(values));
    }
    closeModal();
    dispatch(fetchMedicines()); // Re-fetch to update list
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      await dispatch(deleteMedicine(id));
      dispatch(fetchMedicines()); // Re-fetch to update list
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Manage Medicines
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search medicines..."
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
          <button
            onClick={() => handleFilter('category', '')}
            className="ml-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Medicine
        </button>
      </div>

      {loading && <p className="text-center">Loading medicines...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && paginatedItems.length === 0 && (
        <p className="text-center text-gray-600">No medicines found.</p>
      )}

      {!loading && paginatedItems.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedItems.map((medicine) => (
                <tr key={medicine._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={medicine.imageUrl}
                      alt={medicine.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {medicine.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${medicine.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        medicine.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        medicine.requiresPrescription
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {medicine.requiresPrescription ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(medicine)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FaEdit className="inline-block mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(medicine._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline-block mr-1" /> Delete
                    </button>
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
                  Showing{' '}
                  <span className="font-medium">
                    {(currentPage - 1) * 10 + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * 10, filteredItems.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredItems.length}</span>{' '}
                  results
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
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
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

      {/* Add/Edit Medicine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6">
              {currentMedicine ? 'Edit Medicine' : 'Add New Medicine'}
            </h2>
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={values.imageUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.imageUrl && (
                  <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
                )}
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={values.inStock}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="inStock"
                  className="ml-2 block text-sm text-gray-900"
                >
                  In Stock
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="requiresPrescription"
                  name="requiresPrescription"
                  checked={values.requiresPrescription}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="requiresPrescription"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Requires Prescription
                </label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {currentMedicine ? 'Update Medicine' : 'Add Medicine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMedicines;
