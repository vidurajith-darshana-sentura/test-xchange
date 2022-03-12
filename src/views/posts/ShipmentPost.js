import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { MessageText, } from '../../styles/PostStyle';
import { TouchableRipple } from 'react-native-paper';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import { queryOpenSellerRequest, resetQueryShipmentRequests } from "../../redux/actions/buyerAction";
import Loader from "../../components/Loader";
import { formatDate, reduceDate } from '../../util/formatter';
import { Calendar } from "react-native-calendars"
import moment from 'moment'

let pageNumber = -1;
const ROWS_PER_PAGE = 50;
const SELLER_TYPE = "SHIPMENT";
let momentumScrollBegin = true;

let startDate = null;
let endDate =  null;

const ShipmentPost = ({ navigation }) => {

  const dispatch = useDispatch();
  const isQueryingOpenSellerRequests = useSelector(state => state.buyerState.isQueryingOpenSellerRequests);
  const shipmentRequests = useSelector(state => state.buyerState.shipmentRequests);
  const queryShipmentRequestFailed = useSelector(state => state.buyerState.queryShipmentRequestFailed);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [dateRange, setDateRange] = useState(null);


  useEffect(() => {
    endDate = moment(new Date()).format("YYYY-MM-DD");
    startDate = reduceDate(endDate);
    setDateRange((startDate ? startDate : "") + " - " + (endDate ? endDate : ""))

    let markedDates = {
      [startDate] : {selected: true},
      [endDate] : {selected: true}
    }

    setMarkedDates(markedDates);

    getShipments(0,true)
    pageNumber++;

    return (() => {
      dispatch(resetQueryShipmentRequests())
    })
  }, [])

  const getShipments = (pageNumber,isInitial = false) => {
    if (!momentumScrollBegin || isInitial)
      
      dispatch(queryOpenSellerRequest(pageNumber, ROWS_PER_PAGE, SELLER_TYPE, startDate, endDate));
  }


  return (
    <View style={styles.container}>

      <Loader isLoading={isQueryingOpenSellerRequests} />

      <View style={styles.background}>
        <View style={styles.content}>

          <View style={{ justifyContent: "space-evenly", flexDirection: "row", paddingTop: 0, marginBottom: 10 }}>

          <TouchableOpacity  
            style = {{width:"100%"}}
            onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
            <TextInput
              editable = {false}
              placeholder={'YYYY-MM-DD - YYYY-MM-DD'}
              value = {dateRange}
              // maxLength={21}
              keyboardType="numeric"
              style={{ backgroundColor: "white", fontWeight: "600", alignSelf: "center", padding: 10, fontSize: 15, height: 37, width: "100%", borderRadius: 10, justifyContent: "center", alignContent: "center", textAlign: "center", borderWidth: 1, borderColor: "#20B2AA",}}
            />
            </TouchableOpacity>

            {/* <TextInput

              placeholder={'Country'}
              maxLength={7}

              style={{ backgroundColor: "white", fontWeight: "600", alignSelf: "center", padding: 10, fontSize: 15, height: 37, width: "31%", borderRadius: 10, justifyContent: "center", alignContent: "center", textAlign: "center", borderWidth: 1, borderColor: "#20B2AA" }}
            /> */}







          </View>






        </View>

        
        {
              isCalendarVisible ?
                <Calendar
                  style = {{zIndex: 5, position:"absolute", borderColor:"#20B2AA", borderWidth: 1, borderRadius: 10}}
                  markedDates={markedDates}
                  onDayPress={(day) => {
                    if (Object.keys(markedDates).length < 2 && !Object.keys(markedDates).includes(day)) {
                      let copy = markedDates;
                      copy = {
                        ...copy,
                        [day.dateString]: { selected: true }
                      }
                      console.log("cop: ", copy);


                      Object.keys(copy).forEach((key, index) => {
                        index === 0 ? startDate = key : endDate = key;
                      })

                      if (new Date(startDate) > new Date(endDate) && startDate && endDate) {
                        let temp = startDate;
                        startDate = endDate;
                        endDate = temp;
                      }
                      setDateRange((startDate ? startDate : "") + " - " + (endDate ? endDate : ""))
                      setMarkedDates(copy);

                      if(startDate && endDate){ 
                        setIsCalendarVisible(false);
                        dispatch(queryOpenSellerRequest(pageNumber, ROWS_PER_PAGE, SELLER_TYPE, startDate, endDate));
                      }
                    } else {
                      startDate = null;
                      endDate = null;
                      setDateRange(null);
                      setMarkedDates({});
                      // setIsCalendarVisible(false);
                      // getShipments();
                    }
                  }}
                />
                : null
            }


        <View style={styles.menuItem}>
          <Text style={{ fontSize: 16, color: '#AAAAAA', right: 20 }}>Date</Text>
          <Text style={styles.menuItemText}>Buyer</Text>
          <Text style={{ position: 'absolute', right: 58, top: 15, fontSize: 16, color: '#AAAAAA', }}>Requests</Text>
        </View>


        {
          shipmentRequests && shipmentRequests.length > 0 ?

            <FlatList
              style={{ marginTop: -10, height: '70%' }}
              data={shipmentRequests}
              onEndReachedThreshold={0}
              onEndReached={() => getShipments()}
              onMomentumScrollBegin={() => momentumScrollBegin = false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableRipple onPress={() => {
                  console.log("oTE: ", item.description);
                  navigation.navigate('BuyerProfile', { details: item, userType: "BUYER" })
                }} style={styles.ripple}>
                  <View style={styles.postItem}>
                    <Text style={{ fontSize: 12, color: 'black', marginLeft: -20 }}>{formatDate(item.startDateStr)}</Text>
                    <Image source={item.userDto && item.userDto.profileUrl ? { uri: item.userDto.profileUrl } :
                      require('../../assets/users/user-1.jpg')}
                      style={{ width: 50, height: 50, borderRadius: 25, marginLeft: 35 }} />
                    <MessageText numberOfLines={3}>{item.description ? item.description : ""}</MessageText>
                  </View>

                </TouchableRipple>

              )}
            />
            : null}


        {
          (!shipmentRequests || shipmentRequests.length === 0 && !isQueryingOpenSellerRequests) &&
          <View style={{ height: "75%", justifyContent: "center", alignItems: "center" }}>
            <Text>No shipment requests available at the moment</Text>
          </View>
        }


      </View>

    </View>
  )

}

export default ShipmentPost;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  background: {
    backgroundColor: "white",
    paddingHorizontal: 20
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    width: "100%"
  },
  headerText: {
    fontSize: 28,
    color: "#000000",
    alignItems: "center",
    marginTop: 0,
    paddingLeft: 20

  },
  buttonRegist: {
    paddingVertical: 10, alignItems: 'center', borderRadius: 20, backgroundColor: '#20B2AA', marginTop: 50, paddingHorizontal: 10

  },
  textinput: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  ripple: {
    backgroundColor: 'white',
    borderWidth: 0.50,
    borderColor: '#DFDFDF',


  },
  menuItem: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginLeft: 0,
    borderWidth: 0.50,
    borderColor: '#DFDFDF',



  },
  menuItemText: {
    alignItems: 'flex-start',
    color: '#AAAAAA',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,

    paddingLeft: 30

  },
  postItem: {

    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginLeft: 0,
    borderWidth: 0.25,
    borderColor: '#DFDFDF',



  },
  postItemText: {
    alignItems: 'flex-start',
    color: 'black',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,

    paddingLeft: 30

  }
})
