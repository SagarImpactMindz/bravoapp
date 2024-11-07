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
import { Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import HomeGroupChatScreen from "./HomeGroupChatScreen";
import NotificationScreen from "./NotificationScreen";
import AddEventScreen from "./AddEventScreen";
import ViewEventScreen from "./ViewEventScreen";

export default function Index() {
  return (
    // <LoginScreen/>
    // <HomeGroupChatScreen/>
    // <NotificationScreen/>
    // <AddEventScreen/>
    <ViewEventScreen/>
  );
}
