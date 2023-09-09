import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen, green } from '../../components/Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>Green</Text>
      <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Home</Text>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;