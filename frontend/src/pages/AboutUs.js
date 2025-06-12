import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen-minus-navbar font-sans">
      <h1 className="text-4xl font-extrabold text-primary-dark text-center mb-10">🩺 About Us</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <p className="text-gray-700 text-lg mb-4">
          At <strong className="text-primary-dark">EalthHealthCare</strong>, we are committed to making essential medicines and health products accessible, affordable, and reliable — especially in underserved Tier-2 and rural areas.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Founded with the mission to bridge the healthcare gap, our platform connects users with verified pharmacies and ensures doorstep delivery of genuine medicines. We believe that everyone deserves timely medical support, regardless of where they live.
        </p>
        <p className="text-gray-700 text-lg">
          We combine the power of modern technology with the trust of local pharmacies to create a seamless experience for patients. Whether you're ordering life-saving medication or daily health essentials, we're here to deliver care, not just products.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary-dark mb-6">💡 Why Choose Us?</h2>
        <ul className="space-y-3 text-gray-700 text-lg">
          <li className="flex items-start">
            <FaCheckCircle className="text-secondary mt-1 mr-3 flex-shrink-0" />
            <span>Easy-to-use and responsive platform</span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-secondary mt-1 mr-3 flex-shrink-0" />
            <span>Fast and reliable delivery</span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-secondary mt-1 mr-3 flex-shrink-0" />
            <span>Secure user experience with verified products</span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-secondary mt-1 mr-3 flex-shrink-0" />
            <span>Committed to community health and wellness</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs; 