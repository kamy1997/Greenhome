import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as theme from '../../theme';

class LightControl extends Component {
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
        intensity: 50,
        isOn: true,
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lightStatus}>
                    <FontAwesome size={theme.sizes.font * 4} color={this.state.isOn ? theme.colors.yellow : theme.colors.gray2} name="lightbulb-o" />
                    <Text style={styles.intensityText}>{this.state.intensity}%</Text>
                </View>
                <Slider
                    value={this.state.intensity}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor={theme.colors.accent}
                    minimumTrackTintColor={theme.colors.accent}
                    maximumTrackTintColor={theme.colors.gray2}
                    onValueChange={value => this.setState({ intensity: value })}
                />
                <TouchableWithoutFeedback onPress={() => this.setState({ isOn: !this.state.isOn })}>
                    <View style={[styles.powerButton, { backgroundColor: this.state.isOn ? theme.colors.green : theme.colors.red }]}>
                        <Text style={styles.powerButtonText}>{this.state.isOn ? 'Turn Off' : 'Turn On'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.sizes.base * 2,
    },
    lightStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.sizes.base * 2,
    },
    intensityText: {
        marginLeft: theme.sizes.base,
        fontSize: theme.sizes.font * 2,
        fontWeight: 'bold',
    },
    powerButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        borderRadius: theme.sizes.radius,
        marginTop: theme.sizes.base * 2,
    },
    powerButtonText: {
        color: '#A7A7A7',
        fontSize: theme.sizes.font,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LightControl;
