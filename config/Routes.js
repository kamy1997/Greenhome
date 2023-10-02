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
import Permissions from "../screens/Permissions";
import ManagePermissions from "../screens/ManagePermissions";
import Profile from "../screens/Profil";
import Settings from  "../screens/Settings";
import ConseilsDurable from "../screens/ConseilsDurable";
import CarbonCalculator from "../screens/CarbonCalculator";
import FAQPage from "../screens/FAQPage";
import Members from "../screens/Members";

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
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token;
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
                {isLoggedIn && isMenuOpen && <MenuLeft />}
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
                            <Stack.Screen
                                name="Chambres"
                                component={Chambres} // Use the imported component here
                                options={{ title: 'Chambres' }}
                            />

                            <Stack.Screen
                                name="Objets"
                                component={Objets} // Use the imported component here
                                options={{ title: 'Objets' }}
                                />

                            <Stack.Screen name="Profil">
                                {props => (
                                    <React.Fragment>
                                        <Profile {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="ManagePermissions">
                                {props => (
                                    <React.Fragment>
                                        <ManagePermissions {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="Members">
                                {props => (
                                    <React.Fragment>
                                        <Members {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="Permissions">
                                {props => (
                                    <React.Fragment>
                                        <Permissions {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="FAQPage" >
                                {props => (
                                    <React.Fragment>
                                        <FAQPage {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="ConseilsDurable" >
                                {props => (
                                    <React.Fragment>
                                        <ConseilsDurable {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="CarbonCalculator" >
                                {props => (
                                    <React.Fragment>
                                        <CarbonCalculator {...props} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                            <Stack.Screen name="Settings">
                                {props => (
                                    <React.Fragment>
                                        <Settings {...props} onLogout={() => setIsLoggedIn(false)} />
                                    </React.Fragment>
                                )}
                            </Stack.Screen>
                        </>
                    )}
                </Stack.Navigator>
        </GlobalSafeArea>
    );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #A1E2B0FF;
`;

export default Routes;
