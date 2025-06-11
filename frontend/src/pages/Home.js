import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedMedicines } from '../store/slices/medicineSlice';
import { FaArrowRight, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredMedicines, loading, error } = useSelector((state) => state.medicine);

  useEffect(() => {
    dispatch(fetchFeaturedMedicines());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 md:py-32 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Your Health, Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in-up delay-200">
            Quality medicines and healthcare products delivered to your doorstep
          </p>
          <Link
            to="/medicines"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-full shadow-lg text-blue-800 bg-white hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up delay-400"
          >
            Shop Now
            <FaArrowRight className="ml-3 text-xl" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="flex justify-center mb-4">
                <FaTruck className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-lg text-gray-600">
                Quick and reliable delivery to your location, every time.
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">Authentic Products</h3>
              <p className="mt-2 text-lg text-gray-600">
                Guaranteed genuine medicines and high-quality healthcare products.
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="flex justify-center mb-4">
                <FaHeadset className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-lg text-gray-600">
                Our dedicated team is here to assist you round-the-clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Our Featured Products
          </h2>
          {loading ? (
            <div className="text-center text-blue-600 text-xl">Loading featured products...</div>
          ) : error ? (
            <div className="text-center text-red-600 text-xl">Error: {error}</div>
          ) : featuredMedicines && featuredMedicines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredMedicines.map((medicine) => (
                <div
                  key={medicine._id}
                  className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={medicine.imageUrl}
                    alt={medicine.name}
                    className="w-full h-56 object-cover object-center"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{medicine.name}</h3>
                    <p className="text-gray-700 text-base mb-4 line-clamp-3">{medicine.description}</p>
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                      <span className="text-2xl font-extrabold text-blue-700">
                        ${medicine.price.toFixed(2)}
                      </span>
                      <Link
                        to={`/medicines/${medicine._id}`}
                        className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out text-sm font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-xl">No featured products available at the moment.</div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-20 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Need Personalized Advice?
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Our experienced pharmacists are ready to assist you with your health needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-full shadow-lg text-blue-800 bg-white hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Contact Our Pharmacists
            <FaArrowRight className="ml-3 text-xl" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 