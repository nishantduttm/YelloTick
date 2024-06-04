import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faImages } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const FormField = (props) => {
    const handleTextChange = (text) => {
        props.onChange(props.fieldName, text);
    };

    let placeHolder = `${props.placeHolder}${props.error ?  (" (This field is required)") : ""}`
    return (
        <View style={styles.inputContainer1}>
            <View style={styles.input}>
            <TextInput
                placeholder={placeHolder}
                placeholderTextColor={props.error ? "red" : "black"}
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                onChangeText={handleTextChange}
                value={props.value}
            />
            </View>
            {props.required && <FontAwesomeIcon icon={faStar} style={styles.star} />}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 30,
        padding: 2,
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        color: "white",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        fontSize: 16,
        color: "black",
    },
    star: {
        color: "#FFC40C",
        fontSize: 16,
        marginRight: 5,
    },
    imageIcon: {
        color: "white",
        fontSize: 16,
        fontWeight: "400",
        position: "absolute",
        right: 10,
    },
});

export default FormField;
