import {Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ProfileScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Text>Profile Screen</Text>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.openDrawer();
            }}>
                <Text>Home Screen </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}