import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 md:py-16 mt-12 shadow-inner-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 border-b border-gray-700 pb-10 mb-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Health Pharmacy</h3>
            <p className="text-sm leading-relaxed">
              Your trusted partner in health and wellness. We provide quality medicines and healthcare products with care and convenience.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  Shop Medicines
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-blue-400 transition duration-200 ease-in-out">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-5 text-2xl mb-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-200 ease-in-out" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-200 ease-in-out" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-200 ease-in-out" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-200 ease-in-out" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-2">Contact Info</h4>
              <p className="text-sm">Email: <a href="mailto:support@healthpharmacy.com" className="hover:text-blue-400">support@healthpharmacy.com</a></p>
              <p className="text-sm">Phone: <a href="tel:+15551234567" className="hover:text-blue-400">+1 (555) 123-4567</a></p>
              <p className="text-sm mt-2">Address: 123 Pharmacy Lane, Health City, HC 12345</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Health Pharmacy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 