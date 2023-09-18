import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import SectionHeader from '../../components/SectionHeader';
import { useRoute } from '@react-navigation/native';
import ObjetItem from "../../components/ObjetItem";

const Objets = () => {
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { chambreData } = route.params;
  const chambreName = chambreData["name"];
  const chambreId = chambreData["_id"];
  const fetchObjects = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`https://greenhomeapi.onrender.com/api/goals/${chambreId}/objects/`, {
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
  }, [route.params.chambreData]); // Assurez-vous d'ajouter `route.params.chambreData` comme dépendance

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader title={chambreName.toUpperCase()} buttonTitle="See All" onPress={() => {}} />
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
            <ObjetItem list={objects} />
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

export default Objets;
