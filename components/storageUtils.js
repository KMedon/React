import AsyncStorage from '@react-native-async-storage/async-storage';

// Save preference
export const savePreference = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error("Error saving preference:", error);
    }
};

// Get saved preference
export const getPreference = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error("Error retrieving preference:", error);
        return null;
    }
};
