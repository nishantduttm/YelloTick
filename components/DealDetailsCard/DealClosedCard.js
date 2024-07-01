import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faArrowCircleLeft,
    faArrowCircleRight,
    faL,
} from "@fortawesome/free-solid-svg-icons";
import { getWeekNo, getStartDatAndEndDate } from "../../utils/common-utils";
import { getSalesProfile } from "../../utils/ApiUtils";

const WeekScoreItem = ({ text, score, totalScore }) => {
    const buttonBackgroundColor = text === "This Week" ? "white" : "black";
    const buttonTextColor = text === "This Week" ? "#CA1F3F" : "white";
    const scorePercetange = (score / totalScore) * 100;
    const scoreTextColor =
        scorePercetange < 50
            ? "#CA1F3F"
            : scorePercetange > 90
            ? "#FFC40C"
            : "grey";
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
            <Text
                style={[
                    WeekScoreItemStyle.scoreText,
                    { color: scoreTextColor },
                ]}
            >
                {score} / {totalScore}
            </Text>
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
    },
});

const DealClosedCard = () => {
    const [weekWiseData, setWeekWiseData] = useState({});
    useEffect(() => {
        for (let weekIndex of [0, -1, -2, -3]) {
            let dates = getStartDatAndEndDate(weekIndex);
            let weekText;
            if (weekIndex == 0) {
                weekText = "This week";
            } else if (weekIndex == -1) {
                weekText = "Last week";
            } else {
                weekText = `Week ${getWeekNo(weekIndex)}`;
            }

            getSalesProfile(
                dates["startDate"],
                dates["endDate"],
                (resp) => {
                    setWeekWiseData((prev) => {
                        return {
                            ...prev,
                            [weekIndex]: {
                                weekText: weekText,
                                sales: resp["currentSales"],
                            },
                        };
                    });
                },
                () => {}
            );
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleCotainer}>
                <Text style={styles.title}>Deals Closed</Text>
            </View>
            <View style={styles.scoreConrtainer}>
                {weekWiseData[0] && (
                    <WeekScoreItem
                        text={weekWiseData[0].weekText}
                        score={weekWiseData[0].sales}
                        totalScore={30}
                    />
                )}
                {weekWiseData[-1] && (
                    <WeekScoreItem
                        text={weekWiseData[-1].weekText}
                        score={weekWiseData[-1].sales}
                        totalScore={30}
                    />
                )}
                {weekWiseData[-2] && (
                    <WeekScoreItem
                        text={weekWiseData[-2].weekText}
                        score={weekWiseData[-2].sales}
                        totalScore={30}
                    />
                )}
                {weekWiseData[-3] && (
                    <WeekScoreItem
                        text={weekWiseData[-3].weekText}
                        score={weekWiseData[-3].sales}
                        totalScore={30}
                    />
                )}
            </View>
        </View>
    );
};

export default DealClosedCard;

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
        marginVertical: 10,
        marginTop: 30,
    },
});
