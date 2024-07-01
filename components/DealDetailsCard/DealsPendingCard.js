import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import {
    getStartDatAndEndDate,
    roundToOneDigit,
} from "../../utils/common-utils";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import { getSalesProfile } from "../../utils/ApiUtils";
import { safeDivisionPercentage } from "../../utils/common-utils";

const WeekScoreItem = ({ text, score, totalScore }) => {
    const buttonBackgroundColor = text === "Today" ? "white" : "black";
    const buttonTextColor = text === "Today" ? "#CA1F3F" : "white";
    return (
        <View style={WeekScoreItemStyle.container}>
            <Pressable
                style={[
                    WeekScoreItemStyle.button,
                    { backgroundColor: buttonBackgroundColor },
                ]}
            >
                <Text
                    style={[
                        WeekScoreItemStyle.buttonText,
                        { color: buttonTextColor },
                    ]}
                >
                    {" "}
                    {text}
                </Text>
            </Pressable>
            <Text style={WeekScoreItemStyle.scoreText}>{score}</Text>
        </View>
    );
};

const WeekScoreItemStyle = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 4,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        borderRadius: 20,
        alignItems: "center",
        padding: 8,
        paddingHorizontal: 30,
        elevation: 9,
        width: "60%",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    scoreText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#CA1F3F",
    },
});

const DealsPendinCard = ({ currentSales, currentPending, target }) => {
    const [salesProfile, setSalesProfile] = useState({});
    useEffect(() => {
        let dates = getStartDatAndEndDate(0);
        getSalesProfile(
            dates["startDate"],
            dates["endDate"],
            (resp) => {
                setSalesProfile(resp);
                setIsLoadingData({ isLoading: false });
            },
            () => {}
        );
    }, []);
    const [loadingData, setIsLoadingData] = useState({
        isLoading: true,
        loadingText: "Fetching Data...",
    });
    return (
        <View style={styles.container}>
            <Loader
                text={loadingData.loadingText}
                isVisible={loadingData.isLoading}
            />
            <View style={styles.titleCotainer}>
                <Text style={styles.title}>Deals Pending</Text>
            </View>
            <View style={styles.scoreConrtainer}>
                <CircularProgressBase
                    value={currentPending / target}
                    radius={55}
                    activeStrokeColor={"#2cbade"}
                    inActiveStrokeColor={"#f7f7f7"}
                    inActiveStrokeWidth={5}
                    activeStrokeWidth={5}
                >
                    <CircularProgressBase
                        value={currentSales / target}
                        radius={45}
                        activeStrokeColor={"#b84fe8"}
                        inActiveStrokeColor={"#f7f7f7"}
                        inActiveStrokeWidth={5}
                        activeStrokeWidth={5}
                    >
                        <Text>
                            {roundToOneDigit(
                                100 -
                                    safeDivisionPercentage(currentSales, target)
                            )}{" "}
                            %
                        </Text>
                        <Text>To Close</Text>
                    </CircularProgressBase>
                </CircularProgressBase>
            </View>
            <WeekScoreItem text="Today" score={salesProfile["currentSales"]} />
            <WeekScoreItem text="To Be Closed" score={target - currentSales} />
        </View>
    );
};

export default DealsPendinCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 30,
        height: 300,
        width: 300,
    },
    titleCotainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },
    title: {
        color: "#CA1F3F",
        fontSize: 40,
        fontWeight: "bold",
        textShadowRadius: 2,
        textShadowColor: "#CA1F3F",
        letterSpacing: 1,
    },
    scoreConrtainer: {
        marginVertical: 15,
        // marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
