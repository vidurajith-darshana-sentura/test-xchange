import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Modal, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableRipple, } from 'react-native-paper';
import { greenColor } from '../styles/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

let toId = "";

const ChatNewScreen = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [messages, setMessages] = useState([]);
  const [details, setDetails] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if(props && props.route.params && props.route.params.toId){
      toId = props.route.params.toId;
    }

    if(props && props.route.params && props.route.params.details){
      console.log("djdnjdn: ",props.route.params.details.userDto)
      setDetails(props.route.params.details);
    }
  },[])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
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
      <>
        <Send {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              style={{ marginBottom: 2, marginRight: 5, }}
              size={42}
              color="#20B2AA"
            />
          </View>
        </Send>
      </>
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
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />

    );
  }

  return (
    <>

      <View style={styles.content}>


        <View style={{ marginLeft: 10, paddingTop: -10 }}>
          <Ionicons name="chevron-back" size={27} color="black" onPress={() => navigation.goBack()} />
        </View>
        <Text style={{ fontSize: 25, marginTop: -10, right: -15 }}>
          {details && details.userDto && details.userDto.firstName ? details.userDto.firstName : ""}
          {details && details.userDto && details.userDto.lastName ? details.userDto.lastName : ""}
        </Text>


        {/* <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('CreateBuyer')}
            /> */}
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={require('../assets/oferrn.png')}
            style={{ height: 60, width: 60, marginTop: 0, top: 3, right: 0 }}

          />
        </TouchableOpacity>




      </View>

      <Text style={{ textAlign: 'center', fontSize: 10, marginTop: -10 }}>Online</Text>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomCompo
        nent={scrollToBottomComponent}

      />



      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            {/* <FontAwesome5.Button
                        name="window-close"
                        size={20}
                        backgroundColor="#fff"
                        color="black"
                         onPress={() => setVisible(false)}

                    /> */}


          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Ionicons name="close" size={25} color="black" onPress={() => setVisible(false)} style={{ marginTop: -10, left: 110, paddingBottom: 10 }} />

          <Text style={{ fontSize: 22, marginTop: -40 }}>Create Offer</Text>
        </View>
        <Text style={{ color: '#a9a9a9' }}>_________________________________________</Text>


        <TouchableRipple onPress={() => {
          navigation.navigate('CreateSellerOffer',{isSeller: false, toId: toId}), setVisible(false)
        }} style={styles.ripple}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Create Buyer Offer</Text>
            <Icon name="chevron-right" color={greenColor} size={25} style={{ position: 'absolute', right: 0, top: 15 }} />


          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {
          navigation.navigate('CreateSellerOffer',{isSeller: true, toId: toId}), setVisible(false)
        }} style={styles.ripple}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Create Seller Offer</Text>
            <Icon name="chevron-right" color={greenColor} size={25} style={{ position: 'absolute', right: 0, top: 15 }} />


          </View>
        </TouchableRipple>

      </ModalPoup>

    </>

  );

};

export default ChatNewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  content: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },

  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  menuItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginLeft: -20,


  },
  menuItemText: {
    alignItems: 'center',

    color: 'black',

    fontWeight: '600',
    fontSize: 15,
    lineHeight: 26,

  },
});
