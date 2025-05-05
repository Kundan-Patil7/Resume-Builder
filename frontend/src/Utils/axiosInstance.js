import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Base URL for all API requests
  timeout: 10000, // Timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const accessToken = localStorage.getItem("token");

    // Add Authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config; // Return updated config
  },
  (error) => {
    // Handle request errors
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if no errors
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page for unauthorized errors
        window.location.href = "/";
      } else if (error.response.status === 500) {
        // Handle server errors
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      // Handle request timeout
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error); // Propagate error for further handling
  }
);

export default axiosInstance;
