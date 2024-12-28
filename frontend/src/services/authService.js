import axios from 'axios';

const API_URL ='http://localhost:3001';

// Signup
export const signup = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  return response.data; // Assume it returns { message: 'Success', token: 'JWT_TOKEN' }
};


// Login
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data; // Assume it returns { token: 'JWT_TOKEN' }
};