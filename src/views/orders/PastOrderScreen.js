import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import Loader from "../../components/Loader";
import {FlatList} from 'react-native-gesture-handler';
import PastOrderItem from "../../components/PastOrderItem";
import {dimensions} from "../../styles/constants";
import {getOrdersByUserAction} from "../../redux/actions/orderActions";
import {REMOVE_DUPLICATE_OBJECT} from "../../util/JSArray";

let pageNumber = -1;
const ROWS_PER_PAGE = 20;
let momentumScrollBegin = true;

const PastOrderScreen = ({route}) => {

    const {isBuyer} = route?.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [pastOrder, setPastOrder] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    // const isFetchingOffers = useSelector(state => state.offerState.isFetchingOffers);
    // const offerList = useSelector(state => state.offerState.offerList);
    // const getOffersFailed = useSelector(state => state.offerState.getOffersFailed);

    let getOrdersByUserSuccess = useSelector(state => state.orderState.getOrdersByUserSuccess);
    let getOrdersByUserFailed = useSelector(state => state.orderState.getOrdersByUserFailed);
    let getOrdersByUserLoading = useSelector(state => state.orderState.getOrdersByUserLoading);

    useEffect(() => {
        let data = {pageNumber: currentPage, pageSize: pageSize};
        dispatch(getOrdersByUserAction(data))
        setCurrentPage(currentPage + 1)
    }, []);


    useEffect(() => {
        if (getOrdersByUserSuccess) {
            let {listData, totalPages} = getOrdersByUserSuccess?.result;

            let data = [...pastOrder].concat(listData);
            data = REMOVE_DUPLICATE_OBJECT(data, "id");

            if (isBuyer) {
                data = data.filter(data => Number(data?.offerDto?.buyerUser) === Number(global.userId));
            } else {
                data = data.filter(data => !(Number(data?.offerDto?.buyerUser) === Number(global.userId)));
            }

            setPastOrder(data.sort((a, b) => b.id - a.id));
            setTotalPages(totalPages);

        } else if (getOrdersByUserFailed) {
            // TODO: nothing
        }

    }, [getOrdersByUserSuccess, getOrdersByUserFailed]);


    function loadMoreHandler() {
        if (totalPages !== currentPage) {

            setCurrentPage(currentPage);
            let data = {pageNumber: currentPage, pageSize: pageSize};
            dispatch(getOrdersByUserAction(data));

            setCurrentPage(currentPage + 1);
        }
    }


    return (
        <View style={styles.background}>
            <Loader isLoading={getOrdersByUserLoading}/>

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
                <Text style={{fontSize: 25, paddingHorizontal: 10, paddingTop: 10, marginBottom: 20}}>Past Orders</Text>
            </View>

            <FlatList
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreHandler}
                // onMomentumScrollBegin={() => momentumScrollBegin = false}
                data={pastOrder}
                keyExtractor={item => item?.id}
                ListFooterComponent={<View style={{height: dimensions?.heightLevel9}}/>}
                renderItem={({item, index}) =>
                    <PastOrderItem
                        key={index}
                        data={item}
                        onPress={() => {
                            navigation.navigate("OrderDetails", {data: item})
                        }}
                    />
                }
            />

            {
                (!pastOrder || pastOrder.length === 0 && !getOrdersByUserLoading) &&
                    <View style={{ height: "75%", justifyContent: "center", alignItems: "center" }}>
                        <Text>No past orders available at the moment</Text>
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


export default PastOrderScreen;
