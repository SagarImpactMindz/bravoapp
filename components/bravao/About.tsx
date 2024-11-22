// import React, { useState, useRef } from 'react';
// import { View, Text, ScrollView, Animated, Dimensions, StyleSheet } from 'react-native';

// const { height } = Dimensions.get('window');

// const About = () => {
//   const [visible, setVisible] = useState(false);
//   const slideAnim = useRef(new Animated.Value(height)).current; // Initially, position it off-screen at the bottom

//   const openBottomSheet = () => {
//     setVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: height * 0.4, // Adjust this value for how high you want it to go
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeBottomSheet = () => {
//     Animated.timing(slideAnim, {
//       toValue: height, // Move it back off-screen
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setVisible(false));
//   };

//   return (
//     <View style={styles.container}>
//             <View style={styles.sheetHeader}>
//               <Text style={styles.sheetHeaderText}>About</Text>
//             </View>
//             <ScrollView style={{flex:1}}>
//             <View style={styles.contentContainer}>
//             <Text style={styles.content}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//             </Text>
//             </View>
//             </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor:'#fff',
//     // flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     paddingHorizontal:15,
//     paddingTop:15,
//     borderTopRightRadius:15,
//     borderTopLeftRadius:15,
//     height:'40%',
//     minHeight:'40%',
//   },
//   sheetHeader: {
//     width:'100%',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     borderBottomWidth: 1,
//     paddingVertical: 10,
//     marginBottom: 10,
//     alignItems:'center',
//     justifyContent:'center',
//   },
//   sheetHeaderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   contentContainer:{
//     justifyContent:'center',
//     alignItems:'center',
//     paddingVertical:10
//   },
//   content: {
//     fontSize: 16,
//     color: '#666',
//     textAlign:'left'
//   },
// });

// export default About;


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const { height } = Dimensions.get('window');

const About = ({ visible, onClose,setShowAbout }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
       <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={styles.overlay}>
      <View
            style={styles.container}
            onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
          >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetHeaderText}>About</Text>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.content}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.
            </Text>
          </ScrollView>
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
  },
  background: {
    flex: 1,
  },
  container: {
    height: height * 0.5,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  sheetHeader: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  content: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
  },
});

export default About;
