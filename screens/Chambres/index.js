import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text,  TouchableOpacity,  StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import ScreenHeader from '../../components/ScreenHeader';
import ChambreItem from '../../components/ChambreItem';
import SectionHeader from '../../components/SectionHeader';
import { useNavigation } from '@react-navigation/native';


const Chambres = () => {
  const [chambres, setChambres] = useState([]);
 
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const navigation = useNavigation(); // Obtenez l'objet de config
  

  const fetchChambres = async () => {
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
          setChambres(response.data);
         
          
          setIsLoading(false);
         
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des goals depuis le back-end :', error);
      setIsLoading(false);
    }
  };
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get('https://greenhomeapi.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        if (response.status === 200) {
          setUsername(response.data.name);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur depuis le back-end :', error);
    }
  };
  useEffect(() => {
    fetchChambres();
    fetchUser();
  }, []);
  const helloEmoji = "👋";
  return (
    <View style={styles.container}>
      <ScreenHeader mainTitle={`Hello ${username} ${helloEmoji}`} secondTitle="Anything I can help you with ?" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader title="Rooms" buttonTitle="See All" onPress={() => {}} />
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <ChambreItem navigation={navigation} list={chambres} />
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

export default Chambres;