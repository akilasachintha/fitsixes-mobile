import {SafeAreaView} from "react-native-safe-area-context";
import {Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function TeamScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>TeamsScreen</Text>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.navigate("TeamTab", {
                    screen: "TeamTabTeamMembersStack",
                });
            }}>
                <Text>Go to team members Screen</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}