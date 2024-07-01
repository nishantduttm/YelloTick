import { useState } from "react";
import { View, Text, Input, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RadioButtonInput } from "react-native-simple-radio-button";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 840;

const scaleHeight = screenHeight / referenceHeight;

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
                            fontSize: 30,
                            fontWeight: "900",
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
        padding: 10,
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 35,
        marginHorizontal: 20,
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
        paddingVertical:6,
        borderRadius: 20,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    title: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    priceContainer: {
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center",
    },
});

export default SubscriptionCard;
