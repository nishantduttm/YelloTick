import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const NextButton = gestureHandlerRootHOC((props) => {
    const X = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: X.value }],
        };
    });

    const onGestureEvent = (event) => {
        X.value = event.nativeEvent.translationX;
    };

    const onEnd = (event) => {
        if (event.nativeEvent.translationX > 60) {
            X.value = withSpring(190);
            props.onClick();
            X.value = withSpring(10);
        } else {
            X.value = withSpring(10);
        }
    };

    let buttonInnerContainer = (
        <LinearGradient
            colors={
                !props.color
                    ? ["#000000", "#CA1F3F", "#CA1F3F"]
                    : [props.color, props.color]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, props.style]}
        >
            <Text style={styles.text}>
                {props.title ? props.title : "Next"}
            </Text>
            <Animated.View style={[styles.iconContainer, animatedStyle]}>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    color="black"
                    size={16}
                />
            </Animated.View>
        </LinearGradient>
    );
    if (props.color) {
        buttonInnerContainer = (
            <View style={[styles.button, { backgroundColor: props.color }]}>
                <Text style={styles.text}>
                    {props.title ? props.title : "Next"}
                </Text>
                <Animated.View style={[styles.iconContainer, animatedStyle]}>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        color="black"
                        size={16}
                    />
                </Animated.View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                        onEnd({ nativeEvent });
                    }
                }}
            >
                {buttonInnerContainer}
            </PanGestureHandler>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        width: "100%",
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        width: "80%",
        flexDirection: "row",
        color: "white",
        alignItems: "center",
        borderRadius: 30,
        justifyContent: "space-around",
        height: 50,
        borderWidth: 2,
        borderColor: "white",
    },
    iconContainer: {
        backgroundColor: "white",
        borderRadius: 28,
        padding: 4,
        width: 50,
        alignItems: "center",
        position: "absolute",
        left: 10,
    },
    view: {
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
});

export default NextButton;
