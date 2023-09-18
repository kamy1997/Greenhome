import React, { useState } from 'react';
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
import { green } from './Constants';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

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
  const { navigation, list } = props;

  const [isOn, setIsOn] = useState({}); // État local pour gérer l'allumage/éteignage

  const toggleDevice = (id) => {
    setIsOn((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Inverse l'état actuel (allumé/éteint)
    }));
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

        return (
          <TouchableOpacity
            key={item._id}
            style={{
              marginLeft: spacing.l,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}
          >
            <View style={[styles.card, shadow.dark]}>
              <View style={styles.titleContainer}>
                <Text style={styles.onOffText}>
                  {isOn[item._id] ? 'On' : 'Off'}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  name={IconChambre(item.type)}
                  size={60}
                  color={isOn[item._id] ? colors.green : colors.gray}
                />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                <Text style={styles.fuelRate}>
                  Taux de carburant : {fuelRate.toFixed(2)} L/h
                </Text>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={isOn[item._id]}
                  onValueChange={() => toggleDevice(item._id)}
                  trackColor={{ false: colors.gray, true: colors.green }}
                />
              </View>
            </View>
          </TouchableOpacity>
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
    fontSize: sizes.h4,
    fontWeight: 'bold',
    color: colors.black,
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
