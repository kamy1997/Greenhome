import 'react-native-gesture-handler';
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from './app.json';

const appEntryPoint = () => App; // Fonction qui renvoie le composant racine de votre application

AppRegistry.registerComponent(appName, appEntryPoint);
