// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Hello.</Text>
//     </View>
//   );
// }

// main
import { Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import HomeGroupChatScreen from "./HomeGroupChatScreen";
import NotificationScreen from "./NotificationScreen";
import AddEventScreen from "./AddEventScreen";
import ViewEventScreen from "./ViewEventScreen";
import EditEventScreen from "./EditEventScreen";
import MyProfileScreen from "./MyProfileScreen";
import CalendarScreen from "./CalendarScreen";
import GroupMembersScreen from "./GroupMembersScreen";

export default function Index() {
  return (
    <LoginScreen/>
    // <HomeGroupChatScreen/>
    // <NotificationScreen/>
    // <AddEventScreen/>
    // <ViewEventScreen/>
    // <EditEventScreen/>
    // <MyProfileScreen/>
    // <CalendarScreen/>
    // <GroupMembersScreen/>
  );
}

// import { Text, View } from "react-native";
// import TabLayout from "./(tabs)/_layout";
// import LoginScreen from "./LoginScreen";

// export default function Index() {
//   // You can handle your logic to decide whether to show LoginScreen or the tabs.
//   const isLoggedIn = true; // Replace this with your actual login state or condition

//   return (
//     <View style={{ flex: 1 }}>
//       {isLoggedIn ? <TabLayout /> : <LoginScreen />}
//     </View>
//   );
// }
