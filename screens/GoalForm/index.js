import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView ,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import MainHeader from '../../components/MainHeader';
import ScreenHeader from '../../components/ScreenHeader';
import TopPlacesCarousel from '../../components/TopPlacesCarousel';
import SectionHeader from '../../components/SectionHeader';


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
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Supprimez le token d'authentification
      setIsAuthenticated(false); // Réinitialisez l'état d'authentification
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };
  const fetchGoalsFromBackend = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
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
  
  useEffect(() => {
    fetchUserData();
    fetchGoalsFromBackend();
  }, []);

  return (
    <View style={styles.container}>
     
      <MainHeader title="Green Home" />
      {isAuthenticated && (
    <TouchableOpacity onPress={logout}>
      <Text style={styles.logoutButton}>Déconnexion</Text>
    </TouchableOpacity>
  )}
      <ScreenHeader mainTitle="Control Your" secondTitle="Home" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader title="Rooms" buttonTitle="See All" onPress={() => {}} />
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <TopPlacesCarousel list={goals} />
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
  logoutButton: {
    color: 'red', // Couleur du texte du bouton de déconnexion
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15, // Espacement du bouton par rapport au titre
  },
});

export default GoalForm;
