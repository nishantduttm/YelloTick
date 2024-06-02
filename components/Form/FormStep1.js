import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownFormField from "../FormFields/DropDownFormField";
import FormField from "../FormFields/FormField";
import NextButton from "../NextButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from "expo-location";
import Loader from "../Loader";

let lat = "0";
let long = "0";

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
    };

    const onSubmit = () => {
        props.onSubmit(formData);
    };

    return (
        <KeyboardAwareScrollView style={styles.formContainer}>
            <Loader isVisible={loadingLocation} text="Fetching Location" />
            <Text style={styles.heading}> Basic Details</Text>
            <FormField
                placeHolder="Full Name"
                fieldName="full_name"
                onChange={onChange}
            />
            <FormField
                placeHolder="Business Name"
                fieldName="business_name"
                onChange={onChange}
            />
            <FormField
                placeHolder="Email Address"
                fieldName="email"
                onChange={onChange}
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
            />
            <FormField
                placeHolder="Contact Number"
                fieldName="contact_number"
                keyboardType="numeric"
                maxLength={10}
                onChange={onChange}
            />
            <FormField
                placeHolder="Whatsapp Number"
                fieldName="whatsapp_number"
                keyboardType="numeric"
                maxLength={10}
                onChange={onChange}
            />
            <FormField
                placeHolder="Business Location"
                fieldName="business_location"
                onChange={onChange}
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
