import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import * as Notifications from "expo-notifications";

const Chambres = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Demande la permission de l'utilisateur pour les notifications
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
        // Accédez aux données de la notification
        const recipientEmail = notification.request.content.data?.recipient;

        // Vérifiez si l'utilisateur a un email et primary_email identiques
        if (recipientEmail && recipientEmail === "azzabihaythem97@gmail.com") {
          console.log("L'utilisateur a un email et primary_email sont identiques.");
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
          // Traitez la notification destinée à l'utilisateur ici
        } else {
          // L'utilisateur n'a pas un email et primary_email identiques
          console.log(
            "L'utilisateur n'a pas un email et primary_email identiques ou la notification n'est pas destinée à l'utilisateur."
          );
          // Traitez la notification de l'administrateur ici
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Appuyez sur le bouton pour envoyer une notification.</Text>
        <Button title="Envoyer une notification" onPress={handleNotification} />
        {isLoading && (
          <View style={styles.loading}>
            <Text>Chargement en cours...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loading: {
    marginTop: 20,
  },
});

export default Chambres;
