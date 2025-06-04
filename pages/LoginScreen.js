import React, { useState } from 'react';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ButtonComponent from '../components/Button';
import users from '../data/users.json';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Find the user in the users.json
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            // Redirect based on role
            if (user.role === 'landlord') {
                navigation.navigate('LandlordDashboard', { user });
            } else {
                Alert.alert('Login Failed', 'User role not supported.');
            }
        } else {
            // Invalid credentials
            Alert.alert('Login Failed', 'Invalid email or password.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#B0B0B0"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#B0B0B0"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#B0B0B0"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.rememberMeContainer}>
                    <TouchableOpacity style={styles.circle} />
                    <Text style={styles.optionText}>Remember me</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.optionText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <ButtonComponent
                text="Log-in"
                color="primary"
                onPress={handleLogin}
            />
            <Text style={styles.orText}>Or</Text>
            <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="black" />
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="black" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    backButton: {
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        borderRadius: 100,
        color: '#333',
    },
    iconWrapper: {
        marginLeft: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        marginRight: 8,
    },
    optionText: {
        fontSize: 14,
        color: '#666',
    },
    loginButton: {
        backgroundColor: '#FFCE7D',
        paddingVertical: 12,
        borderRadius: 100,
        alignItems: 'center',
        // marginBottom: 20,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    orText: {
        marginTop: 20,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingVertical: 12,
        borderRadius: 100,
        marginBottom: 10,
    },
    socialButtonText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
});
