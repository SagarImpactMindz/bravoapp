import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '@/constants/Colors';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import ChatInfoComponent from '@/components/bravao/ChatInfoComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatOptions from '@/components/bravao/ChatOptions';
import { groupMembersApi } from '@/utils/Services/services';



const messagesData = [
  { id: '1', messages: ['Hey! How have you been?', 'hi', 'hello'], sender: 'Jenny', time: '12:15 PM', type: 'received' },
  { id: '2', messages: ['Wanna catch up for a beer?', 'hi', 'hello'], sender: 'Jenny', time: '12:15 PM', type: 'received' },
  { id: '3', messages: ["Awesome! Let's meet up"], sender: 'You', time: '12:17 PM', type: 'sent' },
  { id: '4', messages: ['Can I also get my cousin along? Will that be okay? Can I also get my cousin along? Will that be okay?', 'hi', 'hello'], sender: 'You', time: '12:18 PM', type: 'sent' },
  { id: '5', messages: ['Yeah sure! get him too.'], sender: 'Esther', time: '12:22 PM', type: 'received' },
  { id: '6', messages: ['Alright! See you soon!'], sender: 'You', time: '12:25 PM', type: 'sent' },
  {
    id: '7',
    messages: 'Design Event',
    description: 'Lotum one GmbH is an Android game developer that has been active since 2019',
    type: 'event',
    sender: 'Darrell',
    time: '12:25 PM',
  },
];

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [showChatInfo,setShowChatInfo]=useState(false)
  const[showChatOptions,setShowChatOptions]=useState(false)
  const[isLoading,setIsLoading]=useState(false)
  const[participants,setParticipants]=useState([])
  const route = useRoute();
  const navigation = useNavigation(); 
  const { groupId,group_picture,group_name,item } = route.params;
  
  const renderMessage = ({ item }) => {
    // If it's an event message, render it differently
    if (item.type === 'event') {
      return (
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{item.messages}</Text>
          <Text style={styles.eventDescription}>{item.description}</Text>
          <View style={styles.eventButtons}>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={{color:'#343745',fontWeight:'bold'}}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

return item.messages.map((message, index) => (
    <View key={index} >
        <View style={[{flexDirection:'row',alignItems:'center' },item.type === 'sent' ? {    alignSelf: 'flex-end',} : {alignSelf: 'flex-start'},,]}>
            {item.type === 'received'  &&( index === item.messages.length - 1) ? 
            <View >
                <Image source={require('../assets/images/SigninImg.png')} style={[styles.profile,]}/>
            </View>:''}
            <View style={[
          styles.messageBubble,
          item.type === 'sent' ? styles.sentMessage : styles.receivedMessage,
          (index === item.messages.length - 1) && (item.type === 'received')  ? {marginLeft:5}:{marginLeft:45},
          (index === item.messages.length - 1) && (item.type === 'sent')  ? {marginRight:5}:{marginRight:45},

        ]}>
                <Text style={[{fontSize:16}]}>{message}</Text>
            </View>
            {item.type === 'sent' &&( index === item.messages.length - 1)  ? 
            <View >
                <Image source={require('../assets/images/SigninImg.png')} style={[styles.profile]}/>
            </View>:''}
        </View>
        {index === item.messages.length - 1 && 
        <View style={[item.type == 'received'  ? {flexDirection:'row',justifyContent:'space-between',alignItems:'center'}:{flexDirection:'row',alignItems:'center',alignSelf: 'flex-end',justifyContent:'space-between'}]}>
        <Text style={{marginRight:10}}>{item.sender}</Text>
        <Text>{item.time}</Text>
        </View>
        }
    </View>
))}


// Get groupmembers
useEffect(() => {
  (async () => {
    setIsLoading(true);
    try {
      const data = await groupMembersApi(groupId);
      setParticipants(data?.participants)
      setIsLoading(false);
    } catch (error) {

      Alert.alert("Something went wrong", error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  })();
}, []);

return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.groupprofileSection}>
          <TouchableOpacity style={styles.backIconContainer} onPress={()=>navigation.goBack()}>
            <FontAwesome5 name="angle-left" size={30} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.groupProfilePicWrapper}>
            <Image
              source={{ uri: group_picture }}
              style={styles.groupProfilePic}
            />
            <TouchableOpacity style={styles.groupProfilePicEditIconContainer} onPress={()=>navigation.navigate('GroupMembers', { groupId: groupId,group_picture: group_picture,
          group_name: group_name, participants:participants})}>
              <Text>{participants?.length > 9 ? '9+' : participants?.length}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.groupName}>{group_name}</Text>
            <Text style={styles.groupMembers} numberOfLines={1} ellipsizeMode="tail">
              {participants.map((member) => member.name).join(', ')}
            </Text>
          </View>
          <TouchableOpacity onPress={()=>setShowChatInfo(true)}
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: 0,
            }}
          >
            <FontAwesome5 name="ellipsis-v" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <FlatList
          data={messagesData}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={{ padding: 10 }}
        />

<View style={styles.inputContainer}>
  {/* Plus icon inside input box */}
  <TouchableOpacity style={styles.iconLeft} onPress={()=>setShowChatOptions(true)} >
    <FontAwesome name="plus" size={16} color="#fff" />
  </TouchableOpacity>

  {/* Message input */}
  <TextInput
    placeholder="Type Message"
    placeholderTextColor="#7F888F"
    style={styles.textInput}
    value={message}
    onChangeText={(text) => setMessage(text)}
  />

  {/* Send icon inside input box */}
  <TouchableOpacity style={styles.iconRight}>
    <FontAwesome name="send" size={20} color="#7F888F" />
  </TouchableOpacity>
</View>
      </View>
      {showChatInfo && <ChatInfoComponent  visible={showChatInfo} onClose={() => setShowChatInfo(false)} participants={participants}/>}
      {showChatOptions && <ChatOptions visible={showChatOptions} onClose={() => setShowChatOptions(false)} />}
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 250,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backIconContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderColor: '#9AA1A7',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  groupprofileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    paddingVertical: 10,
  },
  groupProfilePicWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'relative',
  },
  groupProfilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  groupProfilePicEditIconContainer: {
    backgroundColor: '#ccc',
    width: 26,
    height: 26,
    borderRadius: 16,
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  groupMembers: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    width: width * 0.55,
  },
  chatContainer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
  },
  messagesList: { flex: 1 },
  messageBubble: {
    paddingHorizontal:20,
    paddingVertical:12,
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: width * 0.7,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    borderRadius:20,
    paddingHorizontal:20,
    paddingVertical:12,
    backgroundColor: '#CDE1E6',
  },
  receivedMessage: {
    borderRadius:20,
    paddingHorizontal:20,
    paddingVertical:12,
    alignSelf: 'flex-start',
    backgroundColor: '#C9CBCE',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#9AA1A7',
    marginTop: 5,
  },
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f8f8f8',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom:20,
    borderWidth: 1,
    borderColor: '#7F888F',
  },
  iconLeft: {
    marginRight: 8,
    backgroundColor:'#7F888F',
    width:24,
    height:24,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:12,
    padding:4
  },
  textInput: {
    fontSize: 16,
    paddingLeft: 5, 
    flex: 1,
    fontWeight:'500',
    color:'#7F888F',
    backgroundColor: '#f8f8f8',
  },
  iconRight: {
    width:32,
    height:32,
    marginLeft: 8,
    justifyContent:'center',
    alignItems:'center'
  },
  addButton: {
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#7F888F',
    borderRadius: 20,
    padding: 10,
  },
  eventContainer: {
    backgroundColor: '#CDE1E6',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
    width: '85%',
  },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  eventDescription: { fontSize: 14, color: '#555' },
  eventButtons: { flexDirection: 'row', marginTop: 10 },
  rejectButton: {
    backgroundColor: '#CDE1E6',
    borderWidth:1,
    borderColor:'#434854',
    padding: 10,
    color:'#CDE1E6',
    borderRadius: 5,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: '#343745',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  profile:{
    width:40,
    height:40,
    borderRadius:20
  },
  

});

export default ChatScreen;


// import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { colors } from '@/constants/Colors';
// import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
// import ChatInfoComponent from '@/components/bravao/ChatInfoComponent';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import ChatOptions from '@/components/bravao/ChatOptions';
// import { groupMembersApi } from '@/utils/Services/services';
// import {sendMessage} from '@/utils/Services/chatServices'


// const messagesData = [
//   { id: '1', messages: ['Hey! How have you been?', 'hi', 'hello'], sender: 'Jenny', time: '12:15 PM', type: 'received' },
//   { id: '2', messages: ['Wanna catch up for a beer?', 'hi', 'hello'], sender: 'Jenny', time: '12:15 PM', type: 'received' },
//   { id: '3', messages: ["Awesome! Let's meet up"], sender: 'You', time: '12:17 PM', type: 'sent' },
//   { id: '4', messages: ['Can I also get my cousin along? Will that be okay? Can I also get my cousin along? Will that be okay?', 'hi', 'hello'], sender: 'You', time: '12:18 PM', type: 'sent' },
//   { id: '5', messages: ['Yeah sure! get him too.'], sender: 'Esther', time: '12:22 PM', type: 'received' },
//   { id: '6', messages: ['Alright! See you soon!'], sender: 'You', time: '12:25 PM', type: 'sent' },
//   {
//     id: '7',
//     messages: 'Design Event',
//     description: 'Lotum one GmbH is an Android game developer that has been active since 2019',
//     type: 'event',
//     sender: 'Darrell',
//     time: '12:25 PM',
//   },
// ];

// const ChatScreen = () => {
//   const [message, setMessage] = useState('');
//   const [showChatInfo,setShowChatInfo]=useState(false)
//   const[showChatOptions,setShowChatOptions]=useState(false)
//   const[isLoading,setIsLoading]=useState(false)
//   const[participants,setParticipants]=useState([])
//   const[messagesData,setMessagesData]=useState([])
//   const route = useRoute();
//   const navigation = useNavigation(); 
//   const { groupId,group_picture,group_name,item } = route.params;

//   // const handleSendMessage = async () => {
//   //   if (message.trim() === '') return;  // Don't send empty messages
  
//   //   // Send the message to backend
//   //   await sendMessage();
  
//   //   // Add the message to the chat state
//   //   setMessagesData((prevMessages) => [
//   //     ...prevMessages,
//   //     {
//   //       id: String(prevMessages.length + 1),
//   //       messages: [message],
//   //       sender: 'You',
//   //       time: new Date().toLocaleTimeString(),
//   //       type: 'sent',
//   //     },
//   //   ]);
  
//   //   // Clear the message input
//   //   setMessage('');
//   // };
  
//   const handleSendMessage = async () => {
//     if (message.trim() === '') return;  // Don't send empty messages
  
//     const payload = {
//       sender_id: '18',  // Replace with the actual sender's user ID
//       chat_id: groupId,  // Replace with the correct chat ID
//       message_type_id: '1',  // Set to 1 for text message
//       content: message,  // The actual message content
//       parent_message_id: null,  // If it's a reply, pass the parent message ID here
//     };
  
//     try {
//       const response = await sendMessage(payload);  // Pass the payload to the sendMessage function
//       if (response?.isSuccess) {
//         console.log('Message sent successfully!');
//         // You can update the state or refresh the messages if needed
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       Alert.alert('Error', 'Failed to send the message.');
//     }
  
//     // Add the message to the chat state
//     setMessagesData((prevMessages) => [
//       ...prevMessages,
//       {
//         id: String(prevMessages.length + 1),
//         messages: [message],
//         sender: 'You',
//         time: new Date().toLocaleTimeString(),
//         type: 'sent',
//       },
//     ]);
  
//     // Clear the message input
//     setMessage('');
//   };
  

//   const renderMessage = ({ item }) => {
//     // If it's an event message, render it differently
//     if (item.type === 'event') {
//       return (
//         <View style={styles.eventContainer}>
//           <Text style={styles.eventTitle}>{item.messages}</Text>
//           <Text style={styles.eventDescription}>{item.description}</Text>
//           <View style={styles.eventButtons}>
//             <TouchableOpacity style={styles.rejectButton}>
//               <Text style={{color:'#343745',fontWeight:'bold'}}>Reject</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.acceptButton}>
//               <Text style={styles.buttonText}>Accept</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }

// return item.messages.map((message, index) => (
//     <View key={index} >
//         <View style={[{flexDirection:'row',alignItems:'center' },item.type === 'sent' ? {    alignSelf: 'flex-end',} : {alignSelf: 'flex-start'},,]}>
//             {item.type === 'received'  &&( index === item.messages.length - 1) ? 
//             <View >
//                 <Image source={require('../assets/images/SigninImg.png')} style={[styles.profile,]}/>
//             </View>:''}
//             <View style={[
//           styles.messageBubble,
//           item.type === 'sent' ? styles.sentMessage : styles.receivedMessage,
//           (index === item.messages.length - 1) && (item.type === 'received')  ? {marginLeft:5}:{marginLeft:45},
//           (index === item.messages.length - 1) && (item.type === 'sent')  ? {marginRight:5}:{marginRight:45},

//         ]}>
//                 <Text style={[{fontSize:16}]}>{message}</Text>
//             </View>
//             {item.type === 'sent' &&( index === item.messages.length - 1)  ? 
//             <View >
//                 <Image source={require('../assets/images/SigninImg.png')} style={[styles.profile]}/>
//             </View>:''}
//         </View>
//         {index === item.messages.length - 1 && 
//         <View style={[item.type == 'received'  ? {flexDirection:'row',justifyContent:'space-between',alignItems:'center'}:{flexDirection:'row',alignItems:'center',alignSelf: 'flex-end',justifyContent:'space-between'}]}>
//         <Text style={{marginRight:10}}>{item.sender}</Text>
//         <Text>{item.time}</Text>
//         </View>
//         }
//     </View>
// ))}


// // Get groupmembers
// useEffect(() => {
//   (async () => {
//     setIsLoading(true);
//     try {
//       const data = await groupMembersApi(groupId);
//       // console.log(data.participants[0].family_relationships)
//       setParticipants(data?.participants)
//       setIsLoading(false);
//     } catch (error) {

//       Alert.alert("Something went wrong", error?.response?.data?.message);
//     } finally {
//       setIsLoading(false);
//     }
//   })();
// }, []);

// return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >

//       <StatusBar backgroundColor={colors.background} barStyle="light-content" />
//       <View style={styles.header}>
//         <View style={styles.groupprofileSection}>
//           <TouchableOpacity style={styles.backIconContainer} onPress={()=>navigation.goBack()}>
//             <FontAwesome5 name="angle-left" size={30} color="#fff" />
//           </TouchableOpacity>
          
//           <View style={styles.groupProfilePicWrapper}>
//             <Image
//               source={{ uri: group_picture }}
//               style={styles.groupProfilePic}
//             />
//             <TouchableOpacity style={styles.groupProfilePicEditIconContainer} onPress={()=>navigation.navigate('GroupMembers', { groupId: groupId,group_picture: group_picture,
//           group_name: group_name, participants:participants})}>
//               <Text>{participants?.length > 9 ? '9+' : participants?.length}</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{ marginLeft: 8 }}>
//             <Text style={styles.groupName}>{group_name}</Text>
//             <Text style={styles.groupMembers} numberOfLines={1} ellipsizeMode="tail">
//               {participants.map((member) => member.name).join(', ')}
//             </Text>
//           </View>
//           <TouchableOpacity onPress={()=>setShowChatInfo(true)}
//             style={{
//               alignContent: 'center',
//               justifyContent: 'center',
//               position: 'absolute',
//               right: 0,
//             }}
//           >
//             <FontAwesome5 name="ellipsis-v" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.chatContainer}>
//         <FlatList
//           data={messagesData}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           style={styles.messagesList}
//           contentContainerStyle={{ padding: 10 }}
//         />

// <View style={styles.inputContainer}>
//   {/* Plus icon inside input box */}
//   <TouchableOpacity style={styles.iconLeft} onPress={()=>setShowChatOptions(true)} >
//     <FontAwesome name="plus" size={16} color="#fff" />
//   </TouchableOpacity>

//   {/* Message input */}
//   <TextInput
//     placeholder="Type Message"
//     placeholderTextColor="#7F888F"
//     style={styles.textInput}
//     value={message}
//     onChangeText={(text) => setMessage(text)}
//   />

//   {/* Send icon inside input box */}
//   <TouchableOpacity style={styles.iconRight}>
//     <FontAwesome name="send" size={20} color="#7F888F" />
//   </TouchableOpacity>
// </View>
//       </View>
//       {showChatInfo && <ChatInfoComponent  visible={showChatInfo} onClose={() => setShowChatInfo(false)} participants={participants}/>}
//       {showChatOptions && <ChatOptions visible={showChatOptions} onClose={() => setShowChatOptions(false)} />}
//     </KeyboardAvoidingView>
//   );
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     height: 250,
//     backgroundColor: colors.background,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//   },
//   backIconContainer: {
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingVertical: 1,
//     paddingHorizontal: 8,
//     borderColor: '#9AA1A7',
//     alignContent: 'center',
//     justifyContent: 'center',
//     marginRight: 5,
//   },
//   groupprofileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//     paddingVertical: 10,
//   },
//   groupProfilePicWrapper: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     position: 'relative',
//   },
//   groupProfilePic: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 30,
//   },
//   groupProfilePicEditIconContainer: {
//     backgroundColor: '#ccc',
//     width: 26,
//     height: 26,
//     borderRadius: 16,
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   groupName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   groupMembers: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#fff',
//     width: width * 0.55,
//   },
//   chatContainer: {
//     flex: 3,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingVertical: 10,
//   },
//   messagesList: { flex: 1 },
//   messageBubble: {
//     paddingHorizontal:20,
//     paddingVertical:12,
//     borderRadius: 10,
//     marginVertical: 6,
//     maxWidth: width * 0.7,
//   },
//   sentMessage: {
//     alignSelf: 'flex-end',
//     borderRadius:20,
//     paddingHorizontal:20,
//     paddingVertical:12,
//     backgroundColor: '#CDE1E6',
//   },
//   receivedMessage: {
//     borderRadius:20,
//     paddingHorizontal:20,
//     paddingVertical:12,
//     alignSelf: 'flex-start',
//     backgroundColor: '#C9CBCE',
//   },
//   messageText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   messageTime: {
//     fontSize: 12,
//     color: '#9AA1A7',
//     marginTop: 5,
//   },
// inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 15,
//     backgroundColor: '#f8f8f8',
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//     marginBottom:20,
//     borderWidth: 1,
//     borderColor: '#7F888F',
//   },
//   iconLeft: {
//     marginRight: 8,
//     backgroundColor:'#7F888F',
//     width:24,
//     height:24,
//     justifyContent:'center',
//     alignItems:'center',
//     borderRadius:12,
//     padding:4
//   },
//   textInput: {
//     fontSize: 16,
//     paddingLeft: 5, 
//     flex: 1,
//     fontWeight:'500',
//     color:'#7F888F',
//     backgroundColor: '#f8f8f8',
//   },
//   iconRight: {
//     width:32,
//     height:32,
//     marginLeft: 8,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   addButton: {
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: '#7F888F',
//     borderRadius: 20,
//     padding: 10,
//   },
//   eventContainer: {
//     backgroundColor: '#CDE1E6',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 10,
//     alignSelf: 'center',
//     width: '85%',
//   },
//   eventTitle: { fontSize: 16, fontWeight: 'bold' },
//   eventDescription: { fontSize: 14, color: '#555' },
//   eventButtons: { flexDirection: 'row', marginTop: 10 },
//   rejectButton: {
//     backgroundColor: '#CDE1E6',
//     borderWidth:1,
//     borderColor:'#434854',
//     padding: 10,
//     color:'#CDE1E6',
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   acceptButton: {
//     backgroundColor: '#343745',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: { color: '#fff', fontWeight: 'bold' },
//   profile:{
//     width:40,
//     height:40,
//     borderRadius:20
//   },
  

// });

// export default ChatScreen;