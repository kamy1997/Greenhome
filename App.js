import React from "react";

import { createAppContainer } from "react-navigation";

// import SmartHome from './navigation/SmartHome';

// export default createAppContainer(SmartHome);
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import GoalForm from "./screens/GoalForm";
import "react-native-gesture-handler";
import { View, Text, Image } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                }}
              >
                {/* <Image
                    source={User}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 65
                    }}
                  /> */}
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: "bold",
                    color: "#111",
                  }}
                >
                  Isabella Joanna
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#111",
                  }}
                >
                  Product Manager
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            color: "#111",
          },
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Dashboard",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
          component={Dashboard}
        />
        <Drawer.Screen
          name="GoalForm"
          options={{
            drawerLabel: "GoalForm",
            title: "GoalForm",
            drawerIcon: () => (
              <MaterialIcons name="timer" size={20} color="#808080" />
            ),
          }}
          component={GoalForm}
        />
        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: "Login",
            title: "Login",
            drawerIcon: () => (
              <MaterialIcons name="timer" size={20} color="#808080" />
            ),
          }}
          component={Login}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
