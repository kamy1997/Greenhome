import 'react-native-gesture-handler';
import Routes from './config/Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from "@react-navigation/native";
import {useState} from "react";
import {Amplify} from "aws-amplify";
import awsconfig from "./src/aws-exports";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    Amplify.configure(awsconfig);

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
