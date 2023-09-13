import React, {useState} from 'react';
import axios from 'axios';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import {darkGreen} from '../../components/Constants';
import Field from '../../components/Field';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
    const [name, setName] = useState('');
    const [primary_email, setPrimary_Email] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignup = async () => {
        try {
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
                await AsyncStorage.setItem('token', token);
                Alert.alert('Success', 'Account created');
                alert('Account created');
                navigation.navigate('Chambres');
            }
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <Background>
            <View style={{alignItems: 'center', width: 460}}>
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
                    <Field placeholder="Full Name" onChangeText={setName}/>
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
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
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
