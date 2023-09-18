import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import styled from 'styled-components';
import Chambres from '../screens/Chambres';
import Home from '../screens/Home';
import Objets from '../screens/Objets';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MainHeader from "../components/MainHeader";
import MenuLeft from "../components/MenuLeft";
import Dashboard from "../screens/Dashboard";

const Stack = createNativeStackNavigator();

const Routes = ({ onIsLoggedInChange }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(true);
    const navigation = useNavigation(); // Obtenez la config actuelle

    const handleMenuOpenChange = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            setIsMenuOpen(!isMenuOpen);
        });

        // Déclaration de token
        const getTokenAndCheck = async () => {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                AsyncStorage.getItem('token')
                    .then(token => {
                        setIsLoggedIn(true);
                        onIsLoggedInChange(true); // Appel de la fonction de rappel pour transmettre la valeur
                    })
                    .catch(err => {
                        console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
                    });
            } else {
                navigation.navigate("Login");
            }
        };

        getTokenAndCheck();

        return unsubscribe;
    }, []);


    return (
        <GlobalSafeArea>
                {isLoggedIn && <MainHeader title="Green Home" onMenuOpenChange={handleMenuOpenChange} />}
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false, // Masque le header par défaut
                    }}>
                    {!isLoggedIn ? (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Login">
                                {props => (
                                    <Login {...props} onLogin={() => setIsLoggedIn(true)} />
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="Signup" component={Signup} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Chambres">
                                {props => (
                                    <React.Fragment>
                                        {isMenuOpen && <MenuLeft onLogout={() => setIsLoggedIn(false)} />}
                                        <Chambres {...props}  />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="Objets">
                                {props => (
                                    <React.Fragment>
                                        {isMenuOpen && <MenuLeft onLogout={() => setIsLoggedIn(false)} />}
                                        <Objets {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="Dashboard" component={Dashboard} />

                        </>
                    )}
                </Stack.Navigator>
        </GlobalSafeArea>
    );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #A1E2B0FF;
  width: ;
`;


export default Routes;
