import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>LoginScreen</Text>
            <TouchableOpacity
                style={{ backgroundColor: "red", padding: 10 }}
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate("HomeStack");
                }}>
                <Text>Login Button</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ backgroundColor: "blue", padding: 10 }}
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate("ForgetPasswordStack");
                }}>
                <Text>Forget Password</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}