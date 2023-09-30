import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MatchesUpcomingScreen from "../screens/MatchesUpcomingScreen";
import MatchesLiveScreen from "../screens/MatchesLiveScreen";
import MatchesCompletedScreen from "../screens/MatchesCompletedScreen";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import {StyleProp, TextStyle} from "react-native";
import {THEME} from "../config/theme";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator({route}: any) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'UpcomingTab';

    const getTabBarLabelStyle = (tabName: string): StyleProp<TextStyle> => {
        return {
            color: routeName === tabName ? THEME.COLORS.white : THEME.COLORS.primary,
            fontSize: 12,
            fontWeight: "bold",
        };
    };

    return (
        <Tab.Navigator
            initialRouteName="UpcomingTab"
            screenOptions={{
                tabBarStyle: {
                    marginVertical: "2%",
                    marginBottom: "4%",
                    backgroundColor: "#fff",
                    marginHorizontal: "8%",
                    borderRadius: 30,
                    shadowColor: THEME.COLORS.primary,
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
                    backgroundColor: THEME.COLORS.primary,
                    height: "100%",
                    borderRadius: 30,
                    borderWidth: 5,
                    borderColor: THEME.COLORS.white,
                },
            }}
        >
            <Tab.Screen name="UpcomingTab" component={MatchesUpcomingScreen} options={{
                tabBarLabel: "Upcoming",
                tabBarLabelStyle: getTabBarLabelStyle("UpcomingTab"),
            }}/>
            <Tab.Screen name="LiveTab" component={MatchesLiveScreen} options={{
                tabBarLabel: "Live",
                tabBarLabelStyle: getTabBarLabelStyle("LiveTab"),
            }}/>
            <Tab.Screen name="CompletedTab" component={MatchesCompletedScreen} options={{
                tabBarLabel: "Completed",
                tabBarLabelStyle: getTabBarLabelStyle("CompletedTab"),
            }}/>
        </Tab.Navigator>
    );
}
