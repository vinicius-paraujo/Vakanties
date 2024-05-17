import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { useRegion } from '../context/RegionContext';
import { useAlert } from '../context/AlertContext';

function DagenFiltred ({ navigation }) {
    const { selectedRegion } = useRegion();
    const { createAlert } = useAlert();
    const [ vacations, setVacations ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const styles = StyleSheet.create({
        grayContainer: {
            backgroundColor: "#dcdcdc",
            marginHorizontal: 10,
            borderRadius: 5,
            padding: 20,
            flex: 1,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        holidayTitleBold: {
            fontFamily: 'MADETOMMY-BOLD',
            fontSize: 18,
            color: '#000',
            textAlign: 'left',
        },
        holidayText: {
            fontFamily: 'MADETOMMY',
            fontSize: 16,
            color: '#000',
            marginTop: 5,
            textAlign: 'left',
        },
        knopperContainer: {
            paddingVertical: 10,
        },
        icon: {
            marginLeft: 10,
        },
        image: {
            width: 64,
            height: 64,
            marginRight: 10
        }
    });

    useEffect(() => {
        const fetchVacations = async () => {
            setLoading(true);
            setVacations([]);

            const currentYear = new Date().getFullYear();
            const storageKey = `${selectedRegion}-${currentYear}`;

            try {
                if (selectedRegion !== null && selectedRegion.toLowerCase() == "none") return;

                const storedVacations = await AsyncStorage.getItem(storageKey);
                
                if (storedVacations && JSON.parse(storedVacations).length > 0) {
                    setVacations(JSON.parse(storedVacations));
                } else {
                    await loadVacationsFromAPI(currentYear);
                }

            } catch (error) {
                createAlert('Er is een fout opgetreden bij het ophalen van de gegevens.');
            }
            setLoading(false);
        };

        fetchVacations();
    }, [selectedRegion]);

    const loadVacationsFromAPI = async (currentYear) => {
        const apiUrl = `https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${currentYear - 1}-${currentYear}?output=json`;
        const apiUrl2 = `https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${currentYear}-${currentYear + 1}?output=json`;

        try {
            const [response1, response2] = await Promise.all([
                axios.get(apiUrl),
                axios.get(apiUrl2)
            ]);

            const newVacations = [
                ...response1.data.content[0].vacations,
                ...response2.data.content[0].vacations
            ];

            registerVacation(newVacations);
        } catch (error) {
            createAlert('Er is een fout opgetreden bij het ophalen van de gegevens.');
            return;
        }
    };

    const registerVacation = async (vacations) => {
        const data = [];

        vacations.map(vacationData => {
            const seasonName = vacationData.type.replace(/\s/g, "");

            vacationData.regions.map(async r => {
                const days = daysUntil(r.startdate);

                if ((r.region.toLowerCase() == selectedRegion.toLowerCase() || r.region === "heel Nederland")  && days > 0) {
                    const vacationEntry = { title: seasonName, daysUntil: days, region: r.region, emoteId: getSeasonEmoteId(seasonName) };

                    data.push(vacationEntry);
                }
            });
        });

        const currentYear = new Date().getFullYear();
        const storageKey = `${selectedRegion}-${currentYear}`;

        if (data.length > 0) {
            setVacations(data);
            await AsyncStorage.setItem(storageKey, JSON.stringify(data));
        }
    }

    const getSeasonEmoteId = (vacationName) => {
        switch (vacationName.toLowerCase()) {
            case "voorjaarsvakantie":
            case "meivakantie":
                return 1;
            case "zomervakantie":
                return 2;
            case "herfstvakantie":
                return 3;
            case "kerstvakantie":
                return 4;
            default:
                return 0;
        }
    }

    const getSeasonImage = (vacationId) => {
        switch (vacationId) {
            case 1:
                return <Image source={require('../images/spring-icon.png')} style={styles.image} />;
            case 2:
                return <Image source={require('../images/summer-icon.png')} style={styles.image} />;
            case 3:
                return <Image source={require('../images/fall-icon.png')} style={styles.image} />;
            case 4:
                return <Image source={require('../images/winter-icon.png')} style={styles.image} />;
            default:
                return null;
        }
    }

    const daysUntil = (startDate) => {
        const start = new Date(startDate).getTime();
        const today = new Date().getTime();
        
        if (start < today) {
            return 0;
        }

        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const difference = start - today;
        const daysRemaining = Math.ceil(difference / millisecondsPerDay);
        
        return daysRemaining;
    };

    const displayVakanties = () => {
        const filteredVacations = vacations.filter(vacation => vacation.region.toLowerCase() === selectedRegion.toLowerCase() || vacation.region === "heel Nederland");
        filteredVacations.sort((a, b) => a.daysUntil - b.daysUntil);

        return (
            <View>
                {filteredVacations.map((vacation, index) => (
                    <TouchableOpacity key={index} style={styles.grayContainer}>
                        <View>
                            <Text style={styles.holidayTitleBold}>{vacation.title}</Text>
                            <Text style={styles.holidayText}>Nog {vacation.daysUntil} dagen te gaan...</Text>
                        </View>
                        { getSeasonImage(vacation.emoteId) }
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const displayErr = () => {
        return (
            <View style={{ margin: 15, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontFamily: "MADETOMMY", fontSize: 22 }}>Stel je regio in op </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ flexDirection: "row", alignSelf: "center", alignItems: "center"}}>
                    <FontAwesome name="gear" size={20} style={{marginRight: 5}} color={"#175dcf"} />
                    <Text style={{fontFamily: "MADETOMMY-BOLD", fontSize: 20, color: "#175dcf"}}>Settings Page</Text>
                </TouchableOpacity>
            </View>
        );
    } 
    
    const displayLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#175dcf" /> 
            </View>
        )
    }

    const isValidRegion = (region: string) => {
        if (!selectedRegion) return false;
    
        const validRegions = ["Noord", "Midden", "Zuid"];

        return validRegions.includes(region);
    }

    return (
        <View>
            {isValidRegion(selectedRegion) ? 
                (loading ? displayLoading()
                : displayVakanties())
                : displayErr()}
        </View>
    );
}

export default DagenFiltred;
