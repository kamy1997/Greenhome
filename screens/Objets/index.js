import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import SectionHeader from '../../components/SectionHeader';
import { useRoute } from '@react-navigation/native';
import ObjetItem from "../../components/ObjetItem";
import BottomTab from "../../components/BottomTab";

const Objets = () => {
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { chambreData } = route.params;
  const chambreName = chambreData["name"];
  const chambreId = chambreData["_id"];
  const [newState, setNewState] = useState(false); // État pour déclencher le rechargement des objets

  const handleValueChange = (newState) => {
    console.log(newState);
    setNewState(newState); // Mettre à jour l'état newState pour déclencher le rechargement des objets
  };

  const fetchObjects = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      const token = user.token;
      if (token) {
        const response = await axios.get(`https://greenhomeapi.onrender.com/api/objects/${chambreId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setObjects(response.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des goals depuis le back-end :', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, [route.params.chambreData, newState]);

  return (
      <View style={styles.container}>
        <SectionHeader title={chambreName.toUpperCase()} buttonTitle="See All" onPress={() => {}} />
        {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
        ) : (
            <ObjetItem list={objects} onValueChange={handleValueChange} />
        )}
        <BottomTab/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default Objets;
