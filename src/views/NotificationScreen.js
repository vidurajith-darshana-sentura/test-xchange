import React, {useEffect, useState} from 'react';
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
import {dimensions} from "../styles/constants";
import {useDispatch, useSelector} from "react-redux";
import {getNotificationsByUserAction} from "../redux/actions/NotificationAction";
import {REMOVE_DUPLICATE_OBJECT} from "../util/JSArray";

const NotificationScreen = ({navigation}) => {

    let dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    let notificationsSuccess = useSelector(state => state.notificationState.getNotificationsByUserSuccess);
    let notificationsFailed = useSelector(state => state.notificationState.getNotificationsByUserFailed);
    let notificationsLoading = useSelector(state => state.notificationState.getNotificationsByUserLoading);

    useEffect(() => {
        let data = {pageNumber: currentPage, pageSize: pageSize};
        dispatch(getNotificationsByUserAction(data))
        setCurrentPage(currentPage+1)
    }, []);

    useEffect(() => {
        if (notificationsSuccess) {
            let {listData, totalPages} = notificationsSuccess?.result;

            let data = [...notifications].concat(listData)
            data = REMOVE_DUPLICATE_OBJECT(data,"id");

            setNotifications(data.sort((a,b) => b.id - a.id));
            setTotalPages(totalPages);

        } else if (notificationsFailed) {
             // TODO: nothing
        }

    }, [notificationsSuccess, notificationsFailed]);


    function loadMoreHandler() {
        if (totalPages !== currentPage) {

            setCurrentPage(currentPage);
            let data = {pageNumber: currentPage, pageSize: pageSize};
            dispatch(getNotificationsByUserAction(data));

            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <View style={{
            backgroundColor: "#FFF",
            flex: 1,
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
                    style={{marginTop: -10, height: dimensions.heightLevel10 * 3.3, flexGrow: 0}}
                    refreshing={true}
                    maxToRenderPerBatch={5}
                    data={notifications}
                    keyExtractor={item => item.id}
                    ListFooterComponent={<View style={{height:dimensions?.heightLevel9 }}/>}
                    onEndReached={loadMoreHandler}
                    onEndReachedThreshold ={0.1}
                    renderItem={({item}) => (
                        <Card onPress={() => navigation.navigate('SubNotification', {item: item})}>
                        {/*<Card>*/}
                            <UserInfo>
                                <UserImgWrapper>
                                    <UserImg source={require('../assets/notification.jpg')}/>
                                </UserImgWrapper>
                                <TextSection>

                                    <MessageText>{item.title}</MessageText>
                                    <UserInfoText>

                                        <PostTime>{item.dateTime}</PostTime>
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
