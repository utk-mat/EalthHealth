import { useSelector } from 'react-redux';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const useApi = () => {
  const { token } = useSelector((state) => state.auth);

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        // You might want to dispatch a logout action here
        console.error('Unauthorized access');
      }
      return Promise.reject(error);
    }
  );

  const get = async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const post = async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const put = async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const del = async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  return {
    get,
    post,
    put,
    delete: del,
  };
};

export default useApi; 