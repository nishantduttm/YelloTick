import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
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

const { height: screenHeight } = Dimensions.get("window");
const scaleHeight = screenHeight / 830;

const NextButton = gestureHandlerRootHOC((props) => {
    const X = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: X.value }],
        };
    });

    const onGestureEvent = (event) => {
        const translationLimit = 200 * scaleHeight;
        if (event.nativeEvent.translationX > translationLimit || event.nativeEvent.translationX < 0) {
            X.value = translationLimit;
            X.value = 0;
        } else {
            X.value = event.nativeEvent.translationX;
        }
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

    let buttonInnerContainer = (
        <LinearGradient
            colors={
                !props.color
                    ? ["#000000", "#CA1F3F", "#CA1F3F"]
                    : [props.color, props.color]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
                styles.button,
                props.style,
                { height: 50 * scaleHeight },
            ]}
        >
            <Text style={[styles.text, { fontSize: 18 * scaleHeight }]}>
                {props.title ? props.title : "Next"}
            </Text>
            <Animated.View style={[styles.iconContainer, animatedStyle]}>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    color="black"
                    size={16 * scaleHeight}
                />
            </Animated.View>
        </LinearGradient>
    );
    if (props.color) {
        buttonInnerContainer = (
            <View
                style={[
                    styles.button,
                    { backgroundColor: props.color },
                    { height: 50 * scaleHeight },
                ]}
            >
                <Text style={[styles.text, { fontSize: 18 * scaleHeight }]}>
                    {props.title ? props.title : "Next"}
                </Text>
                <Animated.View style={[styles.iconContainer, animatedStyle]}>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        color="black"
                        size={16 * scaleHeight}
                    />
                </Animated.View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { marginTop: 40 * scaleHeight }]}>
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
        alignItems: "center",
        justifyContent: "center",
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
        borderRadius: 30 * scaleHeight,
        justifyContent: "space-around",
        borderWidth: 2 * scaleHeight,
        borderColor: "white",
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
});

export default NextButton;
