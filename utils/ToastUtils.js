import Toast from "react-native-root-toast";
import { ToastAndroid } from "react-native";

let toast;

const showToast = (message) => {
    toast = ToastAndroid.show(message, ToastAndroid.SHORT);
};

export { showToast };
