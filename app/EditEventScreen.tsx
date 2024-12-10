import React, { useEffect, useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Dimensions,ScrollView,StatusBar,KeyboardAvoidingView,Platform,Alert,ActivityIndicator, Image} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {allUsersApi, usersDetails } from "@/utils/Services/services";
import { getAllCategories, updateEventApi } from "@/utils/Services/eventServices";
import { getEventsByIdApi } from "@/utils/Services/eventServices";
import { useRouter } from "expo-router";


const EditEventScreen = () => {
  const [formData, setFormData] = useState({
    title: "",
    start_time: new Date(),
    end_time: new Date(),
    location: "",
    category: "",
    group_id: [],
    event_cost: "",
    event_notes: "",
    description: "",
    event_doc:[],
    user_id:[]
  });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [selectedUsersData, setSelectedUsersData] = useState([]);
  const[isUserOpen,setIsUserOpen]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const[userId,setUserId]=useState()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const[event,setEvent]=useState([])
  const route = useRoute();
  const {itemToEditId: event_id } = route.params;
  // console.log(event_id, "event_id");
  const navigation = useNavigation();
  const router=useRouter()

// all data from event
useEffect(() => {
  (async () => {
    try {
      setIsLoading(true);
      const response = await getEventsByIdApi(event_id);
      if (response?.isSuccess) {
        setEvent(response?.data);
        setIsLoading(false);

      }
    } catch (error) {
      Alert.alert(
        "Something wents wrong",
        error?.response?.data?.message || "Something went wrong"
      );
      if (error.response && error.response.status === 401) {
        // Token expired, navigate to login screen
        router.replace('/');
      }
    } finally {
      setIsLoading(false);
    }
  })();
}, [event_id]);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await usersDetails();
        const categoryData = await getAllCategories();
        const allUsersData=await allUsersApi()
        setUserId(data?.userInfo?.user_id)
        setGroup(data?.groupInfo || []); // Set group data
        setCategory(categoryData?.data) || []; // Set category data
        setUsersData(allUsersData?.allUsers)|| [];
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Something wents wrong",
          error?.response?.data?.message || "Something went wrong"
        );
        if (error.response && error.response.status === 401) {
          router.replace('/');
        }
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchData(); // Call the function
  }, []); 


  
// useEffect(() => {
//   setIsLoading(true);
//   setFormData({
//     title: event?.title || "",
//     start_time: event?.start_time ? new Date(event.start_time) : new Date(),
//     end_time: event?.end_time ? new Date(event.end_time) : new Date(),
//     location: event?.location || "",
//     category: event?.category || "",
//     event_cost: event?.cost || "",
//     event_notes: event?.event_notes || "",
//     description: event?.description || "",
//     event_doc: event?.event_doc ? JSON.parse(event?.event_doc) : [],
//   });
  
//   setSelectedCategory(event?.category)
//   const parsedGroupId = event?.group_id ? JSON.parse(event?.group_id) : [];
//   const parsedUserId = event?.user_id ? JSON.parse(event?.user_id) : [];
 
//   // Set selected groups by matching group IDs
//   const selectedGroups = group?.filter(groupItem =>
//     parsedGroupId.includes(groupItem.group_id)
//   );
//   setSelectedGroups(selectedGroups);

//   // Set selected users by matching user IDs
//   const selectedUsers = usersData?.filter(userItem =>
//     parsedUserId.includes(parseInt(userItem?.user_id))
    
//   );
//   setSelectedUsersData(selectedUsers);
//   setIsLoading(false);
  
// }, [event, group, usersData]);

// Generate image URLs

// useEffect(() => {
//   if (event?.event_doc) {
//     setFormData((prevState) => ({
//       ...prevState,
//       title: event?.title || "",
//       start_time: event?.start_time ? new Date(event.start_time) : new Date(),
//       end_time: event?.end_time ? new Date(event.end_time) : new Date(),
//       location: event?.location || "",
//       category: event?.category || "",
//       event_cost: event?.cost || "",
//       event_notes: event?.event_notes || "",
//       description: event?.description || "",
//       // event_doc: event?.event_doc ? JSON.parse(event?.event_doc) : [],
//     }));

//     if (event?.event_doc) {
//       // Avoid appending the same files multiple times by first checking the state
//       const parsedEventDocs = JSON.parse(event?.event_doc);
  
//       // Generate complete image URLs using doc_path and remove duplicates
//       const imageUrls = parsedEventDocs.map((fileName) => {
//         const imageUrl = `${event?.doc_path}${fileName}`; // Combine doc_path with the file name
//         const fileExtension = fileName.split('.').pop().toLowerCase(); // Extract the file extension
  
//         let fileType = 'application/octet-stream'; // Default MIME type
  
//         // Map file extension to MIME type
//         switch (fileExtension) {
//           case 'png':
//             fileType = 'image/png';
//             break;
//           case 'jpg':
//           case 'jpeg':
//             fileType = 'image/jpeg';
//             break;
//           case 'gif':
//             fileType = 'image/gif';
//             break;
//           case 'pdf':
//             fileType = 'application/pdf';
//             break;
//           // Add more cases if necessary
//           default:
//             break;
//         }
  
//         return {
//           uri: imageUrl,
//           name: fileName,
//           type: fileType,
//         };
//       });
  
//       // Set form data with existing event docs if not already added
//       setFormData((prevState) => {
//         const existingEventDocs = prevState.event_doc || [];
//         const updatedEventDocs = [...existingEventDocs, ...imageUrls];
//         return {
//           ...prevState,
//           event_doc: updatedEventDocs,
//         };
//       });
//     console.log(formData.event_doc,"formData.event_doc")
//     }

//     setSelectedCategory(event?.category);
//     const parsedGroupId = event?.group_id ? JSON.parse(event?.group_id) : [];
//     const parsedUserId = event?.user_id ? JSON.parse(event?.user_id) : [];

//     // Set selected groups by matching group IDs
//     const selectedGroups = group?.filter((groupItem) =>
//       parsedGroupId.includes(groupItem.group_id)
//     );
//     setSelectedGroups(selectedGroups);
//     setFormData((prevState) => ({
//       ...prevState,
//       group_id: parsedGroupId,
//     }));

//     // Set selected users by matching user IDs
//     const selectedUsers = usersData?.filter((userItem) =>
//       parsedUserId.includes(parseInt(userItem?.user_id))
//     );
//     setSelectedUsersData(selectedUsers);
//     setFormData((prevState) => ({
//       ...prevState,
//       user_id: parsedUserId,
//     }));
//   }
// }, [event, group, usersData]);

useEffect(() => {
  if (event?.event_doc) {
    setFormData((prevState) => ({
      ...prevState,
      title: event?.title || "",
      start_time: event?.start_time ? new Date(event.start_time) : new Date(),
      end_time: event?.end_time ? new Date(event.end_time) : new Date(),
      location: event?.location || "",
      category: event?.category || "",
      event_cost: event?.cost || "",
      event_notes: event?.event_notes || "",
      description: event?.description || "",
    }));

    if (event?.event_doc) {
      const parsedEventDocs = JSON.parse(event?.event_doc);

      // Generate complete image URLs using doc_path
      const imageUrls = parsedEventDocs.map((fileName) => {
        const imageUrl = `${event?.doc_path}${fileName}`; // Combine doc_path with the file name
        const fileExtension = fileName.split(".").pop().toLowerCase(); // Extract the file extension

        let fileType = "application/octet-stream"; // Default MIME type

        // Map file extension to MIME type
        switch (fileExtension) {
          case "png":
            fileType = "image/png";
            break;
          case "jpg":
          case "jpeg":
            fileType = "image/jpeg";
            break;
          case "gif":
            fileType = "image/gif";
            break;
          case "pdf":
            fileType = "application/pdf";
            break;
          default:
            break;
        }

        return {
          uri: imageUrl,
          name: fileName,
          type: fileType,
        };
      });

      // Avoid duplicates by checking existing URIs in the form data
      setFormData((prevState) => {
        const existingImageUris = prevState.event_doc.map((file) => file.uri);
        const newImages = imageUrls.filter(
          (file) => !existingImageUris.includes(file.uri)
        );
        return {
          ...prevState,
          event_doc: [...prevState.event_doc, ...newImages],
        };
      });
    }

    setSelectedCategory(event?.category);
    const parsedGroupId = event?.group_id ? JSON.parse(event?.group_id) : [];
    const parsedUserId = event?.user_id ? JSON.parse(event?.user_id) : [];

    // Set selected groups by matching group IDs
    const selectedGroups = group?.filter((groupItem) =>
      parsedGroupId.includes(groupItem.group_id)
    );
    setSelectedGroups(selectedGroups);
    setFormData((prevState) => ({
      ...prevState,
      group_id: parsedGroupId,
    }));

    // Set selected users by matching user IDs
    const selectedUsers = usersData?.filter((userItem) =>
      parsedUserId.includes(parseInt(userItem?.user_id))
    );
    setSelectedUsersData(selectedUsers);
    setFormData((prevState) => ({
      ...prevState,
      user_id: parsedUserId,
    }));
  }
}, [event, group, usersData]);


const getImageUrl = (fileName) => {
  const baseUrl = event?.doc_path ; // Ensure doc_path is available
  return `${baseUrl}${fileName}`;
};

  const handleConfirm = (date) => {
    const today = new Date();
    if (showStartPicker) {
      if (date < today) {
        Alert.alert("Invalid Date", "Start date cannot be earlier than today.");
        setShowStartPicker(false);
      } else {
        setFormData((prevState) => ({
          ...prevState,
          start_time: date, // Update start_time in formData
        }));
        setShowStartPicker(false);
      }
      // Ensure end date is after the start date
      if (new Date(formData.end_time) <= date) {
        setFormData((prevState) => ({
          ...prevState,
          end_time: new Date(date.getTime() + 60 * 60 * 1000), // Add 1 hour to start date
        }));
      }
    } else if (showEndPicker) {
      if (date > new Date(formData.start_time)) {
        setFormData((prevState) => ({
          ...prevState,
          end_time: date, // Update end_time in formData
        }));
        setShowEndPicker(false);
      } else {
        Alert.alert("Invalid Date", "End date must be later than start date.");
        setShowEndPicker(false);
      }
    }
  };

  const handleSelectGroup = (group) => {
    if (!selectedGroups.some((item) => item.group_id === group.group_id)) {
      // Add the selected group
      const updatedGroups = [...selectedGroups, group];
      const updatedGroupIds = updatedGroups.map((g) => g.group_id);
      setSelectedGroups(updatedGroups);
      setFormData((prevState) => ({
        ...prevState,
        group_id: updatedGroupIds,
      }));
      setIsGroupOpen(false);
    }
  };


  const handleRemoveGroup = (groupId) => {
    const updatedGroups = selectedGroups.filter(
      (group) => group.group_id !== groupId
    );
    const updatedGroupIds = updatedGroups.map((g) => g.group_id);
    setSelectedGroups(updatedGroups);
    setFormData((prevState) => ({
      ...prevState,
      group_id: updatedGroupIds,
    }));
  };


  const handleSelectUser = (user) => {
    if (!selectedUsersData.some((item) => item.user_id === user.user_id)) {
      // Add the selected group
      const updatedUsersData = [...selectedUsersData, user];
      const updatedUsersDataIds = updatedUsersData.map((u) => u.user_id);
      setSelectedUsersData(updatedUsersData);
      setFormData((prevState) => ({
        ...prevState,
        user_id: updatedUsersDataIds,
      }));
      setIsUserOpen(false);
    }
  };


  const handleRemoveUser = (userId) => {
    const updatedUsersData = selectedUsersData.filter(
      (user) => user.user_id !== userId
    );
    const updatedUsersDataIds = updatedUsersData.map((u) => u.user_id);
    setSelectedUsersData(updatedUsersData);
    setFormData((prevState) => ({
      ...prevState,
      user_id: updatedUsersDataIds,
    }));
  };


  useEffect(()=>{
    setFormData((prev) => {
      return { ...prev, category: selectedCategory };
    });
  },[selectedCategory])

  const uploadFileOnPressHandler = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Permission to access media library is required!");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!result.canceled) {
        const formattedImages = result.assets.map((image) => ({
          uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
          name: image.fileName,
          type:image.mimeType
        }));
        setFormData((prev) => ({
          ...prev,
          event_doc: [...prev.event_doc, ...formattedImages]
        }));
      }
    } catch (error) {
      console.error("Error selecting images:", error);
      Alert.alert("Error", "Something went wrong while selecting images.");
    }
  };



  
  const handleSave = async () => {
    setIsLoading(true);
    const formDataForApi = new FormData();

    // Append non-file fields
    formDataForApi.append("title", formData.title);
    formDataForApi.append("start_time", formData.start_time.toISOString());
    formDataForApi.append("end_time", formData.end_time.toISOString());
    formDataForApi.append("location", formData.location);
    formDataForApi.append("category", formData.category);
    formDataForApi.append("cost", formData.event_cost);
    formDataForApi.append("event_notes", formData.event_notes);
    formDataForApi.append("description", formData.description);
    formDataForApi.append("group_id", JSON.stringify(formData.group_id));
    formDataForApi.append("user_id", JSON.stringify(formData.user_id));

    // Append multiple files as event_doc[]
    formData.event_doc.forEach((file) => {
      formDataForApi.append("event_doc[]", {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    });

    try {
      const response = await updateEventApi(formDataForApi, event_id);
      if (response?.isSuccess) {
        Alert.alert("Success", response?.message);
        navigation.navigate("CalendarScreen");
      } else {
        Alert.alert("Error", response?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error saving event: ", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to add event.");
      if (error.response && error.response.status === 401) {
        // Token expired, navigate to login screen
        router.replace('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  
  
  
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 60} // Adjust offset as needed
    >
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />

        {/* Fixed Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Event</Text>
        </View>

        {/* Fixed Form Container */}
        <View style={styles.addEventForm}>
        {isLoading ? (
            <ActivityIndicator size={"large"} color={"black"} />
          ) :
          (<ScrollView
            contentContainerStyle={styles.formContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled" // Ensure tapping outside dismisses the keyboard
          >
            <View>
              <Text style={styles.label}>
                Event Name <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event name"
                placeholderTextColor="#9AA1A7"
                value={formData.title}
                onChangeText={(value) => handleInputChange("title", value)}
              />
            </View>

            <View>
              <Text style={styles.label}>
                Start Date & Time<Text style={styles.star}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowStartPicker(true)}
              >
                <Text>{formData.start_time.toLocaleString()}</Text>
                <FontAwesome
                  name="calendar"
                  size={22}
                  color="#555"
                  style={styles.icon}
                />
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePickerModal
                  isVisible={showStartPicker}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={() => setShowStartPicker(false)}
                />
              )}
            </View>

            <View>
              <Text style={styles.label}>
                End Date & Time<Text style={styles.star}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowEndPicker(true)}
              >
                <Text>{formData.end_time.toLocaleString()}</Text>
                <FontAwesome
                  name="calendar"
                  size={22}
                  color="#555"
                  style={styles.icon}
                />
              </TouchableOpacity>
              {showEndPicker && (
                <DateTimePickerModal
                  isVisible={showEndPicker}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={() => setShowEndPicker(false)}
                />
              )}
            </View>

            <View>
              <Text style={styles.label}>
                Location<Text style={styles.star}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter location"
                  placeholderTextColor="#9AA1A7"
                  style={styles.input}
                  value={formData.location}
                  onChangeText={(value) => handleInputChange("location", value)}
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

              {/* Dropdown for Category Selection */}
              <TouchableOpacity
                style={styles.input}
                onPress={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <Text
                  style={[
                    styles.selectBox,
                    {
                      fontSize: 16,
                      color: formData.category ? "#000" : "#9AA1A7",
                    },
                  ]}
                >
                  {/* {formData.category !== null ? formData.category : "Select a category"} */}
                  {selectedCategory ? selectedCategory : "Select a category"}
                  {/* {selectedCategory} */}
                </Text>
                {isCategoryOpen ? (
                  <FontAwesome
                    name="chevron-up"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                ) : (
                  <FontAwesome
                    name="chevron-down"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {/* Dropdown Options */}
              {isCategoryOpen && (
                <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
                  {category?.map((item) => (
                    <TouchableOpacity
                      key={item.cat_id}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedCategory(item.cat_name);
                        setIsCategoryOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>
                        {item.cat_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <View>
              <Text style={styles.label}>
                Group Name<Text style={styles.star}>*</Text>
              </Text>

              {/* Dropdown for Group Selection */}
              <TouchableOpacity
                style={[styles.input, { height: "auto" }]}
                onPress={() => setIsGroupOpen(!isGroupOpen)}
              >
                <View
                  style={[
                    styles.selectBox,
                    {
                      fontSize: 16,
                      color: "#9AA1A7",
                      height: "auto",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    },
                  ]}
                >
                  {selectedGroups?.length === 0 ? (
                    <Text style={{ color: "#9AA1A7" }}>Select Groups</Text>
                  ) : (
                    selectedGroups?.map((group) => (
                      <View key={group.group_id} style={[styles.selectedGroup]}>
                        <Text style={styles.selectedGroupText}>
                          {group.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveGroup(group.group_id)}
                        >
                          <FontAwesome name="times" size={16} color="#555" />
                        </TouchableOpacity>
                      </View>
                    ))
                  )}
                </View>
                {isGroupOpen ? (
                  <FontAwesome
                    name="chevron-up"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                ) : (
                  <FontAwesome
                    name="chevron-down"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isGroupOpen && (
                <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
                  {group.map((item) => (
                    <TouchableOpacity
                      key={item.group_id}
                      style={styles.dropdownItem}
                      onPress={() => handleSelectGroup(item)}
                    >
                      <Text style={styles.dropdownItemText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            <View>
              <Text style={styles.label}>
                Users<Text style={styles.star}>*</Text>
              </Text>

              {/* Dropdown for Group Selection */}
              <TouchableOpacity
                style={[styles.input, { height: "auto" }]}
                onPress={() => setIsUserOpen(!isUserOpen)}
              >
                <View
                  style={[
                    styles.selectBox,
                    {
                      fontSize: 16,
                      color: "#9AA1A7",
                      height: "auto",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    },
                  ]}
                >
                  {selectedUsersData?.length === 0 ? (
                    <Text style={{ color: "#9AA1A7" }}>Select Users</Text>
                  ) : (
                    selectedUsersData?.map((user) => (
                      <View key={user.user_id} style={[styles.selectedGroup]}>
                        <Text style={styles.selectedGroupText}>
                          {user.username}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveUser(user.user_id)}
                        >

                          <FontAwesome name="times" size={16} color="#555" />
                        </TouchableOpacity>
                      </View>
                    ))
                  )}
                </View>
                {isUserOpen ? (
                  <FontAwesome
                    name="chevron-up"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                ) : (
                  <FontAwesome
                    name="chevron-down"
                    size={22}
                    color="#555"
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>

              {isUserOpen && (
                <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
                  {usersData.map((item) => (
                    <TouchableOpacity
                      key={item.user_id}
                      style={styles.dropdownItem}
                      onPress={() => handleSelectUser(item)}
                    >
                      <Text style={styles.dropdownItemText}>{item.username}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            <View>
              <Text style={styles.label}>
                Event Cost <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event cost"
                placeholderTextColor="#9AA1A7"
                value={formData.event_cost}
                onChangeText={(value) => handleInputChange("event_cost", value)}
              />
            </View>

            <View>
              <Text style={styles.label}>
                Add Document <Text style={styles.star}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.input}
                onPress={uploadFileOnPressHandler}
              >
                <Text style={{ fontSize: 16, color: "#9AA1A7" }}>
                Select files
                </Text>
                <FontAwesome
                  name="paperclip"
                  size={22}
                  color="#555"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>


{formData?.event_doc?.length > 0 && (
              <View>
                <Text style={styles.label}>Uploaded Files</Text>
                <ScrollView horizontal style={styles.filePreviewContainer}>
                  {formData.event_doc.map((file, index) => {
                    return (
                      <View key={index} style={styles.filePreview}>
                        <Image source={{ uri: file.uri }} style={styles.fileImage} />
                        <Text style={styles.fileName}>{file.name}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            setFormData((prev) => ({
                              ...prev,
                              event_doc: prev.event_doc.filter((_, i) => i !== index), // Remove image by index
                            }));
                          }}
                        >
                          <FontAwesome name="times-circle" size={20} color="red" />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <View>
              <Text style={styles.label}>
                Event Notes <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textBox]}
                placeholder="Enter event notes"
                placeholderTextColor="#9AA1A7"
                multiline={true}
                numberOfLines={4}
                value={formData.event_notes}
                onChangeText={(value) => handleInputChange("event_notes", value)}
              />
            </View>

            <View>
              <Text style={styles.label}>
                Announcement<Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textBox]}
                placeholder="Enter announcement"
                placeholderTextColor="#9AA1A7"
                multiline={true}
                numberOfLines={4}
                value={formData.description}
                onChangeText={(value) =>
                  handleInputChange("description", value)
                }
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {" "}
                {isLoading ? (
                  <ActivityIndicator size={"large"} color={"white"} />
                ) : (
                  "SAVE"
                )}
              </Text>
            </TouchableOpacity>
          </ScrollView>)}
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
  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  addEventForm: {
    flex: 1,
    backgroundColor: colors.contentBackground,
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
    position:'absolute',
    right:10
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
  selectedGroup: {
    flexDirection: "row",
    flexWrap:"wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9E7EC",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedGroupText: {
    fontSize: 12,
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

export default EditEventScreen;

