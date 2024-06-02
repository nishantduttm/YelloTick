import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPowerOff, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../../utils/ToastUtils";

const MenuOptions = ({ style, onLogout }) => {
    return (
        <View style={[menuStyle.menuContainer, style]}>
            <View style={[menuStyle.itemContainer]}>
                <Text style={menuStyle.itemText}>Share Report</Text>
                <FontAwesomeIcon
                    icon={faShareNodes}
                    color="#f02e51"
                    size={25}
                />
            </View>
            <Pressable
                style={[menuStyle.itemContainer, { borderBottomWidth: 0 }]}
                onPress={() => {
                    onLogout();
                }}
            >
                <Text style={menuStyle.itemText}>Logout</Text>
                <FontAwesomeIcon icon={faPowerOff} color="#f02e51" size={25} />
            </Pressable>
            <Image source={require("../../assets/bottomimgeline.png")} />
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

const AddMerchantScreen2 = (props) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    return (
        <LinearGradient
            colors={["#f02e51", "#98001C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rootContainer}
        >
            <View style={styles.heading}>
                <Pressable
                    style={styles.toggleIconDiv}
                    onPress={() => {
                        setIsMenuOpened((prev) => !prev);
                    }}
                >
                    <Image
                        style={styles.icon}
                        source={require("../../assets/baricon.png")}
                    />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Onboarding In Progress</Text>
                </View>
                <Pressable
                    style={styles.bellIconDiv}
                    onPress={props.onNotificationClicked}
                >
                    <Image
                        style={styles.icon}
                        source={require("../../assets/whitebellicon.png")}
                    />
                </Pressable>
            </View>
            <View style={styles.inputContainer}>{props.children}</View>
            {isMenuOpened && (
                <MenuOptions
                    style={styles.menuItem}
                    onLogout={props.onLogout}
                />
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        width: "100%",
    },
    inputContainer: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        textAlign: "center",
        position: "relative",
        width: "100%",
        height: "100%",
        top: 20,
        // paddingHorizontal: 20,
    },
    toggleBarIcon: {
        elevation: 2,
    },
    heading: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 0,
        paddingHorizontal: 20,
        justifyContent: "space-between",
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
        elevation: 10,
        backgroundColor: "#e81e43",
        padding: 10,
        overflow: "hidden",
        borderRadius: 100,
        shadowOffset: { height: 0, width: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: "black",
    },
    bellIconDiv: {
        elevation: 10,
        backgroundColor: "black",
        padding: 8,
        overflow: "hidden",
        borderRadius: 100,
        shadowOffset: { height: 0, width: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: "black",
    },
    icon: {
        // height: 30,
        // width: 30,
    },
    menuItem: {
        position: "absolute",
        top: 70,
        left: 10,
        elevation: 20,
    },
});

export default AddMerchantScreen2;
