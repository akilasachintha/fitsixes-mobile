import {RefreshControl, SafeAreaView, ScrollView} from "react-native";
import MatchDetailCard, {MatchStatus} from "@components/MatchDetailCard";
import {PATHS} from "@constants/PATHS";
import React, {useEffect} from "react";
import {useFocusEffect} from "@react-navigation/native";
import useLiverScoreUpdateService, {TMatch} from "@services/useLiverScoreUpdateService";

export default function MatchesCompletedScreen() {
    const { completedMatches, fetchCompletedMatches } = useLiverScoreUpdateService();

    useEffect(() => {
        fetchCompletedMatches().catch((err) => console.error(err));
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchCompletedMatches().catch((err) => console.error(err));
        }, []));

    const handleRefresh = () => {
        fetchCompletedMatches().catch((err) => console.error(err));
    };

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {completedMatches && completedMatches.map((item: TMatch) => {
                    return (
                        <MatchDetailCard
                            key={item.id}
                            matchStatus={MatchStatus.Completed}
                            team1={item.team1}
                            team2={item.team2}
                            team1Image={PATHS.IMAGES.Team_1}
                            team2Image={PATHS.IMAGES.Team_2}
                            matchNo={item.match_no}
                            matchLevel={item.match_level}
                            pitchNo={item.pitch_no}
                            matchId={item.id}
                            tosWinner={item.tos_winner}
                            firstBat={item.first_bat}
                            winner={item.winner}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}