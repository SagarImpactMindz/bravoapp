// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { colors } from "@/constants/Colors";
// import { useNavigation } from "@react-navigation/native";
// import * as DocumentPicker from "react-native-document-picker";
// import * as ImagePicker from "expo-image-picker";

// const AddEventScreen = () => {
//   const navigation=useNavigation()
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);
//   const [isGroupOpen, setIsGroupOpen] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   // Sample group names (can be fetched from an API or database)
//   const groups = ["Group A", "Group B", "Group C", "Group D"];

//   const handleConfirm = (date) => {
//     if (showStartPicker) {
//       setStartDate(date);
//       setShowStartPicker(false);
//     } else if (showEndPicker) {
//       setEndDate(date);
//       setShowEndPicker(false);
//     }
//   };

//   const handleSelectGroup = (group) => {
//     setSelectedGroup(group);
//     setIsGroupOpen(false); // Close the dropdown after selecting a group
//   };


//   const handleSave=()=>{
//     Alert.alert("Event Added Successfully")
//     // setTimeout(() => {
//     //   Alert.alert("Add more events if you want")
    
//     // }, 1000);
//     navigation.navigate('CalendarScreen')
//   }

//   const handleDocs=()=>{

//   }
//   return (
//     <KeyboardAvoidingView
//     style={styles.container}
//     behavior={Platform.OS === "ios" ? "padding" : "height"}
//   >
//     <View style={styles.container}>
//       <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      
//       {/* Fixed Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Add New Event</Text>
//       </View>

//       {/* Fixed Form Container */}
//       <View style={styles.addEventForm}>
//         {/* Scrollable Input Fields */}
//         <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
//           <View>
//             <Text style={styles.label}>
//               Event Name <Text style={styles.star}>*</Text>
//             </Text>
//             <TextInput style={styles.input}  placeholder="Enter event name" placeholderTextColor="#9AA1A7"/>
//           </View>

//           <View>
//             <Text style={styles.label}>
//               Start Date & Time<Text style={styles.star}>*</Text>
//             </Text>
//             <TouchableOpacity
//               style={styles.input}
//               onPress={() => setShowStartPicker(true)}
//             >
//               <Text>{startDate.toLocaleString()}</Text>
//               <FontAwesome
//                 name="calendar"
//                 size={22}
//                 color="#555"
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//             {showStartPicker && (
//               <DateTimePickerModal
//                 isVisible={showStartPicker}
//                 mode="datetime"
//                 onConfirm={handleConfirm}
//                 onCancel={() => setShowStartPicker(false)}
//               />
//             )}
//           </View>

//           <View>
//             <Text style={styles.label}>
//               End Date & Time<Text style={styles.star}>*</Text>
//             </Text>
//             <TouchableOpacity
//               style={styles.input}
//               onPress={() => setShowEndPicker(true)}
//             >
//               <Text>{endDate.toLocaleString()}</Text>
//               <FontAwesome
//                 name="calendar"
//                 size={22}
//                 color="#555"
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//             {showEndPicker && (
//               <DateTimePickerModal
//                 isVisible={showEndPicker}
//                 mode="datetime"
//                 onConfirm={handleConfirm}
//                 onCancel={() => setShowEndPicker(false)}
//               />
//             )}
//           </View>

//           <View>
//             <Text style={styles.label}>
//               Location<Text style={styles.star}>*</Text>
//             </Text>
//             <View style={styles.inputContainer}>
//               <TextInput placeholder="Enter location" placeholderTextColor="#9AA1A7" style={styles.input} />
//               <FontAwesome
//                 name="map-marker"
//                 size={22}
//                 color="#555"
//                 style={styles.locationIcon}
//               />
//             </View>
//           </View>

//           <View>
//             <Text style={styles.label}>
//               Category<Text style={styles.star}>*</Text>
//             </Text>
//             <TextInput style={[styles.input, styles.textBox]} placeholder="Enter category" placeholderTextColor="#9AA1A7"  multiline={true} numberOfLines={4} />
//           </View>

//           <View>
//             <Text style={styles.label}>
//               Group Name<Text style={styles.star}>*</Text>
//             </Text>
//             <TouchableOpacity
//               style={styles.input}
//               onPress={() => setIsGroupOpen(!isGroupOpen)}
//             >
//               <Text style={[styles.selectBox, { fontSize: 16,color:'#9AA1A7' }]}>
//                 {selectedGroup || "Select"}
//               </Text>
//               {isGroupOpen ? (
//                 <FontAwesome
//                   name="chevron-up"
//                   size={22}
//                   color="#555"
//                   style={styles.icon}
//                 />
//               ) : (
//                 <FontAwesome
//                   name="chevron-down"
//                   size={22}
//                   color="#555"
//                   style={styles.icon}
//                 />
//               )}
//             </TouchableOpacity>

//             {isGroupOpen && (
//               <View style={styles.dropdown}>
//                 {groups.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={styles.dropdownItem}
//                     onPress={() => handleSelectGroup(item)}
//                   >
//                     <Text style={styles.dropdownItemText}>{item}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </View>

//           <View>
//             <Text style={styles.label}>
//               Event Cost <Text style={styles.star}>*</Text>
//             </Text>
//             <TextInput style={styles.input}  placeholder="Enter event cost" placeholderTextColor="#9AA1A7"/>
//           </View>

//             <View>
//             <Text style={styles.label}>Add Document</Text>
//           <TouchableOpacity style={styles.input} onPress={handleDocs}>
//             <Text style={{fontSize:16,color:'#9AA1A7'}}>Document</Text>
//             <FontAwesome
//                 name="paperclip"
//                 size={22}
//                 color="#555"
//                 style={styles.icon}
//               />
            
//           </TouchableOpacity>
//             </View> 




//           <View>
//             <Text style={styles.label}>
//               Event Notes <Text style={styles.star}>*</Text>
//             </Text>
//             <TextInput style={[styles.input, styles.textBox]}  placeholder="Enter event notes" placeholderTextColor="#9AA1A7" multiline={true} numberOfLines={4}/>
//           </View>

//           <View>
//             <Text style={styles.label}>
//               Announcement<Text style={styles.star}>*</Text>
//             </Text>
//             <TextInput style={[styles.input, styles.textBox]} placeholder="Enter announcement" placeholderTextColor="#9AA1A7"  multiline={true} numberOfLines={4} />
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleSave}>
//             <Text style={styles.buttonText}>SAVE</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </View>
//     </KeyboardAvoidingView>
//   );
// };

// const { height } = Dimensions.get("window");
// const { width } = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     height: 250,
//     backgroundColor: colors.background,
//     paddingHorizontal: 20,
//     justifyContent: "center",

//   },
//   headerText: {
//     color: "#FFFFFF",
//     fontSize: 28,
//     fontWeight: "bold",
//   },
//   addEventForm: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     position: "absolute",
//     top: 250,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   formContent: {
//     paddingBottom: 20,
//   },
//   star: {
//     color: "red",
//   },
//   label: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 10,
//     marginTop: 15,
//   },
//   input: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#FFFFFF",
//     padding: 16,
//     fontSize: 16,
//     borderRadius: 10,
//     elevation: 1,
//     borderWidth: 1,         
//     borderColor: "#ddd",   
//   },
//   textBox: {
//     height: 100, 
//     textAlignVertical: 'top', 
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   inputContainer: {
//     position: "relative",
//   },
//   locationIcon: {
//     position: "absolute",
//     right: 16,
//     top: "50%",
//     transform: [{ translateY: -10 }],
    
//   },
//   selectBox: {
//     fontSize: 16,
//   },
//   dropdown: {
//     top: 5,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#9AA1A7",
//     elevation: 3,
//     maxHeight: 200,
//     zIndex: 999,
//   },
//   dropdownItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   dropdownItemText: {
//     fontSize: 16,
//     color: "#555",
//   },
//   button: {
//     width: width * 0.8,
//     marginTop: 20,
//     alignSelf: 'center',
//     height: 50,
//     backgroundColor: '#7BA7A7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
// });

// export default AddEventScreen;



import React, { useEffect, useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Dimensions,ScrollView,StatusBar,KeyboardAvoidingView,Platform,Alert,} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from 'expo-document-picker';
import {addEvent, addEventApi} from '../../utils/Services/eventServices'
import { usersDetails } from "@/utils/Services/services";

const AddEventScreen = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    category: "",
    groupId: [],
    eventCost: "",
    eventNotes: "",
    announcement: "",
    document:""
  });
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  // const [selectedId,setSelectedId] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const[group,setGroup]=useState()
  const [permissionGranted, setPermissionGranted] = useState(false);
  const navigation=useNavigation()
  // Get all groups name for dropDown
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await usersDetails();
        setGroup(data?.groupInfo || []);
        setIsLoading(false);
      } catch (error) {
        // console.error(error);
        Alert.alert("Login Failed", error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);


  const handleConfirm = (date) => {
    const today=new Date()
    if (showStartPicker) {
      if(date < today) {
        Alert.alert("Invalid Date", "Start date cannot be earlier than today.");
        setShowStartPicker(false);
      }else{
        setFormData((prevState) => ({
          ...prevState,
          startDate: date, // Update startDate in formData
        }));
        setShowStartPicker(false);
      }
      // Ensure end date is after the start date
      if (new Date(formData.endDate) <= date) {
        setFormData((prevState) => ({
          ...prevState,
          endDate: new Date(date.getTime() + 60 * 60 * 1000), // Add 1 hour to start date
        }));
      }
    } else if (showEndPicker) {
      if (date > new Date(formData.startDate)) {
        setFormData((prevState) => ({
          ...prevState,
          endDate: date, // Update endDate in formData
        }));
        setShowEndPicker(false);
      } else {
        Alert.alert("Invalid Date", "End date must be later than start date.");
        setShowEndPicker(false);
      }
    }
  };

  // const handleSelectGroup = (group) => {
  //   setSelectedGroup(group);
  //   setIsGroupOpen(false); // Close the dropdown after selecting a group
  // };

  // const handleSelectGroup = (group) => {
  //   console.log(group.group_id)
  //   if (!selectedGroups.some((item) => item.group_id === group.group_id)) {
  //     setSelectedGroups([...selectedGroups, group]);
  //     // setSelectedId([...selectedId,group.group_id])
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       groupId: [...group.group_id], // Update endDate in formData
  //     }));
  //   }
  //   setIsGroupOpen(false);
  // };

  // const handleRemoveGroup = (groupId) => {
  //   setSelectedGroups(selectedGroups.filter((group) => group.group_id !== groupId));
  // };


  const handleSelectGroup = (group) => {
    if (!selectedGroups.some((item) => item.group_id === group.group_id)) {
      // Add the selected group
      const updatedGroups = [...selectedGroups, group];
      const updatedGroupIds = updatedGroups.map((g) => g.group_id);
      setSelectedGroups(updatedGroups);
      // console.log(updatedGroups,"groups")
      // console.log(updatedGroupIds,"updatedGroupIds")
      setFormData((prevState) => ({
        ...prevState,
        groupId: updatedGroupIds,
      }));
      setIsGroupOpen(false);
    }
  };
  
  const handleRemoveGroup = (groupId) => {
    // Remove the group from selectedGroups and groupId
    const updatedGroups = selectedGroups.filter((group) => group.group_id !== groupId);
    const updatedGroupIds = updatedGroups.map((g) => g.group_id);
  
    setSelectedGroups(updatedGroups);
    setFormData((prevState) => ({
      ...prevState,
      groupId: updatedGroupIds,
    }));
  };


  const uploadFileOnPressHandler = async () => {
    try {
      // Open document picker with PDF filter
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Restrict to only PDF files
      });

      if (documentResult.canceled === true) {
        console.log('User canceled file picker');
        // Alert.alert('User canceled file picker')
        Alert.alert('Please Select your document')
        return;
      }

      // Extract file details
      console.log(documentResult,"documentResult")
      const fileUri = documentResult.assets[0].uri;
      const fileName = documentResult.assets[0].name;

      if (fileUri) {
        console.log('Selected file URI:', fileUri);
        console.log('Selected file name:', fileName);
        Alert.alert("you Selected :",fileName)

        // Set the selected file
        setSelectedFile({ uri: fileUri, name: fileName });

        // Upload the file to the backend
        // await uploadFileToBackend(fileUri, fileName);
      }else{
        setSelectedFile(null);
      }
    } catch (err) {
      console.error('Error picking file', err);
      Alert.alert('Error', 'There was an issue selecting the PDF');
    }
  };


  const handleSave = async () => {
    setIsLoading(true);
  
    try {
      // Prepare the data for the API
      const eventDetails = {
        title: formData.eventName,
        start_time: formData.startDate.toISOString(),
        end_time: formData.endDate.toISOString(),
        location: formData.location,
        category: formData.category,
        group_id: formData.groupId,
        cost: formData.eventCost,
        event_notes: formData.eventNotes,
        description: formData.announcement,
        event_doc:formData.document
      };
  
      const formDataForApi = new FormData();
      for (const key in eventDetails) {
        formDataForApi.append(key, eventDetails[key]);
      }
  
      // Add the file if selected
      if (selectedFile) {
        formDataForApi.append('event_doc', {
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: 'application/pdf', // You can adjust the type if needed
        });
      }
      // console.log(formDataForApi,"formDataForApi")
  
      // Make the API call
      const response = await addEventApi(formDataForApi);
      
      console.log('response:', response);
      // Alert.alert('Success', 'Event added successfully!');
      // navigation.navigate('CalendarScreen');
    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to add event.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  console.log(formData,"formData")
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add New Event</Text>
      </View>

      {/* Fixed Form Container */}
      <View style={styles.addEventForm}>
        {/* Scrollable Input Fields */}
        <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.label}>
              Event Name <Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={styles.input}  placeholder="Enter event name" placeholderTextColor="#9AA1A7" value={formData.eventName}
            onChangeText={(value) => handleInputChange("eventName", value)} />
          </View>

          <View>
            <Text style={styles.label}>
              Start Date & Time<Text style={styles.star}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowStartPicker(true)}
              
            >
              <Text>{formData.startDate.toLocaleString()}</Text>
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
              <Text>{formData.endDate.toLocaleString()}</Text>
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
              <TextInput placeholder="Enter location" placeholderTextColor="#9AA1A7" style={styles.input}   value={formData.location}
            onChangeText={(value) => handleInputChange("location", value)}/>
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
            <TextInput style={[styles.input, styles.textBox]} placeholder="Enter category" placeholderTextColor="#9AA1A7"  multiline={true} numberOfLines={4}  value={formData.category}
            onChangeText={(value) => handleInputChange("category", value)}/>
          </View>

          {/* <View>
            <Text style={styles.label}>
              Group Name<Text style={styles.star}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setIsGroupOpen(!isGroupOpen)}
            >
              <Text style={[styles.selectBox, { fontSize: 16,color:'#9AA1A7' }]}>
                {selectedGroup || "Select"}
              </Text>
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
              <View style={styles.dropdown}>
                {group.map((item, index) => (
                  <TouchableOpacity
                    key={item.group_id}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectGroup(item.group_id)}
                  >
                    <Text style={styles.dropdownItemText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View> */}

<View>
              <Text style={styles.label}>
                Group Name<Text style={styles.star}>*</Text>
              </Text>

              {/* Selected Groups Display */}
              {/* <View style={styles.selectedGroupsContainer}>
                {selectedGroups.map((group) => (
                  <View key={group.group_id} style={styles.selectedGroup}>
                    <Text style={styles.selectedGroupText}>{group.name}</Text>
                    <TouchableOpacity onPress={() => handleRemoveGroup(group.group_id)}>
                      <FontAwesome name="times" size={16} color="#FF0000" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View> */}

              {/* Dropdown for Group Selection */}
              <TouchableOpacity
                style={styles.input}
                onPress={() => setIsGroupOpen(!isGroupOpen)}
              >
                <Text style={[styles.selectBox, { fontSize: 16, color: "#9AA1A7" }]}>
                  {selectedGroups.length === 0 ? "Select Groups" :
                selectedGroups.map((group) => (
                  <View key={group.group_id} style={styles.selectedGroup}>
                    <Text style={styles.selectedGroupText}>{group.name}</Text>
                    <TouchableOpacity onPress={() => handleRemoveGroup(group.group_id)}>
                      <FontAwesome name="times" size={16} color="#555" />
                    </TouchableOpacity>
                  </View>
                ))
              }
                </Text>
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
                <View style={styles.dropdown}>
                  {group.map((item) => (
                    <TouchableOpacity
                      key={item.group_id}
                      style={styles.dropdownItem}
                      onPress={() => handleSelectGroup(item)}
                    >
                      <Text style={styles.dropdownItemText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>


          <View>
            <Text style={styles.label}>
              Event Cost <Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={styles.input}  placeholder="Enter event cost" placeholderTextColor="#9AA1A7"  value={formData.eventCost}
            onChangeText={(value) => handleInputChange("eventCost", value)}/>
          </View>

            <View>
            <Text style={styles.label}>Add Document</Text>
          <TouchableOpacity style={styles.input} onPress={uploadFileOnPressHandler}>
            <Text style={{fontSize:16,color:'#9AA1A7'}}>{selectedFile ? selectedFile.name :"Document.pdf"}</Text>
            <FontAwesome
                name="paperclip"
                size={22}
                color="#555"
                style={styles.icon}
              />
            
          </TouchableOpacity>
            </View> 

          <View>
            <Text style={styles.label}>
              Event Notes <Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={[styles.input, styles.textBox]}  placeholder="Enter event notes" placeholderTextColor="#9AA1A7" multiline={true} numberOfLines={4} value={formData.eventNotes} onChangeText={(value) => handleInputChange("eventNotes", value)}/>
          </View>

          <View>
            <Text style={styles.label}>
              Announcement<Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={[styles.input, styles.textBox]} placeholder="Enter announcement" placeholderTextColor="#9AA1A7"  multiline={true} numberOfLines={4} value={formData.announcement}  onChangeText={(value) => handleInputChange("announcement", value)}/>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get("window");
const { width } = Dimensions.get('window');
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
    textAlignVertical: 'top', 
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
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#7BA7A7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selectedGroup:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    backgroundColor: "#D9E7EC",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedGroupText:{
    fontSize: 12,
    color: "#555",
    marginRight: 5,
  }

});

export default AddEventScreen;

