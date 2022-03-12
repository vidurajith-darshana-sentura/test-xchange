import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
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
} from '../styles/NotificationStyle';

const Notifications = [
    {
        id: '1',

        userImg: require('../assets/notification.jpg'),

        NotificationText:
            'Buying services for work? Get the best experience with a few quick questions. Whats your industry ?',
        NotificationTime: '1 day ago',
    },
    {
        id: '2',

        userImg: require('../assets/notification.jpg'),
        NotificationTime: '1 month ago',
        NotificationText:
            'A friend you referred castla just signed up! Once they buy you get rewarded',
    },
    {
        id: '3',

        userImg: require('../assets/notification.jpg'),
        NotificationTime: '6 months ago',
        NotificationText:
            'Your seller account is disabled and your requests are not posting',
    },
    {
        id: '4',

        userImg: require('../assets/notification.jpg'),
        NotificationTime: '6 months ago',
        NotificationText:
            'Get inspired by real posts that helped small businesses connect with their customers',

    },

];

const NotificationScreen = ({navigation}) => {
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

                }}>Notifications</Text>
            </View>

            <Container>
                <FlatList
                    style={{marginTop: -10}}
                    data={Notifications}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        // <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <Card>
                            <UserInfo>
                                <UserImgWrapper>
                                    <UserImg source={item.userImg}/>
                                </UserImgWrapper>
                                <TextSection>

                                    <MessageText>{item.NotificationText}</MessageText>
                                    <UserInfoText>

                                        <PostTime>{item.NotificationTime}</PostTime>
                                    </UserInfoText>
                                </TextSection>
                            </UserInfo>
                        </Card>
                    )}
                />

            </Container>
        </View>

    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
