import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Input,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const DropDown = (props) => {
    return (
        <View style={styles.businessmenuList}>
            <View style={styles.tooltipArrow}></View>
            <ScrollView style={styles.scrollContainer}>
                {props.categories.map((category) => (
                    <TouchableOpacity style={styles.categoryItem}>
                        <Text>{category}</Text>
                        <View style={styles.radioBtnDiv}>
                            <Input
                                type="radio"
                                name="selectcategory"
                                value={category}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    businessmenuList: {
        position: "absolute",
        right: -7,
        top: "50%",
        zIndex: 6,
        backgroundColor: "white",
        borderRadius: "15%",
        height: 284,
    },
    tooltipArrow: {
        position: "absolute",
        right: 30,
        top: -14,
        borderRightWidth: 15,
        borderLeftWidth: 15,
        borderBottomWidth: 15,
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomColor: "white",
    },
    scrollContainer: {
        backgroundColor: "white",
        padding: 10,
        width: 200,
        height: 190,
        marginTop: "1rem",
        borderRadius: "16px 16px 30px 36px",
    },
    categoryItem: {
        width: "85%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "darkgray",
    },
    radioBtnDiv: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
});

export default DropDown;
