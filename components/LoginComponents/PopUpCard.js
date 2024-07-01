import { View, Text, StyleSheet  } from "react-native";
import ArrowButton from "../ArrowButton";

const PopupCard = ({header, message, buttonText, onClick}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.heading}>{header}</Text>
            <View style={styles.subheadingContainer}>
                <Text style={styles.subheading}>
                    {message}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <ArrowButton
                    text={buttonText}
                    onClick={onClick}
                />
            </View>
        </View>
    );
};

export default PopupCard;

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        backgroundColor: "white",
        width: "80%",
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal:12
    },
    heading: {
        fontSize: 40,
        alignSelf: "center",
        fontWeight: "bold",
    },
    subheadingContainer: {
        marginTop: 70,
        marginBottom:30
    },
    headingContainer: {
        marginTop: 20,
    },
    subheading: {
        alignSelf: "center",
        color: "green",
        fontSize: 18,
        paddingHorizontal: 12,
    },
    id: {
        fontWeight: "bold",
    },
    imageContainer: {
        alignSelf: "center",
    },
    buttonContainer: {
        marginTop: 30,
        width: "100%",
        alignItems: "center",
    },
});
