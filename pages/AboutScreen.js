import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About Us</Text>
            </View>

            {/* Content */}
            <ScrollView style={styles.content}>
                <Text style={styles.aboutText}>
                    In the face of unimaginable loss and displacement caused by the ravages of war, we saw a pressing need for hope, stability, and belonging. What began as a simple idea—to connect those without homes to those with spaces to offer—has grown into a mission-driven platform dedicated to making a difference. At HomeNest, we believe that a home is more than just four walls; it’s a foundation for rebuilding dreams, reuniting families, and fostering resilience. Guided by compassion and innovation, our story is one of bringing communities together, empowering individuals to reclaim their lives, and proving that even in the darkest times, there’s always a way to rebuild and thrive.
                </Text>
            </ScrollView>
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#255665',
        height: 180,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 40
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    content: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20, // To create the curved overlapping effect
    },
    aboutText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 24,
        marginBottom: 16,
        textAlign: "justify"
    },
});
