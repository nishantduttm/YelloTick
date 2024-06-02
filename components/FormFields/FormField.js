import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faImages } from "@fortawesome/free-solid-svg-icons";

const FormField = (props) => {
    return (
        <View style={styles.inputContainer1}>
            <TextInput
                style={styles.input}
                placeholder={props.placeHolder}
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                onChangeText={(text) => {props.onChange(props.fieldName, text)}}
            />
            <FontAwesomeIcon icon={faStar} style={styles.star} />
            <TouchableOpacity onPress={props.onPress} style={styles.imageIcon}>
                <FontAwesomeIcon icon={faImages} style={styles.imageIcon} />
            </TouchableOpacity>
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
