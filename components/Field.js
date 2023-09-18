import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 10, color: darkGreen, paddingHorizontal: 10, width: '78%',height:'8%', backgroundColor: 'rgba(72,255,0,0.06)', marginVertical: 12}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};

export default Field;