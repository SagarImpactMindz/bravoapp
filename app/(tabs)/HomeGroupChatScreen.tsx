// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Ionicons } from "@expo/vector-icons";
// import { colors } from "@/constants/Colors";
// import { useNavigation } from "@react-navigation/native";
// import { searchGroup, usersDetails } from "@/utils/Services/services";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const HomeGroupChatScreen = () => {
//   const [groupData, setGroupData] = useState();
//   const [userData, setUserData] = useState();
//   const [searchTerm, setSearchTerm] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGroupSearchLoading, setIsGroupSearchLoading] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);

//   const navigation = useNavigation();
//   const role = "teacher";
//   // const role='student'

//   // get data from api
//   useEffect(() => {
//     (async () => {
//       setIsLoading(true);
//       try {
//         const data = await usersDetails();
//         // console.log(data,"data")
//         setGroupData(data?.groupInfo || []);
//         setFilteredData(data?.groupInfo || []);
//         setUserData(data?.userInfo);
//         await AsyncStorage.setItem("userData", JSON.stringify(data.userInfo));
//         setIsLoading(false);
//       } catch (error) {
//         // console.error(error);
//         Alert.alert("Login Failed", error.response.data.message);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, []);

//   const renderItem = ({ item }) => (
//     // <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate("ChatScreen", {
//           groupId: item.group_id,
//           group_picture: item.group_picture,
//           group_name: item.name,
//         });
//       }}
//     >
//       <View style={styles.chatItem}>
//         <View style={styles.avatar}>
//           <Image source={{ uri: item.group_picture }} style={styles.groupPic} />
//           {item.members ? (
//             <View style={styles.membersView}>
//               <Text style={styles.membersText}>
//                 {item.members > 20 ? "+20" : item.members}
//               </Text>
//             </View>
//           ) : (
//             ""
//           )}
//         </View>
//         <View style={styles.chatContent}>
//           <Text style={styles.chatName}>{item.name}</Text>
//           <Text style={styles.chatMessage}>{item.lastMessage.content}</Text>
//         </View>
//         <View style={styles.chatTimeContainer}>
//           <Text style={styles.chatTime}>{item.lastMessage.sent_at}</Text>
//           <Ionicons
//             name="checkmark-done-outline"
//             size={22}
//             color="gray"
//             style={styles.statusIcon}
//           />
//         </View>
//       </View>
//       <View style={styles.hrContainer}>
//         <View style={styles.hr} />
//       </View>
//     </TouchableOpacity>
//   );

//   // Handle search functionality
//   const handleSearch = (text) => {
//     setSearchTerm(text);

//     if (text.trim() === "") {
//       setFilteredData(groupData); // Reset to original data when input is cleared
//     } else {
//       const filtered = groupData.filter((item) =>
//         item.name.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={"#fff"} />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <View style={styles.container}>
//         <StatusBar
//           backgroundColor={colors.background}
//           barStyle="light-content"
//         />
//         <View style={styles.upperSection}>
//           <View style={styles.middleSection}>
//             <View style={styles.header}>
//               <View>
//                 <Text style={styles.welcomeText}>
//                   Welcome , {userData?.fullname}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => {
//                   if (role === "teacher") {
//                     navigation.navigate("TeacherList");
//                   } else {
//                     navigation.navigate("StudentsList");
//                   }
//                 }}
//               >
//                 <FontAwesome name="plus" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.searchContainer}>
//               <TextInput
//                 placeholder="Search ..."
//                 style={styles.searchInput}
//                 value={searchTerm}
//                 onChangeText={handleSearch}
//                 placeholderTextColor="#fff"
//               />
//               {/* <TouchableOpacity style={styles.searchBtn} onPress={()=>handleSearch()}>
//                 <FontAwesome
//                   name="search"
//                   size={24}
//                   color="#fff"
//                   style={styles.searchIcon}
//                 />
//               </TouchableOpacity> */}
//               <View style={styles.searchBtn}>
//                 <FontAwesome
//                   name="search"
//                   size={24}
//                   color="#fff"
//                   style={styles.searchIcon}
//                 />
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={styles.chatSection}>
//           {filteredData?.length === 0 ? (
//             <View style={styles.noDataContainer}>
//               <Text style={styles.noDataText}>No data available</Text>
//             </View>
//           ) : (
//             <FlatList
//               data={filteredData}
//               keyExtractor={(item) => item.group_id.toString()}
//               renderItem={renderItem}
//               style={styles.chatList}
//             />
//           )}
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.background },
//   upperSection: {
//     height: 250,
//     backgroundColor: colors.background,
//     padding: 20,
//   },
//   middleSection: { flex: 1, justifyContent: "center", alignItems: "center" },
//   header: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//     marginTop: 20,
//   },
//   welcomeText: { color: "#fff", fontSize: 22 },
//   addButton: {
//     width: 36,
//     height: 36,
//     backgroundColor: "#4E4E6A",
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 8,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4E4E6A",
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginBottom: 22,
//     marginTop: 16,
//     color: "#fff",
//   },
//   searchInput: { flex: 1, color: "#fff", fontSize: 22 },
//   searchBtn: { backgroundColor: "#4E4E6A" },
//   searchIcon: { marginLeft: 8 },
//   chatSection: {
//     flex: 3,
//     backgroundColor: "white",
//     padding: 10,
//     paddingTop: 8,
//     paddingBottom: 0,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   chatList: { flex: 1, backgroundColor: "#fff" },

//   chatItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 2,
//   },
//   hrContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   hr: { borderBottomColor: "#ccc", borderBottomWidth: 1, width: "85%" },
//   avatar: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#4E4E6A",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   groupPic: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 35,
//     resizeMode: "cover",
//     position: "relative",
//   },
//   //   membersText: { position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', fontSize: 12, padding: 2, borderRadius: 10 },
//   membersView: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     backgroundColor: "#4E4E6A",
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     textAlign: "center",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   membersText: { fontSize: 14, color: "#fff", fontWeight: "bold" },
//   chatContent: { flex: 1 },
//   chatName: { fontWeight: "bold", color: colors.background, fontSize: 18 },
//   chatMessage: { color: "gray", paddingTop: 5 },
//   chatTimeContainer: { fontSize: 18, alignItems: "flex-end" },
//   chatTime: { color: "gray", fontSize: 12, marginTop: 5 },
//   statusIcon: { paddingTop: 5 },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: colors.background,
//   },
//   loadingText: { color: "#fff", marginTop: 10, fontSize: 16 },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   noDataText: {
//     fontSize: 18,
//     color: "gray",
//     textAlign: "center",
//   },
// });
// export default HomeGroupChatScreen;




import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { searchGroup, usersDetails } from "@/utils/Services/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../contexts/UserDetailsContext";

const HomeGroupChatScreen = () => {
  const {userData,groupData,isLoading}=useUser()
  const [searchTerm, setSearchTerm] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const navigation = useNavigation();
  const role = "teacher";
  // const role='student'

  

  const renderItem = ({ item }) => (
    // <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatScreen", {
          groupId: item.group_id,
          group_picture: item.group_picture,
          group_name: item.name,
        });
      }}
    >
      <View style={styles.chatItem}>
        <View style={styles.avatar}>
          <Image source={{ uri: item.group_picture }} style={styles.groupPic} />
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
          <Text style={styles.chatMessage}>{item.lastMessage.content}</Text>
        </View>
        <View style={styles.chatTimeContainer}>
          <Text style={styles.chatTime}>{item.lastMessage.sent_at}</Text>
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
    </TouchableOpacity>
  );

  useEffect(()=>{
    setFilteredData(groupData)
  },[])

  // Handle search functionality
  const handleSearch = (text) => {
    setSearchTerm(text);

    if (text.trim() === "") {
      setFilteredData(groupData); // Reset to original data when input is cleared
    } else {
      const filtered = groupData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={"#fff"} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
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
        <View style={styles.upperSection}>
          <View style={styles.middleSection}>
            <View style={styles.header}>
              <View>
                <Text style={styles.welcomeText}>
                  Welcome , {userData?.fullname}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  if (role === "teacher") {
                    navigation.navigate("TeacherList");
                  } else {
                    navigation.navigate("StudentsList");
                  }
                }}
              >
                <FontAwesome name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search ..."
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
                placeholderTextColor="#fff"
              />
              {/* <TouchableOpacity style={styles.searchBtn} onPress={()=>handleSearch()}>
                <FontAwesome
                  name="search"
                  size={24}
                  color="#fff"
                  style={styles.searchIcon}
                />
              </TouchableOpacity> */}
              <View style={styles.searchBtn}>
                <FontAwesome
                  name="search"
                  size={24}
                  color="#fff"
                  style={styles.searchIcon}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.chatSection}>
          {filteredData?.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data available</Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.group_id.toString()}
              renderItem={renderItem}
              style={styles.chatList}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  upperSection: {
    height: 250,
    backgroundColor: colors.background,
    padding: 20,
  },
  middleSection: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  welcomeText: { color: "#fff", fontSize: 22 },
  addButton: {
    width: 36,
    height: 36,
    backgroundColor: "#4E4E6A",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
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
    paddingTop: 8,
    paddingBottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  chatList: { flex: 1, backgroundColor: "#fff" },

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
    borderRadius: 35,
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
  chatName: { fontWeight: "bold", color: colors.background, fontSize: 18 },
  chatMessage: { color: "gray", paddingTop: 5 },
  chatTimeContainer: { fontSize: 18, alignItems: "flex-end" },
  chatTime: { color: "gray", fontSize: 12, marginTop: 5 },
  statusIcon: { paddingTop: 5 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: { color: "#fff", marginTop: 10, fontSize: 16 },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noDataText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
});
export default HomeGroupChatScreen;

