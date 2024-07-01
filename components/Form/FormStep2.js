import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import DropDownFormField from "../FormFields/DropDownFormField";
import SelectImageFormField from "../FormFields/SelectImageFormField";
import PaymentIdFormField from "../FormFields/PaymentIdFormField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showToast } from "../../utils/ToastUtils";

const requiredFields = ["payment_id_other_upi"];

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 840;

const scaleHeight = screenHeight / referenceHeight;

const FormStep2 = (props) => {
    const [formData, setFormData] = useState({
        url_jd_im: "",
        url_amz_fkt: "",
        url_other_social: "",
        url_business: "",
        payment_qr_code: "",
        payment_id_ptm_ppay_gpay: "",
        payment_id_other_upi: "",
    });

    const [fieldErrors, setFieldErrors] = useState({
        payment_id_other_upi: false,
    });

    const onChange = (fieldName, fieldValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: fieldValue,
        }));

        setFieldErrors((prevFieldErrors) => ({
            ...prevFieldErrors,
            [fieldName]: false,
        }));
    };

    const onSubmit = () => {
        const updatedFieldErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (requiredFields.includes(key) && value.trim() === "") {
                updatedFieldErrors[key] = true;
            } else {
                updatedFieldErrors[key] = false;
            }
        });
        setFieldErrors(updatedFieldErrors);
        if (!Object.values(updatedFieldErrors).some((error) => error)) {
            props.onSubmit(formData);
        } else {
            showToast("Please fill all required fields");
        }
    };

    return (
        <>
            <Text style={styles.heading}> Social And Payment Details</Text>
            <KeyboardAwareScrollView style={styles.formContainer}>
                <FormField
                    placeHolder="Social URL 1"
                    fieldName="url_social1"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Social URL 2"
                    fieldName="url_social2"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Social URL 3"
                    fieldName="url_social3"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Social URL 4"
                    fieldName="url_social4"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Social URL 5"
                    fieldName="url_social5"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Social URL 6"
                    fieldName="url_social6"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Business Website URL"
                    fieldName="url_business"
                    onChange={onChange}
                />
                <SelectImageFormField
                    placeHolder="Upload Payment QR Code"
                    fieldName="payment_qr_code"
                    onChange={onChange}
                />
                <PaymentIdFormField
                    placeHolder="Payment Id"
                    fieldName="payment_id_ptm_ppay_gpay"
                    onChange={onChange}
                />
                <FormField
                    placeHolder="Any Other UPI ID"
                    fieldName="payment_id_other_upi"
                    onChange={onChange}
                    required={true}
                    error={fieldErrors["payment_id_other_upi"]}
                />
            </KeyboardAwareScrollView>
            <NextButton text="Next" onClick={onSubmit} />
        </>
    );
};

export default FormStep2;

const styles = StyleSheet.create({
    formContainer: {
        height: scaleHeight * 380,
        width: "100%",
    },
    heading: {
        color: "white",
        alignSelf: "left",
        fontSize: 16,
        marginTop: 5,
        marginLeft: 48,
        marginBottom: 5,
    },
});
