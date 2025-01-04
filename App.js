import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MyButton from './components/MyButton';
import UserDetailsScreen from './components/UserDetails';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  const [message, setMessage] = useState("Welcome to Pip-Pop!");

  const handlePress = () => {
    setMessage("You just popped Pip-Pop! 🎉");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pip-Pop</Text>
      <Text style={styles.message}>{message}</Text>
      <MyButton title="Pop Me!" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
});

