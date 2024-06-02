import React, { useState } from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";
import {
    ConfirmationCard1,
    ConfirmationCard2,
    ConfirmationCard3,
} from "../ConfirmationCards/ConfirmationCard";
import Loader from "../Loader";

const ConfirmationScreen = ({ merchantAdded, onHomeClicked, merchantId }) => {
    const [cardStep, setCardStep] = useState(1); // Step state instead of JSX

    const onPublishProfileHandler = () => {
        setCardStep(3);
    };

    const onSendRequestForAvatarHandler = () => {
        setCardStep(2);
    };

    const onPublishWithPhotoHandler = () => {
        setCardStep(2);
    };

    const renderConfirmationCard = () => {
        switch (cardStep) {
            case 1:
                return (
                    <ConfirmationCard1
                        onClick1={onSendRequestForAvatarHandler}
                        onClick2={onPublishWithPhotoHandler}
                        merchantId={merchantId}
                    />
                );
            case 2:
                return <ConfirmationCard2 onClick={onPublishProfileHandler} />;
            case 3:
                return <ConfirmationCard3 onClick={onHomeClicked} />;
            default:
                return <Text>Invalid step</Text>;
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/blurimage.png")}
            resizeMode="cover"
            style={styles.rootContainer}
            imageStyle={{ opacity: 0.7 }}
        >
            {merchantAdded ? renderConfirmationCard() : null}
            <Loader
                text="Adding Merchant. Please Wait....."
                isVisible={!merchantAdded}
            />
        </ImageBackground>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
