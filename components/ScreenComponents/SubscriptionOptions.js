import { View, Text, StyleSheet } from "react-native";
import SubscriptionCard from "../Subscriptioncards/SubscriptionCard";
import { useState } from "react";

const subscriptionNames = [
    "Strike Memebership",
    "Strike Up MemeberShip",
    "Digi Ease Pack",
];

const SubscriptionOptions = ({ onSubScriptionSelected }) => {
    const [selectedSubscriptionIdx, setSelectedSubscriptionIdx] = useState(-1);
    const onSelectedHandler = (idx) => {
        setSelectedSubscriptionIdx(idx);
        onSubScriptionSelected(subscriptionNames[idx]);
    };
    return (
        <View style={styles.cardContainer}>
            <SubscriptionCard
                primaryColor="#FFC40C"
                secondaryColor="#EEECE5"
                title="Strike Membership"
                price="799"
                idx={0}
                selectedIdx={selectedSubscriptionIdx}
                onSelected={onSelectedHandler}
            />
            <SubscriptionCard
                primaryColor="#FFC40C"
                secondaryColor="#EEECE5"
                title="Strike up Membership"
                price="1,499"
                idx={1}
                selectedIdx={selectedSubscriptionIdx}
                onSelected={onSelectedHandler}
            />
            <SubscriptionCard
                primaryColor="#000000"
                secondaryColor="#CA1F3F"
                title="Digi Ease Pack"
                price="14,999"
                idx={2}
                selectedIdx={selectedSubscriptionIdx}
                onSelected={onSelectedHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {},
});

export default SubscriptionOptions;
