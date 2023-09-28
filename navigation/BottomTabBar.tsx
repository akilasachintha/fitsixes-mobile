import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import MainScreen from "../screens/MainScreen";
import {GestureResponderEvent, StyleSheet, Text, View} from "react-native";
import {Foundation, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import React from "react";
import CartScreen from "../screens/CartScreen";
import TeamScreen from "../screens/TeamScreen";
import {getFocusedRouteNameFromRoute, useNavigation} from "@react-navigation/native";
import StackNavigatorHome from "./StackNavigatorHome";

const Tab = createBottomTabNavigator();

interface CustomTabBarButtonProps {
    children: React.ReactNode,
    onPress: ((event: GestureResponderEvent) => void) | undefined,
}

interface BottomTabNavigatorProps {
    route: any;
}

export default function BottomTabNavigator({route}: BottomTabNavigatorProps) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTab';
    const navigation = useNavigation();

    const handleHomeTabPress = () => {
        // @ts-ignore
        navigation.navigate("HomeTab", {
            screen: "HomeTabHomeStack",
        });
    }

    const handleTeamTabPress = () => {
        // @ts-ignore
        navigation.navigate("TeamTab", {
            screen: "TeamTabHomeStack",
        });
    }

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 60,
                backgroundColor: "#ffffff",
                ...styles.shadow,
            },
            tabBarIcon: ({focused}) => {
                if (route.name === "HomeTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Ionicons name="ios-home" size={22} color="#000532"/> :
                                    <Ionicons name="ios-home-outline" size={22} color="#000532"/>
                            }
                            <Text style={styles.tabIconText}>Home</Text>
                        </View>
                    )
                } else if (route.name === "TeamTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Foundation name="target-two" size={25} color="#000532"/> :
                                    <MaterialCommunityIcons name="target" size={25} color="#000532"/>
                            }
                            <Text style={styles.tabIconText}>Team</Text>
                        </View>
                    )
                } else if (route.name === "CartTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Ionicons name="cart" size={25} color="#000532"/> :
                                    <Ionicons name="cart-outline" size={25} color="#000532"/>
                            }
                            <Text style={styles.tabIconText}>Cart</Text>
                        </View>
                    )
                } else if (route.name === "ProfileTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Ionicons name="person" size={22} color="#000532"/> :
                                    <Ionicons name="person-outline" size={22} color="#000532"/>
                            }
                            <Text style={styles.tabIconText}>Profile</Text>
                        </View>
                    )
                } else if (route.name === "MainTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                routeName === "HomeTab" && <Ionicons name="ios-home" size={22} color="#fff"/>
                            }
                            {
                                routeName === "TeamTab" && <Foundation name="target-two" size={25} color="#fff"/>
                            }
                            {
                                routeName === "CartTab" && <Ionicons name="cart" size={25} color="#fff"/>
                            }
                            {
                                routeName === "ProfileTab" && <Ionicons name="person" size={22} color="#fff"/>
                            }
                        </View>
                    )
                }
            }
        })}>
            <Tab.Screen name="HomeTab" component={StackNavigatorHome}
                        listeners={{
                            tabPress: (e: any) => {
                                if (e.tabPress) {
                                    handleHomeTabPress();
                                }
                            },
                        }}
            />
            <Tab.Screen name="TeamTab" component={TeamScreen}
                        listeners={{
                            tabPress: (e: any) => {
                                if (e.tabPress) {
                                    handleTeamTabPress();
                                }
                            },
                        }}
            />
            <Tab.Screen name="MainTab" component={MainScreen} options={{
                tabBarButton: (props) => (
                    <CustomTabBarButton children={props.children} onPress={props.onPress}/>
                )
            }}/>
            <Tab.Screen name="CartTab" component={CartScreen}/>
            <Tab.Screen name="ProfileTab" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}

const CustomTabBarButton = ({children}: CustomTabBarButtonProps) => {
    return (
        <View style={
            {
                top: -20,
                backgroundColor: "#000532",
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                height: 70,
                borderRadius: 35,
                borderWidth: 5,
                borderColor: "rgba(19, 250, 248, 1)",
                ...styles.shadow
            }
        }>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000532",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    tabIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIconText: {
        color: "#000532",
        fontSize: 11,
    },
    icon: {
        backgroundColor: "#000532",
    }
});