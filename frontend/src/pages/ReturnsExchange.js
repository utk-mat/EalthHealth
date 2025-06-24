import React from 'react';

const ReturnsExchange = () => {
  const returnPolicy = [
    {
      title: 'Return Eligibility',
      details: [
        'Products must be unopened and in original packaging',
        'Return request must be made within 7 days of delivery',
        'Prescription medicines cannot be returned once opened',
        'Temperature-sensitive products cannot be returned',
      ],
    },
    {
      title: 'Return Process',
      details: [
        'Contact customer service to initiate return',
        'Provide order number and reason for return',
        'Wait for return authorization',
        'Package the product securely with all original packaging',
        'Attach the return label provided',
      ],
    },
    {
      title: 'Refund Policy',
      details: [
        'Refunds are processed within 7-10 business days',
        'Original payment method will be credited',
        'Shipping charges are non-refundable',
        'Refund amount excludes any discounts or offers applied',
      ],
    },
    {
      title: 'Exchange Policy',
      details: [
        'Exchanges are only available for non-prescription items',
        'Product must be unopened and in original condition',
        'Exchange must be for same or higher value product',
        'Shipping charges apply for exchanges',
      ],
    },
  ];

  const nonReturnableItems = [
    'Prescription medicines once opened',
    'Temperature-sensitive products',
    'Personal care items',
    'Opened medical devices',
    'Products with tampered packaging',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Returns & Exchange Policy
      </h1>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <p className="text-yellow-700">
          <strong>Important Note:</strong> Due to the nature of pharmaceutical
          products, we have strict return policies to ensure customer safety and
          regulatory compliance.
        </p>
      </div>

      <div className="space-y-8">
        {returnPolicy.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.details.map((detail, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span className="text-gray-600">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Non-Returnable Items
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {nonReturnableItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-red-500 mr-2">×</span>
              <span className="text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Need Help with Returns?
        </h2>
        <p className="text-gray-600 mb-4">
          Our customer service team is here to help you with any return or
          exchange queries.
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">📞 Returns Support: +91 1800-123-4567</p>
          <p className="text-gray-600">✉️ Email: returns@healthpharmacy.com</p>
          <p className="text-gray-600">⏰ Support Hours: 9 AM - 9 PM (IST)</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchange;
