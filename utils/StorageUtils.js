import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        return accessToken;
    } catch (error) {
        console.error("Failed to get access token:", error);
        return null;
    }
};

const saveAccessToken = async (accessToken) => {
    try {
        await AsyncStorage.setItem("accessToken", accessToken);
    } catch (error) {
        console.error("Failed to save access token:", error);
    }
};

const removeAccessToken = async () => {
    try {
        AsyncStorage.removeItem("accessToken");
    } catch (error) {
        console.error("Failed to remove access token:", error);
        return null;
    }
};

const saveCredentials = async (userName, password) => {
    try {
        await AsyncStorage.setItem("userName", userName);
        await AsyncStorage.setItem("password", password);
    } catch (error) {
        console.error("Failed to save credential:", error);
    }
};

const getCredentials = async () => {
    try {
        const userName = await AsyncStorage.getItem("userName");
        const password = await AsyncStorage.getItem("password");
        return { userName: userName, password: password };
    } catch (error) {
        console.error("Failed to get credentials:", error);
        return null;
    }
};

const removeCredential = async () => {
    try {
        await AsyncStorage.removeItem("userName");
        await AsyncStorage.removeItem("password");
    } catch (error) {
        console.error("Failed to remove credentials:", error);
        return null;
    }
};

const addPunchInTime = async () => {
    try {
        await AsyncStorage.setItem("punchIn", Date.now().toString());
    } catch (error) {
        console.error("Failed to add punchin time:", error);
        return null;
    }
};

const removePunchInTime = async () => {
    try {
        await AsyncStorage.removeItem("punchIn");
    } catch (error) {
        console.error("Failed to add punchin time:", error);
        return null;
    }
};

const getPunchInTime = async () => {
    try {
        const punchInTime = await AsyncStorage.getItem("punchIn");
        return punchInTime;
    } catch (error) {
        console.error("Failed to get punch in time:", error);
        return null;
    }
};

const saveDimensions = async (height, width) => {
    try {
        await AsyncStorage.setItem("height", height.toString());
        await AsyncStorage.setItem("width", width.toString());
    } catch (error) {
        console.error("Failed to set dimensions ", error);
        return null;
    }
};

const getDimensions = async () => {
    try {
        const height = await AsyncStorage.getItem("height");
        const width = await AsyncStorage.getItem("width");
        return { height, width };
    } catch (error) {
        console.error("Failed to get dimensions ", error);
        return null;
    }
};

export {
    getAccessToken,
    getCredentials,
    saveAccessToken,
    saveCredentials,
    addPunchInTime,
    getPunchInTime,
    removePunchInTime,
    removeAccessToken,
    removeCredential,
    saveDimensions,
    getDimensions,
};
