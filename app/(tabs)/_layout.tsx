import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/Colors';
import {  View } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      initialRouteName="HomeGroupChatScreen" // Set the default active tab
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
          paddingTop: 10,
          paddingHorizontal:15,
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom:10

        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeGroupChatScreen"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="comments" color={color} />,
        }}
      />
      <Tabs.Screen
        name="CalendarScreen"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="AddEventScreen"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}
            >
              <FontAwesome size={32} name="plus-circle" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        options={{
          title: 'Notification',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="MyProfileScreen"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
