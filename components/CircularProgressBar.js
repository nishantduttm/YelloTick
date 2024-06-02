import React from "react";
import { View, StyleSheet } from "react-native";

const CircularProgress = () => {
    return (
        <View style={styles.container}>
            <View style={styles.progressLayer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderWidth: 20,
        // borderRadius: 100,
        justifyContent: "center",
        alignItems: "center ",
        borderColor:"grey"
    },
    progressLayer: {
        width: 200,
        height: 200,
        borderWidth: 20,
        position: "absolute",
        alignSelf: "center",

        borderRadius: 100,
        zIndex: 5,
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
        borderRightColor: "#3498db",
        borderTopColor: "#3498db",
    },
});

export default CircularProgress;
