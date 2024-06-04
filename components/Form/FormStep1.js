import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownFormField from "../FormFields/DropDownFormField";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from "expo-location";
import Loader from "../Loader";
import { showToast } from "../../utils/ToastUtils";

let lat = "0";
let long = "0";


let requiredFields = ["full_name", "business_name", "email", "business_category", "contact_number", "whatsapp_number", "business_location"]


const FormStep1 = (props) => {
    const [loadingLocation, setLoadingLocation] = useState(true);
    useEffect(() => {
        (async () => {
            setLoadingLocation(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setLoadingLocation(false);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            lat = `${location.coords.latitude}`;
            long = `${location.coords.longitude}`;
            console.log(location);
            setLoadingLocation(false);
        })();
    }, []);

    const [fieldErrors, setFieldErrors] = useState({
        full_name: false,
        business_name: false,
        email: false,
        business_category: false,
        contact_number: false,
        whatsapp_number: false,
        business_location: false,
    });


    const [formData, setFormData] = useState({
        full_name: "",
        business_name: "",
        email: "",
        business_category: "",
        contact_number: "",
        whatsapp_number: "",
        business_location: "",
        business_location_lat: lat,
        business_location_long: long,
    });
    const onChange = (fieldName, fieldValue) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [fieldName]: fieldValue };
        });

        setFieldErrors((prevFieldErrors) => {
            return { ...prevFieldErrors, [fieldName]: false };
        });
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
            <Loader isVisible={loadingLocation} text="Fetching Location" />
            <Text style={styles.heading}> Basic Details</Text>
            <FormField
                placeHolder="Full Name"
                fieldName="full_name"
                onChange={onChange}
                required = {true}
                error = {fieldErrors["full_name"]}
            />
            <FormField
                placeHolder="Business Name"
                fieldName="business_name"
                onChange={onChange}
                required = {true}
                error = {fieldErrors["business_name"]}
            />
            <FormField
                placeHolder="Email Address"
                fieldName="email"
                onChange={onChange}
                required = {true}
                error = {fieldErrors["email"]}
            />
            <DropDownFormField
                placeholder="Select category"
                data={[
                    {
                        label: "Apparel & Textile",
                        value: "Apparel & Textile",
                    },
                    {
                        label: "Interior Designer & decorators",
                        value: "Interior Designer & decorators",
                    },
                    { label: "Stationary", value: "Stationary" },
                    { label: "Footwear", value: "Footwear" },
                    {
                        label: "Civil Contractors / Architect",
                        value: "Civil Contractors / Architect",
                    },
                ]}
                fieldName="business_category"
                onChange={onChange}
                required = {true}
                error = {fieldErrors["business_category"]}
            />
            <FormField
                placeHolder="Contact Number"
                fieldName="contact_number"
                keyboardType="numeric"
                maxLength={10}
                onChange={onChange}
                required = {true}
                error = {fieldErrors["contact_number"]}
            />
            <FormField
                placeHolder="Whatsapp Number"
                fieldName="whatsapp_number"
                keyboardType="numeric"
                maxLength={10}
                onChange={onChange}
                required = {true}
                error = {fieldErrors["whatsapp_number"]}
            />
            <FormField
                placeHolder="Business Location"
                fieldName="business_location"
                onChange={onChange}
                required = {true}
                error = {fieldErrors["business_location"]}
            />
            <NextButton text="Next" onClick={onSubmit} />
        </KeyboardAwareScrollView>
    );
};

export default FormStep1;

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
