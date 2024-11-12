
import { Redirect } from "expo-router";
import LoginScreen from "./LoginScreen";
import UserProfile from "./UserProfile";
import MyProfileScreen from "./(tabs)/MyProfileScreen";
import FullScreenOverlay from "@/components/bravao/FullScreenOverlay";
import ChatScreen from "./ChatScreen";


export default function Index() {
  return (
    <LoginScreen/>
    // <ChatScreen/>
    // <MyProfileScreen/>
    // <FullScreenOverlay/>
  );
}