import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {dimensions} from '../../styles/constants';
import PastOrderItem from "../../components/PastOrderItem";

const OrderDetailsScreen = (props) => {
    const {data} = props.route?.params;
    const navigation = useNavigation();
    const [offerDetail, setOfferDetail] = useState({});


    useEffect(() => {

        if (props && props.route.params && props.route.params.offer) {
            setOfferDetail(props.route.params.offer);
        }
    }, [])

    return (<View style={styles.container}>
        <View style={styles.content}>
            <FontAwesome5.Button
                name="chevron-left"
                size={20}
                backgroundColor="#fff"
                color="black"
                onPress={() => navigation.goBack()}

            />
        </View>
        <View style={{paddingHorizontal: 10,}}>
            <Text style={{fontSize: 25, paddingHorizontal: 10, paddingTop: 10, marginBottom: 10}}>
                Order Details
            </Text>
        </View>
        <ScrollView style={styles.background}>



            <PastOrderItem
                data={data}
                onPress={() => {
                }}
                isExpanded={true}
            />


            <View style={{height: 50,}}/>

            {data?.trackingUrl ?
                <Button
                    title="Continue"
                    color="#20B2AA"
                    onPress={() => Linking.openURL(data?.trackingUrl)}
                /> : <Text style={{textAlign: 'center'}}>You can not track the order right now.</Text>}

            <View style={{height: 50, marginBottom: dimensions.heightLevel9}}/>


        </ScrollView>
        </View>
    )
}


export default OrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    background: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        flex: 1
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        paddingHorizontal: 10,
        width: "100%"
    },

    hr: {
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 0.25,
        marginVertical: dimensions.paddingLevel2,
    },
})
