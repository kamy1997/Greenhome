import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from '../../components/Background';

import { darkGreen, green } from '../../components/Constants';
import Btn1 from '../../components/btn1';

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>Green</Text>
      <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Home</Text>
      <Btn1 bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn1 bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
     
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;