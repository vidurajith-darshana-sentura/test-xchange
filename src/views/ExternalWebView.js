import React  from 'react';
import {View} from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";

const ExternalWebView = ({route})  =>{

    const navigation = useNavigation();
    const {webUrl} = route?.params;
    const {amount} = route?.amount;

    const INJECTED_JAVASCRIPT = `(function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({amount : ${amount}));
    })();`;

    return (
        <View
            style={{flex: 1}}
        >
            <FontAwesome5.Button
                name="chevron-left"
                size={20}
                backgroundColor="#fff"
                color="black"
                onPress={() => navigation.goBack()}
                paddingHorizontal={-30}
            />
            {
                webUrl ?
                    <WebView
                        injectedJavaScript={INJECTED_JAVASCRIPT}
                        source={{ uri: webUrl }}
                        style={{ marginTop: 20}}
                        onMessage={(event) => {
                            const data = JSON.parse(event.nativeEvent.data);
                            console.log(data)
                        }}
                    /> : null
            }
        </View>
    );
}

export default ExternalWebView;
