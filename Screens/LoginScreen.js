import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BlurView } from "expo-blur";
import { login } from "../utils/ApiUtils";
import { showToast } from "../utils/ToastUtils";
import Loader from "../components/Loader";
import NextButton from "../components/NextButton";
import OtpCard from "../components/LoginComponents/OtpCard";
import { scaleDimension } from "../utils/common-utils";

const generatedOtp = "1234";

const LoginScreen = ({ onSuccess, loginInProgressProp }) => {
    const [loginInProgress, setLoginInProgress] = useState(loginInProgressProp);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (fieldName, value) => {
        setCredentials((prevState) => ({ ...prevState, [fieldName]: value }));
    };

    const loginHandler = () => {
        setLoginInProgress(true);
        login(
            credentials.username,
            credentials.password,
            (data) => {
                setLoginInProgress(false);
                onSuccess();
            },
            (resp) => {
                showToast("Login Failed");
                setLoginInProgress(false);
            }
        );
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <View style={styles.rootContainer}>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/yellotickmainlogo.png")} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Employee Id"
                    value={credentials.username}
                    onChangeText={(value) => onChange("username", value)}
                />
                <View style={styles.labelContainer}>
                    <Text style={styles.labels}>Forgot your Id?</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Enter Password"
                        secureTextEntry={!showPassword}
                        style={styles.passwordInput}
                        onChangeText={(value) => onChange("password", value)}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={togglePasswordVisibility}
                    >
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            color="#CA1F3F"
                            size={22}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labels}>Forgot your password?</Text>
                </View>
            </View>
            <View style={styles.bottomCard}>
                <NextButton color="#CA1F3F" onClick={loginHandler} />
            </View>
            <Loader text="Login In Progress...." isVisible={loginInProgress} />
        </View>
    );
};

export default LoginScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    imageContainer: {
        margin: scaleDimension(10), // Utilize scaleDimension for responsive scaling
        marginTop: scaleDimension(40),
        alignItems: "center",
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: scaleDimension(60),
        width: "100%",
    },
    input: {
        borderColor: "#ffbe00",
        borderWidth: 2,
        width: "70%",
        padding: scaleDimension(10),
        borderRadius: scaleDimension(24),
        paddingLeft: scaleDimension(20),
        fontSize: scaleDimension(20),
        marginTop: scaleDimension(40),
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        position: "absolute",
        right: scaleDimension(30),
    },
    passwordInput: {
        fontSize: scaleDimension(20),
    },
    labels: {
        position: "absolute",
        right: scaleDimension(10),
        fontSize: scaleDimension(15),
    },
    bottomCard: {
        backgroundColor: "black",
        flex: 1,
        borderTopLeftRadius: scaleDimension(40),
        borderTopRightRadius: scaleDimension(40),
        position: "absolute",
        top: height * 0.75, // Adjust position based on screen height
        height: height * 0.275, // Adjust height based on screen height
        width: "100%",
        justifyContent: "center",
    },
    labelContainer: {
        width: "70%",
        marginVertical: scaleDimension(10),
    },
    otpCard: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        elevation: scaleDimension(8),
        borderWidth: scaleDimension(4),
    },
});
