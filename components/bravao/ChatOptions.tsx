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
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const { height } = Dimensions.get('window');

const ChatOptions = ({ visible, onClose }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  // Function to pick multiple images
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Enable multiple selection
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages(result.selected);
    }
  };

  // Function to pick a single image
  const pickSingleImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Disable multiple selection
      quality: 1,
    });
   
    if (!result.canceled) {
      setSelectedImages([result]);
    }
  };

  // Function to pick a document
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // Allows all types of documents
    });
    console.log(result,"result")
    if (result.type !== 'cancel') {
      setSelectedDocuments((prevDocs) => [...prevDocs, result]);
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
            onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
          >
            <View style={styles.grid}>
              <TouchableOpacity
                style={styles.option}
                onPress={pickImages} // Select a single image
              >
                <FontAwesome name="image" size={30} color="#333" />
                <Text style={styles.optionText}>Image</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.option}
                onPress={pickImages} // Select multiple images
              >
                <FontAwesome name="image" size={30} color="#333" />
                <Text style={styles.optionText}>Multiple Images</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.option}
                onPress={pickDocument} // Select a document
              >
                <FontAwesome name="file" size={30} color="#333" />
                <Text style={styles.optionText}>Document</Text>
              </TouchableOpacity>
            </View>

            {selectedImages.length > 0 && (
              <View style={styles.selectedImagesContainer}>
                <Text style={styles.selectedImagesText}>Selected Images:</Text>
                <View style={styles.imagesGrid}>
                  {selectedImages.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image.uri }}
                      style={styles.selectedImage}
                    />
                  ))}
                </View>
              </View>
            )}

            {selectedDocuments.length > 0 && (
              <View style={styles.selectedImagesContainer}>
                <Text style={styles.selectedImagesText}>Selected Documents:</Text>
                {selectedDocuments.map((doc, index) => (
                  <Text key={index} style={styles.selectedImagesText}>
                    {doc.name}
                  </Text>
                ))}
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
    // borderRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    paddingVertical: 30,
    maxHeight: height * 0.7,
  },
  grid: {
    flexDirection: 'row',
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


// import { FontAwesome } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Dimensions,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';

// const { height } = Dimensions.get('window');

// const ChatOptions = ({ visible, onClose }) => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [selectedDocuments, setSelectedDocuments] = useState([]);

//   // Function to pick multiple images
//   const pickImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImages(result.selected);
//     }
//   };

//   // Function to pick a single image
//   const pickSingleImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: false,
//       quality: 1,
//     });
   
//     if (!result.canceled) {
//       setSelectedImages([result]);
//     }
//   };

//   // Function to pick a document
//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: '*/*',
//     });
//     console.log(result,"result")
//     if (result.type !== 'cancel') {
//       setSelectedDocuments((prevDocs) => [...prevDocs, result]);
//     }
//   };

//   // Function to handle sending files
//   const handleSend = () => {
//     // Logic to handle sending selected images and documents
//     console.log('Sending files:', selectedImages, selectedDocuments);
//     // Clear selections after sending
//     setSelectedImages([]);
//     setSelectedDocuments([]);
//     onClose(); // Close modal after sending
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.overlay}>
//           <View
//             style={styles.container}
//             onStartShouldSetResponder={(e) => e.stopPropagation()}
//           >
//             <View style={styles.grid}>
//               <TouchableOpacity
//                 style={styles.option}
//                 onPress={pickSingleImage}
//               >
//                 <FontAwesome name="image" size={30} color="#333" />
//                 <Text style={styles.optionText}>Image</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.option}
//                 onPress={pickDocument}
//               >
//                 <FontAwesome name="file" size={30} color="#333" />
//                 <Text style={styles.optionText}>Document</Text>
//               </TouchableOpacity>
//             </View>

//             {selectedImages.length > 0 && (
//               <View style={styles.selectedImagesContainer}>
//                 <Text style={styles.selectedImagesText}>Selected Images:</Text>
//                 <View style={styles.imagesGrid}>
//                   {selectedImages.map((image, index) => (
//                     <Image
//                       key={index}
//                       source={{ uri: image.uri }}
//                       style={styles.selectedImage}
//                     />
//                   ))}
//                 </View>
//               </View>
//             )}

//             {selectedDocuments.length > 0 && (
//               <View style={styles.selectedImagesContainer}>
//                 <Text style={styles.selectedImagesText}>Selected Documents:</Text>
//                 {selectedDocuments.map((doc, index) => (
//                   <Text key={index} style={styles.selectedImagesText}>
//                     {doc.name}
//                   </Text>
//                 ))}
//               </View>
//             )}

//             {(selectedImages.length > 0 || selectedDocuments.length > 0) && (
//               <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//                 <Text style={styles.sendButtonText}>Send</Text>
//               </TouchableOpacity>
//             )}
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
//     paddingVertical: 30,
//     maxHeight: height * 0.7,
//   },
//   grid: {
//     flexDirection: 'row',
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
//   selectedImagesContainer: {
//     marginTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0',
//     paddingTop: 10,
//   },
//   selectedImagesText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//   },
//   imagesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-evenly',
//   },
//   selectedImage: {
//     width: 80,
//     height: 80,
//     margin: 5,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   sendButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ChatOptions;
