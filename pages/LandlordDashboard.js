import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Modal, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import rentals from '../data/rentals.json';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

const LandlordDashboard = ({ route }) => {
    const { user } = route.params; // Logged-in user data
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddPropertyVisible, setIsAddPropertyVisible] = useState(false);
    const [properties, setProperties] = useState(rentals);  // Assuming 'rentals' is initially loaded

    // Form states for adding a property
    const [propertyName, setPropertyName] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [locationLink, setLocationLink] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [surfaceArea, setSurfaceArea] = useState('');
    const [furnished, setFurnished] = useState('');
    const [rentAmount, setRentAmount] = useState('');
    const [deposit, setDeposit] = useState('');
    const [availableFrom, setAvailableFrom] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const propertyTypeData = [
        { label: 'Apartment', value: 'apartment' },
        { label: 'House', value: 'house' },
        { label: 'Condo', value: 'condo' },
        { label: 'Townhouse', value: 'townhouse' },
        { label: 'Studio', value: 'studio' },
    ];

    const furnishedData = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ];

    const filteredProperties = rentals.filter(
        (property) =>
            property.contact.email === user.email &&
            property.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderPropertyCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.images[0].url }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.propertyName}>{item.propertyName}</Text>
                <Text style={styles.location}>{item.location.city}, {item.location.country}</Text>
                <Text style={styles.price}>${item.pricing.rent} / {item.pricing.rateUnit}</Text>
            </View>
        </View>
    );

    const handleSubmit = () => {
        const newProperty = {
            id: new Date().getTime(), // Unique ID based on timestamp
            propertyName,
            location: {
                address,
                city,
                state,
                zipCode,
                country: 'Lebanon', // You can hardcode the country or make it dynamic
                locationLink
            },
            propertyType,
            features: {
                bedrooms,
                bathrooms,
                surfaceArea: {
                    value: surfaceArea,
                    unit: 'sqm' // You can adjust the unit as needed
                },
                furnished,
                parking: false, // Assuming default, adjust if needed
                petsAllowed: false, // Assuming default, adjust if needed
                amenities: [] // You can add amenities here if needed
            },
            pricing: {
                rent: rentAmount,
                rateUnit: 'month',
                deposit,
                advancePayment: null,
                currency: 'USD',
                paymentMethods: ['Whish', 'OMT', 'Cash']
            },
            property_about: 'Lorem ipsum dolor sit amet...',
            utilitiesCoveredByLandlord: [
                { utility: 'Electricity', coverage: 'partial', limit: 50, unit: 'USD' },
                { utility: 'Water', coverage: 'full', limit: null, unit: null },
                { utility: 'Internet', coverage: 'partial', limit: 30, unit: 'USD' },
                { utility: 'Gas', coverage: 'none', limit: 0, unit: null }
            ],
            images: [
                { url: 'https://example.com/image1.jpg', alt: 'Living room with sofa and TV' },
                { url: 'https://example.com/image2.jpg', alt: 'Modern kitchen with stainless steel appliances' },
                { url: 'https://example.com/image3.jpg', alt: 'Cozy bedroom with queen-sized bed' },
                { url: 'https://example.com/image4.jpg', alt: 'Luxury classic bedroom suite' }
            ],
            availability: {
                availableFrom: availableFrom.toISOString().split('T')[0],
                minimumRentDuration: {
                    value: 3,
                    unit: 'months'
                }
            },
            'reserved-dates': [

            ],
            status: 'available',
            contact: {
                id: 1,
                profile_img: '/assets/default-profile.png',
                name: 'Youssef Farah',
                email: user.email,
                phone: '+96181333444',
                socialMedia: {
                    facebook: 'facebook.com/youssef',
                    linkedin: 'linkedin.com/in/youssef'
                }
            }
        };

        setProperties(prevProperties => [...prevProperties, newProperty]);

        console.log('Property Added:', newProperty);

        setIsAddPropertyVisible(false);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user.name}!</Text>
            <Text style={styles.subtitle}>Your Listed Properties</Text>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#B0B0B0" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search your properties"
                    placeholderTextColor="#B0B0B0"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Property List */}
            {filteredProperties.length > 0 ? (
                <FlatList
                    data={filteredProperties}
                    renderItem={renderPropertyCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.propertyList}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text style={styles.noProperties}>No properties found.</Text>
            )}

            {/* Add Property Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsAddPropertyVisible(true)} // Show the Add Property form
            >
                <Ionicons name="add-outline" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Add Property Form Modal */}
            <Modal
                visible={isAddPropertyVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAddPropertyVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* Modal Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setIsAddPropertyVisible(false)} style={styles.closeButton}>
                                <Ionicons name="close-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Add Property</Text>
                        </View>

                        <ScrollView style={styles.formContainer}>
                            <Text style={styles.formTitle}>Property Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Property Name"
                                value={propertyName}
                                onChangeText={setPropertyName}
                            />

                            <Text style={styles.formTitle}>Property Type</Text>
                            <Dropdown
                                data={propertyTypeData}
                                labelField="label"
                                valueField="value"
                                value={propertyType}
                                onChange={item => setPropertyType(item.value)}
                                placeholder="Select Property Type"
                                style={styles.dropdown}
                                selectedTextStyle={styles.dropdownText}
                            />

                            <Text style={styles.formTitle}>Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Address"
                                value={address}
                                onChangeText={setAddress}
                            />

                            <Text style={styles.formTitle}>City</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter City"
                                value={city}
                                onChangeText={setCity}
                            />

                            <Text style={styles.formTitle}>State</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter State"
                                value={state}
                                onChangeText={setState}
                            />

                            <Text style={styles.formTitle}>Zip Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Zip Code"
                                value={zipCode}
                                onChangeText={setZipCode}
                            />

                            <Text style={styles.formTitle}>Location Link</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Location Link"
                                value={locationLink}
                                onChangeText={setLocationLink}
                            />

                            <Text style={styles.formTitle}>Bedrooms</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Number of Bedrooms"
                                keyboardType="numeric"
                                value={bedrooms}
                                onChangeText={setBedrooms}
                            />

                            <Text style={styles.formTitle}>Bathrooms</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Number of Bathrooms"
                                keyboardType="numeric"
                                value={bathrooms}
                                onChangeText={setBathrooms}
                            />

                            <Text style={styles.formTitle}>Surface Area (sqm)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Surface Area in sqm"
                                keyboardType="numeric"
                                value={surfaceArea}
                                onChangeText={setSurfaceArea}
                            />

                            <Text style={styles.formTitle}>Furnished</Text>
                            <Dropdown
                                data={furnishedData}
                                labelField="label"
                                valueField="value"
                                value={furnished}
                                onChange={item => setFurnished(item.value)}
                                placeholder="Select Furnished"
                                style={styles.dropdown}
                                selectedTextStyle={styles.dropdownText}
                            />

                            <Text style={styles.formTitle}>Rent Amount</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Rent Amount"
                                keyboardType="numeric"
                                value={rentAmount}
                                onChangeText={setRentAmount}
                            />

                            <Text style={styles.formTitle}>Deposit</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Deposit Amount"
                                keyboardType="numeric"
                                value={deposit}
                                onChangeText={setDeposit}
                            />

                            <Text style={styles.formTitle}>Available From</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <Text style={styles.input}>{availableFrom.toDateString()}</Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={availableFrom}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(false);
                                        setAvailableFrom(selectedDate || availableFrom);
                                    }}
                                />
                            )}
                        </ScrollView>


                        {/* Submit Button */}
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 100,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    propertyList: {
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        flexDirection: 'row',
        elevation: 2,
    },
    cardImage: {
        width: 100,
        height: 100,
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
    propertyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#255665',
    },
    noProperties: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20, // Positioned on the right side
        backgroundColor: '#FFCE7D',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 8,
        padding: 20,
        position: 'relative', // To position the close button inside
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center', // Center the header title
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10, // Positioned on the top-right corner
    },
    formContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingLeft: 16,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#FFCE7D',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    containerAddProperty: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingBottom: 20, // Ensure space for Submit button at the bottom
    },
    headerAddProperty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitleAddProperty: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    inputAddProperty: {
        height: 40,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    dropdown: {
        height: 40,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    submitButtonAddProperty: {
        backgroundColor: '#FFCE7D',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20, // Ensure space at the bottom
    },
    submitButtonTextAddProperty: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },

    formTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#333', // Customize the color as needed
    },
});


export default LandlordDashboard;
