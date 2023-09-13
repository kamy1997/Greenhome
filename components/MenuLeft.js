import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";


const MainHeader = ({onLogout}) => {
    const [chambres, setChambres] = useState([]);
    const navigation = useNavigation();

    function IconChambre(type) {
        switch (type) {
            case 'cuisine':
                return 'utensils';
            case 'chambre':
                return 'bed';
            case 'salon':
                return 'couch';
            case 'WC':
                return 'toilet';
            // Ajoutez d'autres cas pour les types de but supplémentaires
            default:
                return null; // Retournez null si le type de but n'a pas d'icône correspondante
        }
    }
    const fetchChambres = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const response = await axios.get('https://greenhomeapi.onrender.com/api/goals/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                if (response.status === 200) {
                    setChambres(response.data);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des goals depuis le back-end :', error);
        }
    };

    useEffect(() => {
        fetchChambres();
    }, []);

    const handleLogout = async () => {
        onLogout();
        await AsyncStorage.removeItem('token');
    };

  return (
    <View style={[styles.container, {marginTop: 5}]}>
        <TouchableOpacity onPress={() => navigation.navigate('Chambres')}>
        <View style={styles.chambreContent}>
            <View style={styles.iconContainer}>
                <Icon name="home" size={25} color="black" style={styles.icon} />
            </View>
            <Text style={styles.title}>Home</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <Text>Rooms</Text>
        <View style={styles.chambresContent}>
            {chambres.map((item, index) => (
                <TouchableOpacity key={item._id} style={styles.chambreContent} onPress={() => navigation.navigate('Objets', { chambreData: item })}>
                    <View style={styles.iconContainer}>
                        <Icon name={IconChambre(item.type)} size={20} color="black" style={styles.icon} />
                    </View>
                    <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <View style={styles.buttonContent}>
                <Icon name="sign-out-alt" size={20} color="white"  />
                <Text style={styles.buttonText}>Déconnexion</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute', // Position absolue pour le menu
        left: 0, // Positionnez-le à gauche
        top: 0, // Positionnez-le en haut
        width: '60%', // Largeur du menu
        height: '98.8%', // Hauteur du menu
        backgroundColor: '#eef5e1', // Couleur de fond du menu
        zIndex: 1, // Z-index pour afficher le menu au-dessus du reste du contenu
        padding: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    iconContainer: {
        width: 30, // Largeur de l'icône
        paddingRight:0,
    },
    icon: {
        color:"black",
        alignSelf:"center"

    },
    title: {
        fontSize: 20,
        marginLeft: 8, // Espacement entre l'icône et le texte
        alignItems: 'center',// Alignement horizontal
    },
    button: {
        backgroundColor: 'black', // Customize the button style as needed
        padding: 10,
        borderRadius: 5,
        width: "90%",
        alignSelf: "center",
        justifyContent: 'flex-end',
        position: 'absolute', // Position absolue pour le menu
        bottom: 10,
        alignItems: 'center',// Alignement horizontal
    },
    chambresContent: {
        marginLeft: 5
    },
    chambreContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // Customize the text color
        textAlign: 'center',
        marginLeft: 8, // Espacement entre l'icône et le texte

    },
    separator: {
        height: 2,
        backgroundColor: 'gray',
        marginBottom: 15,
        bottom: -1
    },
});

export default MainHeader;