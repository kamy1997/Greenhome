import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bject = ({ route }) => {
  const { goalId } = route.params;
  const [objects, setObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchObjects = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`https://greenhomeapi.onrender.com/api/objects/${goalId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setObjects(response.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des objets associés au goal :', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Objects Associated with Goal</Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={objects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.objectItem}>
              <Text>{item.name}</Text>
              <Text>Type: {item.type}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  objectItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 8,
  },
});

export default object;
