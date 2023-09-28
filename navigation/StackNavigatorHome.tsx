import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import ScoreboardScreen from "../screens/ScoreboardScreen";

const Stack = createStackNavigator();
export default function StackNavigatorHome() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="HomeTabHomeStack" component={HomeScreen}/>
            <Stack.Screen name="HomeTabMatchesStack" component={MatchesScreen}/>
            <Stack.Screen name="HomeTabScoreboardStack" component={ScoreboardScreen}/>
        </Stack.Navigator>
    );
}