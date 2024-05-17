import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import axios from 'axios';

import { useRegion } from '../context/RegionContext';
import { useAlert } from '../context/AlertContext';

function Vakanties() {
    const { selectedPeriode } = useRegion();
    const { createAlert } = useAlert();
    const [vacations, setVacations] = useState([]);
    const [visibleVacation, setVisibleVacation] = useState({});
    const [loading, setLoading] = useState(false);

    const styles = StyleSheet.create({
        rowContainer: {
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            marginLeft: 80,
            justifyContent: 'space-between'
        },
        boldText: {
            textAlign: "center",
            fontFamily: "MADETOMMY-BOLD",
            fontSize: 22,
            marginHorizontal: 10
        },
        vacationContainer: {
            flexDirection: "column",
            alignItems: 'center',
            padding: 10
        },
        grayBox: {
            width: '100%',
            backgroundColor: "#dcdcdc",
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        grayBoxTitle: {
            fontFamily: "MADETOMMY-BOLD",
            fontSize: 16,
        },
        grayBoxText: {
            textAlign: "center",
            fontFamily: "MADETOMMY",
            fontSize: 14,
            maxWidth: 80,
        },
        heelText: {
            fontFamily: "MADETOMMY-BOLD",
            fontSize: 18,
            textAlign: "center"
        },
        dataContainer: {
            justifyContent: "space-between",
            marginTop: 10,
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
    });

    useEffect(() => {    
        if (vacations.length > 0) setVacations([]);

        setLoading(true);
        
        const apiUrl = `https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/${selectedPeriode}?output=json`;
        
        axios.get(apiUrl)
            .then(response => {
                const vacationsResponse = response.data.content[0].vacations;
                let initialVisibility = {};

                vacationsResponse.forEach((vacation) => {
                    const existingVacation = vacations.find(v => 
                        v.title === vacation.type.replace(/\s/g, "") &&
                        JSON.stringify(v.regions) === JSON.stringify(vacation.regions)
                    );

                    if (!existingVacation) {
                        registerVacation(vacation);
                        initialVisibility[vacation.type] = false;
                    }
                });

                setVisibleVacation(initialVisibility);
                setLoading(false);
            })
            .catch((e) => {
                createAlert('Er is een fout opgetreden bij het ophalen van de gegevens.');
            });
    }, [selectedPeriode]);

    const toggleVacationVisibility = (title) => {
        setVisibleVacation(prev => ({ ...prev, [title]: !prev[title] }));
    }

    const registerVacation = (vacationData) => {
        const seasonName = vacationData.type.replace(/\s/g, "");

        const vacationEntry = { title: seasonName, regions: [] };

        vacationData.regions.map(r => {
            const vacationRegion = { region: r.region, startDate: r.startdate, endDate: r.enddate };
            vacationEntry.regions.push(vacationRegion);
        });

        setVacations(prevVacations => [...prevVacations, vacationEntry]);
    }

    const formatDate = (dateToFormat) => {
        if (!dateToFormat) return null;
    
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const startDate = new Date(dateToFormat.startDate).toLocaleDateString('nl-NL', options);
        const endDate = new Date(dateToFormat.endDate).toLocaleDateString('nl-NL', options);
    
        return `${startDate} t/m ${endDate}`;
    }

    const displayVakanties = () => {
        return (
            <View>
                {vacations.map((vacation) => (
                    <View style={styles.vacationContainer} key={vacation.title}>
                        <TouchableOpacity style={styles.grayBox} onPress={() => toggleVacationVisibility(vacation.title)}>
                            <Text style={styles.grayBoxTitle}>{vacation.title}</Text>
                            <AntDesign name="down" size={22} color="black" />
                        </TouchableOpacity>

                        {visibleVacation[vacation.title] && (
                            <View style={styles.dataContainer}>

                                {vacation.regions[0].region == "heel Nederland" ? (
                                    <View style={{ paddingHorizontal: 15, alignItems: "center" }}>
                                        <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.boldText}>Heel Nederland</Text>
                                        </View>
                                        <Text style={styles.grayBoxText}>{formatDate(vacation.regions[0])}</Text>
                                    </View>
                                ) : (
                                <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between" }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={styles.boldText}>Noord</Text>
                                        <Text style={styles.grayBoxText}>{formatDate(vacation.regions[0])}</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={styles.boldText}>Midden</Text>
                                        <Text style={styles.grayBoxText}>{formatDate(vacation.regions[1])}</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={styles.boldText}>Zuid</Text>
                                        <Text style={styles.grayBoxText}>{formatDate(vacation.regions[2])}</Text>
                                    </View>
                                </View>
                                )}
                            </View>
                        )}
                    </View>
                    ))}
            </View>
        );
    };

    const displayErr = () => {
        return (
            <View>
                <Text>Select a region.</Text>
            </View>
        );
    }

    const isValidPeriode = (periode) => {
        if (!selectedPeriode) return false;
    
        const years = [];
        for (let year = 2026; year >= 2020; year -= 1) {
            years.push(`${year - 1}-${year}`);
        }

        return years.includes(periode);
    }

    const displayLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#175dcf" /> 
            </View>
        )
    }

    return (
        <View>
            {isValidPeriode(selectedPeriode) ? 
                (loading ? displayLoading()
                : displayVakanties())
                : displayErr()}
        </View>
    );
}

export default Vakanties;