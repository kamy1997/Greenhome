import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen } from '../../components/Constants';
import Field from '../../components/Field';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import zxcvbn from 'zxcvbn'; // Importez la bibliothèque zxcvbn

const Signup = () => {
    const [name, setName] = useState('');
    const [primary_email, setPrimary_Email] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = async () => {
        try {
            // Vérifiez la force du mot de passe avec zxcvbn
            const passwordCheck = zxcvbn(password);

            // Exigez que le mot de passe ait au moins 8 caractères
            if (password.length < 8) {
                Alert.alert('Mot de passe trop court', 'Le mot de passe doit avoir au moins 8 caractères.');
                return;
            }

            // Exigez l'utilisation de caractères spéciaux, majuscules et chiffres
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
                Alert.alert('Mot de passe faible', 'Le mot de passe doit inclure des caractères spéciaux, des majuscules et des chiffres.');
                return;
            }

            if (passwordCheck.score < 2) {
                Alert.alert('Mot de passe faible', 'Veuillez choisir un mot de passe plus fort.');
                return;
            }

            const response = await axios.post(
                'https://greenhomeapi.onrender.com/api/users',
                {
                    name,
                    email,
                    primary_email,
                    password,
                }
            );

            if (response.status === 200) {
                const token = response.data.token;
                if (token !== null && token !== undefined) {
                    await AsyncStorage.setItem('token', token);
                    Alert.alert('Succès', 'Compte créé avec succès');
                    navigation.navigate('Chambres');
                } else {
                    // Gérez le cas où token est null ou undefined
                }
            }
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
        }
    };

    return (
        <Background>
            <View style={{ alignItems: 'center', width: 460 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 64,
                        fontWeight: 'bold',
                        marginTop: 20,
                    }}
                >
                    Register
                </Text>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 19,
                        fontWeight: 'bold',
                        marginBottom: 20,
                    }}
                >
                    Create a new account
                </Text>
                <View
                    style={{
                        backgroundColor: 'white',
                        height: 700,
                        width: 460,
                        borderTopLeftRadius: 130,
                        paddingTop: 50,
                        alignItems: 'center',
                    }}
                >
                    <Field placeholder="Full Name" onChangeText={setName} />
                    <Field
                        placeholder="Email Principal"
                        keyboardType="email-address"
                        onChangeText={setPrimary_Email}
                    />
                    <Field
                        placeholder="Email / Username"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                    />
                    <Field
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                    <Btn
                        textColor="white"
                        bgColor={darkGreen}
                        btnLabel="Signup"
                        Press={handleSignup}
                    />
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Already have an account?{' '}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text
                                style={{
                                    color: darkGreen,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    );
};

export default Signup;
