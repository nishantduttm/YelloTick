import { View, Text, StyleSheet, TextInput } from "react-native";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import { useState } from "react";
import { showToast } from "../../utils/ToastUtils";
import { isEmpty } from "../../utils/common-utils";

const TransactionIdVerificationScreen = (props) => {
    const [transactionId, setTransactionId] = useState({
        transactionId1: "",
        transactionId2: "",
    });

    const onNextHandler = () => {
        if (isEmpty(transactionId["transactionId1"])) {
            showToast("Please enter transaction id");
            return;
        }
        if (isEmpty(transactionId["transactionId2"])) {
            showToast("Please enter transaction id");
            return;
        }
        if (
            transactionId["transactionId1"] !== transactionId["transactionId2"]
        ) {
            showToast("Transaction ids do not match");
            return;
        }
        props.onSubmit({ transaction_id: transactionId["transactionId1"] });
    };

    const onChange = (fieldName, value) => {
        setTransactionId((prevState) => {
            return {
                ...prevState,
                [fieldName]: value,
            };
        });
    };

    const onClickHandler = () => {};
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FormField
                    placeHolder="Enter Transaction Id"
                    fieldName="transactionId1"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Confirm Transaction Id"
                    fieldName="transactionId2"
                    onChange={onChange}
                />
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

export default TransactionIdVerificationScreen;
