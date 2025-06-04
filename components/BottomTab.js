import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomTab = ({ navigation, activeTab }) => {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Ionicons
                    name="home-outline"
                    size={24}
                    color={activeTab === 'Home' ? '#255665' : '#A9A9A9'}
                />
                <Text
                    style={[
                        styles.tabText,
                        activeTab === 'Home' && { color: '#255665' },
                    ]}
                >
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('RentalsPage')}
            >
                <Ionicons
                    name="business-outline"
                    size={24}
                    color={activeTab === 'Rentals' ? '#255665' : '#A9A9A9'}
                />
                <Text
                    style={[
                        styles.tabText,
                        activeTab === 'Rentals' && { color: '#255665' },
                    ]}
                >
                    Rentals
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('SettingsScreen')}
            >
                <Ionicons
                    name="settings-outline"
                    size={24}
                    color={activeTab === 'Settings' ? '#255665' : '#A9A9A9'}
                />
                <Text
                    style={[
                        styles.tabText,
                        activeTab === 'Settings' && { color: '#255665' },
                    ]}
                >
                    Settings
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BottomTab;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#EAEAEA',
    },
    tabItem: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 12,
        color: '#A9A9A9',
        marginTop: 4,
    },
});
