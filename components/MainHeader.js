import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from './Icon';
import {sizes, spacing} from './themes';
import {useNavigation} from "@react-navigation/native";

const MainHeader = ({onMenuOpenChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <Text style={styles.title}>GreenHome</Text>
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
});

export default MainHeader;