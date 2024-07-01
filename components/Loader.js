import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Animated, Easing } from "react-native";
import { BlurView } from "expo-blur";

const Loader = ({ text, isVisible }) => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        if (isVisible) {
            startAnimation();
        } else {
            stopAnimation();
        }
    }, [isVisible]);

    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1,
                duration: 1000, // Duration for tick completion
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 0,
                duration: 1000, // Duration for tick disappearing
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const stopAnimation = () => {
        animation.setValue(0);
    };

    const scale = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1.2, 1], // Scale animation to make it appear and disappear
    });

    return (
        <>
            {isVisible && (
                <BlurView style={styles.otpCard} intensity={30} tint="dark">
                    <Animated.View
                        style={[
                            styles.tickIcon,
                            {
                                transform: [{ scale }],
                            },
                        ]}
                    >
                        {/* Your tick icon or any visual representation */}
                        <Text style={styles.tickText}>✔</Text>
                    </Animated.View>
                    <Text style={styles.textStyle}>{text}</Text>
                </BlurView>
            )}
        </>
    );
};

export default Loader;

const styles = StyleSheet.create({
    textStyle: {
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 10,
    },
    otpCard: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
        borderWidth: 4,
    },
    tickIcon: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    tickText: {
        fontSize: 50,
        color: "#edb609",
    },
});
