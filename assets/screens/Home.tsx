import React, { useEffect } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import Knoppen from '../components/Knoppen';
import SelectPeriode from '../components/SelectPeriode';
import Vakanties from '../components/Vakanties';
import { useRegion } from '../context/RegionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home ({ navigation, route }) {
    const screenName = route.name;

    const { selectedRegion } = useRegion();

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            marginTop: 30,
            marginHorizontal: 5,
            paddingHorizontal: 10,
        },
        headerContainer: {
            margin: 5,
            paddingBottom: 15,
            padding: 10,
        },
        title: {
            color: "#000",
            textAlign: "left",
            fontFamily: 'MADETOMMY',
            fontSize: 24,
        },
        subtitle: {
            color: "#000",
            textAlign: "left",
            fontFamily: 'MADETOMMY',
            fontSize: 18,
        },
        graySubtitle: {
            color: "#6e6e6e",
            fontSize: 18,
            fontFamily: "MADETOMMY",
            textAlign: "left",
        },
        contentContainer: {
            flex: 1,
        },
        periodeButton: {
            alignItems: "center",
            padding: 20,
        },
        periodeText: {
            color: "#000",
            fontFamily: 'MADETOMMY-BOLD',
            fontSize: 18,
        },
        knopperContainer: {
            paddingVertical: 10,
        },
    });

    useEffect(() => {
        const unlockScreenOrientation = async () => {
            await ScreenOrientation.unlockAsync();
        };
    
        unlockScreenOrientation();
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.graySubtitle}>
                {screenName} Page
            </Text>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>{screenName} 2024</Text>
                <Text style={styles.subtitle}>Jouw regio: { selectedRegion } </Text>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.periodeButton}>
                    <Text style={styles.periodeText}>Welke periode wil je laten zien?</Text>
                    <SelectPeriode />
                </View>

                <ScrollView >
                    <Vakanties />
                </ScrollView>
            </View>

            <View style={styles.knopperContainer}>
                <Knoppen currentPage={screenName} navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}

export default Home;
