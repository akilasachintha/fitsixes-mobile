import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import ScoreboardScreen from "../screens/ScoreboardScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function StackNavigatorTeam() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="TeamTabHomeStack" component={HomeScreen}/>
            <Stack.Screen name="HomeTabMatchesStack" component={MatchesScreen}/>
            <Stack.Screen name="HomeTabScoreboardStack" component={ScoreboardScreen}/>
        </Stack.Navigator>
    )
}