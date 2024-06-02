import { View, Image, StyleSheet } from "react-native";

const MultiStepper = ({step}) =>{
    return (
        <View style={styles.imageContainer}>
            {step == 1 && <Image source={require("../assets/step1.png")} />}
            {step == 2 && <Image source={require("../assets/step2.png")} />}
            {step == 3 && <Image source={require("../assets/step3.png")} />}
            {step == 4 && <Image source={require("../assets/step4.png")} />}
            {step == 5 && <Image source={require("../assets/step5.png")} />}
        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer : {
        height : 10,
        width:"100%",
        margin:5,
        alignItems:"center"
    }
})


export default MultiStepper;