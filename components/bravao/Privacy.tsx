// import { View, Text, StyleSheet, ScrollView } from 'react-native'
// import React from 'react'

// const Privacy = () => {
//   return (
//     <View style={styles.container}>
//             <View style={styles.sheetHeader}>
//               <Text style={styles.sheetHeaderText}>Privacy</Text>
//             </View>
//             <ScrollView>
//             <View style={styles.contentContainer}>

//             <Text style={styles.content}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
//               standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book.
//             </Text>
//             </View></ScrollView>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//     container: {
//       backgroundColor:'#fff',
//       // flex: 1,
//       // justifyContent: 'center',
//       // alignItems: 'center',
//       paddingHorizontal:20,
//       paddingVertical:30,
//       paddingTop:15,
//       borderTopRightRadius:15,
//       borderTopLeftRadius:15,
//       height:'40%',
//       minHeight:'40%',
//     },
//     sheetHeader: {
//       width:'100%',
//       borderTopWidth: 1,
//       borderColor: '#ddd',
//       borderBottomWidth: 1,
//       paddingVertical: 10,
//       marginBottom: 10,
//       alignItems:'center',
//       justifyContent:'center',
//     },
//     sheetHeaderText: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: '#333',
//     },
//     contentContainer:{
//       justifyContent:'center',
//       alignItems:'center',
//       paddingVertical:10
//     },
//     content: {
//       fontSize: 16,
//       color: '#666',
//       textAlign:'left'
//     },
//   });

// export default Privacy


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

const Privacy = ({ visible, onClose,setShowPrivacy }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <TouchableWithoutFeedback onPress={() => setShowPrivacy(false)}>
      <View style={styles.overlay}>
        <View style={styles.container }
        onStartShouldSetResponder={(e) => e.stopPropagation()} >

          <View style={styles.sheetHeader}>
            <Text style={styles.sheetHeaderText}>Privacy</Text>
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
    paddingHorizontal: 10,
  },
  content: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
  },
});

export default Privacy;
