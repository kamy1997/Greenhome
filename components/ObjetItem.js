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
import Icon from 'react-native-vector-icons/FontAwesome'; // Importez la bibliothèque des icônes
import Paho from "paho-mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
  const [value, setValue] = useState();
  const [Sensor, setSensor] = useState('0');
  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/led") {
      setValue(parseInt(message.payloadString))
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
      },
      onFailure: () => {
        console.log("Failed to connect!");
      },
    };
    client.onMessageArrived = onMessage;
    // Vérifier si le client est déjà connecté avant de tenter une nouvelle connexion
    if (!client.isConnected()) {
      client.connect(connectOptions);
    }
    }, []);

  const filteredList = list.filter(item => item.type === "lampe");
  const initialIsOnState = filteredList.reduce((acc, item) => {
    acc[item._id] = item.value; // Set the default state to false for each item
    return acc;
  }, {});
  const [isOn, setIsOn] = useState(initialIsOnState);
  const toggleDevice = async (item) => {
    const {_id, port, type, value} = item; // Destructure the properties from the item object
    const newState = !isOn[_id]; // Inverser l'état actuel (allumé/éteint)


    const messagePayload = `{"port" : "${port}", "type" : "${type}" , "value" : ${newState ? true : false}}`;
    const message = new Paho.Message(messagePayload);
    message.destinationName = "mqtt-async-test/led";
    client.send(message);

    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      const token = user.token;
      if (token) {
        const requestData = {
          _id: item._id, // L'ID de la permission à mettre à jour
          value: newState, // Nouvelle valeur d'autorisation
        };
        console.log(requestData);

        const response = await axios.put('https://greenhomeapi.onrender.com/api/objects', requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Mettez à jour l'état local pour cette permission
          setIsOn((prevState) => ({
            ...prevState,
            [_id]: newState,
          }));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs depuis le backend :', error);
    }
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
          numColumns={2} // Définissez le nombre de colonnes sur 2
          data={list}
          key={(item) => item._id}
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
              <TouchableOpacity
                  style={[
                    styles.card,
                    shadow.dark,
                    { backgroundColor: isOn[item._id] ? "#A1E2B0FF" : "white" },
                  ]}
                  onPress={() => toggleDevice(item)}
              >
                <View style={styles.titleContainer}>
                  <Text style={styles.onOffText}>
                    {isOn[item._id] ? "On" : "Off"}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon
                      name={IconChambre(item.type)}
                      size={90}
                      color={isOn[item._id] ? colors.green : colors.gray}
                  />
                </View>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                  {/* <Text style={styles.fuelRate}>
                        Taux de carburant : {fuelRate.toFixed(2)} L/h
                      </Text> */}
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
              </TouchableOpacity>
            </>
              );
            } else if (item.type === "capteur") {
              content = (
                  <>
                    <View style={[styles.card, shadow.dark]}>
                      <Text style={styles.temperature}>
                        {Math.floor(Sensor.temperature)} °C
                      </Text>
                      <View style={styles.titleBox}>
                        <Text style={styles.title}>TEMPERATURE</Text>
                        <View style={styles.iconContainerTemp}>
                          <Icon name="thermometer" size={80} color= {colors.green} />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.card2, shadow.dark]}>
                      <Text style={styles.temperature}>
                        {Math.floor(Sensor.humidity)} %
                      </Text>
                      <View style={styles.titleBox}>
                        <Text style={styles.title}>HUMIDITY</Text>
                        <View style={styles.iconContainerTemp}>
                          <Icon name="tint" size={80} color={colors.green} />
                        </View>
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
                <TouchableOpacity key={item._id} style={styles.container}>
                {content}
                </TouchableOpacity>
                </>
            );
          }}
      />
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.light,
    marginLeft: spacing.l,
    flexDirection: "row"
  },
  card: {
    width: CARD_WIDTH * 0.5,
    height: CARD_HEIGHT,
    marginVertical: 10,
    borderRadius: 25,
    padding: 15,
    backgroundColor: colors.white,
    flexDirection: "column", // Utilisez une disposition en ligne pour organiser les éléments horizontalement
  },
  card2: {
    width: CARD_WIDTH * 0.5,
    height: CARD_HEIGHT,
    marginVertical: 10,
    marginHorizontal:25,
    borderRadius: 25,
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
  fuelRate: {
    fontSize: sizes.h6,
    color: colors.gray,
  },
});

export default ObjetItem;