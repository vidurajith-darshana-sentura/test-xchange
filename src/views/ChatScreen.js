import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ChatScreen = ({navigation, route}) => {
  const {user} = route?.params;
  const [messages, setMessages] = useState([]);

  console.log("------------------------")
  console.log(user)
  console.log("user------------------")
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer 2',
        createdAt: new Date(),
        user: {
          _id: global.userId,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: user?.id,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      },
      {
        _id: 3,
        text: 'Whats up',
        createdAt: new Date(),
        user: {
          _id: global.userId,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        text: 'Fine.',
        createdAt: new Date(),
        user: {
          _id: user?.id,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);


  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
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
        }}
        textStyle={{
          right: {
            color: '#fff',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
