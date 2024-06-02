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
    const [imagePlaceHolder, setImagePlaceHolder] = useState(props.placeHolder);
    const selectImage = async () => {
        // No permissions request is necessary for launching the image library
        DocumentPicker.getDocumentAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        })
            .then((result) => {
                if (!result.canceled) {
                    // console.log(result);
                    props.onChange(props.fieldName, {
                        uri: result.assets[0].uri,
                        name: result.assets[0].name,
                        type: result.assets[0].mimeType,
                    });
                    setImagePlaceHolder(result.assets[0].name);
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
            />
            <FontAwesomeIcon icon={faStar} style={styles.star} />
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
