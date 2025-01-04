// components/MyButton.js
import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

const MyButton = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
});

export default MyButton;
