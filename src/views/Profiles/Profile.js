import React,{useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView, Image} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
} from 'react-native-paper';

import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../util/formatter';

const myCustomShare = async () => {
    const shareOptions = {
        message: 'Order your next meal from xchange App. I\'ve already ordered more than 10 meals on it.',
        url: files.appLogo
    }

    try {
        const ShareResponse = await Share.open(shareOptions);
        console.log(JSON.stringify(ShareResponse));
    } catch (error) {
        console.log('Error => ', error);
    }
};
const Profile = (props) => {
    const navigation = useNavigation();
    const [details, setDetails] = useState(null);
    const [userType, setUserType] = useState(null);


    useEffect(() => {
        console.log("PROPS: ", props.route.params)
        if(props && props.route.params && props.route.params.details){
            setDetails(props.route.params.details);
        }

        if(props && props.route.params && props.route.params.userType){
            setUserType(props.route.params.userType);
        }

        return () => {

        }
    }, [])


    console.log("details?.userDto: XXXX  ", details?.userDto)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 10,}}>
                    <Avatar.Image
                        source={
                            details && details.userDto && details.userDto.profileUrl ?
                            { uri:  details.userDto.profileUrl } :
                            {uri: 'http://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png'}
                        }
                        size={55}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            // marginTop: 15,
                            marginBottom: 5,
                            color: 'black'
                        }]}>
                            { details && details.userDto && details.userDto.firstName ? details.userDto.firstName : "" } { details && details.userDto && details.userDto.lastName ? details.userDto.lastName : "" }

                        </Title>

                    <Caption style={styles.caption}>{details && details.createDateTime ? formatDate(details.createDateTime) : ""}</Caption>
                        <View style={{marginTop: -40, marginLeft: '80%'}}>
                            <Ionicons name="chevron-down" size={27} color="#808080"/>
                        </View>
                    </View>

                </View>
                <View style={styles.userInfoSection}>


                </View>
            </View>


            <View style={{
                backgroundColor: "#FFF",
                flex: 1
            }}>
                <View style={{
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                    marginTop: -25
                }}>


                    {/* Profile section */}

                    <View style={styles.menuWrapper}>

            <Text style={styles.header}>{ details && details.title ? details.title : ""  }</Text>
                        <Text style={styles.discription} numberOfLines = {5}>{ details && details.description ? details.description : ""  }</Text>
                        {/* <Text style={styles.subheader}>Lorem Ipsum</Text> */}

                        <View style={styles.menuItem}>
                            <Text style={styles.menuItemText}>Delivery Date</Text>
                            <Text style={{position: 'absolute', right: 15, top: 15, fontSize: 15}}>
                            {details && details.startDateStr ? formatDate(details.startDateStr) : null} {userType && userType === "SELLER" && details && details.endDateStr ? " - " + formatDate(details.endDateStr) : null}
                            </Text>


                        </View>

                        {
                            userType === "BUYER" ?
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Weight</Text>
                                <Text style={{position: 'absolute', right: 15, top: 15, fontSize: 15}}>
                                    {details && details.qtyStr ? details.qtyStr : ""}
                                </Text>

                            </View>

                            :

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Price</Text>
                                <Text style={{position: 'absolute', right: 15, top: 15, fontSize: 15}}>
                                    USD {details && details.priceStr ? details.priceStr : ""}
                                </Text>

                            </View>
                        }

                        {/* <View style={styles.menuItem}>
                            <Text style={styles.menuItemText}>Lorem</Text>
                            <Text style={{position: 'absolute', right: 15, top: 15, fontSize: 15}}>Ipsum</Text>


                        </View> */}


                        {
                            details && details.requestItems && details.requestItems.length > 0 ?

                            details.requestItems.map((item, index) =>

                                <View style = {{width: "100%", borderTopColor:"grey", borderTopWidth: 1, paddingTop: 10}}>
                                    <Text>* {item.itemName ? item.itemName : ""}</Text>
                                    {
                                        item.imageUrl ?
                                        <Image
                                            style = {{ width: 100, height: 100, resizeMode:"contain", borderRadius: 10}}
                                            source = {{uri: item.imageUrl}}
                                        /> : null
                                    }

                                </View>

                            )

                            :

                            null
                        }


                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('ChatNewScreen',{toId: details && details.userDto ? details.userDto.id : "", details: details})
                            navigation.navigate('ChatNewScreen', {
                                user: {
                                    id:details?.userDto?.id,
                                    partnerId:details?.userDto?.id,
                                    userName:  details?.userDto?.firstName + " " + details?.userDto?.lastName ,
                                    userImage: details?.userDto?.profileUrl,
                                },
                            })
                        }}>

                            <View style={styles.buttonRegist}>
                                <Text style={{
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                    fontSize: 19,
                                    paddingBottom: 2
                                }}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    );

};


export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    userInfoSection: {
        marginTop: 30,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 10,
        marginBottom: 0,
        marginHorizontal: 20

    },
    title: {
        fontSize: 18,
        // fontWeight: 'bold',
    },
    caption: {
        marginTop: -2,
        fontSize: 13,
        lineHeight: 14,

        color: '#808080',
    },
    row: {
        flexDirection: 'row',

        marginLeft: -30,
        marginTop: 20
    },
    infoBoxWrapper: {

        borderBottomColor: '#BF3325',
        borderBottomWidth: 1,
        borderTopColor: '#BF3325',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,

    },
    infoBox: {

        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    menuWrapper: {

        // backgroundColor: '#F4F4F4'

    },
    menuItem: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginLeft: -20,


    },
    menuItemText: {
        alignItems: 'flex-start',
        color: 'black',

        fontWeight: '600',
        fontSize: 15,
        lineHeight: 26,

    },
    header: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        marginBottom: 10,
        // left: 10
    },
    ripple: {
        backgroundColor: 'white',
        borderWidth: 0.50,
        borderColor: '#DFDFDF'

    },
    discription: {
        marginRight: 10,
        fontWeight: '600',
        fontSize: 14.5,
        marginBottom: 10,
    },
    subheader: {
        marginRight: 10,
        fontWeight: '600',
        fontSize: 20,
        paddingTop: 20,
        marginBottom: 10,
    },
    buttonRegist: {
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#20B2AA',
        marginTop: 10,
        paddingHorizontal: 10

    },
    linearGradient: {
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
