import MultiStepper from "../../components/MultiStepper";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import NextButton from "../../components/NextButton";
import FormStep1 from "../../components/Form/FormStep1";
import FormStep2 from "../../components/Form/FormStep2";
import { useEffect, useState } from "react";
import FormStep3 from "../../components/Form/FormStep3";
import FormStep4 from "../../components/Form/FormStep4";
import AddMerchantScreen2 from "./AddMerchantScreen2";
import SubscriptionOptions from "../../components/ScreenComponents/SubscriptionOptions";
import PaymentScreen from "../../components/ScreenComponents/PaymentScreen";
import TransactionIdVerificationScreen from "../../components/ScreenComponents/TransactionIdVerificationScreen";
import ConfirmationScreen from "../../components/ScreenComponents/ConfirmationScreen";
import { addMerchant } from "../../utils/ApiUtils";
import { showToast } from "../../utils/ToastUtils";
import { BackHandler } from "react-native";
import QRIdVerificationScreen from "../../components/ScreenComponents/QRCodeEnterScreen";

const AddMerchantScreen = ({
    onHomeClicked,
    onNotificationClicked,
    onLogout,
}) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButton
        );
        return () => {
            backHandler.remove();
        };
    });
    const [step, setStep] = useState(1);

    const [merchantData, setMerchantData] = useState({
        need_caricature: "yes",
    });

    const [subscriptionSelected, setSubscriptionSelected] = useState("");

    const [merchantAdded, setMerchantAdded] = useState(false);

    const [merchantId, setMerchantId] = useState("");

    const onSubmit = (step, data) => {
        setMerchantData((preData) => {
            return { ...preData, ...data };
        });

        setStep(step);
    };

    const handleBackButton = () => {
        if (step == 1) {
            onHomeClicked();
            return true;
        }
        setStep((prev) => {
            if (parseInt(prev) == prev) {
                return prev - 1;
            } else {
                return prev - 0.1;
            }
        });
        return true;
    };

    useEffect(() => {
        if (step === 6) {
            setMerchantAdded(false);
            addMerchant(
                merchantData,
                (resp) => {
                    setMerchantAdded(true);
                    setMerchantId(resp["userid"]);
                },
                () => {
                    showToast("Failed to add merchant");
                    setStep(5.3);
                }
            );
            BackHandler.addEventListener("hardwareBackPress", handleBackButton);
        }
    }, [step]);

    return (
        <>
            {step < 5 && (
                <View style={styles.screen}>
                    <Image
                        style={styles.imageContainer}
                        source={require("../../assets/yellotickmainlogo.png")}
                    />
                    <View style={styles.stepContainer}>
                        <MultiStepper step={step} />
                    </View>
                    <View style={styles.inputContainer}>
                        {/* {step == 1 && (
                            <QRIdVerificationScreen
                                onSubmit={onSubmit.bind(this, 2)}
                            />
                        )} */}
                        {step == 1 && (
                            <FormStep1 onSubmit={onSubmit.bind(this, 2)} />
                        )}
                        {step == 2 && (
                            <FormStep2 onSubmit={onSubmit.bind(this, 3)} />
                        )}
                        {step == 3 && (
                            <FormStep3 onSubmit={onSubmit.bind(this, 4)} />
                        )}
                        {step == 4 && (
                            <FormStep4 onSubmit={onSubmit.bind(this, 5.1)} />
                        )}
                    </View>
                </View>
            )}
            {parseInt(step) == 5 && (
                <AddMerchantScreen2
                    onNotificationClicked={onNotificationClicked}
                    onLogout={onLogout}
                >
                    <View style={styles.stepContainer}>
                        <MultiStepper step={5} />
                    </View>
                    {step === 5.1 && (
                        <>
                            <SubscriptionOptions
                                onSubScriptionSelected={(subscriptionName) =>
                                    setSubscriptionSelected(subscriptionName)
                                }
                            />
                            <NextButton
                                color="black"
                                title="Collect Payment"
                                onClick={() => {
                                    onSubmit(5.2, {
                                        membership_type: subscriptionSelected,
                                    });
                                }}
                            />
                        </>
                    )}
                    {step == 5.2 && (
                        <PaymentScreen onSubmit={onSubmit.bind(this, 5.3)} />
                    )}
                    {step == 5.3 && (
                        <QRIdVerificationScreen
                            onSubmit={onSubmit.bind(this, 5.4)}
                        />
                    )}
                    {step == 5.4 && (
                        <TransactionIdVerificationScreen
                            onSubmit={onSubmit.bind(this, 6)}
                        />
                    )}
                </AddMerchantScreen2>
            )}
            {step == 6 && (
                <ConfirmationScreen
                    merchantAdded={merchantAdded}
                    onHomeClicked={onHomeClicked}
                    merchantId={merchantId}
                />
            )}
            {/* <NextButton
                color="black"
                title="Collect Payment"
                onClick={() => {
                    onSubmit(5.2, {
                        membership_type: subscriptionSelected,
                    });
                }}
            /> */}
        </>
    );
};

export default AddMerchantScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: "100%",
        marginTop: 5,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: "#000000",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // position: "relative",
        width: "100%",
        // top: 40,
        padding: 10,
        paddingHorizontal: 20,
    },
    imageContainer: {
        height: 50,
        width: 300,
        margin: 5,
        marginTop: 4,
        padding: 10,
        alignSelf: "center",
    },
    stepContainer: {
        height: 50,
        marginTop: 20,
        margin: 5,
        overflow: "hidden",
        alignItems: "center",
    },
});
