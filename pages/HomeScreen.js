import React, { useState } from 'react';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import rentals from '../data/rentals.json';
import RentalCard from '../components/RentalCard';
import { Ionicons } from '@expo/vector-icons';
import BottomTab from '../components/BottomTab';

const locations = [
    "Beirut",
    "Jounieh",
    "Dbayeh",
    "Jbeil",
    "Baabda",
    "Zgharta",
    "Tripoli",
    "Zahle",
    "Aley",
];

const HomeScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]); // Default location

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null; // Render nothing until fonts are loaded
    }

    // Filter rentals based on selected location
    const filteredRentals = rentals.filter(
        (rental) => rental.location.city === selectedLocation
    );

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.style = {
        fontFamily: 'Poppins_400Regular',
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Top Header */}
                <View style={styles.header}>
                    <View style={{ display: "flex", flexDirection: "column", width: "100" }}>
                        <Text style={styles.locationLabel}>Location</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedLocation}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                                itemStyle={{
                                    fontFamily: 'Poppins_400Regular', // Apply font to items
                                    fontSize: 16, // Adjust size as needed
                                }}
                            >
                                {locations.map((location, index) => (
                                    <Picker.Item key={index} label={location} value={location} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.notificationIcon}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Main Section */}
                <ScrollView>
                    <Text style={styles.title}>Find Your Perfect Space Today!</Text>
                    <View style={styles.banner}>
                        <Text style={styles.bannerTitle}>Unlock Your Property Potential</Text>
                        <Text style={styles.bannerSubtitle}>
                            Take the First Step—Submit Your Property Today!
                        </Text>
                        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('OnboardingScreen')}>
                            <Text style={styles.submitButtonText}>Submit Property</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Nearby Properties */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Nearby Properties</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RentalsPage')}>
                            <Text style={styles.viewAllText}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal
                        data={filteredRentals}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <RentalCard property={item} navigation={navigation} />}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    />
                </ScrollView>
            </View>
            <BottomTab navigation={navigation} activeTab="Home" />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 24,
    },
    locationLabel: {
        fontSize: 16,
        color: '#333',

    },
    pickerContainer: {
        width: 150,
        marginLeft: -26,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -10,
        fontFamily: 'Poppins_400Regular'
    },
    picker: {
        flex: 1,
        marginLeft: 10,
    },
    notificationIcon: {
        padding: 10,
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    banner: {
        backgroundColor: '#255665',
        padding: 16,
        borderRadius: 24,
        marginBottom: 24,
    },
    bannerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    bannerSubtitle: {
        color: '#FFF',
        fontSize: 14,
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    submitButtonText: {
        color: '#004C70',
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    viewAllText: {
        fontSize: 14,
        color: '#EDBD6D',
    },
    horizontalList: {
        paddingLeft: 8,
    },
});
