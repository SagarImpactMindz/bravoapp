import React, { useState } from "react";
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
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "@/constants/Colors";
const MyProfileScreen = () => {
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <View style={styles.container}> */}
        <StatusBar backgroundColor={colors.background} barStyle="light-content" />
        
        {/* Fixed Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Profile</Text>
        </View>
  
        {/* Fixed Form Container */}
        <View style={styles.myProfileContainer}>
        <ScrollView>
          <View style={styles.profileSection}>
            <View style={styles.profilePicWrapper}>
              <Image
                source={require("../assets/images/SigninImg.png")}
                style={styles.profilePic}
              />
              <TouchableOpacity style={styles.profilePicEditIconContainer}>
                <FontAwesome5 name="pen" size={15} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>Janni Shah</Text>
          </View>
          <View style={styles.userDetailsContainer}>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Email</Text>
                    <TextInput style={styles.userDetailsInput} value="janishah@gmail.com" />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Contact No</Text>
                    <TextInput style={styles.userDetailsInput} value="1234567890" />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Address</Text>
                    <TextInput style={styles.userDetailsInput} value="home xyz" />
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Role</Text>
                    <TextInput style={styles.userDetailsInput} value="Student"/>
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userDetailsHeading}>Authentication Code</Text>
                    <TextInput style={styles.userDetailsInput} value="818564"/>
                </View>
          </View>
          <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
          <FontAwesome5 name="heart" size={24} color="#3C4E56" style={styles.menuIcon}/>
          </View>
          <Text style={styles.menuText}>About Bravo</Text>
          <FontAwesome name="chevron-right" size={24} color="#3C4E56" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
          <FontAwesome name="shield" size={24} color="#3C4E56" style={styles.menuIcon}/>
          </View>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <FontAwesome5 name="angle-double-right" size={24} color="#3C4E56" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconWrapper}>
          <FontAwesome name="sign-out" size={24} color="#3C4E56" style={styles.menuIcon}/>
          </View>
          <View>
          <Text style={styles.menuText}>Log out</Text>
          <Text style={styles.subText}>Further secure your account for safety</Text></View>
        </TouchableOpacity>
          </View>
          </ScrollView>
          </View>
        
      {/* </View> */}
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      justifyContent: "center",
      flex: 1,
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
        fontSize:18,
        color:'#57636C',
        fontWeight:'bold',
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
  });
  
  export default MyProfileScreen;
  
