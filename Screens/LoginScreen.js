import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Pressable,
    Linking,
} from "react-native";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BlurView } from "expo-blur";
import { login } from "../utils/ApiUtils";
import { showToast } from "../utils/ToastUtils";
import Loader from "../components/Loader";
import NextButton from "../components/NextButton";
import PopupCard from "../components/LoginComponents/PopUpCard";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 840;

const scaleHeight = screenHeight / referenceHeight;

const generatedOtp = "1234";

const LoginScreen = ({ onSuccess, loginInProgressProp }) => {
    const [loginInProgress, setLoginInProgress] = useState(loginInProgressProp);
    const [forgotUserIdSubpage, setForgotUserIdSubpage] = useState(0);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const openPhone = () => {
        const url = `tel:${9870590844}`;
        Linking.openURL(url).catch((err) =>
            console.error("Error opening dialer", err)
        );
    };

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
        <>
            <View style={styles.rootContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/yellotickmainlogo.png")}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="yt****** (Example : yt000000)"
                        value={credentials.username}
                        onChangeText={(value) => onChange("username", value)}
                    />
                    <Pressable
                        style={styles.labelContainer}
                        onPress={() => {
                            setForgotUserIdSubpage(1);
                        }}
                    >
                        <Text style={styles.labels}>Forgot Username?</Text>
                    </Pressable>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Enter Password"
                            secureTextEntry={!showPassword}
                            style={styles.passwordInput}
                            onChangeText={(value) =>
                                onChange("password", value)
                            }
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
                    <Pressable
                        style={styles.labelContainer}
                        onPress={() => {
                            setForgotUserIdSubpage(1);
                        }}
                    >
                        <Text style={styles.labels}>Forgot Password?</Text>
                    </Pressable>
                </View>
                <View style={styles.bottomCard}>
                    <NextButton
                        color="#CA1F3F"
                        onClick={loginHandler}
                        height={80}
                        title="Log In"
                    />
                </View>
                <Loader
                    text="Login In Progress...."
                    isVisible={loginInProgress}
                />
            </View>
            {forgotUserIdSubpage > 0 && (
                <BlurView style={styles.blurCard} intensity={1000} tint="dark">
                    {forgotUserIdSubpage == 1 && (
                        <PopupCard
                            header={"Oops!"}
                            message={
                                "Lost you Id/ Password? We’ve got you covered! Share a request for a new Id and Password here."
                            }
                            buttonText={"Request New Id/ Password"}
                            onClick={() => {
                                setForgotUserIdSubpage(2);
                            }}
                        />
                    )}
                    {forgotUserIdSubpage == 2 && (
                        <PopupCard
                            header={"CONTACT ADMIN"}
                            message={
                                "Oops! You have been logged out, re-issue credentials."
                            }
                            buttonText={"Contact HR"}
                            onClick={() => {
                                setForgotUserIdSubpage(0);
                                openPhone();
                            }}
                        />
                    )}
                </BlurView>
            )}
        </>
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
        margin: scaleHeight * 10, // Utilize scaleDimension for responsive scaling
        marginTop: scaleHeight * 109,
        alignItems: "center",
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: scaleHeight * 109,
        width: "100%",
    },
    input: {
        borderColor: "#ffbe00",
        borderWidth: 2,
        width: "70%",
        padding: scaleHeight * 10,
        borderRadius: scaleHeight * 24,
        paddingLeft: scaleHeight * 20,
        fontSize: scaleHeight * 20,
        marginTop: scaleHeight * 40,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        position: "absolute",
        right: scaleHeight * 30,
    },
    passwordInput: {
        fontSize: scaleHeight * 20,
    },
    labels: {
        position: "absolute",
        right: scaleHeight * 10,
        fontSize: scaleHeight * 15,
    },
    bottomCard: {
        backgroundColor: "black",
        flex: 1,
        borderTopLeftRadius: scaleHeight * 40,
        borderTopRightRadius: scaleHeight * 40,
        position: "absolute",
        top: height * 0.8, // Adjust position based on screen height
        height: height * 0.275, // Adjust height based on screen height
        width: "100%",
        justifyContent: "center",
    },
    labelContainer: {
        width: "70%",
        marginVertical: scaleHeight * 10,
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
        elevation: scaleHeight * 8,
        borderWidth: scaleHeight * 4,
    },
    blurCard: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5 * scaleHeight,
        borderColor: "black",
        borderWidth: 4 * scaleHeight,
    },
});
