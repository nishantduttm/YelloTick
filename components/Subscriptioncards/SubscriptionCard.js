import { useState } from "react";
import { View, Text, Input, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RadioButtonInput } from "react-native-simple-radio-button";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SubscriptionCard = ({
    title,
    price,
    primaryColor,
    secondaryColor,
    onSelected,
    idx,
    selectedIdx,
}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[primaryColor, secondaryColor]}
                style={styles.container}
            >
                <View style={styles.heading}>
                    <Text style={styles.title}>{title}</Text>
                    <RadioButtonInput
                        obj={{ value: idx }}
                        idx={idx}
                        isSelected={selectedIdx == idx}
                        onPress={() => {
                            onSelected(idx);
                        }}
                        buttonInnerColor={primaryColor}
                        buttonOuterColor={primaryColor}
                        buttonSize={16}
                        buttonStyle={{ backgroundColor: "white" }}
                        buttonWrapStyle={{}}
                    />
                </View>
                <View style={styles.priceContainer}>
                    <FontAwesomeIcon
                        icon={faIndianRupeeSign}
                        color="white"
                        size={22}
                    />
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            fontWeight: "800",
                        }}
                    >
                        {" "}
                        {price}
                        <Text style={{ fontSize: 10 }}> + Taxes</Text>
                    </Text>
                </View>
                <View style={styles.termandco}>
                    <View
                        style={[
                            styles.button,
                            { backgroundColor: primaryColor },
                        ]}
                    >
                        <Text style={styles.buttonText}>View Details</Text>
                    </View>
                    <Text style={{ color: primaryColor }}>**T&C Apply</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        marginTop: 2,
        marginBottom: 5,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    heading: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
    },
    taxes: {
        fontSize: 12,
    },
    termandco: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        padding: 5,
        borderRadius: 15,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    priceContainer: {
        flexDirection: "row",
        marginVertical: 12,
        alignItems: "center",
    },
});

export default SubscriptionCard;
