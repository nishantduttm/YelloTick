import { Card, Text, StyleSheet, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faReply,
    faStar,
    faIndianRupee,
    faBookmark,
} from "@fortawesome/free-solid-svg-icons";


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
        strongColor: "#c71234",
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
                        size={28}
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
                        size={16}
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
        padding: 2,
        borderRadius: 25,
        marginHorizontal: 10,
        alignSelf: "center",
        marginTop: 5,
        paddingVertical: 20,
        maxWidth:160,
        maxHeight:160
    },
    headingContainer: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 2,
        justifyContent: "space-around",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },
    buttonContainer: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },
    button: {},
    iconContainer: {
        // position: "relative",
        // right: 0,
        opacity: 0.5,
        marginLeft: 25,
    },
    scoreContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    score: {
        fontSize: 40,
        fontWeight: "900",
        color: "white",
    },
    iconAndButtonConatiner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 5,
        position: "relative",
        bottom: 0,
    },
    iconContainer2: {
        backgroundColor: "white",
        height: 36,
        width: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "900",
    },
});
