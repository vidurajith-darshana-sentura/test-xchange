import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput as Input,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {greenColor, secondaryDarkColor} from '../styles/constants';

const TextField = ({errorMsg, value, onChangeText, placeholder, spyMode, onFocus, editable=true}) => {

    const [hidePassword,setHidePassword] = useState(spyMode);

    const showHidePassword = () => {
        const icoImage = !hidePassword ? 'eye' : 'eye-slash';
        return (
            <View style={{position: 'absolute', end: 0, top: 32}}>
                <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}>
                    <Icon
                        style={{marginEnd: 12}}
                        name={icoImage}
                        size={24}
                        color="#20B2AA"
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>
            <Text
                style={styles.text}>
                {errorMsg}
            </Text>
            <Input
                value={value}
                editable={editable}
                onFocus={onFocus ? onFocus : ()=>{}}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={hidePassword}
                style={styles.inputForm}
            />
            {spyMode && showHidePassword()}
        </View>
    );
}

const styles = StyleSheet.create({
    inputForm: {
        backgroundColor:"#F8F8FF",
        borderRadius: 10,
        paddingHorizontal: 12,
        color: "#000000",
        borderColor: greenColor,
        borderWidth: 1
    },
    text: {
        color: secondaryDarkColor,
        fontSize: 12,
        marginStart: 12,
        marginBottom: 4,
    }
});

export default TextField;
