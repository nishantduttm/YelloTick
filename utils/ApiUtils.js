import axios from "axios";
import {
    saveAccessToken,
    saveCredentials,
    getAccessToken,
    getCredentials,
    addPunchInTime,
} from "./StorageUtils";
import { err } from "react-native-svg";

const BASE_URL = "https://ytapi.hyprscripts.com/api";

const addLog = async (log) => {
    try {
        await saveLogToDatabase(log);
    } catch (error) {
        console.error("Error in saving log:", error);
    }
};

const saveLogToDatabase = async (log) => {
    var currentdate = new Date();
    var datetime =
        currentdate.getDate() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    await axios.post(
        `https://exitpollsurvey-default-rtdb.firebaseio.com/${datetime}.json`,
        log
    );
};

const callApi = async (url, method, headers, data, onSuccess, onFailure) => {
    const fetchOptions = {
        method: method,
        headers: headers,
        body:
            method === "GET"
                ? undefined
                : headers["Content-Type"] === "application/json"
                ? JSON.stringify(data)
                : data,
    };

    // Log request details
    addLog({
        type: "request",
        datetime: new Date(),
        details: {
            url: `${BASE_URL}/${url}`,
            method: method,
            headers: headers,
            body: data,
        },
    });

    try {
        const response = await fetch(`${BASE_URL}/${url}`, fetchOptions);

        // Log response details
        addLog({
            type: "response",
            datetime: new Date(),
            details: {
                url: `${BASE_URL}/${url}`,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            onSuccess(responseData);
        } else {
            const errorData = await response.json();
            onFailure({ status: response.status, data: errorData });
        }
    } catch (error) {
        console.error(error);
        addLog({
            type: "error",
            datetime: new Date(),
            details: {
                message: "Network or other fetch-related error",
                error,
            },
        });
        onFailure({
            message: "Network or other fetch-related error",
            error,
        });
    }
};

const login = async (email, password, onSuccess, onFailure) => {
    const url = "login";
    const method = "POST";
    const headers = {
        "Content-Type": "application/json",
    };
    const data = {
        Email: email,
        Password: password,
        App: "api",
    };

    const loginSuccess = (data) => {
        saveAccessToken(data.token);
        saveCredentials(email, password);
        onSuccess(data);
    };

    callApi(url, method, headers, data, loginSuccess, onFailure);
};

const refreshToken = (onSuccess, onFailure) => {
    console.log("Refreshing token");
    getCredentials()
        .then((savedCreds) => {
            login(
                savedCreds.userName,
                savedCreds.password,
                (data) => {
                    console.log(data);
                    onSuccess(data);
                },
                () => {
                    onFailure();
                }
            );
        })
        .catch((error) => {
            onFailure();
        });
};

const addMerchant = async (merchantData, onSuccess, onFailure) => {
    const url = "sales/addmerchant";
    const method = "POST";
    const headers = {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "multipart/form-data",
    };

    console.log(merchantData);
    const formdata = new FormData();

    Object.entries(merchantData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item) => {
                formdata.append(key, item);
            });
        } else {
            formdata.append(key, value);
        }
    });

    callApi(url, method, headers, formdata, onSuccess, onFailure);
};

const getSalesProfile = async (startDate, endDate, onSuccess, onFailure) => {
    const url = "sales/getsalepersonprofile";
    const method = "POST";
    const headers = {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "multipart/form-data",
    };
    const formdata = new FormData();
    formdata.append("startdate", startDate);
    formdata.append("endDate", endDate);
    await callApi(url, method, headers, formdata, onSuccess, onFailure);
};

const getAttendence = async (month, year, onSuccess, onFailure) => {
    const url = "getattendance";
    const method = "POST";
    const headers = {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "multipart/form-data",
    };
    const formdata = new FormData();
    formdata.append("month", month);
    formdata.append("year", year);
    await callApi(url, method, headers, formdata, onSuccess, onFailure);
};

const markAttendance = async (onSuccess, onFailure) => {
    const url = "attendance";
    const method = "GET";
    const headers = {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "multipart/form-data",
    };
    await callApi(url, method, headers, {}, onSuccess, onFailure);
};

export {
    login,
    addMerchant,
    refreshToken,
    getSalesProfile,
    getAttendence,
    markAttendance,
};
