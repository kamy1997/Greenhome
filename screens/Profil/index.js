import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen } from '../../components/Constants';
import Field from '../../components/Field';
const Profil = (props) => {
  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Edit Profile
        </Text>
        {/* Ajoutez les champs de modification de profil ici */}
        <Field placeholder="First Name" />
        <Field placeholder="Last Name" />
        <Field placeholder="Email" keyboardType={'email-address'} />
        {/* ... Ajoutez d'autres champs de profil à modifier ... */}
        
        {/* Bouton pour enregistrer les modifications */}
        <Btn
          textColor="white"
          bgColor={darkGreen}
          btnLabel="Save Changes"
          Press={() => {
            alert('Profile updated');
            // Naviguer vers la page de profil ou une autre page si nécessaire
            props.navigation.navigate('Profil');
          }}
        />

        {/* Bouton pour annuler les modifications et retourner au profil */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profil')}>
          <Text
            style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default Profil;
