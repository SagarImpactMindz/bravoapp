import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image,StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '@/constants/Colors';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChangePhotoComponent from '@/components/bravao/ChangePhotoComponent';

const GroupMembers = () => {
  const [changeProfile,setChangeProfile]=useState(false)
  const navigation = useNavigation(); 
  const route = useRoute();
  const {groupId, group_picture,group_name,participants } = route.params;

  const userProfilePic=group_picture
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('UserProfile',{ user: item,group_name:group_name})}>
        
    <View style={styles.notificationItem}>
    <Image
        source={
          item?.profile_picture
            ? { uri: item.profile_picture }
            : require("../assets/images/placeholder-user.jpg")
        }
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.first_name} {item.last_name}</Text>
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
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="angle-left" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.groupProfilePicWrapper}>
            <Image
              source={{ uri: group_picture }}
              style={styles.groupProfilePic}
            />
            <TouchableOpacity
              style={styles.groupProfilePicEditIconContainer}
              onPress={() => setChangeProfile(true)}
            >
              <FontAwesome5 name="pen" size={15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.groupName}>{group_name}</Text>
            <Text
              style={styles.groupMembers}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {participants.map((member) => member.first_name).join(", ")}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.notificationContainer}>
        <FlatList
          data={participants}
          renderItem={renderItem}
          keyExtractor={(item) => item.user_id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      {changeProfile && (
        <ChangePhotoComponent visible={changeProfile} onClose={()=>setChangeProfile(false)} userProfilePic={userProfilePic} />
      )}
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
    // flex:1,
    // backgroundColor: colors.background,
    // padding: 20,
    // justifyContent:'center'
    height: 250,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  groupprofileSection:{
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
  groupProfilePicWrapper:{
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'relative',
    marginLeft:10
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

export default GroupMembers;
