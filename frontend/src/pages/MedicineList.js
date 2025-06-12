import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicines, searchMedicines } from '../store/slices/medicineSlice';
import { addToCart } from '../store/slices/cartSlice';
import { FaSearch, FaFilter, FaSort, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const MedicineList = () => {
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.medicine);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
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
    'Heart Health',
    'Diabetes',
    'Women\'s Health',
    'Men\'s Health',
    'Children\'s Health',
    'Elderly Care',
    'Ayurvedic',
    'Homeopathic'
  ];

  const filteredAndSortedMedicines = medicines
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
        case 'name':
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'price':
          return sortDirection === 'asc'
            ? a.price - b.price
            : b.price - a.price;
        case 'category':
          return sortDirection === 'asc'
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen-minus-navbar font-sans">
      <h1 className="text-4xl font-extrabold text-primary-dark text-center mb-10">Medicine Catalog</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search medicines by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-5 py-3 border border-primary rounded-lg hover:bg-primary-light hover:text-white transition duration-200 text-primary font-semibold shadow-sm"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleSortChange('name')}
                className={`flex items-center px-5 py-3 border border-primary rounded-lg transition duration-200 text-primary font-semibold shadow-sm ${
                  sortBy === 'name' ? 'bg-primary-light text-white' : 'hover:bg-primary-light hover:text-white'
                }`}
              >
                <FaSort className="mr-2" />
                Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSortChange('price')}
                className={`flex items-center px-5 py-3 border border-primary rounded-lg transition duration-200 text-primary font-semibold shadow-sm ${
                  sortBy === 'price' ? 'bg-primary-light text-white' : 'hover:bg-primary-light hover:text-white'
                }`}
              >
                <FaSort className="mr-2" />
                Price {sortBy === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSortChange('category')}
                className={`flex items-center px-5 py-3 border border-primary rounded-lg transition duration-200 text-primary font-semibold shadow-sm ${
                  sortBy === 'category' ? 'bg-primary-light text-white' : 'hover:bg-primary-light hover:text-white'
                }`}
              >
                <FaSort className="mr-2" />
                Category {sortBy === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
                    category === cat
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-secondary-light hover:text-white'
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
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicines...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : filteredAndSortedMedicines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No medicines found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedMedicines.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 p-4 flex flex-col justify-between items-center"
            >
              <div className="relative bg-gray-100 p-4 w-full flex-shrink-0">
                <img
                  src={medicine.imageUrl}
                  alt={medicine.name}
                  className="w-full h-48 object-contain mx-auto"
                />
                {medicine.requiresPrescription && (
                  <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Prescription Required
                  </span>
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between w-full text-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {medicine.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {medicine.description}
                  </p>
                  <span className="inline-block bg-secondary-light text-secondary-dark text-xs font-semibold px-2 py-1 rounded-full mb-4">
                    {medicine.category}
                  </span>
                </div>
                <div className="mt-auto w-full">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-extrabold text-primary-dark">
                      {formatPrice(medicine.price)}
                    </span>
                    {medicine.stock > 0 ? (
                      <span className="text-secondary-dark font-semibold text-sm">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold text-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/medicines/${medicine.id}`}
                    className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center font-semibold text-center"
                  >
                    View Details
                  </Link>
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