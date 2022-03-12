import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {dimensions, getShadowsV2} from "../styles/constants";


const PastOrderItem = ({data, onPress, isExpanded = false}) => {


    const IMAGE_FROM_USER = (data?.offerDto?.fromUser?.profileUrl) ? {uri: data?.offerDto?.fromUser?.profileUrl} : require('../assets/users/user-1.jpg');
    const IMAGE_TO_USER = (data?.offerDto?.toUser?.profileUrl) ? {uri: data?.offerDto?.toUser?.profileUrl} : require('../assets/users/user-5.jpg');

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.container}
        >
            <View style={styles.UserDetailContainer}>
                <Image source={IMAGE_FROM_USER} style={styles.img}/>
                <View>
                    <Text>from,</Text>
                    <Text
                        style={{fontWeight: 'bold'}}>{data?.offerDto?.fromUser?.firstName + " " + data?.offerDto?.fromUser?.lastName}</Text>
                    {isExpanded && <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text>({data?.offerDto?.fromUser?.email}</Text>
                        <Text> / {data?.offerDto?.fromUser?.mobileNumber})</Text>
                    </View>}

                    <Text>{data?.offerDto?.fromUser?.country}</Text>
                </View>
            </View>

            <View style={styles.hr}/>

            <View style={styles.UserDetailContainer}>
                <Image source={IMAGE_TO_USER} style={styles.img}/>
                <View>
                    <Text>to,</Text>
                    <Text
                        style={{fontWeight: 'bold'}}>{data?.offerDto?.toUser?.firstName + " " + data?.offerDto?.toUser?.lastName}</Text>
                    {isExpanded && <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text>({data?.offerDto?.toUser?.email}</Text>
                        <Text> / {data?.offerDto?.toUser?.mobileNumber})</Text>
                    </View>}
                    <Text>{data?.offerDto?.toUser?.country}</Text>
                </View>
            </View>

            <View style={styles.hr}/>

            <Text>orderRef: {data?.orderRef}</Text>
            <Text>created Date: {data?.createdDateTime}</Text>
            <Text>orderType: {data?.orderType}</Text>
            <Text>Status: {data?.completed ? "completed" : "pending..."}</Text>

            {isExpanded && <><View style={styles.hr}/>

                <Text style={{fontWeight: 'bold'}}>DESCRIPTION</Text>
                <Text>{data?.offerDto?.description}</Text>
                <Text>({data?.offerDto?.fromUser?.firstName + " " + data?.offerDto?.fromUser?.lastName})</Text>

                <View style={styles.hr}/>
                <Text style={{fontWeight: 'bold'}}>REQUEST ITEMS</Text>
                {data?.offerDto?.itemList?.map((data, index) => {
                    return (<View style={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 5,
                        padding: 5,
                        marginVertical: 5
                    }}>
                        <Text>NAME: {data?.itemName}</Text>
                        <Text>QTY: {data?.qty}</Text>
                        <Text>TOTAL: {data?.price}</Text>
                        <Text>TOTAL PRICE: {data?.priceStr}</Text>
                    </View>)
                })}

                <View style={styles.hr}/>

                <Text style={{
                    fontWeight: 'bold',
                    marginTop: dimensions.paddingLevel1 / 2
                }}>sub total: {data?.offerDto?.subTotalStr ? data?.offerDto?.subTotalStr : '-'}</Text>
                <Text style={{
                    fontWeight: 'bold',
                    marginTop: dimensions.paddingLevel1 / 2
                }}>user charge: {data?.offerDto?.userChargeStr ? data?.offerDto?.userChargeStr : '-'}</Text>
                <Text style={{
                    fontWeight: 'bold',
                    marginTop: dimensions.paddingLevel1,
                    fontSize: 17
                }}>total total: {data?.offerDto?.totalPriceStr ? data?.offerDto?.totalPriceStr : '-'}</Text>
            </>}

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        borderRadius: 10,
        marginHorizontal: 5,
        shadowColor: "black",
        elevation: 10,
        backgroundColor: "rgba(0,0,0,0.1)",
        marginTop: 15,
        paddingVertical: dimensions.paddingLevel3,
        ...getShadowsV2
    },
    hr: {
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 0.25,
        marginVertical: dimensions.paddingLevel2,
    },

    UserDetailContainer: {
        flexDirection: 'row',
    },

    img: {
        width: dimensions.heightLevel4,
        height: dimensions.heightLevel4,
        borderRadius: 100,
        marginRight: dimensions.paddingLevel3,
    }
});
export default PastOrderItem;
