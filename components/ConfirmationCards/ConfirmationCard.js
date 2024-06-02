import { View, Text, StyleSheet, Image } from "react-native";
import ArrowButton from "../ArrowButton";

const ConfirmationCard1 = ({ merchantId, onClick1, onClick2 }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.heading}>Yayy!</Text>
            <View style={styles.subheadingContainer}>
                <Text style={styles.subheading}>
                    <Text style={styles.id}>{merchantId}</Text> is created.
                </Text>
                <Text style={styles.subheading}>
                    You have completed all steps.
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/tick.png")} />
            </View>
            <View style={styles.buttonContainer}>
                <ArrowButton
                    text={"Send Request For Avatar"}
                    onClick={onClick1}
                />
                <ArrowButton text={"Publish With Photo"} onClick={onClick2} />
            </View>
        </View>
    );
};

const ConfirmationCard2 = ({ onClick }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Request</Text>
                <Text style={styles.heading}>Sent!</Text>
            </View>
            <View style={styles.subheadingContainer}>
                <Text style={styles.subheading}>
                    Avatar Will Be Uploaded On This
                </Text>
                <Text style={styles.subheading}>Profile in 3 Days.</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/tick.png")} />
            </View>
            <View style={styles.buttonContainer}>
                <ArrowButton text={"Publish Profile"} onClick={onClick} />
            </View>
        </View>
    );
};

const ConfirmationCard3 = ({ score, onClick }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Congratualtions!</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/stargroup.png")} />
            </View>
            <View style={styles.subheadingContainer}>
                <Text style={styles.subheading}>
                    Your New Score Is Now {score}!
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <ArrowButton text={"Go To Home"} onClick={onClick} />
            </View>
        </View>
    );
};
export { ConfirmationCard1, ConfirmationCard2, ConfirmationCard3 };

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        backgroundColor: "white",
        width: "80%",
        borderRadius: 30,
        paddingVertical: 20,
    },
    heading: {
        fontSize: 40,
        alignSelf: "center",
        fontWeight: "bold",
    },
    subheadingContainer: {
        marginTop: 10,
    },
    headingContainer: {
        marginTop: 10,
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
