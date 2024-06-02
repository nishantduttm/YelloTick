import { View, Text, TextInput, StyleSheet } from "react-native";
import ArrowButton from "../ArrowButton";
import { useState } from "react";

let inputs = [null, null, null, null];
let otp = ["", "", "", ""];

const OtpCard = ({ onSubmit }) => {
    const onChange = (idx, digit) => {
        otp[idx] = digit;
        if (idx < 3) {
            inputs[idx + 1].focus();
        } else {
            onSubmit(otp.join(""));
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.heading}>
                <Text style={styles.headingText}>Enter OTP</Text>
            </View>
            <View style={styles.subheading}>
                <Text style={styles.subheadingText}>
                    An otp has been sent to your registered
                </Text>
                <Text style={styles.subheadingText}>Mobile Number</Text>
            </View>
            <View style={styles.digitContainer}>
                <View style={styles.digit}>
                    <TextInput
                        style={styles.digitText}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => {
                            onChange(0, parseInt(text));
                        }}
                        ref={(input) => {
                            inputs[0] = input;
                        }}
                    />
                </View>
                <View style={styles.digit}>
                    <TextInput
                        style={styles.digitText}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => {
                            onChange(1, parseInt(text));
                        }}
                        ref={(input) => {
                            inputs[1] = input;
                        }}
                    />
                </View>
                <View style={styles.digit}>
                    <TextInput
                        style={styles.digitText}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => {
                            onChange(2, parseInt(text));
                        }}
                        ref={(input) => {
                            inputs[2] = input;
                        }}
                    />
                </View>
                <View style={styles.digit}>
                    <TextInput
                        style={styles.digitText}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => {
                            onChange(3, parseInt(text));
                        }}
                        ref={(input) => {
                            inputs[3] = input;
                        }}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <ArrowButton backgroundColor="black" text="Resend OTP" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 40,
        padding: 40,
    },
    heading: {
        alignItems: "center",
        marginVertical: 20,
    },
    headingText: {
        fontSize: 22,
        fontWeight: "bold",
    },
    subheading: {
        alignItems: "center",
    },
    subheadingText: {
        fontSize: 15,
        color: "grey",
    },
    digitContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    digit: {
        borderColor: "#ffbe00",
        padding: 18,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
    },
    digitText: {
        fontSize: 22,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 40,
    },
});

export default OtpCard;
