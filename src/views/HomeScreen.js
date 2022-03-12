import React, { Component } from 'react'
import { View, Text,StyleSheet, Alert, Touchable } from 'react-native'
import { greenColor } from '../styles/constants'
import SwitchSelector from 'react-native-switch-selector'
import SellerMode from '../views/modes/SellerMode'
import BuyerMode from '../views/modes/BuyerMode'
const options = [
    { label: "buyer", value: true },
    { label: "seller", value: false },
];
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: "",
            isBuyer: true,
        }
    }
    setOption(option) {
        this.setState({ option: options })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                    <View style={styles.content}>
                        <Text style={styles.headerText}>Home</Text>
                    </View>

                    <SwitchSelector
                        fontSize={15}
                        textStyle={{ fontWeight: "bold", }}
                        selectedTextStyle={{ fontWeight: "bold" }}
                        textColor={greenColor}
                        style={{ marginTop: 15 }}
                        options={options}
                        initial={0}
                        onPress={value => {
                            this.setState({
                                ...this.state,
                                isBuyer: value
                                });
                        }}
                        hasPadding
                        buttonColor={greenColor}
                    />

                  <View>
                      {
                          this.state?.isBuyer ? <BuyerMode /> : <SellerMode />
                      }
                  </View>




                </View>
            </View>
        )
    }
}

export default HomeScreen;


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
        marginTop: 20,
        width: "100%"
    },
    headerText: {
        fontSize: 28,
        color: "#000000",
        fontWeight: "bold",
        marginTop: 5
    }
})
