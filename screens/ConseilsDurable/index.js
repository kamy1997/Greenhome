import React from 'react';
import { View, Text, Image, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, darkGreen } from "../../components/Constants";
import { useNavigation } from "@react-navigation/native";
const ConseilsDurable = () => {
  const navigation = useNavigation();
  const conseilsDurables = [
    {
      category: "Réduction des déchets",
      text: "Utilisez des sacs réutilisables pour faire vos courses.",
      image: require('../../assets/fofo.jpg'),
    },
    {
      category: "Consommation d'énergie",
      text: "Éteignez les lumières lorsque vous quittez une pièce.",
      image: require('../../assets/fifi.jpg'),
    },
    {
      category: "Mobilité durable",
      text: "Privilégiez les transports en commun ou le covoiturage.",
      image: require('../../assets/ff.jpg'),
    },
    // Ajoutez d'autres conseils avec des images ici.
  ];

  const renderConseil = ({ item }) => (
    <Animatable.View animation="fadeInUp" delay={100} style={styles.conseilContainer}>
      
      <Image source={item.image} style={styles.conseilImage} />
      <View style={styles.conseilTextContainer}>
        <Text style={styles.conseilText}>{item.text}</Text>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      
      <View
        style={{
          marginHorizontal: 12,

          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={28}
            color={COLORS.black}
            style={{marginTop: 20}}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h1,  fontFamily: 'Palatino',fontWeight:'700', marginTop: 15,marginBottom: 30, }}>ConseilsDurables</Text>
       
      </View>
      <Text style={{ fontSize: 16, fontWeight: '300', marginBottom: 16 ,textAlign:'center'}}> 🌿 Découvrez nos conseils simples pour un mode de vie plus durable. Ensemble, nous pouvons créer un avenir plus vert et préserver notre belle planète. Commencez dès aujourd'hui ! 🌎💚" </Text>
      <FlatList
        data={conseilsDurables}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderConseil}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  conseilContainer: {
    marginTop: 30,
    backgroundColor: 'black', // Couleur de fond avec opacité
    borderRadius: 10,
    overflow: 'hidden', // Masquer tout débordement d'enfant
  },
  conseilImage: {
    width: '100%', // L'image prend toute la largeur du parent
    height: 200, // Hauteur fixe de l'image
  },
  conseilTextContainer: {
    padding: 16,
  },
  conseilText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // Couleur du texte
  },
});

export default ConseilsDurable;