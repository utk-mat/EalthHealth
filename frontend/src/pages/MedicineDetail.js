import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { FaShoppingCart, FaPrescription, FaInfoCircle } from 'react-icons/fa';

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL || 'http://localhost:8080/api'
          }/medicines/${id}`,
        );
        if (!response.ok) {
          throw new Error('Medicine not found');
        }
        const data = await response.json();
        setMedicine(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  const handleAddToCart = () => {
    if (medicine) {
      console.log(
        'Dispatching addToCart for medicineId:',
        medicine.id,
        'quantity:',
        quantity,
      );
      dispatch(addToCart({ medicineId: medicine.id, quantity }));
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medicine details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Error Loading Medicine
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/medicines')}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Back to Medicines
          </button>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Medicine Not Found
          </h2>
          <p className="text-gray-600">
            The medicine you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/medicines')}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Back to Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Image */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden shadow-soft bg-gradient-to-br from-accent-purple/10 via-white to-accent-pink/10 animate-fade-in-up">
            <img
              src={medicine.imageUrl}
              alt={medicine.name}
              className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 animate-fade-in-up delay-200">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary drop-shadow-lg">
            {medicine.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-accent-purple font-bold">
              ${medicine.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{medicine.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-600">Category:</h3>
              <p className="ml-2 text-sm text-accent-teal font-semibold">
                {medicine.category}
              </p>
            </div>

            <div className="mt-2 flex items-center">
              <h3 className="text-sm text-gray-600">Availability:</h3>
              <p className="ml-2 text-sm text-primary font-semibold">
                {medicine.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>

            {medicine.requiresPrescription && (
              <div className="mt-2 flex items-center text-accent-pink animate-bounce">
                <FaPrescription className="h-5 w-5 mr-2" />
                <p className="text-sm">Prescription Required</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700 mr-4"
              >
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-md border-gray-300 py-1.5 text-base focus:border-primary focus:outline-none focus:ring-primary shadow-soft"
              >
                {[
                  ...Array(medicine.stock > 10 ? 10 : medicine.stock).keys(),
                ].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              disabled={medicine.stock <= 0}
              className="w-full bg-accent-purple text-white py-3 px-4 rounded-xl hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-accent transition-all duration-200 group"
            >
              <span className="flex items-center justify-center">
                <FaShoppingCart className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                {medicine.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </span>
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center text-gray-500 animate-fade-in-up delay-300">
              <FaInfoCircle className="h-5 w-5 mr-2 text-accent-teal" />
              <p className="text-sm">
                Please consult your healthcare provider before taking any
                medication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
