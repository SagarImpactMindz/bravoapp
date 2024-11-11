// import React, { useState } from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Tabs } from 'expo-router';

// export default function TabLayout() {
//   const[selectedTab,setSelectedTab]=useState('')
//   return (
//     <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',headerShown: false, }}>
//       <Tabs.Screen
//         name="HomeGroupChatScreen"
//         options={{
//           title: 'Messages',
//           tabBarIcon: ({ color }) => <FontAwesome size={22} name="comments" color={color} />,
//         }}
//       />
//         <Tabs.Screen
//         name="CalendarScreen"
//         options={{
//           title: 'Calendar',
//           tabBarIcon: ({ color }) => <FontAwesome size={22} name="calendar" color={color} />,
//         }}
//       />

//         <Tabs.Screen
//         name="AddEventScreen"
//         options={{
//           title: 'Add Event',
//           tabBarIcon: ({ color }) => <FontAwesome size={22} name="plus-circle" color={color} />,
//         }}
//       />
//         <Tabs.Screen
//         name="NotificationScreen"
//         options={{
//           title: 'Notifications',
//           tabBarIcon: ({ color }) => <FontAwesome size={22} name="bell" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="MyProfileScreen"
//         options={{
//           title: 'My Profile',
//           tabBarIcon: ({ color }) => <FontAwesome size={22} name="user" color={color} />,
//         }}
//       />

//     </Tabs>
//   );
// }



// import React, { useState } from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Tabs } from 'expo-router';
// import { View, Text,TouchableOpacity } from 'react-native';
// import { colors } from '@/constants/Colors';
// // import {  } from 'react-native-gesture-handler';

// export default function TabLayout() {
//   // State to keep track of the active tab
//   const [activeTab, setActiveTab] = useState('HomeGroupChatScreen');

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#57636C',
//         tabBarInactiveTintColor:'#57636C',
//         tabBarStyle: {
//           height: 50,
//           paddingBottom: 10,
//           paddingTop: 10,
//           paddingHorizontal:15,
//           backgroundColor: '#F1F4F8',
//           borderTopWidth: 0.5,
//           borderTopColor: '#ddd',
//         },
//         headerShown: false,
//       }}
//     >

// <Tabs.Screen
//         name="HomeGroupChatScreen"
//         options={{
//           tabBarIcon: () => null,
//           tabBarLabel: ({ color }) => (
//             <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
//               <FontAwesome name="comments" size={22} color={color} />
//               {activeTab === 'HomeGroupChatScreen' && <Text style={{ marginLeft: 2, color,fontSize:12 }}>Messages</Text>}
//             </View>
//           ),
//           tabBarButton: (props) => (
//             <TouchableOpacity
//               {...props}
//               onPress={() => {
//                 setActiveTab('HomeGroupChatScreen');
//                 props.onPress();
//               }}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="CalendarScreen"
//         options={{
//           tabBarIcon: () => null,
//           tabBarLabel: ({ color }) => (
//             <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
//               <FontAwesome name="calendar" size={22} color={color} />
//               {activeTab === 'CalendarScreen' && <Text style={{ marginLeft: 2, color,fontSize:12 }}>Calendar</Text>}
//             </View>
//           ),
//           tabBarButton: (props) => (
//             <TouchableOpacity
//               {...props}
//               onPress={() => {
//                 setActiveTab('CalendarScreen');
//                 props.onPress();
//               }}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="AddEventScreen"
//         options={{
//           tabBarIcon: () => null,
//           tabBarLabel: ({ color }) => (
//             <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
//               <FontAwesome name="plus-circle" size={26} color={color} />
//               {activeTab === 'AddEventScreen' && <Text style={{  color }}></Text>}
//             </View>
//           ),
//           tabBarButton: (props) => (
//             <TouchableOpacity
//               {...props}
//               onPress={() => {
//                 setActiveTab('AddEventScreen');
//                 props.onPress();
//               }}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="NotificationScreen"
//         options={{
//           tabBarIcon: () => null,
//           tabBarLabel: ({ color }) => (
//             <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
//               <FontAwesome name="bell" size={22} color={color} />
//               {activeTab === 'NotificationScreen' && <Text style={{ marginLeft: 2, color,fontSize:12 }}>Notification</Text>}
//             </View>
//           ),
//           tabBarButton: (props) => (
//             <TouchableOpacity
//               {...props}
//               onPress={() => {
//                 setActiveTab('NotificationScreen');
//                 props.onPress();
//               }}
//             />
//           ),
//         }}
//       />
//             <Tabs.Screen
//         name="MyProfileScreen"
//         options={{
//           tabBarIcon: () => null,
//           tabBarLabel: ({ color }) => (
//             <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
//               <FontAwesome name="user" size={22} color={color} />
//               {activeTab === 'MyProfileScreen' && <Text style={{ marginLeft: 2, color,fontSize:12}}>Profile</Text>}
//             </View>
//           ),
//           tabBarButton: (props) => (
//             <TouchableOpacity
//               {...props}
//               onPress={() => {
//                 setActiveTab('MyProfileScreen');
//                 props.onPress();
//               }}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function TabLayout() {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('HomeGroupChatScreen');
  const textOpacity = useRef(new Animated.Value(0)).current; // Initial opacity of text set to 0

  // Effect to handle fade-in animation whenever activeTab changes
  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  // Function to handle tab press
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    // textOpacity.setValue(0); // Reset opacity before starting animation
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#57636C',
        tabBarInactiveTintColor: '#57636C',
        tabBarStyle: {
          height: 50,
          paddingBottom: 10,
          paddingTop: 10,
          paddingHorizontal:15,
          backgroundColor: '#f5f5f5',
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
        },
        headerShown: false,
      }}
    >

      <Tabs.Screen
        name="HomeGroupChatScreen"
        options={{
          tabBarIcon: () => null,
          tabBarLabel: ({ color }) => (
            <View
              style={[
                styles.tabContainer,
                activeTab === 'HomeGroupChatScreen' ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <FontAwesome name="comments" size={22} color={color} />
              {activeTab === 'HomeGroupChatScreen' && (
                <Animated.Text style={[styles.tabText, { color, opacity: textOpacity }]}>
                  Messages
                </Animated.Text>
              )}
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                handleTabPress('HomeGroupChatScreen');
                props.onPress();
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="CalendarScreen"
        options={{
          tabBarIcon: () => null,
          tabBarLabel: ({ color }) => (
            <View
              style={[
                styles.tabContainer,
                activeTab === 'CalendarScreen' ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <FontAwesome name="calendar" size={22} color={color} />
              {activeTab === 'CalendarScreen' && (
                <Animated.Text style={[styles.tabText, { color, opacity: textOpacity }]}>
                  Calendar
                </Animated.Text>
              )}
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                handleTabPress('CalendarScreen');
                props.onPress();
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="AddEventScreen"
        options={{
          tabBarIcon: () => null,
          tabBarLabel: ({ color }) => (
            <View
              style={[
                styles.tabContainer,
                // activeTab === 'AddEventScreen' ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <FontAwesome name="plus-circle" size={26} color={color} />
              {/* {activeTab === 'AddEventScreen' && (
                <Animated.Text style={[styles.tabText, { color, opacity: textOpacity }]}>

                </Animated.Text>
              )} */}
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                handleTabPress('AddEventScreen');
                props.onPress();
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="NotificationScreen"
        options={{
          tabBarIcon: () => null,
          tabBarLabel: ({ color }) => (
            <View
              style={[
                styles.tabContainer,
                activeTab === 'NotificationScreen' ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <FontAwesome name="bell" size={22} color={color} />
              {activeTab === 'NotificationScreen' && (
                <Animated.Text style={[styles.tabText, { color, opacity: textOpacity }]}>
                  Notification
                </Animated.Text>
              )}
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                handleTabPress('NotificationScreen');
                props.onPress();
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="MyProfileScreen"
        options={{
          tabBarIcon: () => null,
          tabBarLabel: ({ color }) => (
            <View
              style={[
                styles.tabContainer,
                activeTab === 'MyProfileScreen' ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <FontAwesome name="user" size={22} color={color} />
              {activeTab === 'MyProfileScreen' && (
                <Animated.Text style={[styles.tabText, { color, opacity: textOpacity }]}>
                  Profile
                </Animated.Text>
              )}
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                handleTabPress('MyProfileScreen');
                props.onPress();
              }}
            />
          ),
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Align icon and text to the left side
    width: 'auto', // Give space for icon + text
  },
  inactiveTab: {
    width: 30, // Shrink width for inactive tabs
    justifyContent: 'center', // Center the icon
  },
  tabText: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight:500
  },
});
