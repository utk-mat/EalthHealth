import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicines, searchMedicines } from '../store/slices/medicineSlice';
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaMicrophone,
  FaMicrophoneSlash,
} from 'react-icons/fa';
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
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchMedicines(searchTerm));
    } else {
      dispatch(fetchMedicines());
    }
  }, [dispatch, searchTerm]);

  // Voice search logic
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window))
      return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;
    recognitionRef.current.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      // Remove trailing punctuation (.,!?) and spaces
      transcript = transcript.trim().replace(/[.,!?]+$/, '');
      setSearchTerm(transcript);
      setIsListening(false);
    };
    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

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
    "Women's Health",
    "Men's Health",
    "Children's Health",
    'Elderly Care',
    'Ayurvedic',
    'Homeopathic',
  ];

  const filteredAndSortedMedicines = medicines
    .filter((medicine) => {
      const matchesSearch = medicine.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === 'all' ||
        medicine.category.toLowerCase() === category.toLowerCase();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-background-light via-accent-purple/10 to-background-dark min-h-screen-minus-navbar font-sans animate-fade-in-up">
      <h1 className="text-4xl font-extrabold text-primary text-center mb-10 drop-shadow-lg">
        Medicine Catalog
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-soft animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar with Mic and Upload Prescription */}
          <div className="flex flex-1 w-full md:max-w-md items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search medicines by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 shadow-accent"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-purple text-lg animate-pulse" />
              <button
                type="button"
                onClick={handleMicClick}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-lg focus:outline-none ${
                  isListening ? 'text-red-600 animate-pulse' : 'text-primary'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start voice search'}
              >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
            </div>
            {/* Upload Prescription Button */}
            <label htmlFor="prescription-upload" className="bg-accent-yellow text-gray-900 px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-accent-pink transition-all duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-9m0 0L8.25 7.5M12 7.5l3.75 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upload Prescription
              <input id="prescription-upload" type="file" accept="image/*,.pdf" className="hidden" onChange={e => alert('Prescription uploaded! (demo)')} />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-5 py-3 border border-primary rounded-lg hover:bg-primary-light hover:text-white transition-all duration-200 text-primary font-semibold shadow-accent group"
            >
              <FaFilter className="mr-2 group-hover:scale-110 transition-transform duration-200" />
              Filters
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleSortChange('name')}
                className={`flex items-center px-5 py-3 border border-primary rounded-lg transition-all duration-200 text-primary font-semibold shadow-accent group ${
                  sortBy === 'name'
                    ? 'bg-primary-light text-white'
                    : 'hover:bg-primary-light hover:text-white'
                }`}
              >
                <FaSort className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                Name{' '}
                {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSortChange('price')}
                className={`flex items-center px-5 py-3 border border-primary rounded-lg transition-all duration-200 text-primary font-semibold shadow-accent group ${
                  sortBy === 'price'
                    ? 'bg-primary-light text-white'
                    : 'hover:bg-primary-light hover:text-white'
                }`}
              >
                <FaSort className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                Price{' '}
                {sortBy === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSortChange('category')}
                className={`flex items-center px-5 py-3 border border-primary rounded-lg transition-all duration-200 text-primary font-semibold shadow-accent group ${
                  sortBy === 'category'
                    ? 'bg-primary-light text-white'
                    : 'hover:bg-primary-light hover:text-white'
                }`}
              >
                <FaSort className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                Category{' '}
                {sortBy === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in-up">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-soft group ${
                    category === cat
                      ? 'bg-secondary text-white scale-105 shadow-accent'
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
        <div className="text-center py-12 animate-pulse">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicines...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 animate-pulse">
          <p className="text-accent-pink">{error}</p>
        </div>
      ) : filteredAndSortedMedicines.length === 0 ? (
        <div className="text-center py-12 animate-fade-in-up">
          <p className="text-gray-600">
            No medicines found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up delay-200">
          {filteredAndSortedMedicines.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white rounded-2xl shadow-soft overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-accent border border-gray-100 p-4 flex flex-col justify-between items-center group"
            >
              <div className="relative bg-gradient-to-br from-accent-purple/10 via-white to-accent-pink/10 p-4 w-full flex-shrink-0 rounded-xl">
                <img
                  src={medicine.imageUrl}
                  alt={medicine.name}
                  className="w-full h-48 object-contain mx-auto group-hover:scale-105 transition-transform duration-200"
                />
                {medicine.requiresPrescription && (
                  <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full shadow-accent animate-bounce">
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
                  <span className="inline-block bg-secondary-light text-secondary-dark text-xs font-semibold px-2 py-1 rounded-full mb-4 shadow-soft">
                    {medicine.category}
                  </span>
                </div>
                <div className="mt-auto w-full">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-extrabold text-primary">
                      {formatPrice(medicine.price)}
                    </span>
                    {medicine.stock > 0 ? (
                      <span className="text-secondary-dark font-semibold text-sm">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-accent-pink font-semibold text-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/medicines/${medicine.id}`}
                    className="w-full bg-accent-purple text-white px-5 py-3 rounded-lg hover:bg-primary transition-all duration-300 ease-in-out flex items-center justify-center font-semibold text-center shadow-accent group-hover:scale-105"
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
