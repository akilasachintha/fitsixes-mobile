import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScoreboardCoordinatorScreen from "@screens/coordinator/ScoreboardCoordinatorScreen";
import TabNavigatorCoordinator from "@navigation/TabNavigatorCoordinator";
import UpcomingCoordinatorScreen from "@screens/coordinator/UpcomingCoordinatorScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigatorCoordinator() {
    return (
        <Stack.Navigator
            initialRouteName={"CoordinatorTabMatchesStack"}
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}>
            <Stack.Screen name="CoordinatorTabMatchesStack" component={TabNavigatorCoordinator}
                          options={{
                              animation: "none"
                          }}
            />
            <Stack.Screen name="CoordinatorTabScoreboardCoordinatorStack" component={ScoreboardCoordinatorScreen}
                          options={{
                              animation: "none"
                          }}
            />
            <Stack.Screen name="CoordinatorTabUpcomingCoordinatorStack" component={UpcomingCoordinatorScreen}
                          options={{
                              animation: "none"
                          }}
            />
        </Stack.Navigator>
    );
}