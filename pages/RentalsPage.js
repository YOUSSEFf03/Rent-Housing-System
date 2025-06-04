import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import rentals from '../data/rentals.json';
import RentalCard from '../components/RentalCard';
import BottomTab from '../components/BottomTab';
import { Dropdown } from 'react-native-element-dropdown';

const RentalsPage = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState(rentals);
    const [selectedType, setSelectedType] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');




    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            const filtered = rentals.filter((rental) =>
                rental.propertyName.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProperties(filtered);
        } else {
            setFilteredProperties(rentals);
        }
    };

    const toggleFilterModal = () => {
        setFilterModalVisible(!isFilterModalVisible);
    };


    const propertyTypes = [
        { label: 'Apartment', value: 'apartment' },
        { label: 'House', value: 'house' },
        { label: 'Studio', value: 'studio' },
        { label: 'Villa', value: 'villa' },
        { label: 'Townhouse', value: 'townhouse' },
    ];

    const locations = [
        { label: 'Zgharta', value: 'Zgharta' },
        { label: 'Tripoli', value: 'Tripoli' },
        { label: 'Beirut', value: 'Beirut' },
        { label: 'Saida', value: 'Saida' },
        { label: 'Tyre', value: 'Tyre' },
    ];


    // const applyFilters = () => {
    //     const filtered = rentals.filter((rental) => {
    //         console.log('Checking Rental:', rental.propertyType, 'against', selectedType);
    //         if (selectedType && rental.propertyType.toLowerCase() !== selectedType.toLowerCase()) {
    //             return false;
    //         }
    //         return true;
    //     });

    //     setFilteredProperties(filtered);
    //     console.log('Filtered Properties:', filtered);
    //     setFilterModalVisible(false);
    // };


    const applyFilters = () => {
        const filtered = rentals.filter((rental) => {
            // Filter by property type
            if (selectedType && rental.propertyType.toLowerCase() !== selectedType.toLowerCase()) {
                return false;
            }

            // Filter by price range
            if (minPrice && rental.pricing.rent < parseInt(minPrice, 10)) {
                return false;
            }
            if (maxPrice && rental.pricing.rent > parseInt(maxPrice, 10)) {
                return false;
            }

            // Filter by location
            if (selectedLocation && rental.location.city.toLowerCase() !== selectedLocation.toLowerCase()) {
                return false;
            }

            return true; // Include rental if all conditions are met
        });

        setFilteredProperties(filtered);
        setFilterModalVisible(false); // Close the modal
    };





    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Find Your Property</Text>
                <View style={{ width: 24 }} /> {/* Spacer for alignment */}
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#A9A9A9" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity onPress={toggleFilterModal}>
                    <Ionicons name="options-outline" size={20} color="#255665" />
                </TouchableOpacity>
            </View>

            {/* Rentals List */}
            <FlatList
                data={filteredProperties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RentalCard property={item} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.rentalsList}
            />

            {/* Filter Modal */}
            <Modal
                visible={isFilterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleFilterModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filter Properties</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={toggleFilterModal}
                        >
                            <Ionicons name="close-outline" size={24} color="black" />
                        </TouchableOpacity>

                        {/* Add filtering options here */}
                        <ScrollView>
                            <Text style={styles.filterOption}>Price Range</Text>
                            <View style={styles.priceRangeContainer}>
                                <TextInput
                                    style={styles.priceInput}
                                    placeholder="Min"
                                    keyboardType="numeric"
                                    value={minPrice}
                                    onChangeText={(text) => setMinPrice(text)}
                                />
                                <Text style={{ marginHorizontal: 10 }}>to</Text>
                                <TextInput
                                    style={styles.priceInput}
                                    placeholder="Max"
                                    keyboardType="numeric"
                                    value={maxPrice}
                                    onChangeText={(text) => setMaxPrice(text)}
                                />
                            </View>

                            <Text style={styles.filterOption}>Property Type</Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={propertyTypes}
                                labelField="label"
                                valueField="value"
                                placeholder="Select a property type"
                                value={selectedType}
                                onChange={(item) => setSelectedType(item.value)} // Update dropdown state

                            />

                            <Text style={styles.filterOption}>Location</Text>
                            <Dropdown
                                style={styles.dropdown}
                                data={locations}
                                labelField="label"
                                valueField="value"
                                placeholder="Select a location"
                                value={selectedLocation}
                                onChange={(item) => setSelectedLocation(item.value)}
                            />


                            {/* Add more filtering options if needed */}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.applyFilterButton}
                            onPress={applyFilters} // Apply filters on press
                        >
                            <Text style={styles.applyFilterButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <BottomTab navigation={navigation} activeTab="Rentals" />
        </View>
    );
}

export default RentalsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginTop: 40,
        backgroundColor: '#FFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins_700Bold',
        color: '#333',
    },
    searchBar: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 0,
        margin: 16,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        marginBottom: -4,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Poppins_400Regular',
    },
    rentalsList: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 24
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins_700Bold',
        color: '#333',
        marginBottom: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    filterOption: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#333',
        marginBottom: 16,
    },
    applyFilterButton: {
        backgroundColor: '#255665',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    applyFilterButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    priceRangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        textAlign: 'center',
    },

});