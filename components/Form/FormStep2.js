import { View, StyleSheet, Text } from "react-native";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import DropDownFormField from "../FormFields/DropDownFormField";
import { useState } from "react";
import SelectImageFormField from "../FormFields/SelectImageFormField";
import PaymentIdFormField from "../FormFields/PaymentIdFormField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    const onChange = (fieldName, fieldValue) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [fieldName]: fieldValue };
        });
    };

    const onSubmit = () => {
        props.onSubmit(formData);
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
