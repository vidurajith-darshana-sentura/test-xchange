import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView , TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { UserDetail } from '../../components/OfferItem';
import { greenColor } from '../../styles/constants';

const OfferDetailScreen = (props) => {

    const navigation = useNavigation();
    const [offerDetail, setOfferDetail] = useState({});
   



    useEffect(() => {
        console.log("knjfn: ", props.route.params)
        if (props && props.route.params && props.route.params.offer) {
            setOfferDetail(props.route.params.offer);
        }
    }, [])

    return (
        <ScrollView style={styles.background}>
            <View style={styles.content}>
                <FontAwesome5.Button
                    name="chevron-left"
                    size={20}
                    backgroundColor="#fff"
                    color="black"
                    onPress={() => navigation.goBack()}

                />
            </View>
            <View style={styles.baseForm}>
                <Text style={{ fontSize: 25, paddingHorizontal: 10, paddingTop: 10, marginBottom: 20 }}>
                    Offer Detail
                </Text>
            </View>

            <UserDetail
                name={(offerDetail && offerDetail.fromUser && offerDetail.fromUser.firstName ? offerDetail.fromUser.firstName : "" +
                    offerDetail && offerDetail.fromUser && offerDetail.fromUser.lastName ? offerDetail.fromUser.lastName : "")}
                image={offerDetail && offerDetail.fromUser && offerDetail.fromUser.profileUrl ? offerDetail.fromUser.profileUrl : null}
                isFromUser />
            <View style={{ width: "100%", height: 0.5, backgroundColor: "grey", marginVertical: 10 }} />
            <UserDetail
                name={(offerDetail && offerDetail.fromUser && offerDetail.fromUser.firstName ? offerDetail.fromUser.firstName : "" +
                    offerDetail && offerDetail.fromUser && offerDetail.fromUser.lastName ? offerDetail.fromUser.lastName : "")}
                image={offerDetail && offerDetail.fromUser && offerDetail.fromUser.profileUrl ? offerDetail.fromUser.profileUrl : null}
            />

            <Text style={{ marginVertical: 15, color: "grey" }}>
                {offerDetail && offerDetail.description ? offerDetail.description : ""}
            </Text>

            <Text >
                Item List
            </Text>

            {
                offerDetail && offerDetail.itemList ?
                    offerDetail.itemList.map((item, index) =>
                        <View
                            key={index}
                            style={{
                                flex: 1, borderColor: greenColor, borderWidth: 1,
                                borderRadius: 10, paddingBottom: 16, paddingHorizontal: 16,
                                paddingTop: 10, marginTop: 10
                            }}>
                            <ItemDetailRow
                                label={"Item name"}
                                value={item.itemName ? item.itemName : "-"}
                            />
                            <ItemDetailRow
                                label={"Price"}
                                value={`USD ${item.priceStr ? item.priceStr : "0.00"}`}
                            />
                            <ItemDetailRow
                                label={"Quantity"}
                                value={item.qty ? item.qty : "-"}
                            />
                        </View>
                    )

                    : null
            }

           
            
            <View style = {{height: 50}}/>
            <Button
                title="Continue"
                color="#20B2AA"
                onPress={() => {}}
            />


        </ScrollView>
    )
}


const ItemDetailRow = ({ label, value }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <Text style={{ color: "grey" }}>
            {label}
        </Text>

        <Text>
            {value}
        </Text>
    </View>
)

export default OfferDetailScreen;

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
        width: "100%"
    },
    buttonRegist: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#20B2AA',
        marginTop: 50,
        paddingHorizontal: 10
    },
    textinput: {
        paddingHorizontal: 15,
        paddingTop: 10
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})
