// // AuthContext.js
// import React, { createContext, useState, useEffect,useContext } from 'react';
// import { getToken, logout } from './authService';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await getToken();
//       setIsAuthenticated(!!token);
//     };
//     checkToken();
//   }, []);

//   const logoutUser = async () => {
//     await logout();
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const  useAuth=()=>{
//     return useContext(AuthContext)
// }


// // AuthContext.js
// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import axios from 'axios';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [token, setToken] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const loadToken = async () => {
// //       const savedToken = await AsyncStorage.getItem('token');
// //       if (savedToken) {
// //         setToken(savedToken);
// //         setUser({ token: savedToken });
// //       }
// //       setLoading(false);
// //     };
// //     loadToken();
// //   }, []);

// //   const login = async (email, password) => {
// //     try {
// //       const response = await axios.post('https://yourapi.com/api/login', { email, password });
// //       const { token, user } = response.data;
// //       await AsyncStorage.setItem('token', token);
// //       setToken(token);
// //       setUser(user);
// //     } catch (error) {
// //       console.error('Login failed', error);
// //       throw new Error('Invalid credentials');
// //     }
// //   };

// //   const logout = async () => {
// //     await AsyncStorage.removeItem('token');
// //     setToken(null);
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, token, loading, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);
