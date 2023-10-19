import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DrawerNavigator from "@navigation/Drawernavigator";
import LoginScreen from "@screens/LoginScreen";
import ForgetPasswordScreen from "@screens/ForgetPasswordScreen";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
        }}>
            <Stack.Screen name="HomeStack"
                          component={DrawerNavigator}/>
            <Stack.Screen name="LoginStack"
                          component={LoginScreen}/>
            <Stack.Screen name="ForgetPasswordStack"
                          component={ForgetPasswordScreen}/>
            <Stack.Screen name="ArrivedStack"
                          component={LoginScreen}/>
        </Stack.Navigator>
    );
}