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
    paddingTop: spacing.l* 2,
    paddingBottom: spacing.l
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '800',
    fontStyle: 'normal',
    color: '#1C1B1A',
  },
  secondTitle: {
    color: '#6D6966',
    fontSize: 14,
    fontWeight: 200,
    fontStyle: 'normal',


  },
});

export default ScreenHeader;