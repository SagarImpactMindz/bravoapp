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
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as DocumentPicker from 'expo-document-picker';

const EditEventScreen = () => {
  // const route = useRoute();
  // // console.log(route)
  // const { setShowEdit } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([
    "UI/UX Flow",
    "Soccer",
    "Auto-Racing",
    "App",
    "Figma",
    "Designing",
    "UI/UX Flow",
    "Soccer",
    "Auto-Racing",
    "App",
    "Figma",
    "Designing",
    
  ]);
  const navigation=useNavigation()

  // Sample group names (can be fetched from an API or database)
  const groups = ["Group A", "Group B", "Group C", "Group D"];

  const handleConfirm = (date) => {
    if (showStartPicker) {
      setStartDate(date);
      setShowStartPicker(false);
    } else if (showEndPicker) {
      setEndDate(date);
      setShowEndPicker(false);
    }
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setIsGroupOpen(false); // Close the dropdown after selecting a group
  };


  const removeCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.filter((item) => item !== category)
    );
  };

  // useEffect(() => {
  //   if (setShowEdit) {
  //     setShowEdit(false);
  //   }
  // }, [setShowEdit]);

  const handleSave=()=>{
    Alert.alert("Event Updated Successfully")
    navigation.navigate('CalendarScreen')
  }

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


  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      
      {/* Fixed Header */}
      <View style={styles.header}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity style={styles.backIconContainer} onPress={()=>navigation.goBack()}>
            <FontAwesome5 name="angle-left" size={30} color="#fff" />
          </TouchableOpacity>
        <Text style={styles.headerText}>Edit Event</Text>
        </View>
      </View>

      {/* Fixed Form Container */}
      <View style={styles.addEventForm}>
        {/* Scrollable Input Fields */}
        <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.label}>
              Event Name <Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={styles.input}  placeholder="Enter event name" placeholderTextColor="#9AA1A7" value="xyz event"/>
          </View>

          <View>
            <Text style={styles.label}>
              Start Date & Time<Text style={styles.star}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowStartPicker(true)}
            >
              <Text>{startDate.toLocaleString()}</Text>
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
              <Text>{endDate.toLocaleString()}</Text>
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
              <TextInput placeholder="Enter location" placeholderTextColor="#9AA1A7" style={styles.input} value="Xyz"/>
              <FontAwesome
                name="map-marker"
                size={22}
                color="#555"
                style={styles.locationIcon}
              />
            </View>
          </View>

          {/* <View>
            <Text style={styles.label}>
              Category<Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={[styles.input, styles.textBox]} placeholder="Enter category" placeholderTextColor="#9AA1A7"  multiline={true} numberOfLines={4} />
          </View> */}


<View>
            <Text style={styles.label}>
              Category<Text style={styles.star}>*</Text>
            </Text>
            <View style={[styles.input,{flexDirection: "row",flexWrap: "wrap",}]}>
              {selectedCategories.map((category, index) => (
                <View key={index} style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{category}</Text>
                  <TouchableOpacity onPress={() => removeCategory(category)}>
                    <FontAwesome name="times" size={16} color="#555" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View>
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
                {groups.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectGroup(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View>
            <Text style={styles.label}>
              Event Cost <Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={styles.input}  placeholder="Enter event cost" placeholderTextColor="#9AA1A7" value="10$"/>
          </View>

            {/* <View>
            <Text style={styles.label}>Add Document</Text>
          <TouchableOpacity style={styles.input}>
            <Text style={{fontSize:16,color:'#9AA1A7'}}>Document.pdf</Text>
            <FontAwesome
                name="paperclip"
                size={22}
                color="#555"
                style={styles.icon}
              />
            
          </TouchableOpacity>
            </View>  */}
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
            <TextInput style={[styles.input, styles.textBox]}  placeholder="Enter event notes" placeholderTextColor="#9AA1A7" multiline={true} numberOfLines={4}/>
          </View>

          <View>
            <Text style={styles.label}>
              Announcement<Text style={styles.star}>*</Text>
            </Text>
            <TextInput style={[styles.input, styles.textBox]} placeholder="Enter announcement" placeholderTextColor="#9AA1A7"  multiline={true} numberOfLines={4} value="Announcemnet for Today"/>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave} >
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
  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft:10
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
  // categoryContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   marginVertical: 10,
  //   borderRadius: 10,
  // },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
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
});

export default EditEventScreen;

