import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './ThemeContext';

export default function PreferencesScreen() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [favoriteContent, setFavoriteContent] = useState(null);

    // Load saved preferences on mount
    useEffect(() => {
        const loadPreferences = async () => {
            const savedContent = await AsyncStorage.getItem('favoriteContent');
            if (savedContent) {
                setFavoriteContent(savedContent);
            }
        };
        loadPreferences();
    }, []);

    // Save favorite content preference
    const handleContentSelection = async (contentType) => {
    setFavoriteContent(contentType);
    await AsyncStorage.setItem('favoriteContent', contentType);
};


    return (
        <View style={[styles.container, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
            <Text style={[styles.header, theme === 'dark' ? styles.darkText : styles.lightText]}>Preferences</Text>

            {/* Theme Switch */}
            <View style={styles.optionContainer}>
                <Text style={[styles.optionText, theme === 'dark' ? styles.darkText : styles.lightText]}>
                    Dark Mode
                </Text>
                <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>

            {/* Favorite Content Selection */}
            <Text style={[styles.optionText, theme === 'dark' ? styles.darkText : styles.lightText]}>
                Favorite Content Type:
            </Text>
            <View style={styles.buttonContainer}>
                {['Music', 'Videos'].map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[styles.button, favoriteContent === type && styles.selectedButton]}
                        onPress={() => handleContentSelection(type)}
                    >
                        <Text style={styles.buttonText}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    darkBackground: { backgroundColor: '#333' },
    lightBackground: { backgroundColor: '#f5f5f5' },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    darkText: { color: '#fff' },
    lightText: { color: '#000' },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    optionText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#2f95dc',
        padding: 10,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: '#1c6cb3',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
