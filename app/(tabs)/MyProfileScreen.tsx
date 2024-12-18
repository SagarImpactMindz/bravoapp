import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "@/constants/Colors";
import ChangePhotoComponent from "@/components/bravao/ChangePhotoComponent";
import About from "@/components/bravao/About";
import Privacy from "@/components/bravao/Privacy";
import { useAuth } from "@/app/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAboutPrivacy, usersDetails } from "@/utils/Services/services";
import ViewProfilePicComponent from "@/components/bravao/ViewProfilePicComponent"
import { useRouter } from "expo-router";

const MyProfileScreen = () => {
  const [changeProfile,setChangeProfile]=useState(false)
  const [showAbout,setShowAbout]=useState(false)
  const [showPrivacy,setShowPrivacy]=useState(false)
  const[userData,setUserData]=useState()
  const[isLoading,setIsLoading]=useState(false)
  const[viewProfilePic,setViewProfilePic]=useState(false)
  const[aboutPageContent,setAboutPageContent]=useState()
  const[privacyPageContent,setPrivacyPageContent]=useState()
  const { logoutUser,setIsAuthenticated } = useAuth();
  const router=useRouter()
  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false) 
    Alert.alert("Logout Successfully");
  };


// get data from api
useEffect(() => {
  (async () => {
    setIsLoading(true);
    try {
      const data = await usersDetails();
      setUserData(data?.userInfo);
    } catch (error) {
      // console.error(error);
      Alert.alert("Something wents wrong", error.response.data.message);
      if (error.response && error.response.status === 401) {
        // Token expired, navigate to login screen
        router.replace('/');
      }
    } finally {
      setIsLoading(false);
    }
  })();
  
}, []);




const updateProfilePic = (newProfilePic) => {
  setUserData((prevUserData) => ({
    ...prevUserData,
    profile_picture: newProfilePic,
  }));
};



const userProfilePic=userData?.profile_picture

const getAboutPrivacyData = async () => {
  setIsLoading(true);
  try {
    const response = await getAboutPrivacy();
    if(response?.data){
      setAboutPageContent(response?.data[0]?.page_content)
      setPrivacyPageContent(response?.data[1]?.page_content)
    }
  } catch (error) {
    // console.error(error);
    Alert.alert("Something went wrong", error.response?.data?.message || "An error occurred");
    if (error.response && error.response.status === 401) {
      // Token expired, navigate to login screen
      router.replace('/');
    }
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  getAboutPrivacyData();
}, []);

// console.log(privacyPageContent)

    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => {setChangeProfile(false),setShowAbout(false),setShowPrivacy(false),Keyboard.dismiss();}}>
      {/* <TouchableWithoutFeedback disabled={!changeProfile} onPress={() => setChangeProfile(false)}> */}
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.background} barStyle="light-content" />
        
        <View style={styles.header}>
          <Text style={styles.headerText}>My Profile</Text>
        </View>
  

        <View style={styles.myProfileContainer}>
        <ScrollView >
        {isLoading ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color={'black'} />
            </View>):(
              <>
          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.profilePicWrapper} onPress={()=>setViewProfilePic(true)}>
              <Image
                  source={
                    userData?.profile_picture
                      ? { uri: userData?.profile_picture }
                      : require("../../assets/images/placeholder-user.jpg")
                  }
                  style={styles.profilePic}
                />
              <TouchableOpacity style={styles.profilePicEditIconContainer} onPress={()=>setChangeProfile(true)}>
                <FontAwesome5 name="pen" size={15} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
            <Text style={styles.userName}>{userData?.fullname ? userData.fullname:"null"}</Text>
          </View>
          <View style={styles.userDetailsContainer}>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Email</Text>
                    <TextInput style={styles.userDetailsInput}  value={userData?.email ? userData.email : "null"} />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Contact No</Text>
                    <TextInput style={styles.userDetailsInput} value={userData?.phone ? userData.phone :'null'} />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Address</Text>
                    <TextInput style={styles.userDetailsInput} value={userData?.address ? userData.address :'null'} />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Role</Text>
                    <TextInput style={styles.userDetailsInput} value={userData?.role ? userData.role :'null'}/>
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Authentication Code</Text>
                    {/* <TextInput style={styles.userDetailsInput} value={userData?.authrization_code} editable={false}/> */}
                    <TextInput style={styles.userDetailsInput} value={userData?.authrization_code ? userData.authrization_code :'null'}/>
                </View>
          </View>
          <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={()=>setShowAbout(true)}>
            <View style={styles.menuIconWrapper}>
          <FontAwesome5 name="heart" size={24} color="#3C4E56" style={styles.menuIcon}/>
          </View>
          <Text style={styles.menuText}>About Bravo</Text>
          <FontAwesome name="chevron-right" size={24} color="#3C4E56" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={()=>setShowPrivacy(true)}>
            <View style={styles.menuIconWrapper}>
          <FontAwesome name="shield" size={24} color="#3C4E56" style={styles.menuIcon}/>
          </View>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <FontAwesome5 name="angle-double-right" size={24} color="#3C4E56" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuIconWrapper}>
          <FontAwesome name="sign-out" size={24} color="#3C4E56" style={styles.menuIcon}/>
          </View>
          <View>
          <Text style={styles.menuText}>Log out</Text>
          <Text style={styles.subText}>Further secure your account for safety</Text></View>
        </TouchableOpacity>
          </View>
          </>)}
          </ScrollView>
          </View>
       
 
          <ChangePhotoComponent visible={changeProfile} onClose={()=>setChangeProfile(false)}  userProfilePic={userProfilePic} updateProfilePic={updateProfilePic} setViewProfilePic={setViewProfilePic}/>
          <ViewProfilePicComponent visible={viewProfilePic} onClose={()=>setViewProfilePic(false)}  userProfilePic={userProfilePic}/>
          <About visible={showAbout} onClose={()=>setShowAbout(false)} setShowAbout={setShowAbout} aboutPageContent={aboutPageContent}/>

        <Privacy visible={showPrivacy} onClose={()=>setShowPrivacy(false)} setShowPrivacy={setShowPrivacy} privacyPageContent={privacyPageContent}/> 


      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
     
    },
    header: {
      // backgroundColor: colors.background,
      // paddingHorizontal: 20,
      // justifyContent: "center",
      // flex: 1,
      height: 250,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    headerText: {
      color: "#FFFFFF",
      fontSize: 28,
      fontWeight: "bold",
    },
    myProfileContainer: {
      flex: 3,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 2,
      paddingVertical:10
    },
    profilePicWrapper: {
      width: 70,
      height: 70,
      borderRadius: 35,
      position: 'relative', // Enables absolute positioning for the icon within this wrapper
    },
    profilePic: {
      width: "100%",
      height: "100%",
      borderRadius: 35,
    },
    profilePicEditIconContainer: {
      backgroundColor: '#ccc',
      width: 26,
      height: 26,
      borderRadius: 13,
      position: 'absolute',
      right: 0, // Position to the right within the wrapper
      bottom: 0, // Position to the bottom within the wrapper
      alignItems: 'center',
      justifyContent: 'center',
    },
    userName: {
      fontSize: 24,
      marginLeft: 15,
      fontWeight: 'bold',
    },
    userDetailsContainer:{
        marginTop:5,
        borderWidth: 1,         
        borderColor: "#ddd", 
        borderRadius:5,
        paddingVertical:20,
        paddingHorizontal:10,
  
    },
    userDetails:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5
    },
    userDetailsHeading:{
        fontSize:17,
        color:'#57636C',
        fontWeight:'500',
        flex:1
    },
    userDetailsInput:{
        borderWidth: 1,         
        borderColor: "#ddd", 
        borderRadius:8,
        flex:1,
        paddingVertical:8,
        paddingHorizontal:5
    },
    menuContainer:{
        borderWidth: 1,         
        borderColor: "#ddd", 
        borderRadius:5,
        paddingTop:20,
        paddingHorizontal:10,
        marginTop:20
    },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingVertical:15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight:'500',
    marginLeft: 15,
    color: '#000',
    flex: 1,
  },
  subText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 15,
  },
  menuIconWrapper:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:'#8BB6C6',
    justifyContent:'center',
    alignItems:'center'
  },
  menuIcon: {
    // marginLeft: 'auto',

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: { color: "#fff", marginTop: 10, fontSize: 16 },
  });
  
  export default MyProfileScreen;
