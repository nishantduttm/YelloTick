import { getDimensions } from "./StorageUtils";
import * as Application from "expo-application";
import { Alert } from "react-native";
import { Linking } from "react-native";
import Constants from "expo-constants";

function isEmpty(str) {
    return !str || str.trim().length === 0;
}

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

function getStartDatAndEndDate(weekNo) {
    const today = new Date();
    const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const startOfWeek = new Date(today); // Start of the current week
    const endOfWeek = new Date(today); // End of the current week

    const diff = currentDay - 1 - weekNo * 7; // Difference from current day to the start of the week

    startOfWeek.setDate(today.getDate() - diff); // Set start of the week
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set end of the week
    return {
        startDate: formatDate(startOfWeek),
        endDate: formatDate(endOfWeek),
    };
}

function getWeekNo(offset) {
    const currentDate = new Date();

    const currentWeekStart = new Date(
        currentDate.setDate(
            currentDate.getDate() - currentDate.getDay() + offset * 7
        )
    );
    const startOfYear = new Date(currentWeekStart.getFullYear(), 0, 1);

    const numberOfDays = Math.floor(
        (currentWeekStart - startOfYear) / (24 * 60 * 60 * 1000)
    );

    const weekNumber = Math.ceil((numberOfDays + startOfYear.getDay() + 1) / 7);

    return weekNumber;
}

function getDaysInCurrentMonth(year, month) {
    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
}

function isXHoursBeforeNow(timestamp, hours) {
    const currentTime = Date.now();
    const xHoursAgo = currentTime - hours * 3600 * 1000;
    return timestamp <= xHoursAgo;
}

function generateLightColorHex() {
    const randomValue = () => {
        // Generate a value between 128 and 255 (inclusive) to ensure lightness
        return Math.floor(Math.random() * (256 - 128) + 128);
    };

    const r = randomValue(); // Red component
    const g = randomValue(); // Green component
    const b = randomValue(); // Blue component

    // Convert each component to a hexadecimal string
    const hex = (n) => {
        return n.toString(16).padStart(2, "0");
    };

    // Concatenate the hex strings of each component to form the full hex color code
    return `#${hex(r)}${hex(g)}${hex(b)}`;
}

const getGreeting = () => {
    const currentTime = new Date().getHours();

    if (currentTime < 12) {
        return "Good Morning";
    } else if (currentTime < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
};

const scaleDimension = (value, isVertical) => {
    getDimensions().then((dimension) => {
        if (isVertical) {
            let res = (value / 866) * dimension["height"];
            console.log(
                "res " + value + " : " + res + " : " + dimension["height"]
            );
            return res;
        } else {
            return (value / 412) * dimension["width"];
        }
    });
    return value;
};

function getCurrentMonthStartAndEnd() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    );

    return {
        startDate: formatDate(firstDayOfMonth),
        endDate: formatDate(lastDayOfMonth),
    };
}

function getTodayStartAndEndDate() {
    const today = new Date();
    const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0
    );
    const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
    );
    return {
        startDate: formatDate(startOfDay),
        endDate: formatDate(endOfDay),
    };
}

function roundToOneDigit(num) {
    return parseFloat(num.toFixed(1));
}

async function checkExpoAppVersion() {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/nishantduttm/YelloTick/master/update_change_log.json"
        );
        const data = await response.json();
        console.log("GitHub JSON response:", data);
        const currentVersion = Constants.expoConfig.version;
        const githubVersion = data.latestVersion;
        console.log("Current App Version:", currentVersion);
        console.log("GitHub Version:", githubVersion);

        if (compareVersions(currentVersion, githubVersion) < 0) {
            Alert.alert(
                `Update Available (Version ${githubVersion})`,
                data.releaseNotes.join("\n"),
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Update",
                        onPress: () => {
                            Linking.openURL(data.url);
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            console.log("App is up to date.");
        }
    } catch (error) {
        console.error("Error checking app version:", error);
    }
}

function compareVersions(version1, version2) {
    const parts1 = version1.split(".");
    const parts2 = version2.split(".");

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parseInt(parts1[i]) || 0;
        const part2 = parseInt(parts2[i]) || 0;

        if (part1 < part2) return -1;
        if (part1 > part2) return 1;
    }

    return 0;
}

export {
    isEmpty,
    getStartDatAndEndDate,
    getWeekNo,
    isXHoursBeforeNow,
    generateLightColorHex,
    getGreeting,
    scaleDimension,
    getCurrentMonthStartAndEnd,
    getTodayStartAndEndDate,
    roundToOneDigit,
    checkExpoAppVersion,
};
