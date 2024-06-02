import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

const PaymentIdFormField = (props) => {
    return (
        <View style={styles.inputContainer1}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/Google Pay.png")} />
                <Image source={require("../../assets/Phone Pe.png")} />
                <Image source={require("../../assets/Paytm.png")} />
            </View>
            <TextInput
                style={styles.input}
                placeholder={props.placeHolder}
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                onChangeText={(text) => {
                    props.onChange(props.fieldName, text);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    inputContainer1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 30,
        padding: 2,
        paddingHorizontal: 20,
    },
    input: {
        marginLeft: 30,
        flex: 1,
        color: "white",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        fontSize: 16,
        color: "black",
    },
    star: {
        color: "#FFC40C",
        fontSize: 16,
        marginRight: 5,
    },
    imageIcon: {
        color: "white",
        fontSize: 16,
        fontWeight: "400",
        position: "absolute",
        right: 10,
    },
});

export default PaymentIdFormField;
