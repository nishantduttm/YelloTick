import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
    PanGestureHandler,
    State,
    gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const scaleHeight = screenHeight / 830;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const gradientColors = [
    "rgba(0, 0, 0, 1)",
    "rgba(202, 31, 63, 1)",
    "rgba(0, 0, 0, 1)",
];
const colors = ["rgba(0, 0, 0, 1)", "rgba(202, 31, 63, 1)"];



const NextButton = gestureHandlerRootHOC((props) => {
    const X = useSharedValue(0);
    const gradientOffset = useSharedValue(0);

    const [currentX, setCurrentX] = useState(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: X.value }],
        };
    });

    const onGestureEvent = (event) => {
        const translationLimit = 200 * scaleHeight;
        if (
            event.nativeEvent.translationX > translationLimit ||
            event.nativeEvent.translationX < 0
        ) {
            X.value = translationLimit;
            X.value = 0;
        } else {
            X.value = event.nativeEvent.translationX;
        }
        setCurrentX(X.value);
    };

    const onEnd = (event) => {
        if (event.nativeEvent.translationX > 60 * scaleHeight) {
            X.value = withSpring(70 * scaleHeight);
            props.onClick();
            X.value = withSpring(10 * scaleHeight);
        } else {
            X.value = withSpring(10 * scaleHeight);
        }
    };

    useEffect(() => {
        gradientOffset.value = withRepeat(
            withTiming(300, {
                duration: 4000,
                easing: Easing.linear,
            }),
            (numberOfResps = -1)
        );
    }, []);

    const gradientAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: gradientOffset.value }],
        };
    });

    return (
        <View
            style={[
                styles.container,
                {
                    marginTop:
                        (props.marginTop ? props.marginTop : 40) * scaleHeight,
                },
            ]}
        >
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                        onEnd({ nativeEvent });
                    }
                }}
            >
                <View style={styles.buttonContainer}>
                    <View
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: "rgba(202, 31, 63, 100)" },
                        ]}
                    >
                        <LinearGradient
                            colors={gradientColors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.gradient]}
                        >
                            <AnimatedLinearGradient
                                colors={gradientColors}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.gradient, gradientAnimatedStyle]}
                            ></AnimatedLinearGradient>
                        </LinearGradient>
                    </View>
                    <View
                        style={[
                            styles.buttonInnerContainer,
                            {
                                height:
                                    (props.height ? props.height : 50) *
                                    scaleHeight,
                            },
                            props.style,
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                { fontSize: 18 * scaleHeight },
                            ]}
                        >
                            {props.title ? props.title : "Next"}
                        </Text>
                        <Animated.View
                            style={[styles.iconContainer, animatedStyle]}
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                color="black"
                                size={16 * scaleHeight}
                            />
                        </Animated.View>
                    </View>
                </View>
            </PanGestureHandler>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
    buttonContainer: {
        width: "70%",
        height: 50 * scaleHeight,
        borderRadius: 90 * scaleHeight,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonInnerContainer: {
        width: "100%",
        flexDirection: "row",
        color: "white",
        alignItems: "center",
        borderRadius: 90 * scaleHeight,
        justifyContent: "space-around",
        position: "absolute",
    },
    iconContainer: {
        backgroundColor: "white",
        borderRadius: 28 * scaleHeight,
        padding: 4 * scaleHeight,
        width: 50 * scaleHeight,
        alignItems: "center",
        position: "absolute",
        left: 10 * scaleHeight,
    },
    gradient: {
        width: "200%",
        height: "100%",
        position: "absolute",
    },
});

export default NextButton;
