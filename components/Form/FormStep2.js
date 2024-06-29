import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import DropDownFormField from "../FormFields/DropDownFormField";
import SelectImageFormField from "../FormFields/SelectImageFormField";
import PaymentIdFormField from "../FormFields/PaymentIdFormField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showToast } from "../../utils/ToastUtils";

const requiredFields = ["payment_id_other_upi"];

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
        }else{
            showToast("Please fill all required fields")
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.formContainer}>
            <Text style={styles.heading}> Social And Payment Details</Text>
            <FormField
                placeHolder="Just Dial/Indiamart URL"
                fieldName="url_jd_im"
                onChange={onChange}
                keyboardType="url"
            />
            <FormField
                placeHolder="Amazon/Flipkart Store URI"
                fieldName="url_amz_fkt"
                onChange={onChange}
            />
            <FormField
                placeHolder="Any Other Social Link"
                fieldName="url_other_social"
                onChange={onChange}
            />
            <FormField
                placeHolder="Business Website URL"
                fieldName="url_business"
                onChange={onChange}
            />
            <SelectImageFormField
                placeHolder="Select QR Code"
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
            <NextButton text="Next" onClick={onSubmit} />
        </KeyboardAwareScrollView>
    );
};

export default FormStep2;

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        width: "100%",
    },
    heading: {
        color: "white",
        alignSelf: "center",
        fontSize: 20,
        marginTop: 5,
    },
});
