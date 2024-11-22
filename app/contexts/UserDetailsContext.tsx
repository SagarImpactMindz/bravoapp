// user context 
import { usersDetails } from '@/utils/Services/services';
import React, { createContext, useState, useEffect,useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const[isLoading,setIsLoading]=useState(false)

  // get data from api
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await usersDetails();
        // console.log(data,"data")
        setGroupData(data?.groupInfo || []);
        setUserData(data?.userInfo || []);
        setIsLoading(false); 
      } catch (error) {
        // console.error(error);
        Alert.alert("Login Failed", error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ userData, groupData,isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const  useUser=()=>{
    return useContext(UserContext)
}
