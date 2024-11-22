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
import { useNavigation, useRoute } from "@react-navigation/native";

const UserProfile = () => {
  const navigation = useNavigation(); 
  const route = useRoute();
  const { user,group_name } = route.params;


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
              <View style={styles.profilePicWrapper}>
                {/* <Image
                  source={{
                    uri: user.profile_picture
                      ? user.profile_picture
                      : "https://via.placeholder.com/150", 
                  }}
                  style={styles.profilePic}
                /> */}
                <Image
                  source={
                    user.profile_picture
                      ? { uri: user.profile_picture }
                      : require("../assets/images/placeholder-user.jpg") // Local placeholder image
                  }
                  style={styles.profilePic}
                />
              </View>
              <Text style={styles.userName}>
                {user.first_name} {user.last_name}
              </Text>
            </View>
          </View>

          <View style={styles.myProfileContainer}>
            <ScrollView>
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
                    value={user.first_name}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Surname</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.last_name}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Email</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.email}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Contact No</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.phone}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Group</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={group_name}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Address</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.address}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>City</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.address}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Postal Code</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.postal_code}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>State</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.state}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Country</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value={user.country}
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Notes</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value=""
                    placeholder="Add Text Here"
                    placeholderTextColor="#626D75"
                  />
                </View>
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
                    value="Darrell Steward"
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Email</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value="darrellshah@gmail.com"
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Contact No</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value="1234567890"
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Mother Name</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value="Priyanka Shah"
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userDetailsHeading}>Contact No</Text>
                  <TextInput
                    style={styles.userDetailsInput}
                    value="1234567890"
                  />
                </View>
              </View>
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
        marginLeft:10
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
  });
  
  export default UserProfile;
  
