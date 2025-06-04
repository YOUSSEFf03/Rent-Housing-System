import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashscreenLogo from './assets/splashscreen-logo.png';
import OnboardingImg from './assets/onboarding-bg1.png';
import Logo from './assets/logo-white.png';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import ButtonComponent from './components/Button';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import LandlordDashboard from './pages/LandlordDashboard';
import RentalsPage from './pages/RentalsPage';
import SettingsScreen from './pages/SettingsScreen';
import RentalDetails from './pages/RentalDetails';
import AboutScreen from './pages/AboutScreen';
import ContactScreen from './pages/ContactScreen';

const Stack = createNativeStackNavigator();

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnboardingScreen'); // Navigate to OnboardingScreen after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Image source={SplashscreenLogo} style={styles.logo} />
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => (
  <ImageBackground source={OnboardingImg} style={styles.homeBackground}>
    <View style={styles.overlay}>
      <View style={styles.topOnboardBar}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.onboard_center}>
        <Text style={styles.pageTitle}>A Safe Place to Call Home Again</Text>
        <Text style={styles.subTitle}>Safe, reliable, and dignified housing for everyone.</Text>
      </View>
      <View style={styles.btnsview}>
        <ButtonComponent
          text="Login"
          color="primary"
          customeStyle={{ flex: 1 }}
          onPress={() => navigation.navigate('LoginScreen')}
        />
        <ButtonComponent
          text="Register"
          color="primary"
          customeStyle={{ flex: 1 }}
          onPress={() => alert('Register Button Pressed')}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.asGuestText}>Continue as guest?</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Show nothing until fonts are loaded
  }

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = {
    fontFamily: 'Poppins_400Regular',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RentalsPage" component={RentalsPage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'About Us' }} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ title: 'Contact Us' }} />
        <Stack.Screen name="LandlordDashboard" component={LandlordDashboard} />
        <Stack.Screen name="RentalDetails" component={RentalDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#255665',
  },
  logo: {
    width: 150,
    // height: 150,
    resizeMode: 'contain',
  },
  homeBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 24px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay for better text visibility
    flex: 1,
    width: '100%',
    paddingTop: 40,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 40
  },
  topOnboardBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  onboard_center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 12,
    height: "80%",
  },
  pageTitle: {
    color: "#fff",
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    textAlign: "center"
  },
  subTitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    width: "85%",
    fontFamily: 'Poppins_400Regular',
  },
  btnsview: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    width: "100%"
  },
  asGuestText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 16,
    textDecorationLine: "underline"
  }
});