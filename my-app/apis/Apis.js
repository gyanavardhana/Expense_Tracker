import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8081', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API endpoints
export const userAPI = {
  // Get user by ID
  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },

  // Get user by email
  getUserByEmail: (email) => {
    return api.get(`/users/emails/${email}`);
  },

  // Register new user
  register: (userData) => {
    return api.post('/users/register', userData);
  },

  // Login user
  login: (credentials) => {
    return api.post('/users/login', credentials);
  },

  // Update user
  updateUser: (userData) => {
    return api.put('/users', userData);
  },

  // Delete user
  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },
};

// Expense API endpoints
export const expenseAPI = {
  // Get all expenses
  getAllExpenses: () => {
    return api.get('/expenses');
  },

  // Get expenses by user ID
  getUserExpenses: (userId) => {
    return api.get(`/expenses/${userId}`);
  },

  // Add new expense
  addExpense: (expenseData) => {
    return api.post('/expenses', expenseData);
  },

  // Update expense
  updateExpense: (expenseData) => {
    return api.put('/expenses', expenseData);
  },

  // Delete expense
  deleteExpense: (id) => {
    return api.delete(`/expenses/${id}`);
  },
};

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    // You can handle errors globally here (e.g., showing toast notifications)
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);
