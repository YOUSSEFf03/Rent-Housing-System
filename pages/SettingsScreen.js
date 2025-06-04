import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTab from '../components/BottomTab';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerSettings}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
            </View>

            {/* About Link */}
            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('AboutScreen')}
            >
                <Ionicons name="information-circle-outline" size={24} color="#333" />
                <Text style={styles.linkText}>About</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#B0B0B0" />
            </TouchableOpacity>

            {/* Contact Link */}
            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('ContactScreen')}
            >
                <Ionicons name="call-outline" size={24} color="#333" />
                <Text style={styles.linkText}>Contact</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#B0B0B0" />
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    headerSettings: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 150,
        marginTop: 30,
        marginBottom: 30
    },
    backButton: {
        width: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        // marginBottom: 20,
        marginTop: 0
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 16,
    },
    linkText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
        color: '#333',
    },
});
