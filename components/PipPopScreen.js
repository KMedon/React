import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PipPopScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎵 PipPop Mode</Text>
            <Text style={styles.subtitle}>Select your experience:</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Weather Mode')}>
                <Text style={styles.buttonText}>🌦️ Weather Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fitness Mode')}>
                <Text style={styles.buttonText}>🏃 Fitness Mode</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    subtitle: { fontSize: 18, marginBottom: 20 },
    button: { backgroundColor: '#2f95dc', padding: 15, borderRadius: 5, marginVertical: 10, width: '80%', alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
