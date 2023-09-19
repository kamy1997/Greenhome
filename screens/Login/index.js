import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen } from '../../components/Constants';
import Field from '../../components/Field';
import { useNavigation } from '@react-navigation/native';
const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


    const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://greenhomeapi.onrender.com/api/users/login',
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
          const user = response.data;
          await AsyncStorage.setItem('user', JSON.stringify(user));
          Alert.alert('Success', 'Logged In Successfully');
          onLogin(); // Ajoutez cette ligne pour appeler la fonction onLogin
          navigation.navigate('Chambres');
      }
    } catch (error) {
      console.log('Error logging in:', error);
      Alert.alert('Error', 'Please check the email address and password and try again.');
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
            marginVertical: 20,
          }}
        >
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 800,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',

          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: '#A1E2B0FF',
              fontWeight: 'bold',
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
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
          <View
            style={{
              alignItems: 'flex-end',
              width: '78%',
              paddingRight: 16,
              marginBottom: 200,
            }}
          >
            <Text
              style={{
                color: darkGreen,
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Forgot Password ?
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor='#A1E2B0FF'
            btnLabel="Login"
            Press={handleLogin}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
            >
              <Text
                style={{
                  color: '#A1E2B0FF',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
