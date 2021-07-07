import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
    Rain: {
        iconName: "cloud-rain",
        gradient: ['#4c669f', '#3b5998', '#192f6a'],
        title: "It's Rainy",
        subtitle: "Don't be blue"
    },
    Thunderstorm: {
        iconName: "cloud-lightning",
        gradient: ['#d7df00', '#bec237', '#626520']
    },
    Drizzle: {
        iconName: "cloud-drizzle",
        gradient: ['#b6ccee', '#91a1dd', '#1e2659']
    },
    Snow: {
        iconName: "cloud-snow",
        gradient: ['#b6eee9', '#91d6dd', '#1e5559']
    },
    Atmosphere: {
        iconName: "droplet",
        gradient: ['#d50000', '#c23737', '#451111']
    },
    Clear: {
        iconName: "sun",
        gradient: ['#00ccb7', '#37b1c2', '#242065']
    },
    Clouds: {
        iconName: "cloud",
        gradient: ['#00c4ec', '#428a94', '#020024'],
        title: "It's Clouds",
        subtitle: "Don't do laundry"
    },
    Love: {
        iconName: "heart",
        gradient: ['#591e1e', '#d23e3e', '#d98888'],
        title: "당신을 향한 내 마음의 온도는 99도씨",
        subtitle: "날아가 사라지고 싶지 않은데 뜨거운거에요. 사랑해요 잘자요"
    }
}

export default function Weather({temp, condition}){
    return (
    <LinearGradient
        colors={weatherOptions["Love"].gradient}
        style={styles.container}
    >   
        <StatusBar barStyle="light-content" />
        <View style={styles.halfContainer}>
            <Feather name={weatherOptions["Love"].iconName} size={96} color="white" />
            <Text style={styles.temp}>{temp}°</Text>
        </View>
        <View style={{...styles.halfContainer, ...styles.textContainer}}>
            <Text style={styles.title}>{weatherOptions["Love"].title}</Text>
            <Text style={styles.subtitle}>{weatherOptions["Love"].subtitle}</Text>
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
    },
    title : {
        fontSize: 30,
        fontWeight: "300",
        color:"white",
        marginBottom: 10,
    }, 
    subtitle : {   
        fontWeight: "600",
        fontSize: 15,          
        color:"white",
    },
    textContainer: {
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})