import React, { useEffect, useState } from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, ScrollView, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../components/themes';
import ScreenHeader from '../../components/ScreenHeader';
import ChambreItem from '../../components/ChambreItem';
import SectionHeader from '../../components/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import BottomTab from "../../components/BottomTab";
import * as Notifications from "expo-notifications";

const Chambres = () => {
  const [chambres, setChambres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Obtenez l'objet de navigation

  const fetchChambres = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      const token = user.token;
      if (token) {
        const response = await axios.get('https://greenhomeapi.onrender.com/api/goals/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const allChambres = response.data;
          let chambresAutorisees = [];
          if (user.email === user.primary_email) {
            chambresAutorisees = allChambres;
          } else {
            chambresAutorisees = filterChambres(user.permissions, allChambres);
          }
          setChambres(chambresAutorisees);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des goals depuis le back-end :', error);
      setIsLoading(false);
    }
  };

  // Fonction pour filtrer les chambres autorisées
  const filterChambres = (permissions, allChambres) => {
    return allChambres.filter(chambre => {
      for (const permission of permissions) {
        if (permission.roomId === chambre._id && permission.autorisation === true) {
          return true; // La chambre est autorisée
        }
      }
      return false; // La chambre n'est pas autorisée
    });
  };

  useEffect(() => {
    fetchChambres();
    const getNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission pour les notifications refusée.");
      }
    };
    getNotificationPermission();

    // Configure un gestionnaire pour gérer les notifications reçues en arrière-plan
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));

        // Accédez aux données de la notification
        const recipientEmail = notification.request.content.data?.recipient;

        // Vérifiez si l'utilisateur a un email et primary_email identiques
        if (recipientEmail && recipientEmail === user.primary_email) {
          console.log("L'utilisateur a un email et primary_email sont identiques.");
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
          // Traitez la notification destinée à l'utilisateur ici
        } else {
          console.log(
              "L'utilisateur n'a pas un email et primary_email identiques ou la notification n'est pas destinée à l'utilisateur."
          );
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
        }
      },
    });
  }, []);


  const handleNotification = async () => {
    const userEmail = "azzabihaythem97@gmail.com"; // Remplacez par le primary_email de l'utilisateur

    // Génère une notification lorsque le bouton est cliqué
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nouvelle notification",
        body: "Ceci est le contenu de la notification.",
        data: { recipient: userEmail }, // Utilisez le primary_email de l'utilisateur comme destinataire
      },
      trigger: null, // Vous pouvez spécifier un délai ou une condition pour déclencher la notification
    });

    setIsLoading(true);
    // Attendez quelques secondes (simulant un chargement)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
      <View style={styles.container}>
        <ScreenHeader mainTitle="Control Your" secondTitle="Home" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SectionHeader title="Rooms" buttonTitle="See All" onPress={() => {}} />
          {!isLoading ? (
              <Button title="Envoyer une notification" onPress={handleNotification} />
            ) : (
              <ChambreItem navigation={navigation} list={chambres} />

            )}
          <SectionHeader title="Corridor" buttonTitle="" onPress={() => {}} />
          <ChambreItem navigation={navigation} list={chambres} />
        </ScrollView>
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

export default Chambres;
