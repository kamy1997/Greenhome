import 'react-native-gesture-handler';
import Routes from './config/Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from "@react-navigation/native";
import {useState} from "react";


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
