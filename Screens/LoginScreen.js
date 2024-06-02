import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import NextButton from "../components/NextButton";
import OtpCard from "../components/LoginComponents/OtpCard";
import { BlurView } from "expo-blur";
import { login } from "../utils/ApiUtils";
import { showToast } from "../utils/ToastUtils";
import Loader from "../components/Loader";
import { scaleDimension } from "../utils/common-utils";

const generatedOtp = "1234";

const LoginScreen = ({ onSuccess, loginInProgressProp }) => {
    const [loginInProgress, setLoginInProgress] = useState(loginInProgressProp);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const onChange = (fieldName, value) => {
        setCredentials((prevState) => {
            return { ...prevState, [fieldName]: value };
        });
    };

    const loginHandler = () => {
        setLoginInProgress(true);
        login(
            credentials["username"],
            credentials["password"],
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

    // const onSubmitOtpHandler = (enteredOtp) => {
    //     if (enteredOtp === generatedOtp) {
    //         onSuccess();
    //     }
    // };

    const [showPassword, setShowPassoword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassoword((prevState) => !prevState);
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
                    value={credentials["username"]}
                    onChangeText={onChange.bind(this, "username")}
                />
                <View style={styles.labelContainer}>
                    <Text style={styles.labels}>Forgot your Id?</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Enter Password"
                        secureTextEntry={!showPassword}
                        style={styles.passwordInput}
                        onChangeText={onChange.bind(this, "password")}
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

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    imageContainer: {
        margin: 10,
        marginTop: 40,
        alignItems: "center",
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        width: "100%",
    },
    input: {
        borderColor: "#ffbe00",
        borderWidth: 2,
        width: "70%",
        padding: 10,
        borderRadius: 24,
        paddingLeft: 20,
        fontSize: 20,
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        position: "absolute",
        right: 30,
    },
    passwordInput: {
        fontSize: 20,
    },
    labels: {
        position: "absolute",
        right: 10,
        fontSize: 15,
    },
    bottomCard: {
        backgroundColor: "black",
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: "absolute",
        top: 600,
        height: 360,
        width: "100%",
        justifyContent: "center",
    },
    labelContainer: {
        width: "70%",
        marginVertical: 10,
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
        elevation: 8,
        borderWidth: 4,
    },
});
