import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { OfferItem } from '../../components/OfferItem';
import { getOffersListRequest, resetGetOfferListRequest } from '../../redux/actions/offerAction';
import Loader from "../../components/Loader";
import { FlatList } from 'react-native-gesture-handler';
import {getOrdersByUserAction} from "../../redux/actions/orderActions";
import {REMOVE_DUPLICATE_OBJECT} from "../../util/JSArray";
import {dimensions} from "../../styles/constants";


let momentumScrollBegin = true;

const ViewOffersScreen = ({route}) => {

    const { isBuyer } = route?.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [yourOffer, setYourOffer] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;


    const getOffersByUserSuccess = useSelector(state => state.offerState.getOffersByUserSuccess);
    const getOffersByUserFailed = useSelector(state => state.offerState.getOffersByUserFailed);
    const getOffersByUserLoading = useSelector(state => state.offerState.getOffersByUserLoading);

    useEffect(() => {
        let data = {pageNumber: currentPage, pageSize: pageSize};
        dispatch(getOffersListRequest(data))
        setCurrentPage(currentPage + 1)
    }, []);

    useEffect(() => {
        if (getOffersByUserSuccess) {
            let {listData, totalPages} = getOffersByUserSuccess?.result;
            let data = [...yourOffer].concat(listData);
            data = REMOVE_DUPLICATE_OBJECT(data, "id");

            if (isBuyer) {
                data = data.filter(data => Number(data?.buyerUser) === Number(global.userId));
            } else {
                data = data.filter(data => !(Number(data?.buyerUser) === Number(global.userId)));
            }

            setYourOffer(data.sort((a, b) => b.id - a.id));
            setTotalPages(totalPages);

        } else if (getOffersByUserFailed) {
            // TODO: nothing
        }

    }, [getOffersByUserSuccess, getOffersByUserFailed]);


    function loadMoreHandler() {
        if (totalPages !== currentPage) {

            setCurrentPage(currentPage);
            let data = {pageNumber: currentPage, pageSize: pageSize};
            dispatch(getOffersListRequest(data));

            setCurrentPage(currentPage + 1);
        }
    }


    return (
        <View style={styles.background}>
            <Loader isLoading={getOffersByUserLoading} />

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
                <Text style={{ fontSize: 25, paddingHorizontal: 10, paddingTop: 10, marginBottom: 20 }}>Your Offers</Text>
            </View>

            <FlatList
                onEndReachedThreshold={0}
                onEndReached={loadMoreHandler}
                onMomentumScrollBegin={() => momentumScrollBegin = false}
                data={yourOffer}
                ListFooterComponent={<View style={{height: dimensions?.heightLevel9}}/>}
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
                (!yourOffer || yourOffer.length === 0 && !getOffersByUserLoading) &&
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
