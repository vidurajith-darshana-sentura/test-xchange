import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Title, Text} from 'react-native-paper';
import { greenColor } from '../../styles/constants';
const CreateBuyerOffer = ({ navigation }) => {
    const [checked, setChecked] = React.useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <View style={styles.content}>

                    <FontAwesome5.Button
                        name="chevron-left"
                        size={20}
                        backgroundColor="#fff"
                        color="black"
                        onPress={() => navigation.goBack()}
                        paddingHorizontal={-30}
                    />
                    <Text style={{ fontSize: 25, paddingHorizontal: 20, }}>Create Buyer Offer</Text>


                </View>








                <View style={styles.menuWrapper}>


                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Selected Gig</Text>

                                <Text style={{ position: 'absolute', right: 0, top: 15 ,fontSize:15,color:'#20B2AA'}}>CHANGE</Text>


                            </View>



                            <View style={styles.userInfoSection}>


                <View style={{ flexDirection: 'row', marginTop: 0, }}>
                <Image
          style={styles.userImg}
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8rDeyfLKlRhtbcEgp8vJaNeY9MqfqDOJrtA&usqp=CAU'}}
        />
                    <View style={{ marginLeft: 10 }}>
                        <Title style={[styles.title, {
                            // marginTop: 15,
                            marginBottom: 5,
                            fontSize:16,
                            fontStyle:'normal',

                        }]}>Exceptionaly write a childrens          story book lorem..</Title>

                        <View style={{ marginTop: -40, marginLeft:145 }}>
                            <Text style={{paddingTop:20,color:greenColor ,fontSize:15   }}>From $30</Text>
                        </View>
                    </View>

                </View>


                <View style={styles.userInfoSection}>


                </View>
            </View>
            <Text style={styles.subheader}>Offer Discription</Text>
            <TextInput


        style={{borderColor:'#d3d3d3',borderBottomWidth:1,padding:5,fontSize:15}}



        placeholder={'Describe your offer'}

      />
              <Text style={styles.subheader}>Item Details</Text>
              <TextInput


        style={{borderColor:'#d3d3d3',borderBottomWidth:1,padding:5,fontSize:15}}



        placeholder={'Country'}

      />
         <TextInput


        style={{borderColor:'#d3d3d3',borderBottomWidth:1,padding:5,paddingTop:20,fontSize:15}}



        placeholder={'Address'}

      />

<View style={{paddingTop:20}}>
                                    <Text style={styles.priceItemText}>Item Price</Text>
                                    <Text style={{ position: 'absolute', right: 15, top: 25 ,fontSize:15}}>$ 0.0</Text>


                                </View>
                                <View style={styles.menuItem}>
                                    <Text style={styles.priceItemText}>QTY</Text>
                                    <Text style={{ position: 'absolute', right: 15, top: 15 ,fontSize:15}}>0</Text>


                                </View>
                                <View style={{paddingTop:0}}>
                                    <Text style={styles.priceItemText}>Total Price</Text>
                                    <Text style={{ position: 'absolute', right: 15, top: 0 ,fontSize:15}}>$ 0.0</Text>


                                </View>
                                <View style={styles.menuItem}>
                                    <Text style={styles.priceItemText}>Grand Total</Text>
                                    <Text style={{ position: 'absolute', right: 15, top: 15 ,fontSize                                                                        :15}}>$ 0.0</Text>


                                </View>
                                <Text style={{textAlign:'center',color:'#AAAAAA',fontSize:13}}>Exchange app will be charge 10%</Text>

                            <TouchableOpacity  onPress={() => {
    alert('Clicked 😉😍')}}>

<View style={styles.buttonRegist}>
<Text style={{ color: '#FFF', fontWeight: 'bold' ,fontSize:19}}>Get Offer</Text>
</View>
</TouchableOpacity>






                    </View>


            </View>

        </View>
    )

}

export default CreateBuyerOffer;


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
        fontWeight: "bold",
        marginTop: 5
    },
    buttonRegist: {
        paddingVertical: 6, alignItems: 'center', borderRadius: 20, backgroundColor: '#20B2AA', marginTop: 5, paddingHorizontal: 10

    },
    textinput: {
        paddingHorizontal: 10,
        paddingTop: 15
    },
    header: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        marginBottom: 10,
        // left: 10
    },
    discription: {
        marginRight: 10,
        fontWeight: '600',
        fontSize: 14.5,
        marginBottom: 10,
    },
    subheader:{
        marginRight: 10,
        fontWeight: '600',
        fontSize: 20,
        paddingTop: 20,
        marginBottom: 10,
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
        fontSize: 20,
        lineHeight: 26,

    },
    title: {
        fontSize: 16.5,
        marginRight:60
        // fontWeight: 'bold',
    },
    userImg: {
        height: 80,
        width: 90,
        borderRadius: 10,
      },
      userInfoSection: {

        paddingHorizontal: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        borderWidth:1,
        borderColor:'#d3d3d3',
        borderRadius: 10,



    },
    priceItemText: {
        alignItems: 'flex-start',
        color: 'black',

        fontWeight: '600',
        fontSize: 15,
        lineHeight: 26,

    },
    menuWrapper:{
        paddingTop:10
    }

})
