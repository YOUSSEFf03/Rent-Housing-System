import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="call-outline" size={24} color="#255665" />
                        <Text style={styles.contactButtonText}>Call Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="mail-outline" size={24} color="#255665" />
                        <Text style={styles.contactButtonText}>Email Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#255665" />
                        <Text style={styles.contactButtonText}>Chat</Text>
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <Text style={styles.formTitle}>Contact Us</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#B0B0B0"
                    />
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="+961 00 000 000"
                        placeholderTextColor="#B0B0B0"
                        keyboardType="phone-pad"
                    />
                    <Text style={styles.label}>Topic</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your topic"
                        placeholderTextColor="#B0B0B0"
                    />
                    <Text style={styles.label}>Message</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter your message"
                        placeholderTextColor="#B0B0B0"
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#255665',
    },
    header: {
        height: 180,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    content: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    contactButton: {
        backgroundColor: '#F8F9FA',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    contactButtonText: {
        marginTop: 8,
        color: '#255665',
        fontSize: 12,
        textAlign: 'center',
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#255665',
        marginBottom: 16,
        textAlign: 'center',
    },
    form: {
        marginBottom: 16
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        height: 48,
        fontSize: 14,
        color: '#333',
        marginBottom: 16,
    },
    textArea: {
        height: 96,
        textAlignVertical: 'top', // Aligns text to the top in multiline input
    },
    submitButton: {
        backgroundColor: '#255665',
        borderRadius: 16,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
