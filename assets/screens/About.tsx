import * as React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';

import Knoppen from '../components/Knoppen';
import { useRegion } from '../context/RegionContext';

function About({ navigation, route }) {
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
        },
        blueSquare: {
            width: 80,
            height: 120,
            marginRight: 10,
            backgroundColor: "#23426f",
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        blueSquareContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        titleTwo: {
            color: "#000",
            fontFamily: "MADETOMMY",
            fontSize: 20,
        },
        text: {
            textAlign: "justify",
            color: "#000",
            fontFamily: "MADETOMMY",
            fontSize: 18,
        },
        image: {
            width: "70%",
            height: "70%",
            resizeMode: "contain",
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
                <Text style={styles.subtitle}>Jouw regio: { selectedRegion } </Text>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView style={styles.grayContainer}>
                    <View style={styles.blueSquareContainer}>
                        <View style={styles.blueSquare}>
                            <Image source={require('../images/icon.png')} style={styles.image} />
                        </View>
                        <Text style={styles.titleTwo}>Rijksoverheid</Text>
                    </View>
                    <View style={{padding: 20, marginBottom: 10,}}>
                        <Text style={styles.text}>
                        © 2024 Alle rechten voorbehouden.
                        </Text>
                        <Text style={styles.text}>
                        Het is belangrijk om te onthouden dat het doel van de Rijksoverheid Vakanties app is om ouders en kinderen te helpen bij het plannen van hun vakanties en vrije tijd. Deze app is ontworpen met het oog op gebruiksgemak en toegankelijkheid, zodat iedereen gemakkelijk de benodigde informatie kan vinden.
                        Een van de belangrijkste functies van de app is het tonen van de schoolvakanties in Nederland. Dit omvat zowel de reguliere vakanties als de feestdagen, zodat ouders vooruit kunnen plannen en vakanties kunnen plannen die samenvallen met de schoolvakanties van hun kinderen.
                        </Text>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.knopperContainer}>
                <Knoppen currentPage={screenName} navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}

export default About;
