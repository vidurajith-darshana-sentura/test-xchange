import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {firestore} from "../configurations/firebase/firebaseConfig";
import {manualPrivateChatHandler, sendPrivateMessage} from "../configurations/firebase/APIService";


const ChatScreen = ({navigation, route}) => {
  const {user} = route?.params;
  const [messages, setMessages] = useState([]);



  useEffect(() => {

    // firebase
    const subscriber = firestore()
        .collection('privateChat')
        .onSnapshot(documentSnapshot => {
          let data = manualPrivateChatHandler(documentSnapshot?._docs, user?.partnerId);

          let msg = [];
          data.map((item, index) => {



            let isSender = Number(item?._data?.senderId) === Number(global.userId);
            let id = 0;
            let name = '';
            let image = '';

            id = Number(item?._data?.senderId);
            if (isSender) {
              name = item?._data?.senderName ;
              image =  item?._data?.senderImage;
            } else {
              name = item?._data?.receiverName;
              image = item?._data?.receiverImage;
            }


            let temp =  {
              _id: index,
              text: item?._data?.message,
              createdAt: new Date(item?._data?.dateTime),
              user: {
                _id: id,
                name:name,
                avatar: image,
              },
            }

            msg.push(temp);
          });

          setMessages(msg.sort((a, b) => b.createdAt - a.createdAt));

        });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [user?.id]);




  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
    );


    let data ={
      receiverId: user?.partnerId,
      receiverName: user.name,
      receiverImage: user?.userImage,
      senderId: global.userId,
      senderName: null ,
      senderImage: null,
      message: messages[0]?.text,
    }
    await sendPrivateMessage(data);
  }, []);



  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={42}
            color="#20B2AA"
          />

        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#20B2AA',
              },

              left: {
                backgroundColor: '#d4eceb',
              },
            }}
            textStyle={{
              right: {
                color: '#fff',
              },

              left: {
                color: '#000',
              },
            }}
        />

    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />

    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: global.userId,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomCompo
      nent={scrollToBottomComponent}
    />


  );

};

export default ChatScreen;


