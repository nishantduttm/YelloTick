import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import NextButton from "../NextButton";

const PaymentScreen = (props) => {
    const onPressHandler = async () => {
        await Clipboard.setStringAsync("yellowtick@okhdfcbank");
    };
    return (
        <View style={styles.rootContainer}>
            <LinearGradient colors={["#EEEEEE", "#FFFFFF"]} style={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.subheading}>
                        Thank you for choosing us
                    </Text>
                    <Text style={styles.heading}>We welcome you onboard!</Text>
                </View>
                <Image
                    style={styles.imageContainer}
                    source={require("../../assets/yellotickmainlogo.png")}
                />
                <Image
                    source={require("../../assets/scan.png")}
                    style={styles.image}
                />
                <Text style={styles.subheading}>
                    Scan to pay with any UPI App.
                </Text>
                <View style={styles.upiIdContainer}>
                    <Text style={styles.heading}>
                        UPI ID: yellowtick@okhdfcbank
                    </Text>
                    <Pressable onPress={onPressHandler} style={styles.copyIcon}>
                        <Image source={require("../../assets/copyicon.png")} />
                    </Pressable>
                </View>
            </LinearGradient>
            <NextButton
                color="black"
                title="Collect Payment"
                onClick={() => {
                    props.onSubmit({});
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    card: {
        // flex:1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        textAlign: "center",
        position: "relative",
        width: "100%",
        height: "75%",
        top: 5,
        paddingHorizontal: 20,
    },
    image: {
        alignSelf: "center",
        marginTop: 10,
    },
    textContainer: {
        marginTop: 10,
    },
    subheading: {
        fontSize: 20,
        alignSelf: "center",
        marginTop: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: 5,
    },
    imageContainer: {
        height: 40,
        width: 300,
        marginTop: 40,
        alignSelf: "center",
    },
    upiIdContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: "100%",
    },
    copyIcon: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 36,
        padding: 13,
        shadowColor: "black",
        shadowOffset: { height: 1, width: 1 },
    },
});

export default PaymentScreen;
