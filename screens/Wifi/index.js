import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as theme from '../../theme';

class Wifi extends Component {
    static navigationOptions = {
        headerLeft: ({ onPress }) => (
            <TouchableWithoutFeedback onPress={() => onPress()}>
                <FontAwesome size={theme.sizes.font * 1.5} color={theme.colors.black} name="arrow-left" />
            </TouchableWithoutFeedback>
        ),
        headerLeftContainerStyle: {
            paddingLeft: theme.sizes.base * 2
        },
        headerStyle: {
            borderBottomColor: 'transparent',
        }
    };

    state = {
        isWifiOn: true,
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wifiStatus}>
                    <FontAwesome size={theme.sizes.font * 4} color={this.state.isWifiOn ? theme.colors.green : theme.colors.gray2} name="wifi" />
                    <Text style={styles.wifiText}>{this.state.isWifiOn ? 'Connected' : 'Disconnected'}</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Turn Wi-Fi</Text>
                    <Switch
                        value={this.state.isWifiOn}
                        onValueChange={value => this.setState({ isWifiOn: value })}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.sizes.base * 2,
    },
    wifiStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.sizes.base * 2,
    },
    wifiText: {
        marginLeft: theme.sizes.base,
        fontSize: theme.sizes.font * 2,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switchLabel: {
        fontSize: theme.sizes.font * 1.5,
        fontWeight: 'bold',
    },
});

export default Wifi;
