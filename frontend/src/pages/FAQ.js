import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I place an order?',
      answer:
        "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to create an account or sign in to complete your purchase.",
    },
    {
      question: 'Do you require prescriptions for medicines?',
      answer:
        'Yes, we require valid prescriptions for prescription-only medicines. You can upload your prescription during checkout or email it to us at prescriptions@healthpharmacy.com.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Standard delivery takes 2-3 business days. Express delivery is available for 1-day delivery in select areas. Delivery times may vary based on your location and prescription verification requirements.',
    },
    {
      question: 'Are your medicines genuine?',
      answer:
        'Yes, all our medicines are 100% genuine and sourced directly from authorized manufacturers. We maintain strict quality control and only stock products from licensed suppliers.',
    },
    {
      question: 'How can I track my order?',
      answer:
        "Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order status in your account dashboard or using the tracking number on our website.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit/debit cards, UPI payments, net banking, and cash on delivery (subject to availability in your area).',
    },
    {
      question: 'Do you offer discounts?',
      answer:
        'Yes, we offer various discounts including first-time purchase discounts, loyalty rewards, and seasonal promotions. Subscribe to our newsletter to stay updated on current offers.',
    },
    {
      question: 'How do I store my medicines?',
      answer:
        'Most medicines should be stored in a cool, dry place away from direct sunlight. Some medicines may require refrigeration - this will be clearly indicated on the packaging and in the product description.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-primary mb-3">
              {faq.question}
            </h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Still have questions?
        </h2>
        <p className="text-gray-600 mb-4">
          If you couldn't find the answer you were looking for, please don't
          hesitate to contact us.
        </p>
        <div className="space-y-2">
          <p className="text-gray-600">📞 Call us: +91 1800-123-4567</p>
          <p className="text-gray-600">✉️ Email: support@healthpharmacy.com</p>
          <p className="text-gray-600">💬 Live Chat: Available 24/7</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
