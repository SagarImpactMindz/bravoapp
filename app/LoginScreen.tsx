import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import the icon library
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const LoginScreen = () => {
  const [code, setCode] = useState('');

  const handleSignIn = async () => {
    // Uncomment and modify the following code to enable login functionality
    try {
      // Sending login request
      const response = await fetch('https://impactmindz.in/client/artie/bravo/ci_back_end/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth_code: code }), // Send auth code as JSON
      });

      const data = await response.json();

      if (data.isSuccess) {
        // Store the token and user info in AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user_info));
        Alert.alert('Login Successful', data.message);
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#343745" barStyle="light-content" />
      <View style={styles.upperSection} >
      <Image 
          source={require('../assets/images/SigninImg.png')} // Replace with your image path
          style={styles.image} 
          resizeMode="cover" // Adjust to 'contain', 'cover', 'stretch', etc. as needed
        />
      </View>
      <View style={styles.lowerSection}>
        <Text style={styles.label}>Unique Code:</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="Enter your code"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
          <FontAwesome name="arrow-circle-o-right" size={30} color="#fff" style={styles.icon} />
          {/* <Ionicons name="arrow-circle-o-right" size={20} color="#fff" style={styles.icon} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343745',
  },
  upperSection: {
    flex: 2,
    backgroundColor: '#343745',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120, 
    height: 120
  },
  lowerSection: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    color: '#000',
    fontWeight:'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 60,
    fontSize:20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    width: width * 0.8,
    height: 60,
    backgroundColor: '#7BA7A7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10
  },
});

export default LoginScreen;


// ,
//   upperSection: {
//     flex: 2,
//     backgroundColor: '#3D4151',
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%', // Adjust width as needed
//     height: '100%', // Adjust height as needed
//     borderRadius: 20, // Optional, to match section's rounded corners
//   },