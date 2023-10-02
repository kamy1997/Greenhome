import React, { useState } from 'react';
import {View, Text, Switch, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BottomTab from "../../components/BottomTab";
import {colors} from "../../components/themes";

const ManagePermissions = ({ route }) => {
    const { user } = route.params; // Obtenir les données de l'utilisateur de la navigation
    console.log(user);
    // Créez un état local pour chaque permission
    const [permissions, setPermissions] = useState(user.permissions);

    const handlePermissionChange = async (permission, newValue) => {

        try {
            const Datauser = JSON.parse(await AsyncStorage.getItem('user'));
            const token = Datauser.token;
            if (token) {
                const requestData = {
                    userId: user._id,
                    _id: permission._id, // L'ID de la permission à mettre à jour
                    autorisation: newValue, // Nouvelle valeur d'autorisation
                };
                console.log(token);
                const response = await axios.put('https://greenhomeapi.onrender.com/api/users/updatePermission', requestData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    // Mettez à jour l'état local pour cette permission
                    const updatedPermissions = permissions.map((p) =>
                        p._id === permission._id ? { ...p, autorisation: newValue } : p
                    );
                    setPermissions(updatedPermissions);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs depuis le backend :', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.title}>Permission management for {user.name}</Text>
            {permissions.map((permission) => (
                <View key={permission.roomId} style={styles.permissionRow}>
                    <Text style={styles.name}>{permission.roomName}</Text>
                    <Switch
                        value={permission.autorisation}
                        onValueChange={(newValue) => handlePermissionChange(permission, newValue)}
                    />
                </View>
            ))}
            </ScrollView>
            <BottomTab/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        alignItems: 'center'

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign:'center',
        padding:20,
        paddingTop:60,
    },
    permissionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft:40,
        paddingRight:40,
        borderColor:'black',
        borderWidth:'2',
        borderRadius:'8',
        backgroundColor:'rgba(222,180,156,0.12)'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        padding:20,
    },
});

export default ManagePermissions;
