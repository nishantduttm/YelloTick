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

let requiredFields = [
    "full_name",
    "business_name",
    "email",
    "business_category",
    "contact_number",
    "whatsapp_number",
    "business_location",
];

const FormStep1 = (props) => {
    const [location, setLocation] = useState({ lat: 0, long: 0 });
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
            setLocation({ lat: lat, long: long });
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
        formData["business_location_lat"] = location["lat"];
        formData["business_location_long"] = location["long"];
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
        <KeyboardAwareScrollView style={styles.formContainer}>
            <Loader isVisible={loadingLocation} text="Fetching Location" />
            <Text style={styles.heading}> Basic Details</Text>
            <FormField
                placeHolder="Full Name"
                fieldName="full_name"
                onChange={onChange}
                required={true}
                error={fieldErrors["full_name"]}
            />
            <FormField
                placeHolder="Business Name"
                fieldName="business_name"
                onChange={onChange}
                required={true}
                error={fieldErrors["business_name"]}
            />
            <FormField
                placeHolder="Email Address"
                fieldName="email"
                onChange={onChange}
                required={true}
                error={fieldErrors["email"]}
            />
            <DropDownFormField
                placeholder="Select category"
                data={[
                    { label: "Apparel & Textile", value: "Apparel & Textile" },
                    {
                        label: "Interior Designers & decorators",
                        value: "Interior Designers & decorators",
                    },
                    { label: "Stationary", value: "Stationary" },
                    { label: "Footwear", value: "Footwear" },
                    {
                        label: "Civil Contractors / Architect",
                        value: "Civil Contractors / Architect",
                    },
                    {
                        label: "Events/ Wedding Planners",
                        value: "Events/ Wedding Planners",
                    },
                    { label: "Real Estate", value: "Real Estate" },
                    { label: "Hardware", value: "Hardware" },
                    {
                        label: "Industrial Material Supplies",
                        value: "Industrial Material Supplies",
                    },
                    { label: "Professionals", value: "Professionals" },
                    {
                        label: "Saloon/ Nail Parlour / MUA",
                        value: "Saloon/ Nail Parlour / MUA",
                    },
                    { label: "Caterers", value: "Caterers" },
                    { label: "Florists", value: "Florists" },
                    { label: "Baraat Bands", value: "Baraat Bands" },
                    { label: "Music Bands", value: "Music Bands" },
                    {
                        label: "Pre-Rented Cars/ Taxi Services",
                        value: "Pre-Rented Cars/ Taxi Services",
                    },
                    { label: "Clinics", value: "Clinics" },
                    { label: "Furniture", value: "Furniture" },
                    {
                        label: "Automobiles / Accessories",
                        value: "Automobiles / Accessories",
                    },
                    { label: "Repairs", value: "Repairs" },
                    { label: "Movers & Packers", value: "Movers & Packers" },
                    { label: "Scrap Vendors", value: "Scrap Vendors" },
                    { label: "Home Services", value: "Home Services" },
                    { label: "Testing Labs", value: "Testing Labs" },
                    {
                        label: "Plant Nursery / Garden Services",
                        value: "Plant Nursery / Garden Services",
                    },
                    { label: "Sports & Fitness", value: "Sports & Fitness" },
                    { label: "Tattoo Parlors", value: "Tattoo Parlors" },
                    { label: "Meat Shops", value: "Meat Shops" },
                    { label: "Gift/ Toy Shops", value: "Gift/ Toy Shops" },
                    {
                        label: "Pet Shops/ Vet Clinics",
                        value: "Pet Shops/ Vet Clinics",
                    },
                    { label: "Medical Supplies", value: "Medical Supplies" },
                    {
                        label: "Electricals & Home Appliances",
                        value: "Electricals & Home Appliances",
                    },
                ]}
                fieldName="business_category"
                onChange={onChange}
                required={true}
                error={fieldErrors["business_category"]}
            />
            <FormField
                placeHolder="Contact Number"
                fieldName="contact_number"
                keyboardType="numeric"
                maxLength={10}
                onChange={onChange}
                required={true}
                error={fieldErrors["contact_number"]}
            />
            <FormField
                placeHolder="Whatsapp Number"
                fieldName="whatsapp_number"
                keyboardType="numeric"
                maxLength={10}
                onChange={onChange}
                required={true}
                error={fieldErrors["whatsapp_number"]}
            />
            <FormField
                placeHolder="Business Location"
                fieldName="business_location"
                onChange={onChange}
                required={true}
                error={fieldErrors["business_location"]}
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
