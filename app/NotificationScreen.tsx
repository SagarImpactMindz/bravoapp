
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image,StatusBar } from 'react-native';

const notifications = [
  { id: '1', name: 'Adnan Safi', action: 'Started following you', time: '5 min ago' },
  { id: '2', name: 'Joan Baker', action: 'Invite A virtual Evening of Smooth Jazz', time: '20 min ago' },
  { id: '3', name: 'Ronald C. Kinch', action: 'Like you events', time: '1 hr ago' },
  { id: '4', name: 'Clara Tolson', action: 'Join your Event Gala Music Festival', time: '9 hr ago' },
  { id: '5', name: 'Clara Tolson', action: 'Join your Event Gala Music Festival', time: '9 hr ago' },
  { id: '6', name: 'Jennifer Fritz', action: 'Invite you International Kids Safe', time: 'Tue , 5:10 pm' },
  { id: '7', name: 'Jennifer Fritz', action: 'Invite you International Kids Safe', time: 'Tue , 5:10 pm' },
  { id: '7', name: 'Jennifer Fritz', action: 'Invite you International Kids Safe', time: 'Tue , 5:10 pm' },
  { id: '7', name: 'Jennifer Fritz', action: 'Invite you International Kids Safe', time: 'Tue , 5:10 pm' },
  { id: '7', name: 'Jennifer Fritz', action: 'Invite you International Kids Safe', time: 'Tue , 5:10 pm' },
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View>
        <View style={styles.hrContainer}>
        <View style={styles.hr} />
    </View>
    <View style={styles.notificationItem}>
      <Image
        // source={{ uri: 'https://placekitten.com/80/80' }}
        source={require("../assets/images/SigninImg.png")}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.actionText}>{item.action}</Text>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#343745" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.notificationContainer}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343745',

  },
  header: {
    flex:1,
    backgroundColor: '#343745',
    padding: 20,
    justifyContent:'center'
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  notificationContainer:{
    flex:4,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    paddingTop:10
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 10,
    // elevation: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode:'cover'
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionText: {
    fontSize: 16,
    color: '#555',
    fontWeight:'500'
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  hrContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  hr: { borderBottomColor: "#ccc", borderBottomWidth: 1, width: "100%",    },
});

export default NotificationScreen;
