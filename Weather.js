import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
    Rain: {
        iconName: "weather-lightning-rainy",
        gradient: ['#4c669f', '#3b5998', '#192f6a']
    },
    Thunderstorm: {
        iconName: "",
    },
    Drizzle: {
        iconName: "",
    },
    Rain: {
        iconName: "",
    },
    Snow: {
        iconName: "",
    },
    Atmosphere: {
        iconName: "",
    },
    Clear: {
        iconName: "",
    },
    Clouds: {
        iconName: "",
    },
}

export default function Weather({temp, condition}){
    return (
    <LinearGradient
        colors={weatherOptions[condition].gradient || ['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
    >
        <StatusBar barStyle="light-content" />
        <View style={styles.halfContainer}>
            <MaterialCommunityIcons name={weatherOptions[condition].iconName || "weather-lightning-rainy"} size={96} color="white" />
            <Text style={styles.temp}>{temp}°</Text>
        </View>
        <View style={styles.halfContainer}>
        </View>
    </LinearGradient>
    )
}

Weather.propTypes = {
    temp:PropTypes.number.isRequired,
    condition: PropTypes.oneOf([
        "Thunderstorm", 
        "Drizzle", 
        "Rain", 
        "Snow", 
        "Atmosphere", 
        "Clear", 
        "Clouds"
    ]).isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
        fontSize: 32,
        color: "white"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})