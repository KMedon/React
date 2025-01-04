import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
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

            {/* Main Content */}
            <View style={styles.mainContent}>
                <Text style={styles.text}>Welcome to the Home Screen!!</Text>

                {/* Horizontal Buttons */}
                <View style={styles.horizontalContainer}>
                    <TouchableOpacity style={styles.buttonPlaceholder}>
                        <Text style={styles.buttonText}>Button 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPlaceholder}>
                        <Text style={styles.buttonText}>Button 2</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 40,
        zIndex: 10,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    buttonPlaceholder: {
        backgroundColor: '#2f95dc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.5,
        zIndex: 0,
    },
});
