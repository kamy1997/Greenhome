import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import MainHeader from '../../components/MainHeader';
import SectionHeader from '../../components/SectionHeader';
import ChambreItem from "../../components/ChambreItem";
import { useRoute } from '@react-navigation/native';
import ObjetItem from "../../components/ObjetItem";


const Objets = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    const route = useRoute();
    const { chambreId } = route.params;
  console.log(chambreId)
  const fetchObjects = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token) {
        const response = await axios.get(`https://greenhomeapi.onrender.com/api/goals/${chambreId}/objects/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setObjects(response.data);
          setIsLoading(false);
          console.log(response)
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des goals depuis le back-end :', error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader title="Green Home" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader title="Objets connécté" buttonTitle="See All" onPress={() => {}} />
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
