import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from './themes';
const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;
import Cuisine from "../assets/Cuisine.png";
import Chambre from "../assets/Bedroom.png";
import Salon from "../assets/salon.png";
import WC from "../assets/WC.png";

function ImageChambre(type) {
  switch (type) {
    case 'cuisine':
      return Cuisine;
    case 'chambre':
      return Chambre;
    case 'salon':
      return Salon;
    case 'WC':
      return WC;
      // Ajoutez d'autres cas pour les types de but supplémentaires
    default:
      return null; // Retournez null si le type de but n'a pas d'icône correspondante
  }
}
const ChambreItem = (props) => {
  const { navigation, list } = props; // Obtenez config à partir de props

  return (
      <FlatList
          data={list}
          horizontal
          snapToInterval={CARD_WIDTH_SPACING}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item._id} // Convertir l'ID en chaîne de caractères
          renderItem={({ item, index }) => {

            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Objets', { chambreData: item })}
                    key={item._id} // Convertir l'ID en chaîne de caractères
                    style={{
                      marginLeft: spacing.l,
                      marginRight: index === list.length - 1 ? spacing.l : 0,
                    }}
                >
                  <View style={[styles.card, shadow.dark]}>
                    <View style={styles.imageBox}>
                      <Image style={styles.image} source={ImageChambre(item.type)} />
                    </View>
                    <View style={styles.titleBox}>
                      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
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
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
    ...StyleSheet.absoluteFillObject, // Pour occuper toute la vue parente
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur noire avec une opacité de 0.5 (50%)
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 40,
    right: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default ChambreItem;