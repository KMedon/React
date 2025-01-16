import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    
    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image
                source={{ uri: 'https://data.pixiz.com/output/user/store/4/e/9/3/b8a31f9c1401378a4582a4f1647839e4.jpg' }}
                style={styles.backgroundImage}
            />

            {/* Logo */}
            <Image
                source={{ uri: 'https://robohash.org/example' }}
                style={styles.logo}
            />

            {/* Title */}
            <Text style={styles.header}>Choose Your Content</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('MediaList', { type: 'music' })}
                >
                    <Text style={styles.buttonText}>🎵 Music</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('MediaList', { type: 'video' })}
                >
                    <Text style={styles.buttonText}>🎥 Videos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        backgroundColor: '#2f95dc',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3,
    },
});
