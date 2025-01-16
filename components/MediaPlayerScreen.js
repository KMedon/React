import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-video';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function MediaListScreen({ route, navigation }) {
    const { type } = route.params;
    const [mediaItems, setMediaItems] = useState([]);
    const [playingItem, setPlayingItem] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchMedia = async () => {
            const endpoint = type === 'music'
                ? 'http://simfct2025.atwebpages.com/backend/music.php'
                : 'http://simfct2025.atwebpages.com/backend/videos.php';

            try {
                const response = await fetch(endpoint);
                const json = await response.json();
                if (json.result === 'SUCCESS') {
                    setMediaItems(json.data);
                }
            } catch (error) {
                console.error('Error fetching media:', error);
            }
        };

        fetchMedia();
    }, [type]);

    const handlePlay = async (item) => {
        console.log("Attempting to play:", item.url);
        setPlayingItem(item);
    };

    // Extract YouTube Video ID from URL
    const getYouTubeID = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{type === 'music' ? '🎵 Music List' : '🎥 Video List'}</Text>

            <FlatList
                data={mediaItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handlePlay(item)}
                    >
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Video Player */}
            {type === 'video' && playingItem && (
                <View style={styles.videoContainer}>
                    {getYouTubeID(playingItem.url) ? (
                        <YoutubePlayer
                            height={300}
                            play={true}
                            videoId={getYouTubeID(playingItem.url)}
                        />
                    ) : (
                        <Video
                            ref={videoRef}
                            source={{ uri: playingItem.url }}
                            style={styles.video}
                            useNativeControls
                            resizeMode="contain"
                            shouldPlay
                        />
                    )}
                </View>
            )}

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>⬅ Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        padding: 15,
        backgroundColor: '#2f95dc',
        borderRadius: 5,
        marginVertical: 5,
    },
    itemText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    videoContainer: {
        width: '100%',
        height: 300,
        marginTop: 20,
    },
    video: {
        width: '100%',
        height: 300,
    },
    backButton: {
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#333',
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
