import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { createGoal, getGoals, deleteGoal } from '../../features/goals/goalService'

function GoalForm() {
  const [text, setText] = useState('');
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const token = 'yourAuthToken'; // Replace with your authentication token

  useEffect(() => {
    // Load goals when the component mounts
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setIsLoading(true);
    try {
      const response = await getGoals(token);
      setGoals(response);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
    setIsLoading(false);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await createGoal({ text }, token);
      setGoals([...goals, response]);
      setText('');
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
    setIsLoading(false);
  };

  const onDelete = async (goalId) => {
    setIsLoading(true);
    try {
      await deleteGoal(goalId, token);
      setGoals(goals.filter((goal) => goal._id !== goalId));
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <View>
      <Text>Chambre</Text>
      <TextInput
        value={text}
        onChangeText={(value) => setText(value)}
        placeholder="Enter goal text"
      />
      <Button title="Ajouter une chambre" onPress={onSubmit} />

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error: {message}</Text>}
      {isSuccess && (
        <FlatList
          data={goals}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.text}</Text>
              <Button title="Delete" onPress={() => onDelete(item._id)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

export default GoalForm;
