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
  Alert,
} from 'react-native';

const { height } = Dimensions.get('window');

const ChatInfoComponent = ({ visible, onClose,participants }) => {
  console.log(participants)
  const group=true
  const navigation=useNavigation()
  const handleOptionPress = (option) => {
    switch (option) {
      case "Contact info":
        // navigation.navigate('UserProfile');
        Alert.alert("contact info");
        break;
      case "Block":
        // Handle blocking functionality here
        Alert.alert("Block");
        break;
      case "Mute notification":
        Alert.alert("Mute notification");
        // Handle muting notifications here
        break;
      case "Clear chat":
        Alert.alert("Clear chat");
        break;
      case "Report":
        Alert.alert("Report");
        break;
      case "Close chat":
        Alert.alert("Close chat");
        break;
      case "Delete chat":
        Alert.alert("Delete chat");
        break;
      default:
        break;
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
        <TouchableOpacity style={styles.background} onPress={onClose} />
        <View style={styles.container} onStartShouldSetResponder={(e) => e.stopPropagation()}>
          <View style={styles.dragIndicator} />
          <ScrollView contentContainerStyle={styles.optionsContainer}>
            {[
              'Contact info',
              'Select message',
              'Block',
              'Mute notification',
              'Clear chat',
              'Report',
              'Close chat',
              'Delete chat',
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
    height: height * 0.5,
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

export default ChatInfoComponent;
