import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const { height } = Dimensions.get('window');

const TeacherInfoComponent = ({ visible, onClose }) => {
  const navigation=useNavigation()
  const handleOptionPress=(option)=>{

    switch(option){
      case 'Teacher List':
        return navigation.navigate('TeacherList')
      case 'Student List':
        return navigation.navigate('StudentsList')
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.background} onPress={onClose} />
        <View style={styles.container} onStartShouldSetResponder={(e) => e.stopPropagation()}>
          <View style={styles.dragIndicator} />
          <ScrollView contentContainerStyle={styles.optionsContainer}>
            {[
              'Teacher List',
              'Student List',
              'Edit',
              'Delete',
            ].map((option, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={()=>{handleOptionPress(option),onClose()}}>
                <Text style={styles.optionText}>{option}</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
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
    height: height * 0.4,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  optionsContainer: {
    paddingBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#B0B0B0',
  },
});

export default TeacherInfoComponent;
