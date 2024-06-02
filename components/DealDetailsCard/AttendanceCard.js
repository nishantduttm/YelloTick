import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faArrowCircleLeft,
    faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { getAttendence } from "../../utils/ApiUtils";

const AttendenceCard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [attendenceDates, setAttendanceDates] = useState([]);

    const [customDatesStyles, setCustomDatesStyle] = useState([]);

    useEffect(() => {
        getAttendence(
            selectedMonth + 1,
            selectedYear,
            (resp) => {
                setAttendanceDates(resp["dates"]);
            },
            () => {}
        );
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        const nDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const dateArray = Array.from({ length: nDays }, (_, i) => {
            const date = new Date(selectedYear, selectedMonth, i + 1);
            const isPresent = attendenceDates.some(
                (attendenceDate) => new Date(attendenceDate).getDate() === i + 1
            );
            return {
                date,
                style: isPresent ? { backgroundColor: "#f02e51" } : null,
                textStyle: isPresent
                    ? { color: "white", fontWeight: "bold" }
                    : null,
            };
        });
        setCustomDatesStyle(dateArray);
    }, [attendenceDates]);

    return (
        <View style={styles.container}>
            <View style={styles.titleCotainer}>
                <Text style={styles.title}>Attendance</Text>
            </View>
            <View style={styles.calenderContainer}>
                <CalendarPicker
                    dayLabelsWrapper={{
                        backgroundColor: "#f02e51",
                    }}
                    height={250}
                    width={300}
                    customDayHeaderStyles={() => {
                        return {
                            textStyle: {
                                color: "white",
                                fontWeight: "bold",
                            },
                            style: {},
                        };
                    }}
                    previousComponent={
                        <View>
                            <FontAwesomeIcon
                                icon={faArrowCircleLeft}
                                color="black"
                                size={25}
                            />
                        </View>
                    }
                    nextComponent={
                        <View>
                            <FontAwesomeIcon
                                icon={faArrowCircleRight}
                                color="black"
                                size={25}
                            />
                        </View>
                    }
                    headerWrapperStyle={{ width: "70%" }}
                    monthTitleStyle={{
                        fontSize: 20,
                    }}
                    todayBackgroundColor="black"
                    yearTitleStyle={{
                        fontSize: 20,
                    }}
                    selectedStartDate={selectedDate}
                    onDateChange={(date) => setSelectedDate(date)}
                    onMonthChange={(date) => {
                        setSelectedMonth(date.getMonth());
                        setSelectedYear(date.getFullYear());
                    }}
                    selectedDayStyle={{
                        backgroundColor: "#f02e51",
                    }}
                    selectedDayTextColor="white"
                    customDatesStyles={customDatesStyles}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Select Date</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default AttendenceCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 30,
        height: 340,
        width: 320,
    },
    titleCotainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },
    title: {
        color: "#f02e51",
        fontSize: 40,
        fontWeight: "bold",
        textShadowRadius: 2,
        textShadowColor: "#f02e51",
        letterSpacing: 1,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    button: {
        width: "70%",
        backgroundColor: "black",
        borderRadius: 20,
        alignItems: "center",
        padding: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 25,
    },
    calenderContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 80,
    },
    calender: {},
});
