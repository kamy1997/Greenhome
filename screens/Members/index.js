import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Background from '../../components/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {colors, sizes} from "../../components/themes";

const Members = (props) => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchUsers = async () => {
        try {
            const userJSON = await AsyncStorage.getItem('user');
            if (userJSON) {
                const user = JSON.parse(userJSON);
                const token = user.token;
                if (token) {
                    const response = await axios.get('https://greenhomeapi.onrender.com/api/users/userspermissions', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.status === 200) {
                        setUsers(response.data);
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs depuis le backend :', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (isFocused) {
            fetchUsers();
        }
    }, [isFocused]);

    const handleUserPress = (user) => {
        navigation.navigate('ManagePermissions', { user });
    };

    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.title}>Members</Text>
                {users.map((user) => (
                    <TouchableOpacity key={user._id} style={styles.userContainer}>
                        <Text style={styles.userName}>{user.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        width:"100%",
        alignItems:"center",
        padding:50
    },
    title:{
        fontSize: 50,
        fontFamily:'Palatino',
        fontWeight:'800',
        marginBottom:50,
        textAlign:'center'
    },
    userContainer: {
        padding: 20,
        margin: 16,
        width:250,
        alignItems:"center",
        borderRadius: 8,
        borderStyle:"solid",
        backgroundColor:'#A1E2B0FF'
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Members;
