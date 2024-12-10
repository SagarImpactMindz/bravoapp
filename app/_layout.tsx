import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "@/app/contexts/AuthContext";

function AuthScreens() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/");
    }
  }, [isAuthenticated]);


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="ChatScreen" />
      <Stack.Screen name="StudentsList" />
      <Stack.Screen name="TeacherList" />
      <Stack.Screen name="UserProfile" />
      <Stack.Screen name="ViewEventScreen" />
      <Stack.Screen name="EditEventScreen" />
      <Stack.Screen name="GroupMembers" />
      <Stack.Screen name="index" />
    </Stack>
  );
}



export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthScreens />
    </AuthProvider>
  );
}

