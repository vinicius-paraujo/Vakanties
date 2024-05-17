import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

import { useRegion } from '../context/RegionContext';

const SelectPeriode = () => {
    const { selectedPeriode, setSelectedPeriode } = useRegion();
    const [showOptions, setShowOptions] = useState(false);

    const styles = StyleSheet.create({
        dropdownContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#dcdcdc',
            borderRadius: 20,
            justifyContent: 'space-between',
            marginTop: 10,
        },
        dropdownIcon: {
            marginLeft: 'auto',
        },
        boldText: {
            fontFamily: "MADETOMMY-BOLD",
            marginHorizontal: 10,
        },
        optionsContainer: {
            marginTop: 10,
            paddingHorizontal: 40,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            maxHeight: 120,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        option: {
            padding: 10,
        },
        selectedOption: {
            borderRadius: 25,
            backgroundColor: '#e0e0e0',
        },
        periodeText: {
            fontFamily: 'MADETOMMY',
            textAlign: "center"
        },
    });

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const selectPeriode = async (periode) => {
        await AsyncStorage.setItem("periode", periode);
        setSelectedPeriode(periode);
        setShowOptions(false);
    };

    const years = [];
    for (let year = 2026; year >= 2020; year -= 1) {
        years.push(`${year - 1}-${year}`);
    }

    return (
        <View>
            <TouchableOpacity style={styles.dropdownContainer} onPress={toggleOptions}>
                <Text style={styles.boldText}>{selectedPeriode}</Text>
                <FontAwesome name="caret-down" size={24} color="#000" style={styles.dropdownIcon} />
            </TouchableOpacity>
            {showOptions && (
                <ScrollView style={styles.optionsContainer}>
                    {years.map((periode) => (
                        <TouchableOpacity 
                            key={periode}
                            style={[
                                styles.option, 
                                selectedPeriode === periode && styles.selectedOption
                            ]}
                            onPress={() => selectPeriode(periode)}
                        >
                            <Text style={styles.periodeText}>{periode}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default SelectPeriode;