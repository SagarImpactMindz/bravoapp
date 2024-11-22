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
// import { FontAwesome } from '@expo/vector-icons';


// const { height } = Dimensions.get('window');
// const ViewProfilePicComponent = ({visible,setViewProfilePic,userProfilePic}) => {
//   return (
//     <Modal
//     animationType="slide"
//     transparent={true}
//     visible={visible}
//     onRequestClose={() => setViewProfilePic(false)}
//   >
//     <TouchableWithoutFeedback onPress={() => setViewProfilePic(false)}>
//       {/* Apply the TouchableWithoutFeedback only to the overlay */}
//       <View style={styles.overlay}>
//         <View
//           style={styles.container}
//           onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
//         >
//         <View style={styles.previewContainer}>
//         <View style={styles.titleContainer}>
//                 <TouchableOpacity style={styles.crossCont} onPress={()=>setViewProfilePic(false)}>
//                     <FontAwesome name='times' size={15}/>
//                 </TouchableOpacity>
//             </View>
//         <View style={styles.ImageContainer}>
//               <Image
//                 source={{uri : userProfilePic}}
//                 style={styles.avatar}
//               />
//             </View>
//             </View>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   </Modal>
// );
// };
// const styles = StyleSheet.create({
//     overlay: {
//       flex: 1,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     container: {
//       width: '90%', // Adjust as needed
//       maxHeight: height * 0.8,
//     },
//     previewContainer: {
//       position: 'relative', // Enables absolute positioning for child elements
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     titleContainer: {
//       position: 'absolute', // Ensure the cross is positioned relative to the image container
//       top: 0, // Adjust the distance from the top
//       right: 0, // Adjust the distance from the right
//       padding: 7,
//       borderRadius: 15,
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1, // Ensure it stays on top of the image
//     },
//     crossCont: {
//       width: 24,
//       height: 24,
//       borderRadius: 12,
//       borderWidth: 1,
//       borderColor: 'black',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'white', // Optional: make it visually distinct
//     },
//     ImageContainer: {
//       width: '100%',
//       height: 300,
//       justifyContent: 'center',
//       alignItems: 'center',
//       position: 'relative', // Ensure the titleContainer is positioned relative to this
//     },
//     avatar: {
//       width: '100%',
//       height: '100%',
//       borderRadius: 10,
//     },
//   });
  
// export default ViewProfilePicComponent;


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
import { FontAwesome } from '@expo/vector-icons';


const { height } = Dimensions.get('window');
const ViewProfilePicComponent = ({visible,onClose,userProfilePic}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={() => onClose()}>
      {/* Apply the TouchableWithoutFeedback only to the overlay */}
      <View style={styles.overlay}>
        <View
          style={styles.container}
          onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
        >
        <View style={styles.previewContainer}>
        <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.crossCont} onPress={()=>onClose()}>
                    <FontAwesome name='times' size={15}/>
                </TouchableOpacity>
            </View>
        <View style={styles.ImageContainer}>
              <Image
                source={{uri : userProfilePic}}
                style={styles.avatar}
              />
            </View>
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '90%', // Adjust as needed
      maxHeight: height * 0.8,
    },
    previewContainer: {
      position: 'relative', // Enables absolute positioning for child elements
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      position: 'absolute', // Ensure the cross is positioned relative to the image container
      top: 0, // Adjust the distance from the top
      right: 0, // Adjust the distance from the right
      padding: 7,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1, // Ensure it stays on top of the image
    },
    crossCont: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white', // Optional: make it visually distinct
    },
    ImageContainer: {
      width: '100%',
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative', // Ensure the titleContainer is positioned relative to this
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
  });
  
export default ViewProfilePicComponent;


