import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from './Icon';
import {sizes, spacing} from './themes';

const MainHeader = ({title}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {marginTop: 5}]}>
      <Icon icon="Hamburger" onPress={() => {}} />
      
      <Text style={styles.title}>{title}</Text>
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
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain', // Ajustez la hauteur du logo selon vos besoins
  },
});

export default MainHeader;