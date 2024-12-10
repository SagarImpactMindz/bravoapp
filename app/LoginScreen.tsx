import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, StatusBar, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors, loginConst } from '@/constants/Colors';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import {loginApi} from '../utils/Services/services'
import { useAuth } from '@/app/contexts/AuthContext';

const LoginScreen = () => {
  const { setIsAuthenticated } = useAuth();
  const [code, setCode] = useState('');
  const[isLoading,setIsLoading]=useState(false)
  const router = useRouter(); // Initialize the router


  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const payload = { auth_code: code };
      const data = await loginApi(payload);
      if (data.isSuccess) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user_info));
        Alert.alert('Login Successful', data.message);
        setIsAuthenticated(true)
        router.push('/(tabs)/HomeGroupChatScreen');
        setIsLoading(false)
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      Alert.alert('Login Failed',error.response.data.message);
      if (error.response && error.response.status === 401) {
        // Token expired, navigate to login screen
        router.replace('/');
      }
      setIsLoading(false)
    }finally{
      setIsLoading(false)
    }
  };


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
          editable={!isLoading}
        />
            <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]} // Add a disabled style
          onPress={handleSignIn}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" /> // Show loader when loading
          ) : (
            <>
              <Text style={styles.buttonText}>SIGN IN</Text>
              <FontAwesome name="arrow-circle-o-right" size={30} style={styles.icon} />
            </>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: loginConst.background,
  },
  upperSection: {
    flex: 2,
    backgroundColor: loginConst.background,
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
    backgroundColor: loginConst.contentBackground,
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
    backgroundColor: loginConst.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    color: loginConst.buttonText,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
    color:loginConst.buttonIconColor
  },
  buttonDisabled: {
    backgroundColor: '#ddd', // Grey out the button when disabled
  },
});

export default LoginScreen;
