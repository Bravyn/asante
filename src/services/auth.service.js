// services/auth.service.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/auth';

const register = (name, email, password, role) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    role
  });
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}/login`, {
      email,
      password
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.access_token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const authHeader = () => {
  const token = getAuthToken();
  
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getAuthToken,
  authHeader
};