import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.openDrawer();
            }}>
                <Text>Open Drawer</Text>
            </TouchableOpacity>
            <Text>Home Screen </Text>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.navigate("HomeTab", {
                    screen: "HomeTabMatchesStack",
                });
            }}>
                <Text>Go to Matches Screen</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}