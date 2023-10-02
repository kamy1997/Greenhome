import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {colors, shadow, sizes, spacing} from '../../components/themes';
import ScreenHeader from '../../components/ScreenHeader';
import ChambreItem from '../../components/ChambreItem';
import SectionHeader from '../../components/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import BottomTab from "../../components/BottomTab";
import * as Notifications from "expo-notifications";
import Paho from "paho-mqtt";
import Icon from "react-native-vector-icons/FontAwesome";

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
const helloEmoji = "👋";

const Chambres = () => {
  const [userName, setUserName] = useState();
  const [chambres, setChambres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(false);
  const [sensor, setSensor] = useState('');
  const navigation = useNavigation();
  const client = useRef(null);

  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/sensor"){
      setSensor(JSON.parse(message.payloadString))
    }
  }

  const toggleDevice = () => {
    const newValue = !value; // Toggle the current value
    setValue(newValue);// Update the local state with the new value
    const messagePayload = `{"port" : "16", "type" : "lampe" , "value" : ${newValue}}`;
    const message = new Paho.Message(messagePayload);
    message.destinationName = "mqtt-async-test/led";
    client.current.send(message);
  }

  const fetchChambres = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      setUserName(user.name);
      const token = user.token;
      if (token) {
        const response = await axios.get('https://greenhomeapi.onrender.com/api/goals/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const allChambres = response.data;
          let chambresAutorisees = [];
          if (user.email === user.primary_email) {
            chambresAutorisees = allChambres;
          } else {
            chambresAutorisees = filterChambres(user.permissions, allChambres);
          }
          setChambres(chambresAutorisees);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const filterChambres = (permissions, allChambres) => {
    return allChambres.filter(chambre => {
      for (const permission of permissions) {
        if (permission.roomId === chambre._id && permission.autorisation === true) {
          return true;
        }
      }
      return false;
    });
  };

  useEffect(() => {
    fetchChambres();

    // Initialize the MQTT client here
    client.current = new Paho.Client(
        "3527a7805748411f8bbb7517ba9191d5.s1.eu.hivemq.cloud",
        Number(8884),
        `mqtt-async-test-${parseInt(Math.random() * 100)}`
    );

    const connectOptions = {
      userName: "GreenHome",
      password: "GreenHome2023",
      useSSL: true,
      onSuccess: () => {
        console.log("Connected!");
        client.current.subscribe("mqtt-async-test/led");
        client.current.subscribe("mqtt-async-test/sensor");
      },
      onFailure: () => {
        console.log("Failed to connect!");
      },
    };

    client.current.onMessageArrived = onMessage;

    if (!client.current.isConnected()) {
      client.current.connect(connectOptions);
    }
  }, []); // Empty dependency array to run this effect only once

  return (

      <View style={styles.container}>
        <ScreenHeader mainTitle={`Hello ${userName} ${helloEmoji}`} secondTitle="Anything I can help you with ?" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SectionHeader title="Rooms" buttonTitle="See All" onPress={() => {}} />
          {isLoading ? (
              <ActivityIndicator size="large" color={colors.green} /> // Show loading indicator
            ) : (
              <ChambreItem navigation={navigation} list={chambres} />
            )}
          <SectionHeader title="Corridor" buttonTitle="" onPress={() => {}} />

          <View style={styles.corridor}>
            <TouchableOpacity style={[styles.card, shadow.dark, { backgroundColor: value ? "#A1E2B0FF" : "white" },]} onPress={toggleDevice} >
            <View style={styles.titleContainer}>
              <Text style={styles.onOffText}>
                {value ? "On" : "Off"}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name={"lightbulb-o"} size={90} color={ value ? colors.green : colors.gray}/>
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.title}>Lampe</Text>
            </View>
            <View style={styles.switchContainer}>
              <View>
                <Switch
                    value={value} // Use the item's _id to access the correct state in isOn
                    onValueChange={toggleDevice} // Use the toggleDevice function directly
                    trackColor={{ false: colors.gray, true: colors.green }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={[styles.card, shadow.dark]}>
            <Text style={styles.temperature}>
              {Math.floor(sensor.temperature)} °C
            </Text>
            <View style={styles.titleBox}>
              <Text style={styles.title}>TEMPERATURE</Text>
              <View style={styles.iconContainerTemp}>
                <Icon name="thermometer" size={80} color= {colors.green} />
              </View>
            </View>
          </View>
          </View>
        </ScrollView>
        <BottomTab/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  card: {
    width: CARD_WIDTH * 0.5,
    height: CARD_HEIGHT,
    marginVertical: 10,
    borderRadius: 25,
    margin:20,
    padding: 15,
    backgroundColor: colors.white,
    flexDirection: "column", // Utilisez une disposition en ligne pour organiser les éléments horizontalement
  },
  temperature: {
    fontSize: 40,
    fontWeight :"700",
    textAlign: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  iconContainerTemp:{
    alignItems: "center",
    flex: 10,
    marginTop : 10
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 30, // Faites en sorte que l'icône prenne plus de place
    marginTop : 10

  },
  titleBox: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 2, // Faites en sorte que le titre prenne plus de place
  },
  title: {
    position: "absolute",
    // bottom: 7,
    // fontSize: 15,
    // width:110
    marginVertical: 70, // Marge de 70 unités verticalement
    marginBottom: 10, // Marge de 10 unités en bas    fontSize: 18,
    textAlign: "center",
  },
  onOffText: {
    fontSize: sizes.h3,
    color: colors.black,
    fontWeight: "bold",
    margin : 3
  },
  switchContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  corridor: {
    flexDirection: 'row',
    alignSelf:"center",
  },
});

export default Chambres;
