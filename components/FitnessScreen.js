import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FitnessScreen({ navigation }) {
    const [selectedMode, setSelectedMode] = useState(null);

    const handleModeSelection = (mode) => {
        setSelectedMode(mode);
        navigation.navigate('MediaList', { type: mode === 'Running' ? 'music' : 'video' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏃 Fitness Mode</Text>
            <Text style={styles.subtitle}>Select your activity:</Text>

            <TouchableOpacity style={styles.button} onPress={() => handleModeSelection('Walking')}>
                <Text style={styles.buttonText}>🚶 Walking (Play Video)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleModeSelection('Running')}>
                <Text style={styles.buttonText}>🏃 Running (Play Music)</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    subtitle: { fontSize: 18, marginBottom: 20 },
    button: { backgroundColor: '#2f95dc', padding: 15, borderRadius: 5, marginVertical: 10 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
