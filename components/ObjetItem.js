import React, {useEffect, useState} from 'react';

import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { colors, shadow, sizes, spacing } from './themes';
import FavoriteButton from './FavoriteButton';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importez la bibliothèque des icônes
import Paho from "paho-mqtt";
import {useNavigation} from "@react-navigation/native";

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

let client;
client = new Paho.Client(
    "3527a7805748411f8bbb7517ba9191d5.s1.eu.hivemq.cloud",
    Number(8884),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

function IconChambre(type) {
  switch (type) {
    case 'lampe':
      return 'lightbulb-o'; // Icône de la lampe
    case 'chambre':
      return 'bed'; // Icône de la chambre
    case 'capteur':
      return 'signal'; // Icône du capteur
    case 'WC':
      return 'toilet'; // Icône des toilettes
    default:
      return 'question'; // Icône par défaut en cas de type inconnu
  }
}

const ObjetItem = (props) => {
  const { list } = props;
  const [value, setValue] = useState(false);
  const [Sensor, setSensor] = useState('');

  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/led") {
      setValue(parseInt(message.payloadString))
      console.log(message.payloadString);
    }
    if (message.destinationName === "mqtt-async-test/sensor"){
      setSensor(JSON.parse(message.payloadString))
    }
  }

  useEffect(() => {
    const connectOptions = {
      userName: "GreenHome", // Your username
      password: "GreenHome2023", // Your password
      useSSL:true,
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("mqtt-async-test/led");
        client.subscribe("mqtt-async-test/sensor");
        client.onMessageArrived = onMessage;
      },
      onFailure: () => {
        console.log("Failed to connect!");
      },
    };

    // Vérifier si le client est déjà connecté avant de tenter une nouvelle connexion
    if (!client.isConnected()) {
      client.connect(connectOptions);
    }
    }, []);


  const initialIsOnState = list.reduce((acc, item) => {
    acc[item._id] = false; // Set the default state to false for each item
    return acc;
  }, {});

  const [isOn, setIsOn] = useState(initialIsOnState);
  const toggleDevice = (item) => {
    const { _id, port, type } = item; // Destructure the properties from the item object
    const newState = !isOn[_id]; // Inverser l'état actuel (allumé/éteint)
    setIsOn((prevState) => ({
      ...prevState,
      [_id]: newState,
    }));

    const messagePayload = `{"port" : "${port}", "type" : "${type}" , "value" : "${newState ? '1' : '0'}"}`;
    const message = new Paho.Message(messagePayload);
    message.destinationName = "mqtt-async-test/led";
    client.send(message);
  };


  const calculateFuelRate = (type) => {
    switch (type) {
      case 'lampe':
        return 0.1; // Exemple : taux de carburant pour une lampe
      case 'chambre':
        return 0.2; // Exemple : taux de carburant pour une chambre
      case 'capteur':
        return 0.05; // Exemple : taux de carburant pour un capteur
      case 'WC':
        return 0.15; // Exemple : taux de carburant pour des toilettes
      default:
        return 0.0; // Aucun carburant par défaut pour un type inconnu
    }
  };

  return (
      <FlatList
          data={list}
          horizontal
          snapToInterval={CARD_WIDTH_SPACING}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            const fuelRate = calculateFuelRate(item.type);

            let content;

            if (item.type === "lampe") {
              content = (
            <>
                  <View style={[styles.card, shadow.dark]}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.onOffText}>
                        {isOn[item] ? 'On' : 'Off'}
                      </Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Icon
                          name={IconChambre(item.type)}
                          size={60}
                          color={isOn[item] ? colors.green : colors.gray}
                      />
                    </View>
                    <View style={styles.titleBox}>
                      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                      <Text style={styles.fuelRate}>
                        Taux de carburant : {fuelRate.toFixed(2)} L/h
                      </Text>
                    </View>
                    <View style={styles.switchContainer}>
                      <View>
                        <Switch
                            value={isOn[item._id]} // Use the item's _id to access the correct state in isOn
                            onValueChange={() => toggleDevice(item)}
                            trackColor={{ false: colors.gray, true: colors.green }}
                        />
                      </View>
                    </View>
                  </View>
            </>
              );
            } else if (item.type === "capteur") {
              content = (
                  <>
                    <View style={[styles.card, shadow.dark]}>
                      <Text style={styles.temperature}>{Math.floor(Sensor.temperature)}</Text>
                      <Text>C</Text>
                      <View style={styles.titleBox}>
                        <Text style={styles.title}>TEMPERATURE</Text>
                      </View>
                    </View>
                    <View style={[styles.card, shadow.dark]}>
                      <Text style={styles.temperature}>{Math.floor(Sensor.humidity)}%</Text>
                      <Text></Text>
                      <View style={styles.titleBox}>
                        <Text style={styles.title}>HUMIDITY</Text>
                      </View>
                    </View>
                  </>
              );
            } else {
              content = (
                <>
                  <View>

                  </View>
                </>
              );
            }

            return (
                <>
                <TouchableOpacity
                    key={item._id}
                    style={{
                      marginLeft: spacing.l,
                      marginRight: index === list.length - 1 ? spacing.l : 0,
                    }}
                >
                {content}
                </TouchableOpacity>
                </>
            );
          }}
      />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH * 0.5,
    height: CARD_HEIGHT,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    backgroundColor: colors.white,
    flexDirection: 'row', // Utilisez une disposition en ligne pour organiser les éléments horizontalement
  },
  temperature:{
    fontSize:65,
    textAlign:"center"
  },
  titleContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2, // Faites en sorte que l'icône prenne plus de place
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2, // Faites en sorte que le titre prenne plus de place
  },
  title: {
    position: 'absolute',
    bottom: 7,
    fontSize: 15,
    width:110
  },
  onOffText: {
    fontSize: sizes.h4,
    color: colors.black,
    fontWeight: 'bold',
  },
  switchContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  fuelRate: {
    fontSize: sizes.h6,
    color: colors.gray,
  },
});

export default ObjetItem;