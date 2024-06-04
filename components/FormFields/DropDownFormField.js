import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropDownFormField = (props) => {
    const [value, setValue] = useState("");
    let placeHolder = `${props.placeholder}${props.error ?  (" (This field is required)") : ""}`
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {value == item.value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };
    

    return (
        <View style={styles.dropdown}>
            <Dropdown
                placeholderStyle={[styles.placeholderStyle, {color: props.error ? "red" : "black"}]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={props.data}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeHolder}
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                    setValue(item.value);
                    props.onChange(props.fieldName, item.value)
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                renderItem={renderItem}
            />
        </View>
    );
};

export default DropDownFormField;

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 30,
        padding: 2,
        paddingHorizontal: 20,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 24,
        fontSize: 16,
    },
});
