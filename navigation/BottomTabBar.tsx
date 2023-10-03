import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import MainScreen from "../screens/MainScreen";
import {GestureResponderEvent, StyleSheet, Text, View} from "react-native";
import {Foundation, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import React from "react";
import CartScreen from "../screens/CartScreen";
import {getFocusedRouteNameFromRoute, useNavigation} from "@react-navigation/native";
import StackNavigatorHome from "./StackNavigatorHome";
import StackNavigatorTeam from "./StackNavigatorTeam";
import {useAuth} from "../context/AuthContext";
import TopHeaderBar from "../components/TopHeaderBar";
import {THEME} from "../config/theme";
import {ROLES} from "../config/roles";
import HandleMatchesScreen from "../screens/HandleMatchesScreen";
import HandleMatchDetailsScreen from "../screens/HandleMatchDetailsScreen";
import HandleTeamCoordinatorScreen from "../screens/HandleTeamCoordinatorScreen";

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
    const {isLoggedIn, role} = useAuth();

    const handleHomeTabPress = () => {
        // @ts-ignore
        navigation.navigate("HomeTab", {
            screen: "HomeTabMatchesStack",
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
            headerShown: true,
            header: () => <TopHeaderBar/>,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 60,
                backgroundColor: THEME.COLORS.white,
                ...styles.shadow,
            },
            tabBarIcon: ({focused}) => {
                if (route.name === "HomeTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Ionicons name="ios-home" size={22} color={THEME.COLORS.primary}/> :
                                    <Ionicons name="ios-home-outline" size={22} color={THEME.COLORS.primary}/>
                            }
                            <Text style={styles.tabIconText}>Home</Text>
                        </View>
                    )
                } else if (route.name === "TeamTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Foundation name="target-two" size={25} color={THEME.COLORS.primary}/> :
                                    <MaterialCommunityIcons name="target" size={25} color={THEME.COLORS.primary}/>
                            }
                            <Text style={styles.tabIconText}>Team</Text>
                        </View>
                    )
                } else if (route.name === "CartTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Ionicons name="cart" size={25} color={THEME.COLORS.primary}/> :
                                    <Ionicons name="cart-outline" size={25} color={THEME.COLORS.primary}/>
                            }
                            <Text style={styles.tabIconText}>Cart</Text>
                        </View>
                    )
                } else if (route.name === "ProfileTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <Ionicons name="person" size={22} color={THEME.COLORS.primary}/> :
                                    <Ionicons name="person-outline" size={22} color={THEME.COLORS.primary}/>
                            }
                            <Text style={styles.tabIconText}>Profile</Text>
                        </View>
                    )
                } else if (route.name === "MainTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                routeName === "HomeTab" &&
                                <Ionicons name="ios-home" size={22} color={THEME.COLORS.border}/>
                            }
                            {
                                routeName === "TeamTab" &&
                                <Foundation name="target-two" size={25} color={THEME.COLORS.border}/>
                            }
                            {
                                routeName === "CartTab" &&
                                <Ionicons name="cart" size={25} color={THEME.COLORS.border}/>
                            }
                            {
                                routeName === "ProfileTab" &&
                                <Ionicons name="person" size={22} color={THEME.COLORS.border}/>
                            }
                            {
                                routeName === "HandleMatchTab" &&
                                <MaterialCommunityIcons name="view-dashboard-edit" size={24}
                                                        color={THEME.COLORS.border}/>
                            }
                            {
                                routeName === "HandleMatchDetailsTab" &&
                                <MaterialCommunityIcons name="puzzle-edit" size={24}
                                                        color={THEME.COLORS.border}/>

                            }
                            {
                                routeName === "TeamCoordinatorTab" &&
                                <MaterialCommunityIcons name="tooltip-edit" size={24}
                                                        color={THEME.COLORS.border}/>

                            }
                        </View>
                    )
                } else if (route.name === "HandleMatchTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <MaterialCommunityIcons name="view-dashboard-edit" size={24}
                                                            color={THEME.COLORS.primary}/> :
                                    <MaterialCommunityIcons name="view-dashboard-edit-outline" size={24}
                                                            color={THEME.COLORS.primary}/>
                            }
                            <Text style={styles.tabIconText}>Manage</Text>
                        </View>
                    )
                } else if (route.name === "HandleMatchDetailsTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <MaterialCommunityIcons name="puzzle-edit" size={24}
                                                            color={THEME.COLORS.primary}/> :
                                    <MaterialCommunityIcons name="puzzle-edit-outline" size={24}
                                                            color={THEME.COLORS.primary}/>
                            }
                            <Text style={styles.tabIconText}>Update</Text>
                        </View>
                    )
                } else if (route.name === "TeamCoordinatorTab") {
                    return (
                        <View style={styles.tabIcon}>
                            {
                                focused ?
                                    <MaterialCommunityIcons name="tooltip-edit" size={24}
                                                            color={THEME.COLORS.primary}/> :
                                    <MaterialCommunityIcons name="tooltip-edit-outline" size={24}
                                                            color={THEME.COLORS.primary}/>
                            }
                            <Text style={styles.tabIconText}>Edit</Text>
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
            {
                isLoggedIn && (role === ROLES.USER || role === ROLES.PITCH_COORDINATOR) && (
                    <Tab.Screen name="TeamTab" component={StackNavigatorTeam}
                                listeners={{
                                    tabPress: (e: any) => {
                                        if (e.tabPress) {
                                            handleTeamTabPress();
                                        }
                                    },
                                }}
                    />
                )
            }
            <Tab.Screen name="MainTab" component={MainScreen} options={{
                headerShown: false,
                tabBarButton: (props) => (
                    <CustomTabBarButton children={props.children} onPress={props.onPress}/>
                )
            }}/>
            {
                isLoggedIn && role === ROLES.USER && <Tab.Screen name="CartTab" component={CartScreen}/>
            }
            {
                isLoggedIn && role === ROLES.USER && <Tab.Screen name="ProfileTab" component={ProfileScreen}/>
            }
            {
                isLoggedIn && role === ROLES.PITCH_COORDINATOR &&
                <Tab.Screen name="HandleMatchDetailsTab" component={HandleMatchDetailsScreen}/>
            }
            {
                isLoggedIn && role === ROLES.PITCH_COORDINATOR &&
                <Tab.Screen name="HandleMatchTab" component={HandleMatchesScreen}/>
            }
            {
                !isLoggedIn && (
                    <Tab.Screen name="TeamTab" component={StackNavigatorTeam}
                                listeners={{
                                    tabPress: (e: any) => {
                                        if (e.tabPress) {
                                            handleTeamTabPress();
                                        }
                                    },
                                }
                                }
                    />
                )
            }
            {
                isLoggedIn && role === ROLES.TEAM_COORDINATOR && (
                    <Tab.Screen name="TeamCoordinatorTab" component={HandleTeamCoordinatorScreen}
                                listeners={{
                                    tabPress: (e: any) => {
                                        if (e.tabPress) {
                                            handleTeamTabPress();
                                        }
                                    },
                                }
                                }
                    />
                )
            }
        </Tab.Navigator>
    );
}

const CustomTabBarButton = ({children}: CustomTabBarButtonProps) => {
    return (
        <View style={
            {
                top: -20,
                backgroundColor: THEME.COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                height: 70,
                borderRadius: 35,
                borderWidth: 4,
                borderColor: THEME.COLORS.border,
                ...styles.shadow
            }
        }>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: THEME.COLORS.primary,
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
        color: THEME.COLORS.primary,
        fontSize: 11,
    },
    icon: {
        backgroundColor: THEME.COLORS.primary,
    }
});
