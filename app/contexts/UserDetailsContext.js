// // // user context 
// // import { usersDetails } from '@/utils/Services/services';
// // import React, { createContext, useState, useEffect,useContext } from 'react';
// // import { Alert } from 'react-native';

// // export const UserContext = createContext();

// // export const UserProvider = ({ children }) => {
// //   const [userData, setUserData] = useState([]);
// //   const [groupData, setGroupData] = useState([]);
// //   const[isLoading,setIsLoading]=useState(false)

// //   // get data from api
// //   useEffect(() => {
// //     (async () => {
// //       setIsLoading(true);
// //       try {
// //         const data = await usersDetails();
// //         // console.log(data,"data")
// //         setGroupData(data?.groupInfo || []);
// //         setUserData(data?.userInfo || []);
// //         setIsLoading(false); 
// //       } catch (error) {
// //         console.error(error);
// //         Alert.alert("Something wents wrong", error.response.data.message);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     })();
// //   }, []);
// //   console.log(groupData,"groupData")
// //   return (
// //     <UserContext.Provider value={{ userData, groupData,isLoading }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const  useUser=()=>{
// //     return useContext(UserContext)
// // }


// import { usersDetails } from '@/utils/Services/services';
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { Alert } from 'react-native';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [groupData, setGroupData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchUserData = async () => {
//       setIsLoading(true);
//       try {
//         const data = await usersDetails();
//         setGroupData(data?.groupInfo || []);
//         setUserData(data?.userInfo || []);
//       } catch (error) {
//         console.error(error);
//         const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
//         Alert.alert("Something went wrong", errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);
//   // console.log(isLoading,groupData,"grpdat")

//   return (
//     <UserContext.Provider value={{ userData, groupData, isLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };
