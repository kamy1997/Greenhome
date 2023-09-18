import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from './Icon';
import {sizes, spacing} from './themes';
import {useNavigation} from "@react-navigation/native";

const MainHeader = ({onMenuOpenChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();
  const toggleMenu = () => {
    const newIsMenuOpen = !isMenuOpen;
    setIsMenuOpen(newIsMenuOpen);

    // Appel de la fonction de rappel pour notifier le parent
    onMenuOpenChange(newIsMenuOpen);
  };


  return (
    <View style={[styles.container, {marginTop: 5}]}>
      <TouchableOpacity onPress={toggleMenu}>
        <Icon icon="Hamburger"  />
      </TouchableOpacity>
      {/* <Image
        source={require('../assets/logo.jpg')} // Remplacez le chemin par le chemin réel de votre logo
        style={styles.logo}
      /> */}
      <Icon icon="Logo" style={styles.logo} onPress={() => {navigation.navigate('Chambres')}} />
      <Icon icon="Notification" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingBottom: 5,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
  },
  logo: {
    width: 150, // Ajustez la largeur du logo selon vos besoins
    height: 50,  // Ajustez la hauteur du logo selon vos besoins
    resizeMode: 'contain',
    
  },
});

export default MainHeader;