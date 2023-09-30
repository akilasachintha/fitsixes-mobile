import {SafeAreaView, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";
import {PATHS} from "../config/paths";

export default function MatchesUpcomingScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MatchDetailCard
                    matchStatus={MatchStatus.Upcoming}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Upcoming}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
            </ScrollView>
        </SafeAreaView>
    )
}