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

const Privacy = ({ visible, onClose,setShowPrivacy,privacyPageContent }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={styles.overlay}>
        <View style={styles.container }
        onStartShouldSetResponder={(e) => e.stopPropagation()} >

          <View style={styles.sheetHeader}>
            <Text style={styles.sheetHeaderText}>Privacy</Text>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.content}>
              {privacyPageContent}
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

export default Privacy;

