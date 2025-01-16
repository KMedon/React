import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import HomeScreen from './components/HomeScreen';
import PreferencesScreen from './components/SettingsScreen';
import UsersScreen from './components/UsersScreen';
import UserDetailsScreen from './components/UserDetails';
import WeatherScreen from './components/WeatherScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from './components/ThemeContext';
import MediaListScreen from './components/MediaPlayerScreen';
import FitnessScreen from './components/FitnessScreen';
import PipPopScreen from './components/PipPopScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function UsersStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UsersList"
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

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MediaList" component={MediaListScreen} />
        </Stack.Navigator>
    );
}

function PipPopStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PipPop Home" component={PipPopScreen} />
            <Stack.Screen name="Weather Mode" component={WeatherScreen} />
            <Stack.Screen name="Fitness Mode" component={FitnessScreen} />
            <Stack.Screen name="MediaList" component={MediaListScreen} /> 
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <ThemeProvider>
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
                            } else if (route.name === 'UsersStack') {
                                return <FontAwesome6 name='users' size={size} color={color} />;
                            } else if (route.name === 'PipPop') {
                                return <Ionicons name='happy-outline' size={size} color={color} />;
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
                        component={HomeStack}
                    />
                    <Tab.Screen
                        name='UsersStack'
                        component={UsersStack} options={{ title: 'Users' }} // Title for Users tab 
                    />
                    <Tab.Screen
                        name='PipPop'
                        component={PipPopStack}
                    />
                    <Tab.Screen
                        name='Settings'
                        component={PreferencesScreen}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </ThemeProvider>
        );
    }