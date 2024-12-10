import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../AxiosInstance";

// loginApi.js
export const loginApi = async (payload) => {
  try {
    const response = await axiosInstance.post('/auth', payload);
    // console.log(response,"res")
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    // console.log(error.response.data.message)
    throw error;
  }
};


export const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
};

// in HomeGroupChatScreen.tsx

export const usersDetails=async()=>{
  try {
    const response = await axiosInstance.get('/users_details');
    return response.data;
  } catch (error) {
    throw error
  }
}

// GroupMembers Api implement in ChatScreen and GroupMembers.tsx


export const groupMembersApi=async(payload)=>{
  try {
    const response = await axiosInstance.get(`/GroupParticipant/${payload}`);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const allUsersApi=async()=>{
  try {
    const response = await axiosInstance.get(`/AllUsers`);
    return response.data;
  } catch (error) {
    throw error
  }
} 

// user by id 
export const getUserInfoByIdApi=async(payload)=>{
  try {
    const response = await axiosInstance.get(`/GetUserByID/${payload}`);
    return response.data;
  } catch (error) {
    throw error
  }
}


// update userProfile api use in MyProfileScreen.tsx

export const userProfileUpdate = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/Update_UserProfile/update_profile_picture/`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


// About and privacy
export const getAboutPrivacy=async()=>{
  try {
    const response = await axiosInstance.get(`/privacy_about`);
    return response.data;
  } catch (error) {
    throw error
  }
}