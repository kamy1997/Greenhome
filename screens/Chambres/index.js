import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text,  TouchableOpacity,  StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import MainHeader from '../../components/MainHeader';
import ScreenHeader from '../../components/ScreenHeader';
import ChambreItem from '../../components/ChambreItem';
import SectionHeader from '../../components/SectionHeader';
import { useNavigation } from '@react-navigation/native';


const Chambres = ({onLogout}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Obtenez l'objet de navigation

  const fetchChambres = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log(token);
        const response = await axios.get('https://greenhomeapi.onrender.com/api/goals/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        if (response.status === 200) {
          setGoals(response.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des goals depuis le back-end :', error);
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    onLogout();
    AsyncStorage.removeItem('token');
    console.log(AsyncStorage.getItem('token'));
  };
  
  useEffect(() => {
    fetchChambres();
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader title="Green Home" />
      <ScreenHeader mainTitle="Control Your" secondTitle="Home" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader title="Rooms" buttonTitle="See All" onPress={() => {}} />
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <ChambreItem navigation={navigation} list={goals} />
          )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  button: {
    backgroundColor: 'red', // Customize the button style as needed
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignSelf:"center",
    justifyContent: 'flex-end'
  },
  buttonText: {
    color: 'white', // Customize the text color
    textAlign: 'center',
  },
});

export default Chambres;
