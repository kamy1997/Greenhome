import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const ConseilsDurable = () => {
  const conseilsDurables = [
    {
      category: "Réduction des déchets",
      text: "Utilisez des sacs réutilisables pour faire vos courses.",
      image: require('../../assets/Bedroom.png'), // Chemin de l'image
    },
    {
      category: "Consommation d'énergie",
      text: "Éteignez les lumières lorsque vous quittez une pièce.",
      image: require('../../assets/Bedroom.png'), // Chemin de l'image
    },
    {
      category: "Mobilité durable",
      text: "Privilégiez les transports en commun ou le covoiturage.",
      image: require('../../assets/Bedroom.png'), // Chemin de l'image
    },
    // Ajoutez d'autres conseils avec des images ici.
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={conseilsDurables}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.conseilContainer}>
            <Image source={item.image} style={styles.conseilImage} />
            <Text style={styles.conseilText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white'
  },
  conseilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  conseilImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    resizeMode: 'contain', // Ajustez le mode selon vos besoins
  },
  conseilText: {
    flex: 1,
    fontSize: 16,
  },
});

export default ConseilsDurable;