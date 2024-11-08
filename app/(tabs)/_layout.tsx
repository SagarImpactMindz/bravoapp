import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="HomeGroupChatScreen"
        options={{
          title: 'Home Chat',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="comments" color={color} />,
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="MyProfileScreen"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="AddEventScreen"
        options={{
          title: 'Add Event',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="plus-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
