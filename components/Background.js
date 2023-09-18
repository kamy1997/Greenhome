import React from 'react';
import {View, ImageBackground} from 'react-native';

const Background = ({ children }) => {
  return (
    <View>
      <View style={{ height: '100%',alignItems: "center", backgroundColor: '#A1E2B0FF' }}>
        {children}
      </View>
    </View>
  );
}

export default Background;