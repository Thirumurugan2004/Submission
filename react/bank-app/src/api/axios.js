// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7220/BankCustomerAPI",
});

// Attach Bearer token from localStorage (NOT store)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
