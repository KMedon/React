import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

export default function UserDetailsScreen({ route }) {
    const { userId } = route.params;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://simfct2025.atwebpages.com/backend/findUser.php?id=${userId}')
            .then(response => response.json())
            .then((json) => {
                if (json.result === 'success' && json.data.length > 0) {
                    setUser(json.data[0]);
                } else {
                    console.error('Failed to fetch user details', json.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.errorcontainer}>
                <Text style={styles.errorText}>User Details not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.userName}>{user.name}</Text>
            <Image
                style={styles.userImage}
                source={{ uri: user.image }}
            />
            <Text>Email: {user.email}</Text>
            <Text>Address: {user.address}</Text>
            <Text>City: {user.city}</Text>
            <Text>Born Date: {user.born_date}</Text>
            <Text>User Role: {user.user_role}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 20,
    },
});