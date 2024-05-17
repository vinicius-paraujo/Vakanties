import * as React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text } from 'react-native';

import Knoppen from '../components/Knoppen';
import DagenFiltred from '../components/DagenFiltred';
import { useRegion } from '../context/RegionContext';

function Dagen ({ navigation, route }) {
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
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.graySubtitle}>
                {screenName} Page
            </Text>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>{screenName} tot Vakanties</Text>
                <Text style={styles.subtitle}>Jouw regio: { selectedRegion } </Text>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView>
                    <DagenFiltred navigation={navigation} />
                </ScrollView>
            </View>

            <View style={styles.knopperContainer}>
                <Knoppen currentPage={screenName} navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}

export default Dagen;