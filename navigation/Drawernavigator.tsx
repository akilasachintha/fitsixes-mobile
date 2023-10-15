import {createDrawerNavigator} from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabBar";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {useAuth} from "../context/AuthContext";
import {THEME} from "../config/theme";
import {PATHS} from "../config/paths";
import {ROLES} from "../config/roles";

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={() => <MyDrawer/>}
            screenOptions={{
                headerShown: false,
            }}>
            <Drawer.Screen name="HomeDrawer" component={BottomTabNavigator}/>
        </Drawer.Navigator>
    );
}

function MyDrawer() {
    const navigation = useNavigation();
    const {isLoggedIn, logout, role} = useAuth();

    const drawerItems = [
        {
            id: 1,
            name: "Home",
            icon: <Ionicons name={"ios-home-outline"} size={22} color={THEME.COLORS.white}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("HomeTab", {screen: "HomeTabMatchesStack",}),
            condition: (_isLoggedIn: boolean, _role: string | null) => {
                return true;
            }
        },
        {
            id: 2,
            name: "Live Score",
            icon: <MaterialIcons name={"live-tv"} size={24} color={THEME.COLORS.white}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("HomeTabMatchesStack", {screen: "LiveTab",}),
            condition: (_isLoggedIn: boolean, _role: string | null) => {
                return true;
            }
        },
        {
            id: 3,
            name: "Match Schedule",
            icon: <MaterialIcons name={"schedule"} size={24} color={THEME.COLORS.white}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("HomeTabMatchesStack", {screen: "UpcomingTab",}),
            condition: (_isLoggedIn: boolean, _role: string | null) => {
                return true;
            }
        },
        {
            id: 4,
            name: "Teams",
            icon: <MaterialCommunityIcons name={"target"} size={24} color={THEME.COLORS.white}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("TeamTab", {screen: "TeamTabTeamStack",}),
            condition: (_isLoggedIn: boolean, role: string | null) => {
                return role !== ROLES.TEAM_COORDINATOR;
            }
        },
        {
            id: 5,
            name: isLoggedIn ? "Logout" : "Login",
            icon: <MaterialIcons name="logout" size={24} color={THEME.COLORS.white}/>,
            navigationAction: () => {
                // @ts-ignore
                !isLoggedIn ? navigation.navigate("LoginStack") : logout();
            },
            condition: (_isLoggedIn: boolean, _role: string | null) => {
                return true;
            }
        }
    ];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Image source={PATHS.IMAGES.FIT_SIXES_LOGO}
                       style={styles.drawerImage}/>
            </View>
            <View style={styles.drawerContentContainer}>
                {
                    drawerItems.map((item) => (
                        item.condition(isLoggedIn, role) &&
                        <View key={item.id}>
                            <TouchableOpacity key={item.id} style={styles.drawerItemButton}
                                              onPress={item.navigationAction}>
                                {item.icon}
                                <Text style={styles.drawerText}>{item.name}</Text>
                            </TouchableOpacity>
                            {
                                item.id === 4 && (
                                    <View
                                        style={{height: 2, backgroundColor: THEME.COLORS.white, marginVertical: 20, borderRadius: 30}}/>
                                )
                            }
                        </View>
                    ))
                }
            </View>
            <StatusBar style="auto"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: THEME.COLORS.primary
    },
    drawerImage: {
        width: "100%",
        height: 200,
        resizeMode: "contain"
    },
    drawerContentContainer: {
        flex: 1,
        padding: 30,
    },
    drawerItemButton: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "5%",
    },
    drawerText: {
        color: THEME.COLORS.white,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "700",
    }
});