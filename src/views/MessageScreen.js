import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import {getChatterListHandler} from "../configurations/firebase/APIService";
import moment from "moment";


const MessageScreen = ({ navigation }) => {

  const [partners, setPartners] = useState([]);

  useEffect(() => {
    (async function () {
      let data = await getChatterListHandler();

      let arr = [];
      data.map((item, index) => {
        let temp ={
          id: index,
          partnerId: item.id,
          userName: item.name,
          userImage: item.image,
          // messageTime: moment(new Date()).fromNow(),
          messageTime:'',
          messageText:
              '',
        }
        arr.push(temp);

      })


      setPartners(arr)
    }) ();
  }, []);






  return (

    <View style={{
      backgroundColor: "#FFF",
      flex: 1
    }}>
      <View style={{
        backgroundColor: "white",
        height: "28%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20
      }}>




        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          width: "100%"
        }}>



        </View>
        <Text style={{
          fontSize: 28,
          color: "#000000",
          fontWeight: "bold",
          marginTop: 5

        }}>Messages</Text>


      </View>

      <Container>


        <FlatList
          style={{ marginTop: -10 }}
          data={partners}

          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate('Chat', { userName: item.userName, user: item })}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImage ? {uri: item.userImage} :require('../assets/users/user-4.jpg')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  {/*<MessageText>{item.messageText}</MessageText>*/}
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />

      </Container>

    </View>




  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
