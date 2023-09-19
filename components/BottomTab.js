import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { shadow } from "../components/themes";
const BottomTab = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  // Fonction pour vérifier si un écran est actif
  const isScreenActive = (screenName) => {
    return route.name === screenName;
  };

  return (
    <View style={[shadow.dark, styles.bottomTab]}>
      <TouchableOpacity
        style={[
          styles.tabItem,
          isScreenActive("Chambres") && styles.activeTabItem,
        ]}
        onPress={() => navigateToScreen("Chambres")}
      >
        <Icon
          name="home"
          size={24}
          style={[isScreenActive("Chambres") && styles.activeTabIcon]}
        />
        <Text
          style={[
            styles.tabText,
            isScreenActive("Chambres") && styles.activeTabText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabItem,
          isScreenActive("Profil") && styles.activeTabItem,
        ]}
        onPress={() => navigateToScreen("Profil")}
      >
        <Icon
          name="user"
          size={24}
          style={[isScreenActive("Profil") && styles.activeTabIcon]}
        />
        <Text
          style={[
            styles.tabText,
            isScreenActive("Profil") && styles.activeTabText,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabItem,
          isScreenActive("Settings") && styles.activeTabItem,
        ]}
        onPress={() => navigateToScreen("Settings")}
      >
        <Icon
          name="cog"
          size={24}
          style={[isScreenActive("Settings") && styles.activeTabIcon]}
        />
        <Text
          style={[
            styles.tabText,
            isScreenActive("Settings") && styles.activeTabText,
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTabItem: {
    color: "#A1E2B0FF",
    // backgroundColor: "#A1E2B0FF",

    borderBottomWidth: 5, // Style pour l'onglet actif
    borderBottomColor: "#A1E2B0FF", // Couleur de l'onglet actif
  },
  activeTabIcon: {
    color: "#A1E2B0FF",
  },
  activeTabText: {
    color: "#A1E2B0FF",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default BottomTab;
