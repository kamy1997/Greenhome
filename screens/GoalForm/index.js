import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import MainHeader from '../../components/MainHeader';
import ScreenHeader from '../../components/ScreenHeader';
import TopPlacesCarousel from '../../components/TopPlacesCarousel';
import SectionHeader from '../../components/SectionHeader';
import TripsList from '../../components/TripsList';
import { TOP_PLACES} from '../../data';

const GoalForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token); // Ajoutez cette ligne pour voir le token dans la console
      if (token) {
        const response = await axios.get('https://greenhomeapi.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserName(response.data.name);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  };

  const fetchGoalsFromBackend = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get('https://greenhomeapi.onrender.com/api/goals/', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWU2NTE3NjFiMDBhMmM4MDQxYjZkYyIsImlhdCI6MTY5Mzc2NDAyMiwiZXhwIjoxNjk2MzU2MDIyfQ.ULYl8W53tVQRv0Uo3XbP04RYXT00yPBWouANoyWsmt0`,
          },
        });
        console.log('Response from backend:', token); // Ajoutez cette ligne pour voir la réponse du backend dans la console
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
  
  useEffect(() => {
    fetchUserData();
    fetchGoalsFromBackend();
  }, []);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <Text>Bonjour, {userName}!</Text>
      ) : (
        <Text>Connectez-vous pour afficher votre nom d'utilisateur.</Text>
      )}
      <MainHeader title="Green Home" />
      <ScreenHeader mainTitle="Control Your" secondTitle="Home" />
      <ScrollView showsVerticalScrollIndicator={false}>
      <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader title="Rooms" buttonTitle="See All" onPress={() => {}} />
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <TripsList list={goals} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default GoalForm;
