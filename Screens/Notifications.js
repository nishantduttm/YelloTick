import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faShareNodes,
    faPowerOff,
    faHome,
    faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NextButton from "../components/NextButton";
import Loader from "../components/Loader";
import { FlatList } from "react-native";
import { generateLightColorHex } from "../utils/common-utils";

const NotificationItem = ({ text }) => {
    return (
        <View style={NotificationItemStyle.notificationContainer}>
            <View
                style={[
                    NotificationItemStyle.notificationColor,
                    { backgroundColor: generateLightColorHex() },
                ]}
            />
            <Text style={NotificationItemStyle.notificationText}>{text}</Text>
        </View>
    );
};

const NotificationItemStyle = StyleSheet.create({
    notificationContainer: {
        elevation: 10,
        alignItems: "center",
        marginVertical: 10,
        flexDirection: "row",
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "70%",
        borderRadius: 20,
        alignSelf: "center",
        backgroundColor: "white",
    },
    notificationColor: {
        height: 16,
        width: 16,
        borderRadius: 8,
    },
    notificationText: {
        fontSize: 18,
        marginLeft: 40,
    },
});

const MenuOptions = ({ style, onLogout }) => {
    return (
        <View style={[menuStyle.menuContainer, style]}>
            <View style={[menuStyle.itemContainer]}>
                <Text style={menuStyle.itemText}>View Profile</Text>
                <FontAwesomeIcon
                    icon={faShareNodes}
                    color="#f02e51"
                    size={25}
                />
            </View>
            <Pressable
                style={[menuStyle.itemContainer, { borderBottomWidth: 0 }]}
                onPress={onLogout}
            >
                <Text style={menuStyle.itemText}>Logout</Text>
                <FontAwesomeIcon icon={faPowerOff} color="#f02e51" size={25} />
            </Pressable>
            <View></View>
            <Image source={require("../assets/bottomimgeline.png")} />
        </View>
    );
};

const menuStyle = StyleSheet.create({
    menuContainer: {
        borderRadius: 20,
        backgroundColor: "white",
    },
    itemContainer: {
        flexDirection: "row",
        borderBottomWidth: 0.2,
        borderColor: "grey",
        paddingTop: 25,
        paddingBottom: 10,
        justifyContent: "space-around",
    },
    itemText: {
        color: "#f02e51",
        fontWeight: "bold",
    },
});

const NotificationScreen = ({
    screenIndex,
    onGotoHomeClicked,
    onAddMerchantClicked,
    onLogout,
}) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const data = [
        { id: 1, text: "New Merchant Added" },
        { id: 2, text: "New Merchant Added In List" },
        { id: 3, text: "New Merchant Added In List" },
        { id: 4, text: "New Merchant Added In List" },
        { id: 5, text: "New Merchant Added In List" },
        { id: 6, text: "New Merchant Added In List" },
        { id: 7, text: "New Merchant Added" },
        { id: 8, text: "New Merchant Added In List" },
        { id: 9, text: "New Merchant Added In List" },
        { id: 10, text: "New Merchant Added In List" },
        { id: 11, text: "New Merchant Added In List" },
        { id: 12, text: "New Merchant Added In List" },
    ];
    return (
        <LinearGradient
            colors={["#f02e51", "#98001C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rootContainer}
        >
            <View style={styles.heading}>
                <View style={styles.iconContainer}>
                    <Pressable
                        style={styles.toggleIconDiv}
                        onPress={() => {
                            setIsMenuOpened((prev) => !prev);
                        }}
                    >
                        <Image
                            style={styles.icon}
                            source={require("../assets/baricon.png")}
                        />
                    </Pressable>
                </View>
                <View style={styles.headingText}>
                    <Text style={styles.mainHeading}>Notifications</Text>
                    <Text style={styles.subHeading}>Important Updates</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.notificationContainer}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <NotificationItem text={item.text} />
                        )}
                    />
                </View>
            </View>
            {isMenuOpened && (
                <MenuOptions style={styles.menuItem} onLogout={onLogout} />
            )}
            <View style={styles.bottomCard}>
                <Pressable
                    style={styles.homeButton}
                    onPress={onGotoHomeClicked}
                >
                    <FontAwesomeIcon
                        icon={faHome}
                        color="white"
                        size={30}
                        style={{ marginTop: 25 }}
                    />
                </Pressable>
                <Pressable style={styles.logoutButton} onPress={onLogout}>
                    <FontAwesomeIcon
                        icon={faPowerOff}
                        color="white"
                        size={30}
                        style={{ marginTop: 25 }}
                    />
                </Pressable>
            </View>
            <Pressable
                style={styles.addButtonContainer}
                onPress={onAddMerchantClicked}
            >
                <View style={styles.addButton}>
                    <FontAwesomeIcon
                        icon={faAdd}
                        color="#f02e51"
                        size={40}
                        style={{
                            elevation: 10,
                        }}
                    />
                </View>
            </Pressable>
            <Loader text="" isVisible={false} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        width: "100%",
    },
    inputContainer: {
        // flex: 3,
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        textAlign: "center",
        width: "100%",
        height: "100%",
        flex: 1,
        position: "absolute",
        top: 120,
        // paddingHorizontal: 20,
    },
    toggleBarIcon: {
        elevation: 1,
    },
    heading: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 0,
        paddingHorizontal: 20,
        marginLeft: 10,
        alignItems: "center",
    },
    textContainer: {
        marginTop: 5,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    toggleIconDiv: {
        elevation: 4,
        backgroundColor: "#e81e43",
        padding: 2,
        overflow: "hidden",
        borderRadius: 100,
        shadowOffset: { height: 0, width: 1 },
        shadowOpacity: 0.8,
        height: 55,
        width: 55,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    iconContainer: {
        // position: "absolute",
        // left: 10,
        marginTop: 20,
        marginRight: 10,
    },
    icon: {},
    goodMorningText: {
        color: "white",
        fontSize: 20,
    },
    name: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    addButtonContainer: {
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "flex-end",
        marginRight: 20,
        borderRadius: 14,
    },
    plusIcon: {
        borderRadius: 28,
        elevation: 20,
        padding: 10,
        backgroundColor: "white",
    },
    menuItem: {
        position: "absolute",
        top: 100,
        left: 20,
        elevation: 10,
    },
    bottomCard: {
        backgroundColor: "black",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: "absolute",
        bottom: 0,
        top: 700,
        width: "100%",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    homeButtonContainer: {
        // position: "absolute",
        // top: 250,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 30,
        justifyContent: "space-around",
    },
    menuCard: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        borderColor: "black",
        borderWidth: 4,
    },
    headingText: {
        flexDirection: "column",
        marginTop: 10,
        marginLeft: 10,
    },
    mainHeading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
    },
    subHeading: {
        color: "white",
        fontSize: 17,
    },
    addButtonContainer: {
        backgroundColor: "#f7f5f5",
        borderRadius: 50,
        padding: 8,
        height: 90,
        width: 90,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 660,
        alignSelf: "center",
    },
    homeButton: {},
    logoutButton: {},
    addButton: {
        backgroundColor: "white",
        borderRadius: 35,
        padding: 8,
        height: 70,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
    },
    notificationContainer: {
        height: "60%",
        marginTop: 30,
    },
});

export default NotificationScreen;
