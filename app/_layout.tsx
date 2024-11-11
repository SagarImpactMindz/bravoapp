// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="HomeGroupChatScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="NotificationScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="AddEventScreen" options={{ headerShown: false }} />
//       <Stack.Screen name="ViewEventScreen" options={{ headerShown: false }} />
      
      
//     </Stack>
//   );
// }


// main

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Use the path to load your tabs after the login screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="LoginScreen" options={{ headerShown: false }} /> */}
      {/* This will load the Tabs navigation when logged in */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

