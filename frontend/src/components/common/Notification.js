import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const Notification = ({ notification, onRemove }) => {
  const { id, message, type } = notification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <FaExclamationCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <FaInfoCircle className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div
      className={`${getBackgroundColor()} rounded-lg p-4 shadow-lg mb-4 transition-all duration-300 ease-in-out transform hover:scale-105`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 w-0 flex-1">
          <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            type="button"
            className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${getTextColor()}`}
            onClick={() => onRemove(id)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification; 