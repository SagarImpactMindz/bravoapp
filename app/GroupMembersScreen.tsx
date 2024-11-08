import React from 'react';
import { View, Text, StyleSheet, FlatList, Image,StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '@/constants/Colors';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
const groupMembers = [
  { id: '1', name: 'Adnan Safi', image:"" },
  { id: '2', name: 'Joan Baker xcwegbuidcewb',  image:"" },
  { id: '3', name: 'Ronald C. Kinch',image:""  },
  { id: '4', name: 'Clara Tolson',image:""  },
  { id: '5', name: 'Clara Tolson', image:"" },
  { id: '6', name: 'Jennifer Fritz', image:""  },
  { id: '7', name: 'Jennifer Fritz', image:""  },
  { id: '8', name: 'Jennifer Fritz', image:""  },
  { id: '9', name: 'Jennifer Fritz', image:""  },
  { id: '10', name: 'Jennifer Fritz', image:""  },
  { id: '11', name: 'Jennifer Fritz', image:""  },
  { id: '12', name: 'Jennifer Fritz', image:""  },
  { id: '13', name: 'Jennifer Fritz', image:""  },
  { id: '14', name: 'Jennifer Fritz', image:""  },
];

const GroupMembersScreen = () => {


  const renderItem = ({ item }) => (
    <TouchableOpacity>
        
    <View style={styles.notificationItem}>
      <Image
        // source={{ uri: 'https://placekitten.com/80/80' }}
        source={require("../assets/images/SigninImg.png")}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <FontAwesome
                  name="chevron-right"
                  size={22}
                  color="#555"
                />
      </View>
      {/* <View style={styles.hrContainer}>
        <View style={styles.hr} />
    </View> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.header}>
         <View style={styles.groupprofileSection}>
         <View style={styles.groupProfilePicWrapper}>
    <Image
      source={require("../assets/images/SigninImg.png")}
      style={styles.groupProfilePic}
    />
    <TouchableOpacity style={styles.groupProfilePicEditIconContainer}>
      <FontAwesome5 name="pen" size={15} color="white" />
    </TouchableOpacity>
  </View>
  <View style={{marginLeft:8}}>
  <Text style={styles.groupName}>Class 10 A</Text>
  <Text style={styles.groupMembers} numberOfLines={1} ellipsizeMode="tail">
  {groupMembers.map((member) => member.name).join(', ')}
  </Text>
  </View>
  
        </View>
      </View>
      <View style={styles.notificationContainer}>
      <FlatList
        data={groupMembers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,

  },
  header: {
    flex:1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent:'center'
  },
  groupprofileSection:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    paddingVertical:10
  },
  groupProfilePicWrapper:{
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'relative',
  },
  groupProfilePic:{
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  groupProfilePicEditIconContainer:{
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
  groupName:{
    fontSize:22,
    fontWeight:'bold',
    color:'#fff',

  },
  groupMembers:{
    fontSize:16,
    fontWeight:'500',
    color:"#fff",
    width:width * 0.6,
  },
  notificationContainer:{
    flex:4,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    paddingTop:8
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 10,
    // elevation: 1,
    borderBottomWidth:1,
    borderBottomColor:'#ccc'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode:'cover'
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: 16,
    color: '#555',
    fontWeight:'500'
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  hrContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 0,
    margin:0
  },
  hr: { borderBottomColor: "#ccc", borderBottomWidth: 1, width: "100%",    },
});

export default GroupMembersScreen;
