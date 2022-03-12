import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {greenColor} from "../styles/constants";

const {width,height} = Dimensions.get('window');

const Loader = ({isLoading}) => (
    isLoading ?
        <View style={styles.container}>
            <ActivityIndicator color={greenColor} size={'large'} />
        </View> : null
)

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgb(255,255,255)',
        opacity: .8,
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        elevation: 20
    }
})

export default Loader;
