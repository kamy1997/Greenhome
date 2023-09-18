import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {sizes, spacing} from './themes';
const ScreenHeader = ({mainTitle, secondTitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{mainTitle}</Text>
      <Text style={styles.secondTitle}>{secondTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  mainTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    fontfamily: 'Montserrat',
    fontstyle: 'normal',
    lineHeight: '32px',
    color: '#1C1B1A',
  },
  secondTitle: {
    color: '#6D6966',
    fontSize: '9px',
    fontWeight: '500',
    fontfamily: 'Montserrat',
    fontstyle: 'normal',
    lineHeight: '32px',

  },
});

export default ScreenHeader;