import { useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    Dimensions
} from "react-native";
import NextButton from "../NextButton";
import Button from "../Button";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 840;

const scaleHeight = screenHeight / referenceHeight;

export default function SelfieScreen(props) {
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [imageUri, setImageUri] = useState("");
    const [captureButtonText, setCaptureButtontext] = useState("Capture");
    const [camera, setCamera] = useState(null);

    const onNextHandler = () => {
        props.onSubmit({
            selfie_photo: {
                uri: imageUri,
                name: "selfie_photo.jpg",
                type: "image/jpeg",
            },
        });
    };
    const onCaptureHandler = async () => {
        if (captureButtonText === "Re-Capture") {
            await camera.resumePreview();
            setCaptureButtontext("Capture");
        } else {
            const data = await camera.takePictureAsync(null);
            await camera.pausePreview();
            setImageUri(data.uri);
            setCaptureButtontext("Re-Capture");
        }
    };

    let cameraView = (
        <Camera
            style={styles.camera}
            type={type}
            ref={(r) => {
                setCamera(r);
            }}
            zoom={0.001}
            ratio="1:1"
            focusable={true}
        >
            <View
                style={
                    styles.buttonContainer
                }
            ></View>
        </Camera>
    );

    if (!permission) {
        return (
            <Image
                source={require("../../assets/uploadphoto.png")}
                style={styles.userImage}
            />
        );
    }

    if (!permission.granted) {
        Alert.alert(
            "Allow camera access",
            "We need your permission to show the camera",
            [
                {
                    text: "Deny",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "Allow", onPress: () => requestPermission() },
            ]
        );
        cameraView = (
            <Image
                source={require("../../assets/uploadphoto.png")}
                style={styles.userImage}
            />
        );
    }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    return (
        <View
            style={styles.container}
        >
            <View style={styles.headingConatiner}>
                <Image source={require("../../assets/camera.png")} />
                <Text style={styles.heading}> Capture Photo</Text>
            </View>
            <View style={styles.cameraContainer}>{cameraView}</View>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <Button text={captureButtonText} onClick={onCaptureHandler} />
            <NextButton onClick={onNextHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        marginTop: 10,
    },
    cameraContainer: {
        justifyContent: "center",
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "white",
        height: scaleHeight * 290,
        width: "90%",
        margin: 10,
        marginHorizontal: 10,
    },
    userImage: {
        alignSelf: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        justifyContent: "center",
        margin: 14,
        height: scaleHeight* 200,
        width: 200,
        alignSelf: "center",
        borderRadius: 200,
    },
    button: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: scaleHeight * 10,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    headingConatiner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    heading: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    text1: {
        position: "absolute",
        top: 111,
        left: 73,
        color: "white",
    },
    message: {
        fontSize: 18,
        color: "white",
        alignSelf: "center",
        fontWeight: "bold",
        marginBottom: scaleHeight * 10,
    },
});
