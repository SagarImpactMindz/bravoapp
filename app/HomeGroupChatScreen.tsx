import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

const HomeGroupChatScreen = () => {
  const data = [
    {
      id: "1",
      name: "10 Std Class A",
      message: "okay sure!!",
      time: "12:25 PM",
      members: 10,
      image: "https://placehold.co/600x400/png",
    },
    {
      id: "2",
      name: "10 Std Class B",
      message: "okay sure!!",
      time: "12:25 PM",
      members: 50,
      image: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      name: "8 Std Class A",
      message: "okay sure!!",
      time: "12:25 PM",
      members: 50,
      image: "https://via.placeholder.com/50",
    },
    {
      id: "4",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "5",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "6",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "7",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "8",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "9",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "10",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "11",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "12",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "13",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "14",
      name: "Kaushik",
      message: "okay sure!!",
      time: "12:25 PM",
      image: "https://via.placeholder.com/50",
    },
  ];

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.chatItem}>
        <View style={styles.avatar}>
          {/* <Image source={{ uri: item.image }} style={styles.groupPic}/> */}
          <Image
            source={require("../assets/images/SigninImg.png")}
            style={styles.groupPic}
          />
          {item.members ? (
            <View style={styles.membersView}>
              <Text style={styles.membersText}>
                {item.members > 20 ? "+20" : item.members}
              </Text>
            </View>
          ) : (
            ""
          )}
        </View>
        <View style={styles.chatContent}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatMessage}>{item.message}</Text>
        </View>
        <View style={styles.chatTimeContainer}>
          <Text style={styles.chatTime}>{item.time}</Text>
          {/* <FontAwesome name="check" size={18} color="gray" /> */}
          <Ionicons
            name="checkmark-done-outline"
            size={22}
            color="gray"
            style={styles.statusIcon}
          />
        </View>
      </View>
      <View style={styles.hrContainer}>
        <View style={styles.hr} />
      </View>
    </View>
  );

  return (
    //   {/* <View style={styles.footer}>
    //   <FontAwesome name="calendar" size={24} color="gray" />
    //     <FontAwesome name="plus-circle" size={24} color="gray" />
    //     <FontAwesome name="users" size={24} color="gray" />
    //     <FontAwesome name="bell" size={24} color="gray" />
    //     <Text style={styles.messageText}>Message</Text>
    //   </View> */}

    <View style={styles.container}>
      <StatusBar backgroundColor="#2E2E3A" barStyle="light-content" />
      <View style={styles.upperSection}>
        <View style={styles.middleSection}>
        <View style={styles.header}>
            <View>
          <Text style={styles.welcomeText}>Welcome , Jaini</Text></View>
          <TouchableOpacity style={styles.addButton}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search ..."
            style={styles.searchInput}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.searchBtn}>
            <FontAwesome
              name="search"
              size={24}
              color="#fff"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      </View>
      <View style={styles.chatSection}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.chatList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2E2E3A" },
  upperSection: { flex: 1, backgroundColor: "#2E2E3A", padding: 20, },
  middleSection:{flex:1,justifyContent: 'center',alignItems: 'center', },
  header: {
    width:'100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: { color: "#fff", fontSize: 22 },
  addButton: { backgroundColor: "#4E4E6A", borderRadius: 20, padding: 8 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4E4E6A",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 22,
    marginTop: 16,
    color: "#fff",
  },
  searchInput: { flex: 1, color: "#fff", fontSize: 22 },
  searchBtn: { backgroundColor: "#4E4E6A" },
  searchIcon: { marginLeft: 8 },
  chatSection: {
    flex: 3,
    backgroundColor: "white",
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  chatList: { flex: 1, backgroundColor: "#fff" },
  //   chatItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 10,  borderBottomWidth: 1,borderBottomColor: '#ccc', },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 2,
  },
  hrContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  hr: { borderBottomColor: "#ccc", borderBottomWidth: 1, width: "85%" },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4E4E6A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  groupPic: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "relative",
  },
  //   membersText: { position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', fontSize: 12, padding: 2, borderRadius: 10 },
  membersView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4E4E6A",
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  membersText: { fontSize: 14, color: "#fff", fontWeight: "bold" },
  chatContent: { flex: 1 },
  chatName: { fontWeight: "bold", color: "#2E2E3A", fontSize: 18 },
  chatMessage: { color: "gray", paddingTop: 5 },
  chatTimeContainer: { alignItems: "center", fontSize: 18 },
  chatTime: { color: "gray", fontSize: 12, marginBottom: 5 },
  statusIcon: { paddingTop: 5 },
});
export default HomeGroupChatScreen;
