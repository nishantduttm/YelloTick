import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropDownFormField = (props) => {
    const [value, setValue] = useState("");
    let placeHolder = `${props.placeholder}${props.error ? " (Required)" : ""}`;
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {value == item.value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={16}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.dropdown}>
            <Dropdown
                placeholderStyle={[
                    styles.placeholderStyle,
                    { color: props.error ? "rgba(255, 0, 0, 0.5)" : "grey" },
                ]}
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
                    props.onChange(props.fieldName, item.value);
                }}
                renderItem={renderItem}
                renderRightIcon={() => (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{ marginRight: 5 }}
                            source={require("../../assets/required.png")}
                        />
                        <View
                            style={{
                                backgroundColor: "white",
                                elevation: 20,
                                borderRadius: 20,
                                height: 30,
                                width: 30,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                source={require("../../assets/DoubleDown.png")}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default DropDownFormField;

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: "white",
        marginVertical: 10,
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 20,
        width: "80%",
        alignSelf: "center",
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
