import {StyleProp, TextStyle} from "react-native";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import {THEME} from "@constants/THEME";
import MatchesUpcomingCoordinatorScreen from "@screens/coordinator/MatchesUpcomingCoordinatorScreen";
import MatchesLiveCoordinatorScreen from "@screens/coordinator/MatchesLiveCoordinatorScreen";
import MatchesCompletedCoordinatorScreen from "@screens/coordinator/MatchesCompletedCoordinatorScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigatorCoordinator({route}: any) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'UpcomingCoordinatorTab';

    const getTabBarLabelStyle = (tabName: string): StyleProp<TextStyle> => {
        return {
            color: routeName === tabName ? THEME.COLORS.white : THEME.COLORS.green,
            fontSize: 12,
            fontWeight: "bold",
        };
    };

    return (
        <Tab.Navigator
            initialRouteName="UpcomingCoordinatorTab"
            screenOptions={{
                tabBarStyle: {
                    marginVertical: "2%",
                    marginBottom: "4%",
                    backgroundColor: THEME.COLORS.white,
                    marginHorizontal: "8%",
                    borderRadius: 30,
                    shadowColor: THEME.COLORS.green,
                    shadowOffset: {
                        width: 0,
                        height: 10
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 20,
                    paddingVertical: "0.5%",
                },
                tabBarIndicatorStyle: {
                    backgroundColor: THEME.COLORS.green,
                    height: "100%",
                    borderRadius: 30,
                    borderWidth: 5,
                    borderColor: THEME.COLORS.white,
                },
            }}
        >
            <Tab.Screen name="UpcomingCoordinatorTab" component={MatchesUpcomingCoordinatorScreen} options={{
                tabBarLabel: "Upcoming",
                animationEnabled: true,
                tabBarLabelStyle: getTabBarLabelStyle("UpcomingCoordinatorTab"),
            }}/>
            <Tab.Screen name="LiveCoordinatorTab" component={MatchesLiveCoordinatorScreen} options={{
                tabBarLabel: "Live",
                animationEnabled: true,
                tabBarLabelStyle: getTabBarLabelStyle("LiveCoordinatorTab"),
            }}/>
            <Tab.Screen name="CompletedCoordinatorTab" component={MatchesCompletedCoordinatorScreen} options={{
                tabBarLabel: "Completed",
                animationEnabled: true,
                tabBarLabelStyle: getTabBarLabelStyle("CompletedCoordinatorTab"),
            }}/>
        </Tab.Navigator>
    );
}
