import {SafeAreaView} from "react-native-safe-area-context";
import {Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function MatchesScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Text>MatchesScreen</Text>
            <Text>Upcoming Live and Completed Matches</Text>
            <TouchableOpacity onPress={() => {
                // @ts-ignore
                navigation.navigate("HomeTab", {
                    screen: "HomeTabScoreboardStack",
                });
            }}>
                <Text>Go to Scoreboard Screen</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}