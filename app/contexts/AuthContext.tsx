// AuthContext.js
import { logout } from '@/utils/Services/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect,useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);


const logoutUser = async () => {
    try {
      await logout(); // External logout logic
      setIsAuthenticated(false);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const  useAuth=()=>{
    return useContext(AuthContext)
}
