import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen } from '../../components/Constants';
import Field from '../../components/Field';
import { TextField } from '../../components/TextField';
import Inputs from '../../components/Inputs';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

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
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        Alert.alert('Success', 'Logged In Successfully');
        // Redirect or navigate to a logged-in page
        props.navigation.navigate('GoalForm');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
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
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: darkGreen,
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
          <TextField
          secureTextEntry
          accessibilityHint="{strings.login.passwordHint}"
          accessibilityLabel="{strings.login.password}"
          autoCapitalize="none"
          onChangeText={setPassword}
          placeholder= "password"
          textContentType="password"
          value={password}
        />
        
        {/* <Inputs></Inputs> */}
        <Inputs
            // onChangeText={text => handleOnchange(text, 'email')}
            // onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            // error={errors.email}
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
            bgColor={darkGreen}
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
              onPress={() => props.navigation.navigate('Signup')}
            >
              <Text
                style={{
                  color: darkGreen,
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
