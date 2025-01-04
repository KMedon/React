import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { API_KEY } from '../utils/WeatherAPIKey';
import Weather from './Weather';

export default class WeatherScreen extends React.Component {
    state = {
        isLoading: true,
        weatherData: null,
        error: null,
    };

    async componentDidMount() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({ error: 'Permission to access location was denied' });
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        this.fetchWeather(latitude, longitude);
    }

    fetchWeather = (lat, lon) => {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        )
            .then((res) => res.json())
            .then((json) => {
                this.setState({ weatherData: json, isLoading: false });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ error: 'Failed to fetch weather data', isLoading: false });
            });
    };

    render() {
        const { isLoading, weatherData, error } = this.state;

        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Fetching weather data...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>{error}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Weather weatherData={weatherData} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
