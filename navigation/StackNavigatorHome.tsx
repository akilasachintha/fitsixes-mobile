import HomeScreen from "../screens/HomeScreen";
import ScoreboardScreen from "../screens/ScoreboardScreen";
import TabNavigator from "./TabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackNavigatorHome() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
        }}>
            <Stack.Screen name="HomeTabHomeStack" component={HomeScreen}/>
            <Stack.Screen name="HomeTabMatchesStack" component={TabNavigator}/>
            <Stack.Screen name="HomeTabScoreboardStack" component={ScoreboardScreen}/>
        </Stack.Navigator>
    );
}