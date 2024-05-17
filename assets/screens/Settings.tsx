import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import BepaalRegio from '../components/BepaalRegio';

import Knoppen from '../components/Knoppen';
import SelectRegion from '../components/SelectRegion';
import { useRegion } from '../context/RegionContext';

function Settings({ navigation, route }) {
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
            marginHorizontal: 10,
            justifyContent: "center"
        },
        grayContainer: {
            backgroundColor: "#dcdcdc",
            marginHorizontal: 10,
            borderRadius: 5,
            padding: 20,
            flex: 1,
        },
        blueSquareContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        titleTwo: {
            color: "#000",
            textAlign: "center",
            fontFamily: "MADETOMMY-BOLD",
            fontSize: 20,
        },
        text: {
            textAlign: "justify",
            color: "#000",
            fontFamily: "MADETOMMY",
            fontSize: 18,
        },
        knopperContainer: {
            paddingVertical: 10,
        },
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.graySubtitle}>
                {screenName} Page
            </Text>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>{screenName}</Text>
                <Text style={styles.subtitle}>Jouw regio: {selectedRegion}</Text>
            </View>

            <View style={styles.contentContainer}>
                <View style={{marginBottom: 30}}>
                    <Text style={styles.titleTwo}>Via deze knop word er via jouw locatie de regio beepald</Text>
                    <BepaalRegio />
                </View>

                <View>
                    <Text style={[styles.titleTwo, { marginBottom: 10 }]}>Wil je handmatig een regio kiezen?</Text>
                    <SelectRegion />
                </View>
            </View>

            <View style={styles.knopperContainer}>
                <Knoppen currentPage={screenName} navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}

export default Settings;
