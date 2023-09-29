import {createDrawerNavigator} from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabBar";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <MyDrawer {...props}/>}
            screenOptions={{
                headerShown: false,
            }}>
            <Drawer.Screen name="HomeDrawer" component={BottomTabNavigator}/>
        </Drawer.Navigator>
    );
}


function MyDrawer({props}: any) {
    const navigation = useNavigation();

    const drawerItems = [
        {
            id: 1,
            name: "Home",
            icon: <Ionicons name={"ios-home-outline"} size={22} color={"#fff"}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("HomeTab"),
        },
        {
            id: 2,
            name: "Live Score",
            icon: <MaterialIcons name={"live-tv"} size={24} color={"#fff"}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("HomeTab", {screen: "HomeTabMatchesStack",}),
        },
        {
            id: 3,
            name: "Match Schedule",
            icon: <MaterialIcons name={"schedule"} size={24} color={"#fff"}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("HomeTab", {screen: "HomeTabMatchesStack",}),
        },
        {
            id: 4,
            name: "Teams",
            icon: <MaterialCommunityIcons name={"target"} size={24} color={"#fff"}/>,
            // @ts-ignore
            navigationAction: () => navigation.navigate("TeamTab"),
        }
    ]

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Image source={require("../assets/images/fit-sixes-drawer-logo.png")}
                       style={styles.drawerImage}/>
            </View>
            <View style={styles.drawerContentContainer}>
                {
                    drawerItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.drawerItemButton} onPress={item.navigationAction}>
                            {item.icon}
                            <Text style={styles.drawerText}>{item.name}</Text>
                        </TouchableOpacity>
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
        backgroundColor: "#000532"
    },
    drawerImage: {
        width: "100%",
        height: 150,
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
        color: "#ffffff",
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "700",
    }
});