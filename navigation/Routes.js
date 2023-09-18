import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import styled from 'styled-components';
import Chambres from '../screens/Chambres';
import Home from '../screens/Home';
import Objets from '../screens/Objets';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import EditProfile from '../screens/EditProfile';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('token')
        .then(token => {
          setIsLoggedIn(true);
          console.log(token);
        })
        .catch(err => {
          console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
        });
  }, []);

  return (
      <GlobalSafeArea>
        <NavigationContainer>
          {isLoggedIn ? (
              <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}>
                <Stack.Screen name="Chambres">
                  {props => (
                      <Chambres {...props} onLogout={() => setIsLoggedIn(false)}  />
                  )}
                </Stack.Screen>
                <Stack.Screen
                    options={{
                      headerShown: true,
                    }}
                    name="Objets"
                    component={Objets}
                />
                 <Stack.Screen name="EditProfile" component={EditProfile} />

                {/* Ajoutez cette ligne */}
              </Stack.Navigator>
          ) : (
              <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Login">
                      {props => (
                          <Login {...props} onLogin={() => setIsLoggedIn(true)} />
                      )}
                  </Stack.Screen>
                  <Stack.Screen name="Signup" component={Signup} />
                 

              </Stack.Navigator>
          )}
        </NavigationContainer>
      </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #a1e2b0;
`;


export default Routes;
