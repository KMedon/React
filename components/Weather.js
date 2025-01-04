import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Weather = ({ weatherData }) => {
    const {
        main: { temp, feels_like, humidity, temp_min, temp_max },
        weather,
        wind: { speed },
        sys: { sunrise, sunset, country },
        name,
    } = weatherData;

    const formatTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const WeatherCard = ({ icon, title, value }) => (
        <View style={styles.card}>
            <MaterialCommunityIcons name={icon} size={40} color="#4a90e2" style={styles.icon} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardValue}>{value}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.location}>
                    {name}, {country}
                </Text>
            </View>
            <View style={styles.cardsContainer}>
                <WeatherCard icon="thermometer" title="Temperature" value={`${Math.round(temp)}°C`} />
                <WeatherCard icon="thermometer-lines" title="Feels Like" value={`${Math.round(feels_like)}°C`} />
                <WeatherCard icon="water" title="Humidity" value={`${humidity}%`} />
                <WeatherCard icon="weather-windy" title="Wind Speed" value={`${speed} m/s`} />
                <WeatherCard icon="thermometer-chevron-up" title="Max Temp" value={`${Math.round(temp_max)}°C`} />
                <WeatherCard icon="thermometer-chevron-down" title="Min Temp" value={`${Math.round(temp_min)}°C`} />
                <WeatherCard icon="weather-sunset-up" title="Sunrise" value={formatTime(sunrise)} />
                <WeatherCard icon="weather-sunset-down" title="Sunset" value={formatTime(sunset)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
    },
    location: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4a90e2',
    },
    cardsContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    card: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    icon: {
        marginRight: 15, // Space between the icon and the text content
    },
    cardContent: {
        flex: 1, // Ensures content takes remaining space
        flexDirection: 'row', // Align items in a row
        justifyContent: 'space-between', // Spread title and value
        alignItems: 'center', // Center items vertically
    },
    cardTitle: {
        fontSize: 16,
        color: '#4a90e2',
    },
    cardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'right', // Align the value to the right
        backgroundColor: 'transparent', // Ensure no background color
    },
});


export default Weather;
