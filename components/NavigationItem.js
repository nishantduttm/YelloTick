import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faUserCheck,
    faEye,
    faAnglesRight,
    faPlus,
    faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../utils/ToastUtils";

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
                <FontAwesomeIcon icon={icon} color="white" size={25} />
            </View>
            <View style={styles.textContainer}>
                <Text>{propMapping[type].text}</Text>
            </View>
            <View style={styles.angleContainer}>
                <FontAwesomeIcon icon={faAnglesRight} color="white" size={16} />
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
        marginVertical: 10,
    },
    iconContainer: {
        padding: 25,
        backgroundColor: "#f02e51",
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 8,
        elevation: 10,
        zIndex: 3,
    },
    textContainer: {
        position: "relative",
        left: -10,
        backgroundColor: "white",
        padding: 25,
        borderRadius: 10,
        width: "60%",
    },
    angleContainer: {
        position: "relative",
        left: -20,
        backgroundColor: "black",
        borderRadius: 24,
        padding: 8,
    },
    disabled: {
        opacity: 0.9,
    },
});
