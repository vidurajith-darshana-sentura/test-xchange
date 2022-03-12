import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';


export const OfferItem = ({offer, onPress}) => {

    return (
        <TouchableOpacity 
                activeOpacity = {0.9}
                onPress = {onPress}
                style = {{paddingHorizontal: 16, paddingVertical: 15, borderRadius: 10, 
                         marginHorizontal: 5,shadowColor:"black", elevation: 10, backgroundColor:"white", 
                          marginTop: 10}}>

            <UserDetail 
                name = {(offer && offer.fromUser && offer.fromUser.firstName ? offer.fromUser.firstName : "" + 
                        offer && offer.fromUser && offer.fromUser.lastName ? offer.fromUser.lastName : "")}
                image = {offer && offer.fromUser && offer.fromUser.profileUrl ? offer.fromUser.profileUrl : null}
                isFromUser />

            <View style = {{width:"100%", height: 0.5, backgroundColor:"grey", marginVertical: 10}}/>

            <UserDetail 
                name = {(offer && offer.toUser && offer.toUser.firstName ? offer.toUser.firstName : "" + 
                        offer && offer.toUser && offer.toUser.lastName ? offer.toUser.lastName : "")}
                image = {offer && offer.toUser && offer.toUser.profileUrl ? offer.toUser.profileUrl : null}
                />

            <Text style = {{marginTop: 10, color:"grey", fontSize: 11}} numberOfLines = {1}>
                {offer && offer.description ? offer.description : ""}
            </Text>

            <Text style = {{marginTop: 10,  fontWeight:"bold"}}>
                {offer && offer.totalPriceStr ? offer.totalPriceStr : "0.00"} USD
            </Text>

            <Text style = {{marginTop: 5, fontSize: 11}}>
                Status: {
                    offer ?
                    offer.accepted ? "Accepted" :
                    offer.rejected ? "Rejected" : 
                    offer.withdrawn ? "Withdrawn" :
                    "Pending" : "-"
                }
            </Text>
        </TouchableOpacity>
    )
}


export const UserDetail = ({name, image, isFromUser = false}) => (
    <View style = {{ alignItems:"center", flexDirection:"row",}}>

        {
            image &&
            <Image  
                source = {{uri : image}}
                style = {{resizeMode:"cover", height: isFromUser ? 70 : 50, width: isFromUser ? 70 : 50, borderRadius: 50}}
            />
        }
      

        <View style = {{marginLeft: 20}}>
            <Text style = {{fontSize: 11}} 
                  numberOfLines = {1}>
                {isFromUser ? "Offer By" : "To"}
            </Text>
            <Text style = {{fontWeight:"bold"}} 
                  numberOfLines = {1}>
                {name}
            </Text>
        </View>
    </View>
)