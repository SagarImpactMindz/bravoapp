import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const FullScreenOverlay = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const openOverlay = () => setOverlayVisible(true);
  const closeOverlay = () => setOverlayVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openOverlay} style={styles.openButton}>
        <Text style={styles.buttonText}>Open Overlay</Text>
      </TouchableOpacity>

      <Modal
        visible={isOverlayVisible}
        transparent
        animationType="fade"
        onRequestClose={closeOverlay}
        statusBarTranslucent={true}  // Ensures overlay extends to the status bar
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayBackground} onPress={closeOverlay} />
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>This is your full-screen component</Text>
            <TouchableOpacity onPress={closeOverlay} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  openButton: {
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
});

export default FullScreenOverlay;
