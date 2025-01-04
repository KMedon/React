import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import UsersScreen from './components/UsersScreen';
import UserDetailsScreen from './components/UserDetails';
import WeatherScreen from './components/WeatherScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function UsersStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Users"
                component={UsersScreen}
                options={{ headerShown: false }} // Hide header for Users screen
            />
            <Stack.Screen
                name="UserDetails"
                component={UserDetailsScreen}
                options={{ title: 'User Details' }} // Title for UserDetails screen
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Settings') {
                            iconName = 'settings-outline';
                        } else if (route.name === 'Users') {
                            return <FontAwesome6 name='users' size={size} color={color} />;
                        } else if (route.name === 'Weather') {
                            return <Ionicons name='cloud-outline' size={size} color={color} />;
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    headerShown: false,
                    tabBarActiveTintColor: '#2f95dc',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                />
                <Tab.Screen
                    name='Users'
                    component={UsersStack} options={{ title: 'Users' }} // Title for Users tab 
                />
                <Tab.Screen
                    name='Weather'
                    component={WeatherScreen}
                />
                <Tab.Screen
                    name='Settings'
                    component={SettingsScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}