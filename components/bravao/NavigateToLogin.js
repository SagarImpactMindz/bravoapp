import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';



const navigateToLogin = () => {
  // const navigation = useNavigation();
  // navigation.replace('/'); 
  const router = useRouter(); // Initialize the router
  router.replace('/LoginScreen')
};

export default navigateToLogin;
