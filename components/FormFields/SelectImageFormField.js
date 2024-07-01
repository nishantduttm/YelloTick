import React, { useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    View,
    Image
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faImages } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const SelectImageFormField = (props) => {
    let placeHolder = `${props.placeHolder}${props.error ? " (Required)" : ""}`;
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
                placeholderTextColor={props.error ? "red" : "grey"}
            />
            {props.required && (
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/required.png")} />
                </View>
            )}
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/ImageGallery.png")} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    inputContainer1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 30,
        marginVertical: 10,
        padding: 8,
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
        alignSelf:"center"
    },
    imageIcon: {
        color: "black",
        fontSize: 16,
        fontWeight: "400",
        marginRight:10,
        alignItems:"center",
        opacity:0.7
    },
});

export default SelectImageFormField;
