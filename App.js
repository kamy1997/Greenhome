import React, { useState } from 'react';
import Routes from './config/Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from "@react-navigation/native";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleIsLoggedInChange = (value) => {
        setIsLoggedIn(value);
    };

    return (

        <SafeAreaProvider>
            <NavigationContainer>
            <Routes onIsLoggedInChange={handleIsLoggedInChange} />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};


export default App;
