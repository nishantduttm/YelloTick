import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Button = (props) => {
    return (
        <Pressable style={styles.container} onPress={props.onClick}>
            <LinearGradient
                colors={["#000000", "#CA1F3F", "#CA1F3F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                <Text style={styles.text}>{props.text}</Text>
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        width: "100%",
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        width: "70%",
        flexDirection: "row",
        color: "white",
        alignItems: "center",
        borderRadius: 30,
        justifyContent: "space-around",
        padding: 5,
        height: 50,
        borderWidth: 2,
        borderColor: "white",
        paddingHorizontal: 20,
    },
    iconContainer: {
        backgroundColor: "white",
        borderRadius: 28,
        padding: 4,
        width: 50,
        alignItems: "center",
        position: "absolute",
        left: 0,
    },
});

export default Button;
