import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Video } from 'expo-video';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function MediaListScreen({ route, navigation }) {
    const { type } = route.params;
    const [mediaItems, setMediaItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const [playingItem, setPlayingItem] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true);
            const endpoint = type === 'music'
                ? 'http://simfct2025.atwebpages.com/backend/music.php'
                : 'http://simfct2025.atwebpages.com/backend/videos.php';

            try {
                const response = await fetch(endpoint);
                const json = await response.json();
                if (json.result === 'SUCCESS') {
                    setMediaItems(json.data);
                    setFilteredItems(json.data.slice(0, rowsPerPage));
                }
            } catch (error) {
                console.error('Error fetching media:', error);
            }
            setLoading(false);
        };

        fetchMedia();
    }, [type]);

    // Function to filter search results
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredItems(mediaItems.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
        } else {
            const results = mediaItems.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredItems(results.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
        }
    }, [searchQuery, page, mediaItems]);

    const handlePlay = (item) => {
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

            {/* Search Input */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search by title..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#2f95dc" />
            ) : (
                <>
                    {/* Media List */}
                    <FlatList
                        data={filteredItems}
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

                    {/* Pagination Buttons */}
                    <View style={styles.paginationContainer}>
                        <TouchableOpacity
                            style={[styles.paginationButton, page === 0 && styles.disabledButton]}
                            onPress={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                        >
                            <Text style={styles.buttonText}>⬅ Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => setPage(page + 1)}
                        >
                            <Text style={styles.buttonText}>Next ➡</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

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
    searchBar: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    paginationButton: {
        backgroundColor: '#2f95dc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#b0b0b0',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
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
