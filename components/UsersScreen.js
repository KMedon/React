import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function UsersScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0); // Tracks the starting index for pagination
    const rows = 5; // Number of rows to fetch per page

    const fetchUsers = () => {
        setLoading(true);
        fetch('http://simfct2025.atwebpages.com/backend/listUsers.php?first=${first}&rows=${rows}&sortField=&sortOrder=ASC')
            .then(response => response.json())
            .then((json) => {
                if (json.result === 'success') {
                    setUsers(json.data);
                } else {
                    console.error('Failed to fetch users', json.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [first]);

    const handleNext = () => {
        setFirst((prevFirst) => prevFirst + rows);
    };

    const handlePrevious = () => {
        setFirst((prevFirst) => Math.max(prevFirst - rows, 0));
    };

    const renderUser = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Address: {item.address}</Text>
            <Text>City: {item.city}</Text>
            <Text>Born Date: {item.born_date}</Text>
            <Text>User Role: {item.user_role}</Text>
            {
            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('UserDetails', { userId: item.id })}
            >
                <Text style={styles.ButtonText}>View Details</Text>
            </TouchableOpacity>
            }
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Users List</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUser}
            />
            {/* Pagination Buttons */}
            <View style={styles.paginationContainer}>
                <TouchableOpacity
                    style={[styles.paginationButton, first === 0 && styles.disabledButton]}
                    onPress={handlePrevious}
                    disabled={first === 0} // Disable button if already on the first page
                >
                    <Text style={styles.ButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.paginationButton}
                    onPress={handleNext}
                >
                    <Text style={styles.ButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detailsButton: {
        marginTop: 10,
        backgroundColor: '#2f95dc',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '30%',
    },
    ButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    paginationButton: {
        backgroundColor: '#2f95dc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#b0b0b0',
    },
});