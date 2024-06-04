import {
    View,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    Pressable,
    Dimensions
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
    safeDivisionPercentage,
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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const referenceHeight = 840;

const scaleHeight = screenHeight / referenceHeight;

const menuStyle = StyleSheet.create({
    menuContainer: {
        borderRadius: 20 * scaleHeight,
        backgroundColor: "white",
    },
    itemContainer: {
        flexDirection: "row",
        borderBottomWidth: 0.2 * scaleHeight,
        borderColor: "grey",
        paddingTop: 25 * scaleHeight,
        paddingBottom: 10 * scaleHeight,
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
            safeDivisionPercentage(salesProfile["currentSales"], salesProfile["currentTarget"])
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
                            size={30 * scaleHeight}
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
                                size={30 * scaleHeight}
                                style={{ marginTop: 25 * scaleHeight }}
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
                            size={30 * scaleHeight}
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
        borderTopLeftRadius: 40 * scaleHeight,
        borderTopRightRadius: 40 * scaleHeight,
        textAlign: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 180 * scaleHeight
        // paddingHorizontal: 20,
    },
    toggleBarIcon: {
        elevation: 1,
    },
    heading: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10 * scaleHeight,
        marginBottom: 0,
        paddingHorizontal: 20 * scaleHeight,
        justifyContent: "space-between",
        marginLeft: 10 * scaleHeight,
    },
    textContainer: {
        marginTop: 5 * scaleHeight,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20 * scaleHeight,
    },
    toggleIconDiv: {
        elevation: 4,
        backgroundColor: "#e81e43",
        padding: 2 * scaleHeight,
        overflow: "hidden",
        borderRadius: 100 * scaleHeight,
        shadowOffset: { height: 0, width: 1 },
        shadowOpacity: 0.8,
        height: 45 * scaleHeight,
        width: 45 * scaleHeight,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20 * scaleHeight,
    },
    bellIconDiv: {
        elevation: 4,
        backgroundColor: "white",
        padding: 8 * scaleHeight,
        overflow: "hidden",
        borderRadius: 27 * scaleHeight,
        shadowOffset: { height: 0, width: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: "black",
        justifyContent: "center",
        alignItems: "center",
        height: 45 * scaleHeight,
        width: 45 * scaleHeight,
    },
    iconContainer: {
        position: "absolute",
        right: 10 * scaleHeight,
        marginTop: 20 * scaleHeight,
        marginRight: 10 * scaleHeight,
    },
    icon: {
        height:25 * scaleHeight,
        width: 25 * scaleHeight
    },
    avatarContainer: {
        position: "absolute",
        top: 50 * scaleHeight,
    },
    greeting: {
        position: "absolute",
        top: 110 * scaleHeight,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
        marginLeft: 20 * scaleHeight,
    },
    goodMorningText: {
        color: "white",
        fontSize: 20 * scaleHeight,
    },
    name: {
        color: "white",
        fontSize: 20 * scaleHeight,
        fontWeight: "bold",
    },
    addButtonContainer: {
        flexDirection: "row",
        marginTop: 40 * scaleHeight,
        justifyContent: "flex-end",
        marginRight: 20 * scaleHeight,
        borderRadius: 14 * scaleHeight,
    },
    plusIcon: {
        borderRadius: 28 * scaleHeight,
        elevation: 20,
        padding: 10 * scaleHeight,
        backgroundColor: "white",
    },
    container1: {
        backgroundColor: "#F1F1F1",
        margin: 10 * scaleHeight,
        borderRadius: 10 * scaleHeight,
        paddingVertical: 10 * scaleHeight,
    },
    targetContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10 * scaleHeight,
    },
    dealsContainer: {},
    dealsRow1: { flexDirection: "row", marginTop: 10 * scaleHeight, justifyContent:"center" },
    dealsRow2: { flexDirection: "row", marginTop: 10 * scaleHeight, marginBottom: 10 * scaleHeight, justifyContent:"center" },
    percentageText: {
        fontSize: 40 * scaleHeight,
        color: "#f02e51",
        fontWeight: "bold",
    },
    targetAcheivedText: {
        color: "#f02e51",
        fontSize: 14 * scaleHeight,
        marginLeft: 10 * scaleHeight,
        fontWeight: "bold",
    },
    percentageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    remainingTargetText: {
        color: "grey",
        marginBottom: 10 * scaleHeight,
    },
    menuItem: {
        position: "absolute",
        top: 170 * scaleHeight,
        right: 20 * scaleHeight,
        elevation: 10 * scaleHeight,
    },
    bottomCard: {
        backgroundColor: "black",
        borderTopLeftRadius: 40 * scaleHeight,
        borderTopRightRadius: 40 * scaleHeight,
        position: "absolute",
        bottom: 0,
        top: 600 * scaleHeight,
        width: "100%",
        justifyContent: "center",
    },
    homeButtonContainer: {
        // position: "absolute",
        // top: 250,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 30 * scaleHeight,
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
        elevation: 5 * scaleHeight,
        borderColor: "black",
        borderWidth: 4 * scaleHeight,
    },
    navigationContainer: {
        position: "absolute",
        top: 150 * scaleHeight,
        width: "100%",
    },
    closeItemContainer: {
        position: "absolute",
        top: 20 * scaleHeight,
        right: 10 * scaleHeight,
    },
    avatar:{
    }
});

export default Home;
