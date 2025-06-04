import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ButtonComponent from '../components/Button';
import MapView, { Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import EmbeddedMap from '../components/EmbeddedMap';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const RentalDetails = ({ route, navigation }) => {
    const { property } = route.params;

    return (
        <View style={styles.container}>
            {/* Sticky Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20 }}>
                    <Ionicons name="heart-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Image */}
                <Image source={{ uri: property.images[0].url }} style={styles.propertyImage} />

                {/* Property Info */}
                <View style={styles.propertyInfo}>
                    <Text style={styles.propertyName}>{property.propertyName}</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.tag}>{property.propertyType}</Text>
                    </View>
                    <Text style={styles.location}>
                        <Ionicons name="location-outline" size={16} color="#6D6D6D" />{' '}
                        {property.location.city}, {property.location.country}
                    </Text>
                </View>

                {/* Features */}
                <View style={styles.features}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, }}>
                        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M16.875 5.62506H2.5V3.75006C2.5 3.5843 2.43415 3.42533 2.31694 3.30812C2.19973 3.19091 2.04076 3.12506 1.875 3.12506C1.70924 3.12506 1.55027 3.19091 1.43306 3.30812C1.31585 3.42533 1.25 3.5843 1.25 3.75006V16.2501C1.25 16.4158 1.31585 16.5748 1.43306 16.692C1.55027 16.8092 1.70924 16.8751 1.875 16.8751C2.04076 16.8751 2.19973 16.8092 2.31694 16.692C2.43415 16.5748 2.5 16.4158 2.5 16.2501V13.7501H18.75V16.2501C18.75 16.4158 18.8158 16.5748 18.9331 16.692C19.0503 16.8092 19.2092 16.8751 19.375 16.8751C19.5408 16.8751 19.6997 16.8092 19.8169 16.692C19.9342 16.5748 20 16.4158 20 16.2501V8.75006C20 7.92126 19.6708 7.1264 19.0847 6.54035C18.4987 5.9543 17.7038 5.62506 16.875 5.62506ZM2.5 6.87506H8.125V12.5001H2.5V6.87506ZM9.375 12.5001V6.87506H16.875C17.3723 6.87506 17.8492 7.0726 18.2008 7.42424C18.5525 7.77587 18.75 8.25278 18.75 8.75006V12.5001H9.375Z" fill="#EDBD6D" />
                        </Svg>
                        <Text style={styles.feature}>{property.features.bedrooms} bed</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, }}>
                        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M18.75 7.50006H16.25C16.25 7.3343 16.1842 7.17533 16.0669 7.05812C15.9497 6.94091 15.7908 6.87506 15.625 6.87506H10.625C10.4592 6.87506 10.3003 6.94091 10.1831 7.05812C10.0658 7.17533 10 7.3343 10 7.50006H5V4.06256C5 3.81392 5.09877 3.57546 5.27459 3.39965C5.4504 3.22383 5.68886 3.12506 5.9375 3.12506C6.15723 3.12416 6.37077 3.19775 6.5433 3.33381C6.71583 3.46988 6.83716 3.6604 6.8875 3.87428C6.92183 4.03535 7.01835 4.17636 7.15607 4.26665C7.2938 4.35695 7.46159 4.38925 7.62299 4.35651C7.78439 4.32378 7.92635 4.22867 8.01801 4.09185C8.10967 3.95503 8.14363 3.78756 8.1125 3.62584C8.00638 3.12851 7.73218 2.68291 7.33605 2.36404C6.93991 2.04516 6.44602 1.87248 5.9375 1.87506C5.35734 1.87506 4.80094 2.10553 4.3907 2.51576C3.98047 2.926 3.75 3.4824 3.75 4.06256V7.50006H1.25C1.08424 7.50006 0.925268 7.56591 0.808058 7.68312C0.690848 7.80033 0.625 7.9593 0.625 8.12506V11.2501C0.626241 12.41 1.08758 13.5221 1.90778 14.3423C2.72798 15.1625 3.84006 15.6238 5 15.6251V16.8751C5 17.0408 5.06585 17.1998 5.18306 17.317C5.30027 17.4342 5.45924 17.5001 5.625 17.5001C5.79076 17.5001 5.94973 17.4342 6.06694 17.317C6.18415 17.1998 6.25 17.0408 6.25 16.8751V15.6251H13.75V16.8751C13.75 17.0408 13.8158 17.1998 13.9331 17.317C14.0503 17.4342 14.2092 17.5001 14.375 17.5001C14.5408 17.5001 14.6997 17.4342 14.8169 17.317C14.9342 17.1998 15 17.0408 15 16.8751V15.6251C16.1599 15.6238 17.272 15.1625 18.0922 14.3423C18.9124 13.5221 19.3738 12.41 19.375 11.2501V8.12506C19.375 7.9593 19.3092 7.80033 19.1919 7.68312C19.0747 7.56591 18.9158 7.50006 18.75 7.50006ZM15 8.12506V10.6251H11.25V8.12506H15ZM18.125 11.2501C18.125 11.6604 18.0442 12.0668 17.8871 12.4459C17.7301 12.8251 17.4999 13.1696 17.2097 13.4598C16.9195 13.75 16.575 13.9801 16.1959 14.1372C15.8167 14.2942 15.4104 14.3751 15 14.3751H5C4.1712 14.3751 3.37634 14.0458 2.79029 13.4598C2.20424 12.8737 1.875 12.0789 1.875 11.2501V8.75006H10V11.2501C10 11.4158 10.0658 11.5748 10.1831 11.692C10.3003 11.8092 10.4592 11.8751 10.625 11.8751H15.625C15.7908 11.8751 15.9497 11.8092 16.0669 11.692C16.1842 11.5748 16.25 11.4158 16.25 11.2501V8.75006H18.125V11.2501Z" fill="#EDBD6D" />
                        </Svg>
                        <Text style={styles.feature}>{property.features.bathrooms} bath</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 6, }}>
                        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M16.875 3.75006V7.50006C16.875 7.66582 16.8092 7.82479 16.6919 7.942C16.5747 8.05921 16.4158 8.12506 16.25 8.12506C16.0842 8.12506 15.9253 8.05921 15.8081 7.942C15.6908 7.82479 15.625 7.66582 15.625 7.50006V5.25865L12.3172 8.56725C12.1999 8.68452 12.0409 8.75041 11.875 8.75041C11.7091 8.75041 11.5501 8.68452 11.4328 8.56725C11.3155 8.44997 11.2497 8.29091 11.2497 8.12506C11.2497 7.95921 11.3155 7.80015 11.4328 7.68287L14.7414 4.37506H12.5C12.3342 4.37506 12.1753 4.30921 12.0581 4.192C11.9408 4.07479 11.875 3.91582 11.875 3.75006C11.875 3.5843 11.9408 3.42533 12.0581 3.30812C12.1753 3.19091 12.3342 3.12506 12.5 3.12506H16.25C16.4158 3.12506 16.5747 3.19091 16.6919 3.30812C16.8092 3.42533 16.875 3.5843 16.875 3.75006ZM7.68281 11.4329L4.375 14.7415V12.5001C4.375 12.3343 4.30915 12.1753 4.19194 12.0581C4.07473 11.9409 3.91576 11.8751 3.75 11.8751C3.58424 11.8751 3.42527 11.9409 3.30806 12.0581C3.19085 12.1753 3.125 12.3343 3.125 12.5001V16.2501C3.125 16.4158 3.19085 16.5748 3.30806 16.692C3.42527 16.8092 3.58424 16.8751 3.75 16.8751H7.5C7.66576 16.8751 7.82473 16.8092 7.94194 16.692C8.05915 16.5748 8.125 16.4158 8.125 16.2501C8.125 16.0843 8.05915 15.9253 7.94194 15.8081C7.82473 15.6909 7.66576 15.6251 7.5 15.6251H5.25859L8.56719 12.3172C8.68446 12.2 8.75035 12.0409 8.75035 11.8751C8.75035 11.7092 8.68446 11.5501 8.56719 11.4329C8.44991 11.3156 8.29085 11.2497 8.125 11.2497C7.95915 11.2497 7.80009 11.3156 7.68281 11.4329ZM16.25 11.8751C16.0842 11.8751 15.9253 11.9409 15.8081 12.0581C15.6908 12.1753 15.625 12.3343 15.625 12.5001V14.7415L12.3172 11.4329C12.1999 11.3156 12.0409 11.2497 11.875 11.2497C11.7091 11.2497 11.5501 11.3156 11.4328 11.4329C11.3155 11.5501 11.2497 11.7092 11.2497 11.8751C11.2497 12.0409 11.3155 12.2 11.4328 12.3172L14.7414 15.6251H12.5C12.3342 15.6251 12.1753 15.6909 12.0581 15.8081C11.9408 15.9253 11.875 16.0843 11.875 16.2501C11.875 16.4158 11.9408 16.5748 12.0581 16.692C12.1753 16.8092 12.3342 16.8751 12.5 16.8751H16.25C16.4158 16.8751 16.5747 16.8092 16.6919 16.692C16.8092 16.5748 16.875 16.4158 16.875 16.2501V12.5001C16.875 12.3343 16.8092 12.1753 16.6919 12.0581C16.5747 11.9409 16.4158 11.8751 16.25 11.8751ZM5.25859 4.37506H7.5C7.66576 4.37506 7.82473 4.30921 7.94194 4.192C8.05915 4.07479 8.125 3.91582 8.125 3.75006C8.125 3.5843 8.05915 3.42533 7.94194 3.30812C7.82473 3.19091 7.66576 3.12506 7.5 3.12506H3.75C3.58424 3.12506 3.42527 3.19091 3.30806 3.30812C3.19085 3.42533 3.125 3.5843 3.125 3.75006V7.50006C3.125 7.66582 3.19085 7.82479 3.30806 7.942C3.42527 8.05921 3.58424 8.12506 3.75 8.12506C3.91576 8.12506 4.07473 8.05921 4.19194 7.942C4.30915 7.82479 4.375 7.66582 4.375 7.50006V5.25865L7.68281 8.56725C7.80009 8.68452 7.95915 8.75041 8.125 8.75041C8.29085 8.75041 8.44991 8.68452 8.56719 8.56725C8.68446 8.44997 8.75035 8.29091 8.75035 8.12506C8.75035 7.95921 8.68446 7.80015 8.56719 7.68287L5.25859 4.37506Z" fill="#EDBD6D" />
                        </Svg>
                        <Text style={styles.feature}>
                            {property.features.surfaceArea.value} {property.features.surfaceArea.unit}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Get to know this property</Text>
                    <Text style={styles.description}>{property.property_about}</Text>
                </View>

                {/* Contact */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Agent</Text>
                    <View style={styles.contactCard}>
                        <Text>{property.contact.name}</Text>
                        <Text>{property.contact.email}</Text>
                    </View>
                </View>

                {/* Embedded Map */}
                <EmbeddedMap locationLink={property.location.locationLink} />
            </ScrollView>

            {/* Sticky Price Section */}
            <View style={styles.priceSection}>
                <Text style={styles.price}>
                    ${property.pricing.rent}
                    <Text style={{ color: '#6D6D6D', fontWeight: '400', fontSize: 16 }}>
                        /{property.pricing.rateUnit}
                    </Text>
                </Text>
                <ButtonComponent
                    text="Book now"
                    customeStyle={{ width: 180 }}
                    color="primary"
                    onPress={() => console.log('Book Now pressed')}
                />
            </View>
        </View>
    );
};

export default RentalDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    scrollContent: {
        paddingTop: 70, // Leave space for the sticky header
        paddingBottom: 100, // Leave space for the sticky price section
    },
    propertyImage: {
        width: '100%',
        height: 200,
    },
    propertyInfo: {
        padding: 16,
    },
    propertyName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    tag: {
        backgroundColor: '#FFCE7D',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    location: {
        color: '#6D6D6D',
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        color: '#6D6D6D',
    },
    contactCard: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
    },
    mapContainer: {
        height: 300,
        margin: 16,
    },
    map: {
        flex: 1,
        height: '100%',
        borderRadius: 8,
    },
    priceSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        zIndex: 10,
    },
    price: {
        color: '#255665',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
