import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";

export default function MatchesLiveScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MatchDetailCard
                    matchStatus={MatchStatus.Live}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Score={"100/2"}
                    team2Score={"200/2"}
                    team1Image={require("../assets/no-image.jpg")}
                    team2Image={require("../assets/no-image.jpg")}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Live}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Score={"100/2"}
                    team2Score={"200/2"}
                    team1Image={require("../assets/no-image.jpg")}
                    team2Image={require("../assets/no-image.jpg")}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Live}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Score={"100/2"}
                    team2Score={"200/2"}
                    team1Image={require("../assets/no-image.jpg")}
                    team2Image={require("../assets/no-image.jpg")}
                    matchNo={10}
                />
            </ScrollView>
        </SafeAreaView>
    )
}