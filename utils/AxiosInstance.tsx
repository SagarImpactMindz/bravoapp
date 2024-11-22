// axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

const router = useRouter(); // Initialize the router
// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the data
    return response;
  },
  async (error) => {
    // Check if the error response indicates token expiration
    if (error.response?.status === 401) {
      // Clear the token and navigate to the login screen
      await AsyncStorage.removeItem('userToken');
      Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
      router.replace("/LoginScreen");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
