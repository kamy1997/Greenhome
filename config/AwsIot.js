import Paho from "paho-mqtt";
import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';

let client;
client = new Paho.Client(
    "3527a7805748411f8bbb7517ba9191d5.s1.eu.hivemq.cloud",
    Number(8884),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export default function App() {
    const [value, setValue] = useState(0);
    const [Sensor, setSensor] = useState('');

    function onMessage(message) {
        if (message.destinationName === "mqtt-async-test/valuee") {
            setValue(parseInt(message.payloadString))
        }
        if (message.destinationName === "mqtt-async-test/NN"){
            setSensor(message.payloadString)
        }
    }

    useEffect(() => {
        const connectOptions = {
            userName: "GreenHome", // Your username
            password: "GreenHome2023", // Your password
            useSSL:true,
            onSuccess: () => {
                console.log("Connected!");
                client.subscribe("mqtt-async-test/valuee");
                client.subscribe("mqtt-async-test/NN");
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {
                console.log("Failed to connect!");
            },
        };

        client.connect(connectOptions);
    }, []);

    function changeValue() {
        const message = new Paho.Message((value + 1).toString());
        message.destinationName = "mqtt-async-test/valuee";
        client.send(message);
    }

    return (
        <View style={styles.container}>
            <Text>Value is: {value}</Text>
            <Text>Value is: {Sensor}</Text>
            <Button onPress={() => { changeValue(); }} title="Press Me" />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
