import {
    View,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faPlus,
    faShareNodes,
    faPowerOff,
    faHome,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import DealCard from "../components/DealCards";
import { useEffect, useState } from "react";
import NextButton from "../components/NextButton";
import { BlurView } from "expo-blur";
import NavigationItem from "../components/NavigationItem";
import AttendenceCard from "../components/DealDetailsCard/AttendanceCard";
import ScoreDetailsCard from "../components/DealDetailsCard/ScoreDetailsCard";
import DealClosedCard from "../components/DealDetailsCard/DealClosedCard";
import DealsPendinCard from "../components/DealDetailsCard/DealsPendingCard";
import {
    getAttendence,
    getSalesProfile,
    markAttendance,
} from "../utils/ApiUtils";
import {
    getCurrentMonthStartAndEnd,
    getGreeting,
    getStartDatAndEndDate,
    isXHoursBeforeNow,
} from "../utils/common-utils";
import Loader from "../components/Loader";
import {
    addPunchInTime,
    getPunchInTime,
    removePunchInTime,
} from "../utils/StorageUtils";
import { BackHandler } from "react-native";

const MenuOptions = ({ style, onLogout }) => {
    return (
        <View style={[menuStyle.menuContainer, style]}>
            <View style={[menuStyle.itemContainer]}>
                <Text style={menuStyle.itemText}>Share Report</Text>
                <FontAwesomeIcon
                    icon={faShareNodes}
                    color="#f02e51"
                    size={25}
                />
            </View>
            <Pressable
                style={[menuStyle.itemContainer, { borderBottomWidth: 0 }]}
                onPress={onLogout}
            >
                <Text style={menuStyle.itemText}>Logout</Text>
                <FontAwesomeIcon icon={faPowerOff} color="#f02e51" size={25} />
            </Pressable>
            <View></View>
            <Image source={require("../assets/bottomimgeline.png")} />
        </View>
    );
};

const menuStyle = StyleSheet.create({
    menuContainer: {
        borderRadius: 20,
        backgroundColor: "white",
    },
    itemContainer: {
        flexDirection: "row",
        borderBottomWidth: 0.2,
        borderColor: "grey",
        paddingTop: 25,
        paddingBottom: 10,
        justifyContent: "space-around",
    },
    itemText: {
        color: "#f02e51",
        fontWeight: "bold",
    },
});

const Home = ({
    screenIndex,
    onGotoHomeClicked,
    onAddMerchantClicked,
    onLogout,
    onNotificationClicked,
}) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [navigationSubWindowIndex, setNavigationSubWindowIndex] = useState(1);
    const [openedDealCardIndex, setOpenedDealCardIndex] = useState(null);
    const [attendance, setAttendance] = useState(0);
    const [targetPercentageAcheived, SetCurrentPercentageAcheved] =
        useState("100");
    const onDealCardClickedHandler = (idx) => {
        setOpenedDealCardIndex(idx);
    };

    const [salesProfile, setSalesProfile] = useState({});

    const [loadingData, setIsLoadingData] = useState({
        isLoading: true,
        loadingText: "Login In Progress",
    });

    const [isPunchedIn, setIsPunchedIn] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                setNavigationSubWindowIndex(1);
            }
        );
        return () => {
            backHandler.remove();
        };
    });
    useEffect(() => {
        getPunchInTime().then((punchInTime) => {
            if (punchInTime && isXHoursBeforeNow(parseInt(punchInTime, 14))) {
                removePunchInTime().then(() => {
                    setIsPunchedIn(false);
                });
            } else {
                setIsPunchedIn(true);
            }
        });
        let dates = getCurrentMonthStartAndEnd(0);
        getSalesProfile(
            dates["startDate"],
            dates["endDate"],
            (resp) => {
                setSalesProfile(resp);
                setIsLoadingData({ isLoading: false });
            },
            () => {}
        );
        let currentDate = new Date();
        getAttendence(
            currentDate.getMonth() + 1,
            currentDate.getFullYear(),
            (resp) => {
                setAttendance(resp["dates"].length);
            },
            () => {}
        );
    }, []);
    useEffect(() => {
        SetCurrentPercentageAcheved(
            Math.round(
                salesProfile["currentSales"] / salesProfile["currentTarget"]
            ) * 100
        );
    }, [salesProfile]);
    return (
        <LinearGradient
            colors={["#f02e51", "#98001C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rootContainer}
        >
            <View style={styles.heading}>
                <View style={styles.iconContainer}>
                    <Pressable
                        style={styles.bellIconDiv}
                        onPress={onNotificationClicked}
                    >
                        <Image
                            style={styles.icon}
                            source={require("../assets/redbellicon.png")}
                        />
                    </Pressable>
                    <Pressable
                        style={styles.toggleIconDiv}
                        onPress={() => {
                            setIsMenuOpened((prev) => !prev);
                        }}
                    >
                        <Image
                            style={styles.icon}
                            source={require("../assets/baricon.png")}
                        />
                    </Pressable>
                </View>
                <View style={styles.greeting}>
                    <Text style={styles.goodMorningText}>{getGreeting()},</Text>
                    <Text style={styles.name}>
                        {salesProfile ? salesProfile["firstName"] : "Nishant"}
                    </Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Pressable
                    style={styles.addButtonContainer}
                    onPress={onAddMerchantClicked}
                >
                    <View style={styles.plusIcon}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            color="#f02e51"
                            size={30}
                        />
                    </View>
                </Pressable>
                <View style={styles.container1}>
                    <View style={styles.targetContainer}>
                        <View style={styles.percentageContainer}>
                            <Text style={styles.percentageText}>
                                {targetPercentageAcheived}%
                            </Text>
                            <Text style={styles.targetAcheivedText}>
                                Target Achieved
                            </Text>
                        </View>
                        <Text style={styles.remainingTargetText}>
                            {100 - targetPercentageAcheived}% remaining this
                            month
                        </Text>
                    </View>
                    <Image source={require("../assets/linesimg.png")} />
                    <View style={styles.dealsContainer}>
                        <View style={styles.dealsRow1}>
                            <DealCard
                                type="dealsClosed"
                                score={salesProfile["currentSales"]}
                                idx={1}
                                target={salesProfile["currentTarget"]}
                                onClick={onDealCardClickedHandler}
                            />
                            <DealCard
                                type="dealsPending"
                                score={salesProfile["currentPending"]}
                                idx={2}
                                target={salesProfile["currentTarget"]}
                                onClick={onDealCardClickedHandler}
                            />
                        </View>
                        <View style={styles.dealsRow2}>
                            <DealCard
                                type="yourScore"
                                score={salesProfile["totalSales"]}
                                target={salesProfile["currentTarget"]}
                                idx={3}
                                onClick={onDealCardClickedHandler}
                            />
                            <DealCard
                                type="attendance"
                                score={attendance}
                                idx={4}
                                onClick={onDealCardClickedHandler}
                            />
                        </View>
                    </View>
                    <Image source={require("../assets/linesimg.png")} />
                </View>
            </View>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={require("../assets/manavatar.png")}
                />
            </View>
            {isMenuOpened && (
                <MenuOptions style={styles.menuItem} onLogout={onLogout} />
            )}
            {screenIndex === 1 && (
                <BlurView style={styles.menuCard} intensity={1000} tint="dark">
                    <View style={styles.bottomCard}>
                        <View style={styles.homeButtonContainer}>
                            <FontAwesomeIcon
                                icon={faHome}
                                color="white"
                                size={30}
                                style={{ marginTop: 25 }}
                            />
                            <NextButton
                                style={{
                                    width: "70%",
                                    marginTop: 0,
                                    borderWidth: 0,
                                }}
                                title="Go To Home"
                                onClick={onGotoHomeClicked}
                            />
                        </View>
                    </View>
                    {navigationSubWindowIndex == 1 && (
                        <View style={styles.navigationContainer}>
                            <NavigationItem
                                type="markAttendance"
                                onClick={() => {
                                    setNavigationSubWindowIndex(1.1);
                                }}
                            />
                            <NavigationItem type="viewProfile" />
                            <NavigationItem
                                type="addMerchant"
                                onClick={onAddMerchantClicked}
                            />
                        </View>
                    )}
                    {navigationSubWindowIndex == 1.1 && (
                        <View style={styles.navigationContainer}>
                            <NavigationItem
                                type="punchIn"
                                disabledMessage="Already Punched In"
                                disabled={isPunchedIn}
                                onClick={() => {
                                    setIsLoadingData({
                                        isLoading: true,
                                        loadingText: "Marking Attendence",
                                    });
                                    markAttendance(
                                        () => {
                                            addPunchInTime().then(() => {
                                                setIsLoadingData({
                                                    isLoading: false,
                                                });
                                                setNavigationSubWindowIndex(1);
                                                setIsPunchedIn(true);
                                            });
                                        },
                                        () => {
                                            setIsLoadingData({
                                                isLoading: false,
                                            });
                                        }
                                    );
                                    setNavigationSubWindowIndex(1);
                                }}
                            />
                            <NavigationItem
                                type="punchOut"
                                disabled={!isPunchedIn}
                                onClick={() => {
                                    setIsLoadingData({
                                        isLoading: true,
                                        loadingText: "Marking Attendence",
                                    });
                                    markAttendance(
                                        () => {
                                            removePunchInTime().then(() => {
                                                setIsLoadingData({
                                                    isLoading: false,
                                                });
                                                setNavigationSubWindowIndex(1);
                                                setIsPunchedIn(false);
                                            });
                                        },
                                        () => {
                                            setIsLoadingData({
                                                isLoading: false,
                                            });
                                        }
                                    );
                                }}
                            />
                        </View>
                    )}
                </BlurView>
            )}
            <Loader
                text={loadingData.loadingText}
                isVisible={loadingData.isLoading}
            />
            {openedDealCardIndex && (
                <BlurView style={styles.menuCard} intensity={1000} tint="dark">
                    {openedDealCardIndex == 4 && <AttendenceCard />}
                    {openedDealCardIndex == 3 && (
                        <ScoreDetailsCard score={salesProfile["totalSales"]} />
                    )}
                    {openedDealCardIndex == 1 && (
                        <DealClosedCard score={salesProfile["currentSales"]} />
                    )}
                    {openedDealCardIndex == 2 && (
                        <DealsPendinCard
                            currentPending={salesProfile["currentPending"]}
                            target={salesProfile["currentTarget"]}
                            currentSales={salesProfile["currentSales"]}
                        />
                    )}
                    <Pressable
                        style={styles.closeItemContainer}
                        onPress={() => {
                            setOpenedDealCardIndex(null);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faClose}
                            color="white"
                            size={30}
                        />
                    </Pressable>
                </BlurView>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        width: "100%",
    },
    inputContainer: {
        // flex: 3,
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        textAlign: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 180,
        // paddingHorizontal: 20,
    },
    toggleBarIcon: {
        elevation: 1,
    },
    heading: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 0,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        marginLeft: 10,
    },
    textContainer: {
        marginTop: 5,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    toggleIconDiv: {
        elevation: 4,
        backgroundColor: "#e81e43",
        padding: 2,
        overflow: "hidden",
        borderRadius: 100,
        shadowOffset: { height: 0, width: 1 },
        shadowOpacity: 0.8,
        height: 55,
        width: 55,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    bellIconDiv: {
        elevation: 4,
        backgroundColor: "white",
        padding: 8,
        overflow: "hidden",
        borderRadius: 27,
        shadowOffset: { height: 0, width: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: "black",
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        width: 55,
    },
    iconContainer: {
        position: "absolute",
        right: 10,
        marginTop: 20,
        marginRight: 10,
    },
    icon: {},
    avatarContainer: {
        position: "absolute",
        top: 50,
    },
    greeting: {
        position: "absolute",
        top: 110,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
        marginLeft: 20,
    },
    goodMorningText: {
        color: "white",
        fontSize: 20,
    },
    name: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    addButtonContainer: {
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "flex-end",
        marginRight: 20,
        borderRadius: 14,
    },
    plusIcon: {
        borderRadius: 28,
        elevation: 20,
        padding: 10,
        backgroundColor: "white",
    },
    container1: {
        backgroundColor: "#F1F1F1",
        margin: 20,
        borderRadius: 20,
        paddingVertical: 20,
    },
    targetContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    dealsContainer: {},
    dealsRow1: { flexDirection: "row", marginTop: 10 },
    dealsRow2: { flexDirection: "row", marginTop: 10, marginBottom: 10 },
    percentageText: {
        fontSize: 40,
        color: "#f02e51",
        fontWeight: "bold",
    },
    targetAcheivedText: {
        color: "#f02e51",
        fontSize: 14,
        marginLeft: 10,
        fontWeight: "bold",
    },
    percentageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    remainingTargetText: {
        color: "grey",
        marginBottom: 10,
    },
    menuItem: {
        position: "absolute",
        top: 170,
        right: 20,
        elevation: 10,
    },
    bottomCard: {
        backgroundColor: "black",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: "absolute",
        bottom: 0,
        top: 600,
        width: "100%",
        justifyContent: "center",
    },
    homeButtonContainer: {
        // position: "absolute",
        // top: 250,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 30,
        justifyContent: "space-around",
    },
    menuCard: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        borderColor: "black",
        borderWidth: 4,
    },
    navigationContainer: {
        position: "absolute",
        top: 150,
        width: "100%",
    },
    closeItemContainer: {
        position: "absolute",
        top: 20,
        right: 10,
    },
});

export default Home;
