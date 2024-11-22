import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '@/constants/Colors';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import {loginApi} from '../utils/Services/services'
import { useAuth } from '@/app/contexts/AuthContext';

const LoginScreen = () => {
  const [code, setCode] = useState('');
  const router = useRouter(); // Initialize the router
  const { setIsAuthenticated } = useAuth();

  const handleSignIn = async () => {
    try {
      const payload = { auth_code: code };
      const data = await loginApi(payload);
      if (data.isSuccess) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user_info));
        Alert.alert('Login Successful', data.message);
        setIsAuthenticated(true)
        router.push('/(tabs)/HomeGroupChatScreen');
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      Alert.alert('Login Failed',error.response.data.message);
    }
  };
  // const getTokenFromAsyncStorage=async()=>{
  //   const token=await AsyncStorage.getItem('userToken')
  //   console.log("saved token",token)
  // }
  // useEffect(()=>{
  //   getTokenFromAsyncStorage()
  // })

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.upperSection}>
        <Image 
          source={require('../assets/images/SigninImg.png')} 
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
          placeholderTextColor="#9AA1A7"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
          <FontAwesome name="arrow-circle-o-right" size={30} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  upperSection: {
    flex: 2,
    backgroundColor: colors.background,
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
