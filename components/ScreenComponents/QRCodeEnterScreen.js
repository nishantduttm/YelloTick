import { View, Text, StyleSheet, TextInput } from "react-native";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import { useState } from "react";
import { showToast } from "../../utils/ToastUtils";
import { isEmpty } from "../../utils/common-utils";

const QRIdVerificationScreen = (props) => {
    const [qrId, setQRId] = useState("");

    const onNextHandler = () => {
        if (isEmpty(qrId)) {
            showToast("Please enter QR ID");
            return;
        }
        props.onSubmit({ qrId: qrId });
    };

    const onChange = (fieldName, value) => {
        value = value.replace(/[^a-zA-Z0-9-]/g, "");
        if (value.length > 13) {
            value = value.substring(0, 13);
        }
        if (value.length >= 3 && value[2] !== "-") {
            value = value.substring(0, 2) + "-" + value.substring(2);
        }
        if (value.length >= 9 && value[8] !== "-") {
            value = value.substring(0, 8) + "-" + value.substring(8);
        }
        setQRId(value);
    };


    const onClickHandler = () => {};
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FormField placeHolder="Enter QR Id" onChange={onChange} value={qrId}/>
            </View>
            <View style={styles.buttonContainer}>
                <NextButton onClick={onNextHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "black",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginTop: 50,
        marginBottom: 20,
    },
    buttonContainer: {
        height: "100%",
        marginVertical: 20,
    },
});

export default QRIdVerificationScreen;
