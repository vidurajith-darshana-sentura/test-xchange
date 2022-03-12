import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {greenColor, lightGreenColor} from '../styles/constants';
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

const Button = ({onPress, title, isDisable, enabledBackgroundColor, disabledBackgroundColor}) =>(
    isDisable ?
        <TouchableWithoutFeedback>
          <View style={[styles.buttonLogin, {backgroundColor: disabledBackgroundColor ? disabledBackgroundColor : lightGreenColor}]}>
            <Text style={{color: '#FFF', fontWeight: 'bold'}}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
        :
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.buttonLogin, {backgroundColor: enabledBackgroundColor ? enabledBackgroundColor : greenColor}]}>
            <Text style={{color: '#FFF', fontWeight: 'bold'}}>{title}</Text>
          </View>
        </TouchableOpacity>
)

export default Button;

const styles = StyleSheet.create({
  buttonLogin: {
    paddingHorizontal: 42,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 20,
  },
});
