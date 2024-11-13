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
  Button,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const EditDeleteEventComponent = ({ visible, setShowEdit,setShowDeletePopUp }) => {
 const navigation=useNavigation()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setShowEdit(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowEdit(false)}>
        {/* Apply the TouchableWithoutFeedback only to the overlay */}
        <View style={styles.overlay}>
          <View
            style={styles.container}
            onStartShouldSetResponder={(e) => e.stopPropagation()} // Prevent click propagation inside the modal content
          >
              <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('EditEventScreen'),setShowEdit(false)}}> 
              {/* <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('EditEventScreen',{ setShowEdit })}}> */}
              <FontAwesome5 name="pen" size={14} color="black" />
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,{backgroundColor:'#F1F4F8'}]} onPress={()=>{setShowDeletePopUp(true),setShowEdit(false)}}>
              <FontAwesome5 name="trash" size={14} color="black" />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,{backgroundColor:'white'}]} onPress={()=>setShowEdit(false)} >
              {/* <FontAwesome5 name="times" size={14} color="black" /> */}
                <Text style={[styles.buttonText,{marginLeft:0,color:'#778188'}]}>Cancel</Text>
              </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
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
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#CDE1E6',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginVertical:10
  },

  saveButton: {
    backgroundColor: '#343745',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 17,
    marginLeft:10
  },
});

export default EditDeleteEventComponent;


