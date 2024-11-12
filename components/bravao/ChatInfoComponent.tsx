import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';

const { height } = Dimensions.get('window');

const ChatInfoComponent = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.background} onPress={onClose} />
        <View style={styles.container}>
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
              <TouchableOpacity key={index} style={styles.option}>
                <Text style={styles.optionText}>{option}</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
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
