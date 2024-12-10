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
// import { userProfileUpdate } from '@/utils/Services/services';


// const { height } = Dimensions.get('window');

// const ChangePhotoComponent = ({ visible, setChangeProfile,userProfilePic,updateProfilePic  }) => {
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
//       // aspect: [1, 1],
//       quality: 1,
//     });
//     // console.log(result,"result")
//     // console.log(result.assets[0].uri,"result")
//     if (!result.assets[0].cancelled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

  
//   const saveChanges = async () => {
//     if (!selectedImage) {
//       Alert.alert("Please select an image to upload.");
//       return;
//     }
  
//     // Infer the MIME type from the file extension
//     const getMimeType = (uri) => {
//       const extension = uri.split(".").pop().toLowerCase(); // Extract file extension
//       const mimeTypes = {
//         jpg: "image/jpeg",
//         jpeg: "image/jpeg",
//         png: "image/png",
//         gif: "image/gif",
//         // bmp: "image/bmp",
//         // webp: "image/webp",
//       };
//       return mimeTypes[extension] || "image/jpeg"; // Default to 'image/jpeg'
//     };
  
//     const fileType = getMimeType(selectedImage);
  
//     const formData = new FormData();
//     formData.append("profile_picture", {
//       uri: selectedImage,
//       type: fileType, // Use the inferred MIME type
//       name: `profile_picture.${fileType.split("/")[1]}`, // Ensure the correct file extension
//     });
  
//     try {
//       const response = await userProfileUpdate(formData);
//       console.log(response);
//       Alert.alert(`${response.message}`);
//       updateProfilePic(selectedImage);
//       setChangeProfile(false);
//     } catch (error) {
//       // console.error("Error uploading profile picture:", error);
//       // console.log(error.response.data.error)
//       Alert.alert("Failed to update profile picture",error.response.data.error);
//     }
//   };
  
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={() => setChangeProfile(false)}
//     >
//       <TouchableWithoutFeedback onPress={() => setChangeProfile(false)}>
//         {/* Apply the TouchableWithoutFeedback only to the overlay */}
//         <View style={styles.overlay}>
//           <View
//             style={styles.container}
//             onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
//           >
//             <View style={styles.titleContainer}>
//               <Text style={styles.title}>Change Photo</Text>
//               <Text style={styles.subtitle}>
//                 Upload a new photo below to change your avatar seen by others.
//               </Text>
//             </View>

//             <View style={styles.avatarContainer}>
//               <Image
//                 source={
//                   selectedImage
//                     ? { uri: selectedImage }
//                     : { uri: userProfilePic }
//                 }
//                 style={styles.avatar}
//               />
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
//                 <Text style={styles.uploadButtonText}>Upload Image</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
//                 <Text style={styles.saveButtonText}>Save Changes</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
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
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#666',
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
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { userProfileUpdate } from '@/utils/Services/services';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

const ChangePhotoComponent = ({ visible, onClose, userProfilePic, updateProfilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter()

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.assets[0].cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const saveChanges = async () => {
    if (!selectedImage) {
      Alert.alert('Please select an image to upload.');
      return;
    }

    const getMimeType = (uri) => {
      const extension = uri.split('.').pop().toLowerCase();
      const mimeTypes = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
      };
      return mimeTypes[extension] || 'image/jpeg';
    };

    const fileType = getMimeType(selectedImage);

    const formData = new FormData();
    formData.append('profile_picture', {
      uri: selectedImage,
      type: fileType,
      name: `profile_picture.${fileType.split('/')[1]}`,
    });

    try {
      setIsLoading(true);
      const response = await userProfileUpdate(formData);
      if (response.isSuccess) {
        Alert.alert(`${response.message}`);
        updateProfilePic(selectedImage);
        onClose();
      }
    } catch (error) {
      Alert.alert('Failed to update profile picture', error.response?.data?.error || 'An error occurred');
      if (error.response && error.response.status === 401) {
        // Token expired, navigate to login screen
        router.replace('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View
            style={styles.container}
            onStartShouldSetResponder={(e) => e.stopPropagation()}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Change Photo</Text>
              <Text style={styles.subtitle}>
                Upload a new photo below to change your avatar seen by others.
              </Text>
            </View>

            <View style={styles.avatarContainer}>
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )}
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : { uri: userProfilePic }
                }
                style={[styles.avatar, isLoading && styles.avatarBlur]}
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
    // borderRadius: 20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
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
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  avatarBlur: {
    opacity: 0.5,
  },
  loadingOverlay: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
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
