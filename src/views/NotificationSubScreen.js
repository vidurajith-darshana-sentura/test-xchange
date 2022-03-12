import React from 'react'
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import {dimensions, getShadowsV2} from "../styles/constants";

const NotificationSubScreen = ({navigation, route}) => {
    const { item} = route.params;
    return (<View style={styles.container}>
        <View style={styles.background}>
               <Image source={require('../assets/notification.jpg')} style={styles.img} />
               <Text style={styles.title} numberOfLines={2}>{item?.title}</Text>

            <ScrollView
                style={styles.scroll}
            >
                   <Text style={styles.description}>{item?.description}</Text>
<View style={{marginBottom: dimensions.heightLevel5}}/>
            </ScrollView>
        </View>
    </View>)

}

export default NotificationSubScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: dimensions.paddingLevel3,
    },

    background: {
        width: '100%',
        backgroundColor: '#FFF',
        height: dimensions.heightLevel10 * 4.1,
        marginTop: dimensions.heightLevel5,
        padding: dimensions.paddingLevel2,
        borderRadius: 10,
        alignItems: 'center',
        ...getShadowsV2
    },

    scroll: {
        width: '100%',
        paddingTop: dimensions.paddingLevel1
    },

    img: {
        width:dimensions.heightLevel7,
        height: dimensions.heightLevel7,
        borderRadius: 10,
        marginTop: dimensions.heightLevel2,
    },

    title: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.02)',
        marginTop: dimensions.heightLevel1,
    },

    description: {
        textTransform: 'capitalize',
        fontSize: 14,
        width: '100%',
        textAlign: 'left',
        marginTop: dimensions.heightLevel1,
        marginHorizontal: dimensions.paddingLevel1
    }
})
