import React, { useEffect, useState } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "@/constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserInfoByIdApi } from "@/utils/Services/services";
import { useRouter } from "expo-router";
// import { useUser } from "./contexts/UserDetailsContext";

const UserProfile = () => {
  const[user,setUser]=useState([])
  const[isLoading,setIsLoading]=useState(false)
  const navigation = useNavigation(); 
  const route = useRoute();
  const router=useRouter()
  const { user_id ,group_name} = route.params;



  useEffect(()=>{
    (async()=>{
      try {
        setIsLoading(true)
        const response=await getUserInfoByIdApi(user_id)
        if(response.isSuccess){
          setUser(response?.userData  || [])
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        Alert.alert("Something wents wrong",error?.response?.data?.message)
        if (error.response && error.response.status === 401) {
          // Token expired, navigate to login screen
          router.replace('/');
        }
        setIsLoading(false)
      }finally{
        setIsLoading(false)
      }
    })()
  },[user_id])


  const father=user[0]?.family_relationships?.filter(item=>item.relationship_type_name.toLowerCase() === 'father')|| []
  const mother=user[0]?.family_relationships?.filter(item=>item.relationship_type_name.toLowerCase() === 'mother')|| []


    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.background}
            barStyle="light-content"
          />

          {/* Fixed Header */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <TouchableOpacity
                style={styles.backIconContainer}
                onPress={() => navigation.goBack()}
              >
                <FontAwesome5 name="angle-left" size={30} color="#fff" />
              </TouchableOpacity>
              {/* <View style={styles.profilePicWrapper}>
                <Image
                  source={
                    user[0]?.profile_picture
                      ? { uri: user[0]?.profile_picture }
                      : require("../assets/images/placeholder-user.jpg") // Local placeholder image
                  }
                  style={styles.profilePic}
                />
              </View> */}

              <View style={styles.profilePicWrapper}>
                <Image
                  source={
                    user[0]?.profile_picture
                      ? { uri: user[0]?.profile_picture }
                      : require("../assets/images/placeholder-user.jpg") // Local placeholder image
                  }
                  style={styles.profilePic}
                  onLoadStart={() => setIsLoading(true)} // Set loading to true when image starts loading
                  onLoadEnd={() => setIsLoading(false)} // Set loading to false when image finishes loading
                />
                {isLoading && (
                  <View style={styles.loaderOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                  </View>
                )}
              </View>

              <Text style={styles.userName}>
                {/* {user[0]?.name} */}
                {isLoading ? (
                  <ActivityIndicator size={"small"} color={"white"} />
                ) : (
                  user[0]?.name?user[0]?.name : "No Name Available"
                )}
              </Text>
            </View>
          </View>

          <View style={styles.myProfileContainer}>
            <ScrollView>
              {isLoading ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <ActivityIndicator size={"large"} color={"black"} />
                </View>
              ) : (
                <>
                  <View style={styles.userDetailsContainer}>
                    <View>
                      <Text style={styles.studentDetailsHeading}>
                        Student Details
                      </Text>
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Name</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.first_name?user[0]?.first_name : "No first_name available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Surname</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.last_name ?user[0]?.last_name : "No last_name available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Email</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.email ?user[0]?.email : "No email available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Contact No</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.phone ?user[0]?.phone : "No phone available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Group</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={group_name ? group_name : "No group name available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Address</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.address ?user[0]?.address: "No address available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>City</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.suburb ?user[0]?.suburb : "No city available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Postal Code</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={
                          user[0]?.postal_code ? user[0]?.postal_code : "No postalcode available"
                        }
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>State</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.state ?user[0]?.state : "No state available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Country</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={user[0]?.country ? user[0]?.country : "No country available"}
                      />
                    </View>
                    {/* <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Notes</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value=""
                    placeholder="Add Text Here"
                    placeholderTextColor="#626D75"
                  />
                </View> */}
                  </View>

                  <View style={styles.menuContainer}>
                    <View>
                      <Text style={styles.studentDetailsHeading}>
                        Relatives Parties
                      </Text>
                    </View>

                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Related 1</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={father[0]?.relative_name ?father[0]?.relative_name: "No data available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Email</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={father[0]?.email ?father[0]?.email : "No data available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Contact No</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={father[0]?.phone ?father[0]?.phone : "No data available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Mother Name</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={mother[0]?.relative_name ?mother[0]?.relative_name : "no data available"}
                      />
                    </View>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailsHeading}>Contact No</Text>
                      <TextInput
                        style={styles.userDetailsInput}
                        value={mother[0]?.phone ?mother[0]?.phone : "no data available"}
                      />
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
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
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        paddingVertical:10
      },
      backIconContainer: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderColor: '#9AA1A7',
        alignContent: 'center',
        justifyContent: 'center',
        marginRight: 5,
      },
      profilePicWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft:10,
        position:'relative'
      },
      profilePic: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
      },
      userName: {
        fontSize: 24,
        marginLeft: 15,
        fontWeight: 'bold',
        color:"#fff"
      },
    myProfileContainer: {
      flex: 3,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    studentDetailsHeading:{
        color:'#4F97A6',
        fontWeight:'bold',
        fontSize:16,
        paddingVertical:5,
    },
    userDetailsContainer:{
        marginTop:8,
        borderWidth: 1,         
        borderColor: "#ddd", 
        borderRadius:5,
        paddingVertical:10,
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
        paddingHorizontal:5,
        fontWeight:'500'
    },
    menuContainer:{
        borderWidth: 1,         
        borderColor: "#ddd", 
        borderRadius:5,
        paddingVertical:20,
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
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
    borderRadius: 50,
  },
  });
  
  export default UserProfile;
  