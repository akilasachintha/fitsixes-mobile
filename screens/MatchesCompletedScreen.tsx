import {SafeAreaView, ScrollView} from "react-native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";
import {PATHS} from "../config/paths";

export default function MatchesCompletedScreen() {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MatchDetailCard
                    matchStatus={MatchStatus.Completed}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Completed}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Completed}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Completed}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Completed}
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