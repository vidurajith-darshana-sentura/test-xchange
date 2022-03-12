import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { OfferItem } from '../../components/OfferItem';
import { getOffersListRequest, resetGetOfferListRequest } from '../../redux/actions/offerAction';
import Loader from "../../components/Loader";
import { FlatList } from 'react-native-gesture-handler';

let pageNumber = -1;
const ROWS_PER_PAGE = 20;
let momentumScrollBegin = true;

const ViewOffersScreen = ({route}) => {

    const { isBuyer } = route?.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const isFetchingOffers = useSelector(state => state.offerState.isFetchingOffers);
    const offerList = useSelector(state => state.offerState.offerList);
    const getOffersFailed = useSelector(state => state.offerState.getOffersFailed);

    useEffect(() => {
        pageNumber++;

        console.warn(isBuyer)
        return () => {
            pageNumber = -1;
            dispatch(resetGetOfferListRequest());
        }
    }, [])


    const getOffers = (isInitial = false) => {
        if (!momentumScrollBegin || isInitial)
            dispatch(getOffersListRequest(pageNumber, ROWS_PER_PAGE));
    }


    return (
        <View style={styles.background}>
            <Loader isLoading={isFetchingOffers} />

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
                <Text style={{ fontSize: 25, paddingHorizontal: 10, paddingTop: 10, marginBottom: 20 }}>View Offers</Text>
            </View>

            <FlatList
                onEndReachedThreshold={0}
                onEndReached={() => getOffers()}
                onMomentumScrollBegin={() => momentumScrollBegin = false}
                data={offerList}
                renderItem={({ item, index }) =>
                    <OfferItem
                        key={index}
                        offer={item}
                        onPress={() => {
                            navigation.navigate("OfferDetail", { offer: item })
                        }}
                    />
                }
            />

            {
                (!offerList || offerList.length === 0 && !isFetchingOffers) &&
                    <View style={{ height: "75%", justifyContent: "center", alignItems: "center" }}>
                        <Text>No offers available at the moment</Text>
                    </View>
            }

        </View>

    )
}



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


export default ViewOffersScreen;
