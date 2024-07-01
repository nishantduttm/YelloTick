import { Card, Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faReply,
    faStar,
    faIndianRupee,
    faBookmark,
} from "@fortawesome/free-solid-svg-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 830;

const scaleHeight = screenHeight / referenceHeight;

const dealCardsMapping = {
    dealsClosed: {
        heading: "Deals Closed",
        primaryColor: "#FFC40C",
        secondaryColor: "#EEECE5",
        buttonText: "View All",
        icon: faStar,
        strongColor: "#edb609",
    },
    dealsPending: {
        heading: "Deals Pending",
        primaryColor: "#CA1F3F",
        secondaryColor: "#CA1F3F",
        buttonText: "Overview",
        icon: faReply,
        strongColor: "#941029",
    },
    yourScore: {
        heading: "Your Score",
        primaryColor: "#29CC39",
        secondaryColor: "#ECECEC",
        buttonText: "View More",
        icon: faIndianRupee,
        strongColor: "#16cc28",
    },
    attendance: {
        heading: "Attendance",
        primaryColor: "#17a3e3",
        secondaryColor: "#EEEEEC",
        buttonText: "View More",
        icon: faBookmark,
        strongColor: "#17a3e3",
    },
};

const DealCard = ({ type, score, onClick, idx }) => {
    return (
        <LinearGradient
            colors={[
                dealCardsMapping[type].primaryColor,
                dealCardsMapping[type].secondaryColor,
            ]}
            style={styles.card}
        >
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    {dealCardsMapping[type].heading}
                </Text>
                <View style={styles.iconContainer}>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        color="white"
                        size={28 * scaleHeight}
                    />
                </View>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={[styles.score, { fontFamily: "varela-round" }]}>
                    {score}
                </Text>
            </View>
            <View style={styles.iconAndButtonConatiner}>
                <View
                    style={[
                        styles.iconContainer2,
                        { borderColor: dealCardsMapping[type].strongColor },
                    ]}
                >
                    <FontAwesomeIcon
                        icon={dealCardsMapping[type].icon}
                        color={dealCardsMapping[type].strongColor}
                        size={16 * scaleHeight}
                    />
                </View>
                <View
                    style={[
                        styles.buttonContainer,
                        {
                            backgroundColor: dealCardsMapping[type].strongColor,
                        },
                    ]}
                >
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            onClick(idx);
                        }}
                    >
                        <Text style={styles.buttonText}>
                            {dealCardsMapping[type].buttonText}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    );
};

export default DealCard;

const styles = StyleSheet.create({
    card: {
        padding: 2 * scaleHeight,
        borderRadius: 25 * scaleHeight,
        marginHorizontal: 10 * scaleHeight,
        alignSelf: "center",
        marginTop: 5 * scaleHeight,
        paddingVertical: 20 * scaleHeight,
        width: 160 * scaleHeight,
        height: 160 * scaleHeight,
    },
    headingContainer: {
        flexDirection: "row",
        marginHorizontal: 10 * scaleHeight,
        marginTop: 2 * scaleHeight,
        justifyContent: "space-around",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 16 * scaleHeight,
        color: "white",
    },
    buttonContainer: {
        paddingHorizontal: 15 * scaleHeight,
        paddingVertical: 6 * scaleHeight,
        borderRadius: 20 * scaleHeight,
    },
    button: {},
    iconContainer: {
        // position: "relative",
        // right: 0,
        opacity: 0.5,
        marginLeft: 25 * scaleHeight,
    },
    scoreContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5 * scaleHeight,
    },
    score: {
        fontSize: 40 * scaleHeight,
        fontWeight: "900",
        color: "white",
    },
    iconAndButtonConatiner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 5 * scaleHeight,
        position: "relative",
        bottom: 0,
    },
    iconContainer2: {
        backgroundColor: "white",
        height: 36 * scaleHeight,
        width: 36 * scaleHeight,
        borderRadius: 18 * scaleHeight,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4 * scaleHeight,
    },
    buttonText: {
        color: "white",
        fontSize: 16 * scaleHeight,
        fontWeight: "900",
    },
});
