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
import { FontAwesome } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const DeleteComponent = ({ visible, setShowDeletePopUp }) => {
  const [selectedImage, setSelectedImage] = useState(null);


  const handleDelete = () => {
    Alert.alert("Delete event successfully!");
    setShowDeletePopUp(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setShowDeletePopUp(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowDeletePopUp(false)}>
        {/* Apply the TouchableWithoutFeedback only to the overlay */}
        <View style={styles.overlay}>
          <View
            style={styles.container}
            onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
          >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Delete Event</Text>
                <TouchableOpacity style={styles.crossCont} onPress={()=>setShowDeletePopUp(false)}>
                    <FontAwesome name='times' size={15}/>
                </TouchableOpacity>
            </View>
            <View style={styles.confirmContainer}>
                <Text style={styles.confirmText}>Please confirm , you want to delete this event?</Text>
            </View>


            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button,{backgroundColor:'#F1F4F8',borderWidth:1,borderColor:'#54575A'}]} onPress={()=>setShowDeletePopUp(false)}>
                <Text style={styles.buttonText}>No, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,{backgroundColor:'#CDE1E6'}]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Yes, Delete</Text>
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
    paddingBottom:40,
    maxHeight: height * 0.7,
  },
  titleContainer: {
    marginBottom: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#CDE1E6',
    paddingHorizontal:20,
    paddingVertical:15,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    
  },
  crossCont:{
    width:24,
    height:24,
    borderRadius:12,
    borderWidth:1,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center',
  },
  confirmContainer:{
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:80,
    paddingHorizontal:30
  },
  confirmText:{
    textAlign:'center',
    fontWeight:'500',
    fontSize:18
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical:10
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
 buttonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default DeleteComponent;


