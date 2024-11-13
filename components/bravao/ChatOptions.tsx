// import { FontAwesome } from '@expo/vector-icons';
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

// const ChatOptions = ({ visible, setShowChatOptions }) => {

//     const [selectedImage, setSelectedImage] = useState([]);

//     const pickImage = async () => {
//       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permissionResult.granted) {
//         Alert.alert("Permission to access the media library is required!");
//         return;
//       }
  
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//       });
  
//       if (!result.cancelled) {
//         setSelectedImage(result.uri);
//       }
//     };
  
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={() => setShowChatOptions(false)}
//     >
//       <TouchableWithoutFeedback onPress={() => setShowChatOptions(false)}>
//         {/* Apply the TouchableWithoutFeedback only to the overlay */}
//         <View style={styles.overlay}>
//           <View
//             style={styles.container}
//             onStartShouldSetResponder={(e) => e.stopPropagation()} 
//           >
//       <View style={styles.grid}>
//               {/* Camera Option */}
//               <TouchableOpacity
//                 style={styles.option}>
//                 <FontAwesome name="camera" size={30} color="#333" />
//                 <Text style={styles.optionText}>Camera</Text>
//               </TouchableOpacity>

//               {/* Image Option */}
//               <TouchableOpacity
//                 style={styles.option} onPress={()=>pickImage()}>
//                 <FontAwesome name="image" size={30} color="#333" />
//                 <Text style={styles.optionText}>Image</Text>
//               </TouchableOpacity>

//               {/* Document Option */}
//               <TouchableOpacity
//                 style={styles.option} >
//                 <FontAwesome name="file" size={30} color="#333" />
//                 <Text style={styles.optionText}>Document</Text>
//               </TouchableOpacity>

//               {/* Location Option */}
//               <TouchableOpacity
//                 style={styles.option}>
//                 <FontAwesome name="location-arrow" size={30} color="#333" />
//                 <Text style={styles.optionText}>Location</Text>
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
//     paddingVertical:30,
//     maxHeight: height * 0.7,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   option: {
//     width: '40%',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: '#F9F9F9',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   optionText: {
//     marginTop: 5,
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default ChatOptions;

import { FontAwesome } from '@expo/vector-icons';
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

const ChatOptions = ({ visible, setShowChatOptions }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      multiple: true, // Allow selecting multiple images
    });
    console.log(result,"result")
    if (!result.cancelled && result.uri) {
        setSelectedImages((prevImages) => [...prevImages, result.uri]);
      } else {
        Alert.alert("No image selected");
      }
  };

  const renderSelectedImages = () => {
    return selectedImages.map((image, index) => (
    //   <Image
    //     key={index}
    //     source={{ uri: image[index].uri }}
    //     style={styles.selectedImage}
    //   />
    console.log(image[index],"image")
    
    ));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setShowChatOptions(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowChatOptions(false)}>
        <View style={styles.overlay}>
          <View
            style={styles.container}
            onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
          >
            <View style={styles.grid}>
              {/* Camera Option */}
              <TouchableOpacity
                style={styles.option}
              >
                <FontAwesome name="camera" size={30} color="#333" />
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>

              {/* Image Option */}
              <TouchableOpacity
                style={styles.option}
                onPress={pickImage}
              >
                <FontAwesome name="image" size={30} color="#333" />
                <Text style={styles.optionText}>Image</Text>
              </TouchableOpacity>

              {/* Document Option */}
              <TouchableOpacity
                style={styles.option}
              >
                <FontAwesome name="file" size={30} color="#333" />
                <Text style={styles.optionText}>Document</Text>
              </TouchableOpacity>

              {/* Location Option */}
              <TouchableOpacity
                style={styles.option}
              >
                <FontAwesome name="location-arrow" size={30} color="#333" />
                <Text style={styles.optionText}>Location</Text>
              </TouchableOpacity>
            </View>

            {/* Render selected images */}
            {selectedImages.length > 0 && (
              <View style={styles.selectedImagesContainer}>
                <Text style={styles.selectedImagesText}>Selected Images:</Text>
                <View style={styles.imagesGrid}>
                  {renderSelectedImages()}
                </View>
              </View>
            )}
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
    paddingVertical: 30,
    maxHeight: height * 0.7,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  option: {
    width: '40%',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  selectedImagesContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  selectedImagesText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  selectedImage: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default ChatOptions;





// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Dimensions,
//   TouchableWithoutFeedback,
//   Alert,
// } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';
// import * as Location from 'expo-location';
// import { Camera } from 'expo-camera';

// const { height } = Dimensions.get('window');

// const ChatOptions = ({ visible, setShowChatOptions }) => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

//   const handleOptionPress = async (option) => {
//     switch (option) {
//       case 'Camera':
//         await openCamera();
//         break;
//       case 'Image':
//         await selectImage();
//         break;
//       case 'Document':
//         await selectDocument();
//         break;
//       case 'Location':
//         await sendLocation();
//         break;
//       default:
//         console.log('Invalid option');
//     }
//     setShowChatOptions(false); // Close the options after an action
//   };

//   const openCamera = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status === 'granted') {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         cameraType,
//       });
//       if (!result.cancelled) {
//         console.log('Camera result:', result.uri);
//         Alert.alert('Camera Result', `Image taken at ${result.uri}`);
//       }
//     } else {
//       Alert.alert('Camera Permission', 'Camera permission is required.');
//     }
//   };

//   const selectImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status === 'granted') {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//       });
//       if (!result.cancelled) {
//         console.log('Image selected:', result.uri);
//         Alert.alert('Image Selected', `Image path: ${result.uri}`);
//       }
//     } else {
//       Alert.alert('Image Permission', 'Permission to access the image library is required.');
//     }
//   };

//   const selectDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: '*/*', // Can specify document types here
//     });
//     if (result.type === 'success') {
//       console.log('Document selected:', result.uri);
//       Alert.alert('Document Selected', `Document path: ${result.uri}`);
//     } else {
//       Alert.alert('Document Selection', 'No document selected or operation was canceled.');
//     }
//   };

//   const sendLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status === 'granted') {
//       const location = await Location.getCurrentPositionAsync({});
//       console.log('Location:', location.coords);
//       Alert.alert(
//         'Current Location',
//         `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
//       );
//     } else {
//       Alert.alert('Location Permission', 'Location permission is required.');
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={() => setShowChatOptions(false)}
//     >
//       <TouchableWithoutFeedback onPress={() => setShowChatOptions(false)}>
//         <View style={styles.overlay}>
//           <View
//             style={styles.container}
//             onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
//           >
//             <View style={styles.grid}>
//               {/* Camera Option */}
//               <TouchableOpacity
//                 style={styles.option}
//                 onPress={() => handleOptionPress('Camera')}
//               >
//                 <FontAwesome name="camera" size={30} color="#333" />
//                 <Text style={styles.optionText}>Camera</Text>
//               </TouchableOpacity>

//               {/* Image Option */}
//               <TouchableOpacity
//                 style={styles.option}
//                 onPress={() => handleOptionPress('Image')}
//               >
//                 <FontAwesome name="image" size={30} color="#333" />
//                 <Text style={styles.optionText}>Image</Text>
//               </TouchableOpacity>

//               {/* Document Option */}
//               <TouchableOpacity
//                 style={styles.option}
//                 onPress={() => handleOptionPress('Document')}
//               >
//                 <FontAwesome name="file" size={30} color="#333" />
//                 <Text style={styles.optionText}>Document</Text>
//               </TouchableOpacity>

//               {/* Location Option */}
//               <TouchableOpacity
//                 style={styles.option}
//                 onPress={() => handleOptionPress('Location')}
//               >
//                 <FontAwesome name="location-arrow" size={30} color="#333" />
//                 <Text style={styles.optionText}>Location</Text>
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
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 20,
//     maxHeight: height * 0.7,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   option: {
//     width: '40%',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: '#F9F9F9',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   optionText: {
//     marginTop: 5,
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default ChatOptions;
