import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicines, searchMedicines } from '../store/slices/medicineSlice';
import { addToCart } from '../store/slices/cartSlice';
import { FaSearch, FaFilter, FaSort, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MedicineList = () => {
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.medicine);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchMedicines(searchTerm));
    } else {
      dispatch(fetchMedicines());
    }
  }, [dispatch, searchTerm]);

  const categories = [
    'all',
    'Pain Relief',
    'Cold & Flu',
    'Vitamins',
    'First Aid',
    'Digestive Health',
    'Skin Care',
  ]; // Extended categories for better filtering

  const filteredMedicines = medicines
    .filter((medicine) => {
      const matchesSearch = medicine.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === 'all' || medicine.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen-minus-navbar">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Our Medicines</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search medicines by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-5 py-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition duration-200 text-gray-700 font-medium shadow-sm"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-700 font-medium shadow-sm"
            >
              <option value="name">Sort by Name (A-Z)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-6 p-5 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out ${cat === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Medicine Grid */}
      {loading ? (
        <div className="text-center py-20 text-blue-600 text-2xl font-semibold">
          Loading medicines...
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-600 text-2xl font-semibold">
          Error: {error}
        </div>
      ) : filteredMedicines.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">No Medicines Found</h3>
          <p className="mt-2 text-xl text-gray-600">
            Try adjusting your search terms or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
            >
              <Link to={`/medicines/${medicine._id}`} className="block">
                <img
                  src={medicine.imageUrl}
                  alt={medicine.name}
                  className="w-full h-56 object-cover object-center"
                />
              </Link>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    <Link to={`/medicines/${medicine._id}`} className="hover:text-blue-700 transition duration-200">
                      {medicine.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {medicine.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-extrabold text-blue-700">
                      ${medicine.price.toFixed(2)}
                    </span>
                    {medicine.inStock ? (
                      <span className="text-green-600 font-semibold text-sm">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold text-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(addToCart({ medicine, quantity: 1 }));
                    }}
                    disabled={!medicine.inStock}
                    className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                  {medicine.requiresPrescription && (
                    <span className="block mt-3 text-center px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                      Prescription Required
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineList; 