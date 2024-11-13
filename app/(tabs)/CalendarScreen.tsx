import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView,Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import EditDeleteEventComponent from '@/components/bravao/EditDeleteEventComponent';
import DeleteComponent from '@/components/bravao/DeleteComponent';

const CalendarScreen = () => {
  const navigation = useNavigation(); 
  // const role="student"
  const role="teacher"
  const[showEdit,setShowEdit]=useState(false)
  const[showDeletePopUp,setShowDeletePopUp]=useState(false)
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const events = [
    {
      id: 1,
      title: 'Workout with Ella',
      date: '12/10/2023 - 15/10/2023',
      time: '19:00-20:00',
      creator: 'Jaini Shah',
      cost: '$50',
    },
    {
      id: 2,
      title: 'Workout with Ella',
      date: '12/10/2023 - 15/10/2023',
      time: '19:00-20:00',
      creator: 'Jaini Shah',
    },
    {
        id: 3,
        title: 'Workout with Ella',
        date: '12/10/2023 - 15/10/2023',
        time: '19:00-20:00',
        creator: 'Jaini Shah',
      },
      {
        id: 4,
        title: 'Workout with Ella',
        date: '12/10/2023 - 15/10/2023',
        time: '19:00-20:00',
        creator: 'Jaini Shah',
      },
      {
        id: 5,
        title: 'Workout with Ella',
        date: '12/10/2023 - 15/10/2023',
        time: '19:00-20:00',
        creator: 'Jaini Shah',
      },
      {
        id: 6,
        title: 'Workout with Ella',
        date: '12/10/2023 - 15/10/2023',
        time: '19:00-20:00',
        creator: 'Jaini Shah',
      },
  ];

    // Function to handle date selection
    const onDayPress = (day) => {
      setSelectedDate(day.dateString); // Update the selected date
    };
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    {/* <View style={styles.container}> */}
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.calendarContainer}>
      <Calendar
          onDayPress={onDayPress} // Set onDayPress handler
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: '#FFF',
            dayTextColor: '#FFF',
            monthTextColor: '#FFF',
            selectedDayBackgroundColor: '#4E4E6A',
            todayTextColor: '#FFF',
            arrowColor: '#FFF',
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#4E4E6A' }, // Highlight selected date
          }}
          style={{ borderRadius: 10 }}
        />
      </View>

      <View style={styles.upcomingEventsContainer}>
        <Text style={styles.upcomingEventsTitle}>Upcoming Events</Text>
        <ScrollView contentContainerStyle={styles.eventsList}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <TouchableOpacity style={styles.eventInfo} onPress={()=>navigation.navigate('ViewEventScreen')}>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.cost && <Text style={styles.eventCost}>Event Cost: {event.cost}</Text>}
                <Text style={styles.eventCreator}>Created By: {event.creator}</Text>
                
              </TouchableOpacity>
              {/* <View style={styles.eventActions}> */}
                { role === "teacher" ?(
                  <View style={styles.eventActions}>
                  <TouchableOpacity onPress={()=>navigation.navigate('ChatScreen')} >
                <FontAwesome name="comment" size={20} color="#4E4E6A" style={styles.eventIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setShowEdit(true)}>
                  <FontAwesome name="ellipsis-h" size={20} color="#4E4E6A" style={styles.eventIcon} />
                  </TouchableOpacity>
                  </View>
                ):(
                  <View style={styles.eventActions}>
                  <TouchableOpacity onPress={()=>navigation.navigate('ChatScreen')}>
                <FontAwesome name="comment" size={20} color="#4E4E6A" style={styles.eventIcon} />
                </TouchableOpacity>
                </View>
                )}
              {/* </View> */}
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.fab} onPress={()=>navigation.navigate('AddEventScreen')}>
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    {/* </View> */}
    {showEdit && <EditDeleteEventComponent visible={showEdit} setShowEdit={setShowEdit} setShowDeletePopUp={setShowDeletePopUp}/>}
    {showDeletePopUp && <DeleteComponent visible={showDeletePopUp} setShowDeletePopUp={setShowDeletePopUp}/>}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  calendarContainer: {
    padding: 20,
    paddingTop:40,
    backgroundColor: colors.background,
  },
  upcomingEventsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    // paddingHorizontal: 20,
  },
  upcomingEventsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: 10,
    paddingLeft:20
  },
  eventsList: {
    paddingBottom: 60,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    // borderWidth: 1,
    // borderColor: "#9AA1A7",
    borderBottomWidth: 1,
    borderBottomColor:'#9AA1A7',
    borderTopWidth: 1,
    borderTopColor:'#9AA1A7'
  },
  eventInfo: {
    flex: 1,
  },
  eventDate: {
    fontSize: 12,
    color: '#4E4E6A',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 14,
    fontWeight:'400',
    color: '#4E4E6A',
    marginLeft:10
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.background,
  },
  eventCreator: {
    fontSize: 14,
    color: '#888',
    fontWeight:'bold',
    marginTop: 5,
  },
  eventCost: {
    fontSize: 14,
    color: '#888',
    fontWeight:'500',
    marginTop: 5,
  },
  eventActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIcon: {
    marginLeft: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4E4E6A',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default CalendarScreen;
