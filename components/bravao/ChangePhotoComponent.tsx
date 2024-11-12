// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Modal,
//   Dimensions,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const { height } = Dimensions.get('window');

// const ChangePhotoComponent = ({ visible, setChangeProfile }) => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission to access the media library is required!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setSelectedImage(result.uri);
//     }
//   };

//   const saveChanges = () => {
//     Alert.alert("Profile photo updated successfully!");
//     setChangeProfile(false);
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={() => setChangeProfile(false)}
//     >
//     {/* <TouchableWithoutFeedback onPress={() => setChangeProfile(false)}> */}
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>Change Photo</Text>
//             <Text style={styles.subtitle}>
//               Upload a new photo below to change your avatar seen by others.
//             </Text>
//           </View>

//           <View style={styles.avatarContainer}>
//             <Image
//               source={
//                 selectedImage
//                   ? { uri: selectedImage }
//                   : { uri: 'https://via.placeholder.com/100' }
//               }
//               style={styles.avatar}
//             />
//           </View>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
//               <Text style={styles.uploadButtonText}>Upload Image</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
//               <Text style={styles.saveButtonText}>Save Changes</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       {/* </TouchableWithoutFeedback> */}
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   container: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 20,
//     maxHeight: height * 0.7,
//   },
//   titleContainer: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '500',
//     marginBottom: 8,
//     color: '#333',
//     // textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#666',
//     // textAlign: 'center',
//   },
//   avatarContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: '#ddd',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   uploadButton: {
//     backgroundColor: '#F1F4F8',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 8,
//   },
//   uploadButtonText: {
//     color: '#333',
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: '#343745',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 8,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default ChangePhotoComponent;


import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { height } = Dimensions.get('window');

const ChangePhotoComponent = ({ visible, setChangeProfile }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const saveChanges = () => {
    Alert.alert("Profile photo updated successfully!");
    setChangeProfile(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setChangeProfile(false)}
    >
      <TouchableWithoutFeedback onPress={() => setChangeProfile(false)}>
        {/* Apply the TouchableWithoutFeedback only to the overlay */}
        <View style={styles.overlay}>
          <View
            style={styles.container}
            onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Change Photo</Text>
              <Text style={styles.subtitle}>
                Upload a new photo below to change your avatar seen by others.
              </Text>
            </View>

            <View style={styles.avatarContainer}>
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : { uri: 'https://via.placeholder.com/100' }
                }
                style={styles.avatar}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: height * 0.7,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  uploadButton: {
    backgroundColor: '#F1F4F8',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#343745',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChangePhotoComponent;
