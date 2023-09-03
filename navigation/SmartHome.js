import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Signup from '../screens/Signup';
import LightControl from '../screens/LightControl';
import Wifi from '../screens/Wifi';
import Profil from '../screens/Profil';
import GoalForm from '../screens/GoalForm';
export default createStackNavigator({
  
  Login,
  Dashboard,
  Settings,
  LightControl
  ,Home,
   GoalForm

  ,Wifi,Signup,Profil
}, {
    initialRouteName: 'Home'
  });