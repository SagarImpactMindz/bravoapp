import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/constants/Colors';
import EditDeleteEventComponent from '@/components/bravao/EditDeleteEventComponent';
import DeleteComponent from '@/components/bravao/DeleteComponent';
import { getAllEventsApi } from '@/utils/Services/eventServices';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const CalendarScreen = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [events, setEvents] = useState([]); // All events
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
  const [isLoading, setIsLoading] = useState(false);
  const[itemToEdit,setItemToEdit]=useState()
  const[itemToEditId,setItemToEditId]=useState()
  const navigation = useNavigation(); 
  const router=useRouter()

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null); // No date selected initially
  const role = "teacher";


  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await getAllEventsApi();
      // console.log(response,"Resdfdefrfv")
      if (response?.isSuccess) {
        setEvents(response?.data);
        setFilteredEvents(response?.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Something went wrong",
        error?.response?.data?.message || "Failed to fetch events."
      );
      if (error.response && error.response.status === 401) {
        // Token expired, navigate to login screen
        router.replace('/');
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    fetchEvents();
  },[])



  const refreshEvents = async () => {
    try {
      setIsLoading(true);
      const response = await getAllEventsApi();
      // console.log(response,"response")
      if (response?.isSuccess) {
        setEvents(response?.data);
        setFilteredEvents(response?.data);
      } 
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Something went wrong",
        error?.response?.data?.message || "Failed to fetch events."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchEvents = async () => {
        try {
          setIsLoading(true);
          const response = await getAllEventsApi();
          if (response?.isSuccess) {
            setEvents(response?.data);
            setFilteredEvents(response?.data);
          }
        } catch (error) {
          console.error(error);
          Alert.alert(
            "Something went wrong",
            error?.response?.data?.message || "Failed to fetch events."
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchEvents();
    }, [])
  );

  // Function to handle date selection and filter events
  const onDayPress = (day) => {
    const selected = day.dateString; // Selected date in YYYY-MM-DD format
    setSelectedDate(selected);
    if (selected) {
      // Filter events based on the selected date
      const filtered = events.filter(event => event.start_time.split(" ")[0] === selected);
      setFilteredEvents(filtered);
    } else {
      // Show all events if no date is selected
      setFilteredEvents(events);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={onDayPress} // Set onDayPress handler
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: "#FFF",
            dayTextColor: "#FFF",
            monthTextColor: "#FFF",
            selectedDayBackgroundColor: "#4E4E6A",
            todayTextColor: "#FFF",
            arrowColor: "#FFF",
          }}
          markedDates={{
            ...(selectedDate && {
              [selectedDate]: { selected: true, selectedColor: "#4E4E6A" },
            }), // Highlight selected date
          }}
          style={{ borderRadius: 10 }}
        />
      </View>

      <View style={styles.upcomingEventsContainer}>
        <Text style={styles.upcomingEventsTitle}>Upcoming Events</Text>
        <ScrollView contentContainerStyle={styles.eventsList}>
          {isLoading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={"large"} color={"black"} />
            </View>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <View key={event.event_id} style={styles.eventCard}>
                <TouchableOpacity
                  style={styles.eventInfo}
                  onPress={() =>
                    navigation.navigate("ViewEventScreen", {
                      event_id: event.event_id,
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.eventDate}>{event.start_time}</Text>
                    <Text style={styles.eventTime}>{event.end_time}</Text>
                  </View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  {event.cost && (
                    <Text style={styles.eventCost}>
                      Event Cost: {event.cost}
                    </Text>
                  )}
                  <Text style={styles.eventCreator}>
                    Created By: {event.created_by_name || "No data available"}
                  </Text>
                </TouchableOpacity>
                {role === "teacher" && (
                  <View style={styles.eventActions}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} >
                      <FontAwesome name="comment" size={20} color="#4E4E6A" style={styles.eventIcon} />
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                      <FontAwesome
                        name="comment"
                        size={20}
                        color="#4E4E6A"
                        style={styles.eventIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShowEdit(true),
                          setItemToEdit(event),
                          setItemToEditId(event?.event_id);
                      }}
                    >
                      <FontAwesome
                        name="ellipsis-h"
                        size={20}
                        color="#4E4E6A"
                        style={styles.eventIcon}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
              No events for this date.
            </Text>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddEventScreen")}
      >
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>

      <EditDeleteEventComponent
        visible={showEdit}
        setShowEdit={setShowEdit}
        setShowDeletePopUp={setShowDeletePopUp}
        itemToEditId={itemToEditId}
        itemToEdit={itemToEdit}
      />
      <DeleteComponent
        visible={showDeletePopUp}
        setShowDeletePopUp={setShowDeletePopUp}
        itemToEditId={itemToEditId}
        onDeleteSuccess={refreshEvents}
      />
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
    paddingTop: 40,
    backgroundColor: colors.background,
  },
  upcomingEventsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  upcomingEventsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: 10,
    paddingLeft: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: '#9AA1A7',
    borderTopWidth: 1,
    borderTopColor: '#9AA1A7',
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
    fontSize: 12,
    color: '#4E4E6A',
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.background,
  },
  eventCreator: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
    marginTop: 5,
  },
  eventCost: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
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
