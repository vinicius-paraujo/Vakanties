import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

import { useRegion } from '../context/RegionContext';

const SelectRegion = () => {
    const { selectedRegion, setSelectedRegion } = useRegion();
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
        },
        dropdownIcon: {
            marginLeft: 'auto',
        },
        optionsContainer: {
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
        option: {
            padding: 10,
        },
        selectedOption: {
            borderRadius: 25,
            backgroundColor: '#e0e0e0',
        },
    });

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const selectRegion = async (region) => {
        await AsyncStorage.setItem("region", region);
        setSelectedRegion(region);
        setShowOptions(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.dropdownContainer} onPress={toggleOptions}>
                <Text>{selectedRegion}</Text>
                <FontAwesome name="caret-down" size={24} color="#000" style={styles.dropdownIcon} />
            </TouchableOpacity>
            {showOptions && (
                <View style={styles.optionsContainer}>
                    {['Noord', 'Midden', 'Zuid'].map((region) => (
                        <TouchableOpacity 
                            key={region}
                            style={[
                                styles.option, 
                                selectedRegion === region && styles.selectedOption
                            ]} 
                            onPress={() => selectRegion(region)}
                        >
                            <Text>{region}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default SelectRegion;