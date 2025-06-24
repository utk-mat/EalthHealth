import React from 'react';

const ShippingDelivery = () => {
  const deliveryOptions = [
    {
      title: 'Standard Delivery',
      time: '2-3 business days',
      price: 'Free on orders above ₹500',
      description:
        'Regular delivery service available across India. Orders are processed within 24 hours of prescription verification.',
    },
    {
      title: 'Express Delivery',
      time: '1 business day',
      price: '₹99',
      description:
        'Priority processing and delivery for urgent orders. Available in major cities. Orders placed before 2 PM will be delivered the next day.',
    },
    {
      title: 'Same Day Delivery',
      time: 'Same day',
      price: '₹149',
      description:
        'Available in select metro cities. Orders must be placed before 12 PM for same-day delivery. Subject to prescription verification.',
    },
  ];

  const shippingInfo = [
    {
      title: 'Order Processing',
      details: [
        'Orders are processed within 24 hours of placement',
        'Prescription verification may take additional time',
        "You'll receive order confirmation via email and SMS",
        'Real-time order tracking available',
      ],
    },
    {
      title: 'Delivery Areas',
      details: [
        'We deliver to all major cities and towns across India',
        'Remote areas may have longer delivery times',
        'Some locations may have restricted delivery of certain medicines',
        'International shipping is not available',
      ],
    },
    {
      title: 'Delivery Instructions',
      details: [
        'Please provide accurate delivery address and contact details',
        'Someone must be available to receive the package',
        'ID proof may be required for prescription medicines',
        'Temperature-sensitive medicines are delivered in special packaging',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Shipping & Delivery
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {deliveryOptions.map((option, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-primary mb-3">
              {option.title}
            </h3>
            <p className="text-lg font-medium text-secondary mb-2">
              {option.time}
            </p>
            <p className="text-gray-600 font-medium mb-3">{option.price}</p>
            <p className="text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {shippingInfo.map((section, index) => (
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

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-4">
          For any questions about shipping or delivery, please contact our
          customer service team.
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">
            📞 Shipping Support: +91 1800-123-4567
          </p>
          <p className="text-gray-600">✉️ Email: shipping@healthpharmacy.com</p>
          <p className="text-gray-600">⏰ Support Hours: 9 AM - 9 PM (IST)</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;
