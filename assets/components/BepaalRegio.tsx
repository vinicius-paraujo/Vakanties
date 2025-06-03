import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import axios from 'axios';

import { useRegion } from '../context/RegionContext';
import { useAlert } from '../context/AlertContext';

function BepaalRegio () {
    const { setSelectedRegion } = useRegion();
    const { createAlert } = useAlert();

    const styles = StyleSheet.create({
        button: {
            justifyContent: "center",
            padding: 25,
            backgroundColor: "#175dcf",
            borderRadius: 30,
            alignSelf: "center", 
            marginTop: 10, 
            paddingHorizontal: 20, 
            paddingVertical: 10,
            maxWidth: 200
        },
        buttonText: {
            textAlign: "center",
            color: "#fff",
            fontFamily: "MADETOMMY-BOLD",
            fontSize: 20,
        }
    });

    const mapRegionName = async (provinceName: string) => {
        const provinceToRegion = {
            "North Holland": "Noord",
            "North": "Noord",
            "Friesland": "Noord",
            "Drenthe": "Noord",
            "Overijssel": "Noord",
            "Flevoland": "Midden",
            "Utrecht": "Midden",
            "Gelderland": "Midden",
            "Noord-Holland": "Midden",
            "Zuid-Holland": "Midden",
            "Zeeland": "Zuid",
            "Noord-Brabant": "Zuid",
            "Limburg": "Zuid"
        };
    
        return provinceToRegion[provinceName] ? provinceToRegion[provinceName] : null;
    };

    const getUserRegion = async (latitude: number, longitude: number) => {
        /*

            In a real project, you'll need a backend server to handle this part.
            Isn't advisable put API keys in your code, but for a school project, I don't think is a big deal.

        */

        const API_KEY = `YOUR-KEY`;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`);

        try {
            if (response.data.status !== "OK") {
                createAlert("Het was niet mogelijk om uw regio te identificeren. Probeer het opnieuw.");

                return null;
            }
        
            const results = response.data.results;
            const country = results.find(result => result.types.includes("country"));

            console.log(country.formatted_address.toLowerCase());

            if (country && country.formatted_address.toLowerCase() !== "netherlands" && country.formatted_address.toLowerCase() !== "nederlands" && country.formatted_address.toLowerCase() !== "nederland") {
                createAlert("U bent buiten Nederland.");

                return null;
            }
        
            const provinceName = results.find((result: { types: string | string[]; }) => result.types.includes("administrative_area_level_1"));

            const regionName = await mapRegionName(provinceName.address_components[0].long_name);
            
            return regionName ? regionName : null;
        } catch (error) {
            createAlert("Het was niet mogelijk om het verzoek te voltooien. Controleer uw internetverbinding.");

            return null;
        }
    }

    const handlePress = async () => {
        try {
            // Vraag toestemming voor toegang tot de locatie van het apparaat
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                createAlert('U moet toestemming verlenen voor toegang tot de locatie om de regio te bepalen.');
                return;
            }

            // Haal de breedte- en lengtegraadcoördinaten van het apparaat op
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = location.coords;

            const userRegion = await getUserRegion(latitude, longitude);

            if (userRegion !== null) {
                createAlert(`Je bent in de regio ${userRegion}.`);
                setSelectedRegion(userRegion);
                return;
            }
        } catch (error) {
            createAlert('Er is een fout opgetreden bij het bepalen van de regio.');
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>BEPAAL REGIO</Text>
        </TouchableOpacity>
    )
}

export default BepaalRegio;
