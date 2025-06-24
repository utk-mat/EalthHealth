import React from 'react';

const PrivacyPolicy = () => {
  const policySections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number, address)',
        'Medical information (prescriptions, health records)',
        'Payment information (securely processed through our payment partners)',
        'Device and usage information',
        'Location data (for delivery purposes)',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Verify prescriptions and medical information',
        'Send order updates and delivery notifications',
        'Provide customer support',
        'Send promotional offers (with your consent)',
        'Improve our services and website experience',
      ],
    },
    {
      title: 'Information Sharing',
      content: [
        'We share information with authorized healthcare providers',
        'Delivery partners for order fulfillment',
        'Payment processors for secure transactions',
        'Legal authorities when required by law',
        'We never sell your personal information to third parties',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We use industry-standard encryption for data protection',
        'Regular security audits and updates',
        'Limited access to personal information',
        'Secure storage of medical records',
        'Regular backup of customer data',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'Access your personal information',
        'Correct inaccurate data',
        'Request deletion of your account',
        'Opt-out of marketing communications',
        'File a complaint about data handling',
      ],
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use cookies to improve website functionality',
        'Analytics to understand user behavior',
        'Session management for secure login',
        'You can control cookie settings in your browser',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <p className="text-blue-700">
          <strong>Last Updated:</strong> March 15, 2024
        </p>
        <p className="text-blue-700 mt-2">
          This Privacy Policy describes how Health Pharmacy collects, uses, and
          protects your personal information.
        </p>
      </div>

      <div className="space-y-8">
        {policySections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.content.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-secondary mr-2">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about our Privacy Policy or data practices,
          please contact us:
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">📞 Privacy Officer: +91 1800-123-4567</p>
          <p className="text-gray-600">✉️ Email: privacy@healthpharmacy.com</p>
          <p className="text-gray-600">
            📍 Address: 123 Health Street, Medical District, Mumbai - 400001
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>
          By using our website and services, you agree to the terms of this
          Privacy Policy. We may update this policy from time to time, and we
          will notify you of any significant changes.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
