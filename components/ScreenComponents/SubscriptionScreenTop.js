import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SubscriptionScreenTop() {
    return (
        <LinearGradient
            colors={["#CA1F3F", "#98001C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            // locations={[0.8, 0.9]}
            style={styles.onboardTopDiv}
        >
            <View style={styles.toggleBarIcon}>
                <View style={styles.toggleIconDiv}>
                    <Image source={require("../../assets/baricon.png")} />
                </View>
                <View style={styles.textContainer}>
                    <Text>Onboarding In Progress</Text>
                </View>
            </View>
            <View style={styles.bellIconDiv}>
                <Image source={require("../../assets/whitebellicon.png")} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    onboardTopDiv: {
        flex: 1,
        height: "100%",
        width: "100%",
    },
    toggleBarIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    toggleIconDiv: {
        // Add styles for toggle-icon-div here
    },
    textContainer: {
        // Add styles for textcontainer here
    },
    bellIconDiv: {
        // Add styles for bell-icon-div here
    },
});
