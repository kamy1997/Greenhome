import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen, green } from '../../components/Constants';
import GREEN_HOME_LOGO from '../../assets/GREEN_HOME_LOGO.png'

const Home = (props) => {
    return (
        <Background style={{ backgroundColor: 'white'}}>
            <View style={{marginVertical: -210,paddingBottom:70, alignItems:'center', backgroundColor: 'white'}}>
                <Image resizeMode={"center"} source={GREEN_HOME_LOGO} />
                <View style={{bottom:40}}>
                <Btn bgColor='#A1E2B0FF' textColor={darkGreen} btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
            <Btn bgColor='#A1E2B0FF' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({})

export default Home;
