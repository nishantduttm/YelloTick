import { Text, StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import { BlurView } from "expo-blur";

const Loader = ({ text, isVisible }) => {
    return (
        <>
            {isVisible && (
                <BlurView style={styles.otpCard} intensity={30} tint="dark">
                    <AnimatedLoader
                        visible={isVisible}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("../assets/Animation - 1714282753110.json")}
                        animationStyle={{
                            width: 100,
                            height: 100,
                        }}
                        speed={1}
                    >
                        <Text style={styles.textStyle}>{text}</Text>
                    </AnimatedLoader>
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
        // borderColor: "black",
        borderWidth: 4,
    },
});
