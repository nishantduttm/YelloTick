import { View, StyleSheet, Text } from "react-native";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import { useState } from "react";
import SelectImageFormField from "../FormFields/SelectImageFormField";
import DropDownFormField from "../FormFields/DropDownFormField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
            <Text style={styles.heading}> Business Details</Text>
            <FormField
                placeHolder="Number Of Employees"
                fieldName="number_of_employee"
                onChange={onChange}
                keyboardType="numeric"
            />
            <DropDownFormField
                placeholder="Turover Yearly"
                data={[
                    { label: "Below 20 Lacs", value: "Below 20 Lacs" },
                    {
                        label: "Below 5 Cr",
                        value: "Below 5 Cr",
                    },
                    { label: "Below 10 Cr", value: "Below 10 Cr" },
                    {
                        label: "Below 50 Cr",
                        value: "Below 50 Cr",
                    },
                ]}
                fieldName="turnover_yearly"
                onChange={onChange}
            />
            <SelectImageFormField
                placeHolder="Upload Images of Shop"
                fieldName="shop_images"
                onChange={onChange}
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
