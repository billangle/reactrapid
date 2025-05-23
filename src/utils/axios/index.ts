import Axios, { AxiosInstance } from "axios";
import { getIdToken } from "../auth";

// Create an Axios instance
export const axios: AxiosInstance = Axios.create();

// Axios interceptor for adding the access token to the request headers
export const interceptor = () => {
  axios.interceptors.request.use(
    async (config) => {
      try {
        const token = await getIdToken();
        // Add the access token to the request headers
        config.headers.Authorization = `${token}`;
      } catch (error) {
        console.error("Failed to add access token to request headers:", error);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Axios interceptor for handling token refresh
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      // Check if the error response indicates an expired access token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await getIdToken();

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return await axios(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh access token:", refreshError);
          // Handle the refresh error as needed
        }
      }

      return Promise.reject(error);
    }
  );
};
