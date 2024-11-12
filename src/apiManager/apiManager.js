// // src/apiManager.js
// import axios from "axios";

// // Create an instance of axios
// const api = axios.create({
//   baseURL: "http://localhost:4000/", // Replace with your API base URL
// });

// // Add a request interceptor to include the bearer token in the headers
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//       ? JSON.parse(localStorage.getItem("token")).token
//       : null;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add a response interceptor to handle loading states and errors
// const handleResponse = async (promise) => {
//   try {
//     const response = await promise;
//     return { data: response.data, error: null };
//   } catch (error) {
//     // Handle different types of errors
//     const errorMessage = error.response
//       ? error.response.data.message
//       : "An error occurred";
//     return { data: null, error: errorMessage };
//   }
// };

// // API methods
// export const apiManager = {
//   get: async (url) => handleResponse(api.get(url)),
//   post: async (url, data) => handleResponse(api.post(url, data)),
//   put: async (url, data) => handleResponse(api.put(url, data)),
//   delete: async (url) => handleResponse(api.delete(url)),
// };

// src/apiManager.js
import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:4000/", // Replace with your API base URL
});

// Add a request interceptor to include the bearer token in the headers
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

// Add a response interceptor to handle errors
const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return { data: response.data, error: null };
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    return { data: null, error: errorMessage };
  }
};

// API methods
export const useApiManager = () => {
  const request = async (method, url, data = null, headers = {}) => {
    return await handleResponse(
      api.request({
        method,
        url,
        data,
        headers, // Optional custom headers
      })
    );
  };

  return {
    get: (url, headers = {}) => request("GET", url, null, headers),
    post: (url, data, headers = {}) => request("POST", url, data, headers),
    put: (url, data, headers = {}) => request("PUT", url, data, headers),
    delete: (url, headers = {}) => request("DELETE", url, null, headers),
  };
};
