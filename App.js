import { StyleSheet, View, StatusBar, useWindowDimensions } from "react-native";
import AddMerchantScreen from "./Screens/AddMerchants/AddMerchant";
import LoginScreen from "./Screens/LoginScreen";
import { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import Home from "./Screens/Home";
import { refreshToken } from "./utils/ApiUtils";
import { BackHandler } from "react-native";
import { checkExpoAppVersion } from "./utils/common-utils";
import {
    removeAccessToken,
    removeCredential,
    saveDimensions,
} from "./utils/StorageUtils";
import NotificationScreen from "./Screens/Notifications";

export default function App() {
    StatusBar.setHidden(true);

    const refreshTokenTimer = useRef(null);

    const { width, height } = useWindowDimensions();

    saveDimensions(height, width);

    useEffect(() => {
        checkExpoAppVersion();
    }, []); 

    const [screenIndex, setScreenIndex] = useState(0);
    const [fontsLoaded] = useFonts({
        "varela-round": require("./assets/fonts/Arimo-VariableFont_wght.ttf"),
    });
    const handleBackButton = () => {
        setScreenIndex((prev) => {
            if (prev <= 2.1) {
                return prev;
            }
            if (parseInt(prev) === prev) {
                return prev - 1;
            } else {
                return prev - 0.1;
            }
        });
        return true;
    };

    useEffect(() => {
        setScreenIndex(0);
        refreshToken(
            () => {
                setScreenIndex(2.1);
            },
            () => {
                setScreenIndex(1);
            }
        );
        addRefreshSchedule();
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);
        return () => clearInterval(refreshTokenTimer.current);
    }, []);

    const onHomeClickHandler = () => {
        setScreenIndex(2.2);
    };
    const onAddMerchantClickHandler = () => {
        setScreenIndex(3);
    };

    const onLogoutHandler = async () => {
        clearInterval(refreshTokenTimer.current);
        setScreenIndex(1);
        await removeAccessToken();
        await removeCredential();
    };

    const onNotificatioClickHandler = async () => {
        setScreenIndex(4);
    };

    const addRefreshSchedule = () => {
        if (refreshTokenTimer.current != null) {
            clearInterval(refreshTokenTimer.current);
        }
        refreshTokenTimer.current = setInterval(() => {
            refreshToken(() => {
                setScreenIndex(1);
            });
        }, 2400000);
    };

    return (
        <View style={styles.container}>
            {screenIndex == 0 && (
                <LoginScreen
                    onSuccess={() => {
                        addRefreshSchedule();
                        setScreenIndex(2.1);
                    }}
                    loginInProgressProp={true}
                />
            )}
            {screenIndex == 1 && (
                <LoginScreen
                    onSuccess={() => {
                        addRefreshSchedule();
                        setScreenIndex(2.1);
                    }}
                    loginInProgressProp={false}
                />
            )}
            {screenIndex == 3 && (
                <AddMerchantScreen
                    onHomeClicked={onHomeClickHandler}
                    onNotificationClicked={onNotificatioClickHandler}
                    onLogout={onLogoutHandler}
                />
            )}
            {parseInt(screenIndex) == 2 && (
                <Home
                    screenIndex={screenIndex === 2.1 ? 1 : 2}
                    onGotoHomeClicked={onHomeClickHandler}
                    onAddMerchantClicked={onAddMerchantClickHandler}
                    onLogout={onLogoutHandler}
                    onNotificationClicked={onNotificatioClickHandler}
                />
            )}
            {parseInt(screenIndex) == 4 && (
                <NotificationScreen
                    screenIndex={screenIndex === 2.1 ? 1 : 2}
                    onGotoHomeClicked={onHomeClickHandler}
                    onAddMerchantClicked={onAddMerchantClickHandler}
                    onLogout={onLogoutHandler}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "#ffffff",
        // alignItems: "center",
        // justifyContent: "center",
    },
});
