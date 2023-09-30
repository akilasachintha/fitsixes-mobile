import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TeamScreen from "../screens/TeamScreen";
import TeamMembersScreen from "../screens/TeamMembersScreen";
import TopHeaderBar from "../components/TopHeaderBar";

const Stack = createNativeStackNavigator();

export default function StackNavigatorTeam() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
        }}>
            <Stack.Screen name="TeamTabTeamStack" component={TeamScreen}/>
            <Stack.Screen name="TeamTabTeamMembersStack" component={TeamMembersScreen}/>
        </Stack.Navigator>
    )
}