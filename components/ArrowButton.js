import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ArrowButton = (props) => {
    let backgroundColor = props.backgroundColor
        ? props.backgroundColor
        : "#CA1F3F";
    return (
        <Pressable
            style={[styles.container, { backgroundColor: backgroundColor }]}
            onPress={props.onClick}
        >
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.icon}>
                <FontAwesomeIcon icon={faArrowRight} color="white" size={22} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#CA1F3F",
        borderRadius: 20,
        paddingVertical: 10,
        justifyContent: "space-around",
        width: "80%",
        marginTop: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    icon: {
        position: "absolute",
        right: 0,
        marginRight: 10,
    },
});

export default ArrowButton;
