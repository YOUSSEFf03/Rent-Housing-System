import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const ButtonComponent = ({ iconLeft, text, iconRight, color = 'primary', onPress, customeStyle = {} }) => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null; // Return nothing if fonts are not loaded
    }

    const textColor = {
        primary: '#143843',
        secondary: '#FFF',
        tertiary: '#40C4FF',
    }[color];

    return (
        <TouchableOpacity
            style={[styles.button, styles[color], customeStyle]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
            {text && <Text style={[styles.text, { color: textColor }]}>{text}</Text>}
            {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </TouchableOpacity>
    );
};

export default ButtonComponent;

const styles = StyleSheet.create({
    button: {
        // flex: 1,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 100,
    },
    text: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular', // Ensure Poppins is installed or use a default font
        fontWeight: '500',
        margin: 0,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    primary: {
        backgroundColor: '#FFCE7D',
        color: '#143843',
    },
    secondary: {
        backgroundColor: '#255665',
        color: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 24
    },
    tertiary: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#40C4FF',
        color: '#40C4FF',
    },
});
