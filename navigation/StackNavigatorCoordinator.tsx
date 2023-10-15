import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScoreboardCoordinatorScreen from "@screens/coordinator/ScoreboardCoordinatorScreen";
import TabNavigatorCoordinator from "@navigation/TabNavigatorCoordinator";

const Stack = createNativeStackNavigator();

export default function StackNavigatorCoordinator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}>
            <Stack.Screen name="CoordinatorTabMatchesStack" component={TabNavigatorCoordinator}/>
            <Stack.Screen name="CoordinatorTabScoreboardCoordinatorStack" component={ScoreboardCoordinatorScreen}/>
        </Stack.Navigator>
    );
}