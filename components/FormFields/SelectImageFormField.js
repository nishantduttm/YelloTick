import React, { useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faImages } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const SelectImageFormField = (props) => {
    let placeHolder = `${props.placeHolder}${
        props.error ? " (This field is required)" : ""
    }`;
    const [imagePlaceHolder, setImagePlaceHolder] = useState(placeHolder);
    const selectImage = async () => {
        // No permissions request is necessary for launching the image library
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: props.multi ? true : false,
        })
            .then((result) => {
                if (!result.canceled) {
                    console.log(result);
                    if (!props.multi) {
                        props.onChange(props.fieldName, {
                            uri: result.assets[0].uri,
                            name: result.assets[0].fileName,
                            type: result.assets[0].mimeType,
                        });
                    } else {
                        props.onChange(
                            props.fieldName,
                            result.assets.map((asset) => ({
                                uri: asset.uri,
                                name: asset.fileName,
                                type: asset.mimeType,
                            }))
                        );
                    }
                    setImagePlaceHolder(result.assets[0].fileName);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Pressable style={styles.inputContainer1} onPress={selectImage}>
            <TextInput
                style={styles.input}
                placeholder={imagePlaceHolder}
                editable={false}
                placeholderTextColor={props.error ? "red" : "black"}
            />
            {props.required && (
                <FontAwesomeIcon icon={faStar} style={styles.star} />
            )}
            <TouchableOpacity style={styles.imageIcon}>
                <FontAwesomeIcon icon={faImages} style={styles.imageIcon} />
            </TouchableOpacity>
        </Pressable>
    );
};

const styles = StyleSheet.create({
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
        color: "black",
        fontSize: 16,
        fontWeight: "400",
        position: "absolute",
        right: 10,
    },
});

export default SelectImageFormField;
