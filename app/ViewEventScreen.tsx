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
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getEventsByIdApi } from "@/utils/Services/eventServices";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { allUsersApi, usersDetails } from "@/utils/Services/services";
import { useRouter } from "expo-router";

const ViewEventScreen = () => {
  const navigation = useNavigation();
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [event, setEvent] = useState();
  const [groupNames, setGroupNames] = useState([]);
  const[groupData,setGroupData]=useState([])
  const [usersData, setUsersData] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const route = useRoute();
  const router=useRouter()
  // console.log(groupData,isLoading,"#groupData")
  const { event_id } = route.params;
  // console.log("event_id", event_id);

  const fetchUserData = async () => {
    setIsViewLoading(true);
    try {
      const data = await usersDetails();
      const allUsersData=await allUsersApi()
      setGroupData(data?.groupInfo || []);
      setUsersData(allUsersData?.allUsers || [])
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      Alert.alert("Something went wrong", errorMessage);
      if (error.response && error.response.status === 401) {
        // Token expired, navigate to login screen
        router.replace('/');
      }
    } finally {
      setIsViewLoading(false);
    }
  };
useEffect(()=>{
  fetchUserData()
},[event_id])

const getGroupNames = () => {
  try {
    // Ensure event.group_id and groupData are available before proceeding
    if (!event?.group_id || !groupData) {
      // console.log("Missing group_id or groupData");
      return [];
    }

    // Parse the group_id from the event (assuming it's a stringified array)
    const groupIds = JSON.parse(event.group_id);
    // console.log("Parsed groupIds:", groupIds);

    // Filter the groupData to find groups with matching groupIds
    const filteredGroups = groupData.filter((group) =>
      groupIds.includes(group.group_id)
    );
    // console.log("Filtered Groups:", filteredGroups);

    // Map the filtered groups to get the group names
    const groupNames = filteredGroups.map((group) => group.name);
    // console.log("Mapped Group Names:", groupNames);

    return groupNames;
  } catch (error) {
    console.error("Error in getGroupNames:", error);
    return [];
  }
};
useEffect(() => {
  if (event && groupData) {
    const names = getGroupNames();
    setGroupNames(names);
  }
}, [event, groupData]);

const getUserNames = () => {
  try {
    if (!event?.user_id || !usersData) {
      // console.log("Missing user_id or usersData");
      return [];
    }

    const userIds = JSON.parse(event.user_id);
    // console.log("parsed userIds",userIds)
    // console.log(usersData,"userData")
    const filteredUsers = usersData.filter((user) =>
      userIds.includes(parseInt(user.user_id))
    );
    // console.log(filteredUsers,"filteredUsers")

    const userNames = filteredUsers.map((user) => user.username);
    return userNames;
  } catch (error) {
    console.error("Error in getUserNames:", error);
    return [];
  }
};

useEffect(() => {
  if (event && usersData.length > 0) {
    const names = getUserNames();
    setUserNames(names); // Set the userNames state
  }
}, [event, usersData]);

  useEffect(() => {
    (async () => {
      try {
        setIsViewLoading(true);
        const response = await getEventsByIdApi(event_id);
        if (response?.isSuccess) {
          setEvent(response?.data);
          setIsViewLoading(false);
          // console.log(response.data, "res");
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Something wents wrong",
          error?.response?.data?.message || "Something went wrong"
        );
      } finally {
        setIsViewLoading(false);
      }
    })();
  }, [event_id]);

   // Function to handle image download
   const handleDownloadImage = async (fileName) => {
    try {
      // Construct the file URL
      const fileUrl = `${event?.doc_path}${fileName}`;
      
      // Get the file path to save it locally
      const fileUri = FileSystem.documentDirectory + fileName;

      // Download the file
      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

      // Check if the download was successful
      if (uri) {
        Alert.alert("Success", "Image downloaded successfully!");
        
        // Optionally, share the image (using Expo's Sharing API)
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert("File saved", `File saved to: ${uri}`);
        }
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Error", "Failed to download the image.");
    }
  };


  
  

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.backIconContainer}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="angle-left" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>View Event</Text>
          </View>
        </View>

        {/* Fixed Form Container */}
        <View style={styles.addEventForm}>
          {/* Scrollable Input Fields */}
          {isViewLoading ? (
            <ActivityIndicator size={"large"} color={"black"} />
          ) : (
            <ScrollView
              contentContainerStyle={styles.formContent}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <Text style={styles.label}>
                  Event Name <Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, { color: "black" }]}
                  placeholder="Enter event name"
                  placeholderTextColor="#9AA1A7"
                  value={event?.title}
                  selectTextOnFocus={false}
                  editable={false}
                />
              </View>

              <View>
                <Text style={styles.label}>
                  Start Date & Time<Text style={styles.star}>*</Text>
                </Text>
                <TouchableOpacity style={styles.input} disabled={true}>
                  <Text>{event?.start_time ? event?.start_time : "null"}</Text>
                  <FontAwesome
                    name="calendar"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.label}>
                  End Date & Time<Text style={styles.star}>*</Text>
                </Text>
                <TouchableOpacity style={styles.input} disabled={true}>
                  <Text>{event?.end_time ? event?.end_time : "null"}</Text>
                  <FontAwesome
                    name="calendar"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.label}>
                  Location<Text style={styles.star}>*</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter location"
                    placeholderTextColor="#9AA1A7"
                    style={[styles.input, { color: "black" }]}
                    value={event?.location ? event?.location : "null"}
                    selectTextOnFocus={false}
                    editable={false}
                  />
                  <FontAwesome
                    name="map-marker"
                    size={22}
                    color="#555"
                    style={styles.locationIcon}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.label}>
                  Category<Text style={styles.star}>*</Text>
                </Text>
                <View style={styles.input}>
                  <Text style={{ fontSize: 16, color: "#000" }}>
                    {event?.category ? event?.category : "null"}
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.label}>
                  Group Name<Text style={styles.star}>*</Text>
                </Text>
                <View
                  style={[
                    styles.input,
                    {
                      justifyContent: "flex-start",
                      marginLeft: 5,
                      flexWrap: "wrap",
                    },
                  ]}
                >
                
                  {groupNames?.length > 0 ? (
                    groupNames?.map((groupName, index) => (
                      <View key={index} style={styles.categoryTag}>
                        <Text style={styles.categoryText}>{groupName}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.categoryText}>No Groups Assigned</Text>
                  )}
                </View>
              </View>

              <View>
                <Text style={styles.label}>
                  Users<Text style={styles.star}>*</Text>
                </Text>
                <View
                  style={[
                    styles.input,
                    {
                      justifyContent: "flex-start",
                      marginLeft: 5,
                      flexWrap: "wrap",
                    },
                  ]}
                >
                
                  {userNames?.length > 0 ? (
                    userNames?.map((userName, index) => (
                      <View key={index} style={styles.categoryTag}>
                        <Text style={styles.categoryText}>{userName}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.categoryText}>No User Exists</Text>
                  )}
                </View>
              </View>

              <View>
                <Text style={styles.label}>
                  Event Cost <Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, { color: "black" }]}
                  placeholder="Enter event cost"
                  placeholderTextColor="#9AA1A7"
                  value={event?.cost ? event?.cost : "null"}
                  selectTextOnFocus={false}
                  editable={false}
                />
              </View>


              {/* Displaying Uploaded Files (Images) */}
              {(event?.event_doc && JSON.parse(event?.event_doc).length > 0) ? (
                <View>
                  <Text style={styles.label}>View Documents</Text>
                  <ScrollView horizontal style={styles.filePreviewContainer}>
                    {JSON.parse(event?.event_doc).map((file, index) => (
                      // console.log(file,"file")
                      <View key={index} style={styles.filePreview}>
                        <Image
                          source={{ uri: `${event?.doc_path}${file}` }}
                          style={styles.fileImage}
                        />
                        <Text style={styles.fileName}>{file}</Text>
                        <TouchableOpacity
                          onPress={()=>handleDownloadImage(file)}
                        >
                          <FontAwesome
                            name="download"
                            size={22}
                            color="#555"
                            style={{paddingVertical:2}}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              ): (
                <View>
                <Text style={styles.label}>View Documents</Text>
                <View
                  style={styles.input}
                >
                  <Text style={{ fontSize: 16, color: "#000" }}>
                    No Document Available
                  </Text>
                
                </View>
              </View>
              )}

              <View>
                <Text style={styles.label}>
                  Event Notes <Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, styles.textBox, { color: "black" }]}
                  placeholder="Enter event notes"
                  placeholderTextColor="#9AA1A7"
                  multiline={true}
                  numberOfLines={4}
                  value={event?.event_notes ? event?.event_notes : "null"}
                  selectTextOnFocus={false}
                  editable={false}
                />
              </View>

              <View>
                <Text style={styles.label}>
                  Announcement<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  style={[styles.input, styles.textBox, , { color: "black" }]}
                  placeholder="Enter announcement"
                  placeholderTextColor="#9AA1A7"
                  multiline={true}
                  numberOfLines={4}
                  value={event?.description ? event?.description : "null"}
                  selectTextOnFocus={false}
                  editable={false}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 250,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backIconContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderColor: "#9AA1A7",
    alignContent: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addEventForm: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "absolute",
    top: 250,
    bottom: 0,
    left: 0,
    right: 0,
  },
  formContent: {
    paddingBottom: 20,
  },
  star: {
    color: "red",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    fontSize: 16,
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textBox: {
    height: 100,
    textAlignVertical: "top",
  },
  icon: {
    marginLeft: 10,
  },
  inputContainer: {
    position: "relative",
  },
  locationIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  selectBox: {
    fontSize: 16,
  },
  dropdown: {
    top: 5,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9AA1A7",
    elevation: 3,
    maxHeight: 200,
    zIndex: 999,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    width: width * 0.8,
    marginTop: 20,
    alignSelf: "center",
    height: 50,
    backgroundColor: "#7BA7A7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  // categoryContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   marginVertical: 10,
  //   borderRadius: 10,
  // },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#D9E7EC",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#555",
    marginRight: 5,
  },
  
  filePreviewContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    marginVertical: 10,
    padding:5,
    overflow: "hidden", 
  },
  filePreview: {
    marginRight: 10,
    alignItems: "center",
  },
  fileImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  fileName: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
});

export default ViewEventScreen;
