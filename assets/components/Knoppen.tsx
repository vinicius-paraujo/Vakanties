import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function Knoppen({ navigation, currentPage }) {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 60,
            padding: 10,
        },
        knoppenContainer: {
            alignItems: "center",
            padding: 8,
        },
        text: {
            marginTop: 5,
            fontSize: 12,
        },
        selectedButton: {
            borderColor: "#175dcf",
            borderBottomWidth: 2,
        },
        selectedText: {
            color: "#175dcf",
        },
    });

    const handlePress = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.knoppenContainer,
                    currentPage === 'Vakanties' && styles.selectedButton
                ]}
                onPress={() => handlePress('Vakanties')}
            >
                <FontAwesome name="home" size={24} color={currentPage === 'Vakanties' ? "#175dcf" : "black"} />
                <Text style={[styles.text, currentPage === 'Vakanties' && styles.selectedText]}>Vakanties</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.knoppenContainer,
                    currentPage === 'Dagen' && styles.selectedButton
                ]}
                onPress={() => handlePress('Dagen')}
            >
                <FontAwesome name="list" size={24} color={currentPage === 'Dagen' ? "#175dcf" : "black"} />
                <Text style={[styles.text, currentPage === 'Dagen' && styles.selectedText]}>Dagen</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.knoppenContainer,
                    currentPage === 'Settings' && styles.selectedButton
                ]}
                onPress={() => handlePress('Settings')}
            >
                <FontAwesome name="gear" size={24} color={currentPage === 'Settings' ? "#175dcf" : "black"} />
                <Text style={[styles.text, currentPage === 'Settings' && styles.selectedText]}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.knoppenContainer,
                    currentPage === 'About' && styles.selectedButton
                ]}
                onPress={() => handlePress('About')}
            >
                <FontAwesome name="info" size={24} color={currentPage === 'About' ? "#175dcf" : "black"} />
                <Text style={[styles.text, currentPage === 'About' && styles.selectedText]}>About</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Knoppen;