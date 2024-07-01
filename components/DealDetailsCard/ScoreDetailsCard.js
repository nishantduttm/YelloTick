import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faArrowCircleLeft,
    faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const ScoreDetailsCard = ({ score }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <View style={styles.container}>
            <View style={styles.titleCotainer}>
                <Text style={styles.title}>Your Score</Text>
            </View>
            <View style={styles.subtitle1Container}>
                <Text style={styles.subtitle1Text}>
                    {" "}
                    Voila! You acheived a good score.
                </Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{score}</Text>
            </View>
            <View style={styles.subtitle2Container}>
                <Text style={styles.subtitle2Text}>
                    {" "}
                    Add more merchnats to acheive you goal.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Access Monthly Report</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ScoreDetailsCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 30,
        height: 300,
        width: 300,
    },
    titleCotainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },
    title: {
        color: "#CA1F3F",
        fontSize: 40,
        fontWeight: "bold",
        textShadowRadius: 2,
        textShadowColor: "#CA1F3F",
        letterSpacing: 1,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 10,
    },
    button: {
        width: "70%",
        backgroundColor: "black",
        borderRadius: 20,
        alignItems: "center",
        padding: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
    subtitle1Container: {
        alignItems: "center",
        marginTop: 10,
    },
    subtitle2Container: {
        alignItems: "center",
        marginVertical: 10,
    },
    subtitle1Text: {
        fontSize: 15,
        fontWeight: "bold",
    },
    subtitle2Text: {
        color: "grey",
    },
    scoreContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#FFC40C",
    },
});
