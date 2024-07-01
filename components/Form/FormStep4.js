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
import * as FaceDetector from "expo-face-detector";
import { showToast } from "../../utils/ToastUtils";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 840;

const scaleHeight = screenHeight / referenceHeight;

export default function FormStep4(props) {
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [faces, setFaces] = useState([]);
    const [imageUri, setImageUri] = useState("");
    const [captureButtonText, setCaptureButtontext] = useState("Capture");
    const [camera, setCamera] = useState(null);
    const [parentDimensions, setParentDimensions] = useState();
    const [componentDimensions, setComponentDimensions] = useState();
    const componentRef = useRef(null);
    const parentRef = useRef(null);
    const [isValidFace, setIsValidFace] = useState(false);
    const [message, setMessage] = useState("");

    function isRectInside(firstRect, secondRect) {
        return Object.values(firstRect).every(
            ({ x, y }) =>
                x >= secondRect.topLeft.x &&
                x <= secondRect.topRight.x &&
                y >= secondRect.topLeft.y &&
                y <= secondRect.bottomLeft.y
        );
    }

    const onLayoutComponent = () => {
        if (componentRef.current) {
            componentRef.current.measure(
                (x, y, width, height, pageX, pageY) => {
                    setComponentDimensions({
                        x: pageX,
                        y: pageY,
                        height: height,
                        width: width,
                    });
                }
            );
        }
    };
    const onLayoutParent = () => {
        if (parentRef.current) {
            parentRef.current.measure((x, y, width, height, pageX, pageY) => {
                setParentDimensions({
                    x: pageX,
                    y: pageY,
                    height: height,
                    width: width,
                });
            });
        }
    };

    const onNextHandler = () => {
        props.onSubmit({
            owner_photo: {
                uri: imageUri,
                name: "owner_photo.jpg",
                type: "image/jpeg",
            },
        });
    };
    const onCaptureHandler = async () => {
        if (captureButtonText === "Re-Capture") {
            await camera.resumePreview();
            setCaptureButtontext("Capture");
        } else {
            if (!isValidFace) {
                showToast("Keep you face in correct position");
                return;
            }
            const data = await camera.takePictureAsync(null);
            await camera.pausePreview();
            setImageUri(data.uri);
            setCaptureButtontext("Re-Capture");
        }
    };
    const handleFacesDetected = async ({ faces }) => {
        setFaces(faces);
        if (faces.length > 0) {
            checkFacePosition(faces[0]);
        }
    };
    const checkFacePosition = (face) => {
        if (isInsideOval(face)) {
            setIsValidFace(true);
            setMessage("");
            if (
                face.leftEyeOpenProbability < 0.5 ||
                face.rightEyeOpenProbability < 0.5
            ) {
                setIsValidFace(false);
                setMessage("Keep your eyes open");
            } else if (350 > face.yawAngle && face.yawAngle > 10) {
                setIsValidFace(false);
                setMessage("Keep your face straight");
            } else if (350 > face.rollAngle && face.rollAngle > 10) {
                setMessage("Keep your face straight");
            }
        } else {
            setIsValidFace(false);
            setMessage("Keep your face inside oval");
        }
    };

    let cameraView = (
        <Camera
            style={styles.camera}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
                mode: FaceDetector.FaceDetectorMode.accurate,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications:
                    FaceDetector.FaceDetectorClassifications.all,
                minDetectionInterval: 100,
                tracking: true,
            }}
            type={type}
            ref={(r) => {
                setCamera(r);
            }}
            zoom={0.001}
            ratio="1:1"
            focusable={true}
        >
            <View
                style={[
                    styles.buttonContainer,
                    { borderColor: isValidFace ? "green" : "red" },
                ]}
                onLayout={onLayoutComponent}
                ref={componentRef}
            ></View>
            <Text style={styles.message}>{message}</Text>
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

    function calculateCornerCoordinates(x, y, width, height) {
        // console.log(x + " " + y + " " + height + " " + width);
        const topLeft = { x, y };
        const topRight = { x: x + width, y };
        const bottomLeft = { x, y: y + height };
        const bottomRight = { x: x + width, y: y + height };

        return { topLeft, topRight, bottomLeft, bottomRight };
    }

    const isInsideOval = (face) => {
        const faceDim = {
            topLeft: face.LEFT_EAR,
            topRight: face.RIGHT_EAR,
            bottomLeft: face.LEFT_MOUTH,
            bottomLeft: face.RIGHT_MOUTH,
        };
        const rect = calculateCornerCoordinates(
            componentDimensions["x"] - parentDimensions["x"],
            componentDimensions["y"] - parentDimensions["y"],
            componentDimensions["width"],
            componentDimensions["width"]
        );
        return isRectInside(faceDim, rect);
    };

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    return (
        <View
            style={styles.container}
            onLayout={onLayoutParent}
            ref={parentRef}
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
        borderColor: "red",
        borderWidth: 1,
        margin: 14,
        height: 200,
        width: 200,
        alignSelf: "center",
        borderRadius: 200,
    },
    button: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 10,
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
    faceCut: {
        height: 200,
        width: 200,
        // position: "absolute",
        top: 0,
        alignSelf: "center",
        borderWidth: 1,
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
        marginBottom: 10,
    },
});
