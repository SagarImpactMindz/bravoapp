import axiosInstance from "../AxiosInstance";

// loginApi.js
export const loginApi = async (auth_code) => {
  try {
    const response = await axiosInstance.post('/auth', { auth_code });
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};
