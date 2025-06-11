import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, element: Element, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user?.roles?.includes('ROLE_ADMIN')) {
    return <Navigate to="/" />;
  }

  if (Element) {
    return <Element />;
  }

  return children;
};

export default PrivateRoute; 