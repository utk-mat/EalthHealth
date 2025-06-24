import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen-minus-navbar font-sans">
      <h1 className="text-4xl font-extrabold text-primary-dark text-center mb-10">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-4">
            We'd love to hear from you! Please feel free to reach out with any
            questions, feedback, or inquiries.
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="text-primary mr-3 text-xl" />
              <p>
                123 Health Pharmacy Lane, Wellness City, State 12345, Country
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <FaPhone className="text-primary mr-3 text-xl" />
              <p>
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary-dark transition duration-200"
                >
                  +1 (234) 567-890
                </a>
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="text-primary mr-3 text-xl" />
              <p>
                <a
                  href="mailto:info@healthpharmacy.com"
                  className="hover:text-primary-dark transition duration-200"
                >
                  info@healthpharmacy.com
                </a>
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-primary-dark mt-8 mb-4">
            Business Hours
          </h3>
          <ul className="text-gray-700 space-y-2">
            <li>Monday - Friday: 9:00 AM - 7:00 PM</li>
            <li>Saturday: 10:00 AM - 5:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">
            Send us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Inquiry about an order"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-primary-dark text-center pt-8 mb-6">
          Find Us on the Map
        </h2>
        <div className="relative w-full" style={{ paddingBottom: '40%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.208154546594!2d144.9630576156942!3d-37.81627917975167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b7810e0149%3A0x6b4f0b2f0a8b9e6!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1678234567890!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of Health Pharmacy Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
