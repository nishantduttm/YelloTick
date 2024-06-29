import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import SelectImageFormField from "../FormFields/SelectImageFormField";
import DropDownFormField from "../FormFields/DropDownFormField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showToast } from "../../utils/ToastUtils";

const requiredFields = ["shop_images"];

const FormStep3 = (props) => {
    const [formData, setFormData] = useState({
        number_of_employee: "",
        turnover_yearly: "",
        shop_images: "",
        rent_agreement: "",
        shop_act: "",
        msme_certificate: "",
        gst_certificate: "",
    });

    const [fieldErrors, setFieldErrors] = useState({
        shop_images: false,
        msme_certificate: false,
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
            if (requiredFields.includes(key) && value === "") {
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
        <KeyboardAwareScrollView style={styles.formContainer}>
            <Text style={styles.heading}> Business Details</Text>
            <FormField
                placeHolder="Number Of Employees"
                fieldName="number_of_employee"
                onChange={onChange}
                keyboardType="numeric"
            />
            <DropDownFormField
                placeholder="Turnover Yearly"
                data={[
                    { label: "Below 20 Lacs", value: "Below 20 Lacs" },
                    { label: "Below 5 Cr", value: "Below 5 Cr" },
                    { label: "Below 10 Cr", value: "Below 10 Cr" },
                    { label: "Below 50 Cr", value: "Below 50 Cr" },
                ]}
                fieldName="turnover_yearly"
                onChange={onChange}
            />
            <SelectImageFormField
                placeHolder="Upload Images of Shop"
                fieldName="shop_images"
                onChange={onChange}
                required={true}
                error={fieldErrors["shop_images"]}
                multi={true}
            />
            <SelectImageFormField
                placeHolder="Upload Rental Agreement"
                fieldName="rent_agreement"
                onChange={onChange}
            />
            <SelectImageFormField
                placeHolder="Upload Shop Act"
                fieldName="shop_act"
                onChange={onChange}
            />
            <SelectImageFormField
                placeHolder="Upload MSME Certificate"
                fieldName="msme_certificate"
                onChange={onChange}
                required={true}
                error={fieldErrors["msme_certificate"]}
            />
            <SelectImageFormField
                placeHolder="Upload GST Certificate"
                fieldName="gst_certificate"
                onChange={onChange}
            />
            <NextButton text="Next" onClick={onSubmit} />
        </KeyboardAwareScrollView>
    );
};

export default FormStep3;

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
