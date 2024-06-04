import { Text, StyleSheet, View, Image, Pressable, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faUserCheck,
    faEye,
    faAnglesRight,
    faPlus,
    faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../utils/ToastUtils";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 840;
const scaleHeight = screenHeight / referenceHeight;

const propMapping = {
    markAttendance: {
        icon: faUserCheck,
        text: "Mark Attendance",
    },
    viewProfile: {
        icon: faEye,
        text: "View Profile",
    },
    addMerchant: {
        icon: faPlus,
        text: "Add Merchant",
    },
    punchIn: {
        icon: faIdBadge,
        text: "Punch In",
    },
    punchOut: {
        icon: faIdBadge,
        text: "Punch Out",
    },
};

const NavigationItem = ({ type, onClick, disabled, disabledMessage }) => {
    let icon = propMapping[type].icon;
    const containerStyle = disabled
        ? [styles.container, styles.disabled]
        : styles.container;
    return (
        <Pressable
            style={containerStyle}
            onPress={
                disabled
                    ? () => {
                          showToast(disabledMessage);
                      }
                    : onClick
            }
        >
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={icon} color="white" size={25 * scaleHeight} />
            </View>
            <View style={styles.textContainer}>
                <Text>{propMapping[type].text}</Text>
            </View>
            <View style={styles.angleContainer}>
                <FontAwesomeIcon icon={faAnglesRight} color="white" size={16 * scaleHeight} />
            </View>
        </Pressable>
    );
};

export default NavigationItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10 * scaleHeight,
    },
    iconContainer: {
        padding: 25 * scaleHeight,
        backgroundColor: "#f02e51",
        borderRadius: 20 * scaleHeight,
        borderColor: "white",
        borderWidth: 8 * scaleHeight,
        elevation: 10,
        zIndex: 3,
    },
    textContainer: {
        position: "relative",
        left: -10 * scaleHeight,
        backgroundColor: "white",
        padding: 25 * scaleHeight,
        borderRadius: 10 * scaleHeight,
        width: "60%",
    },
    angleContainer: {
        position: "relative",
        left: -20 * scaleHeight,
        backgroundColor: "black",
        borderRadius: 24 * scaleHeight,
        padding: 8 * scaleHeight,
    },
    disabled: {
        opacity: 0.9,
    },
});
