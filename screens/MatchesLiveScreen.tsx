import React, {useEffect} from "react";
import {RefreshControl, SafeAreaView, ScrollView, View} from "react-native";
import MatchDetailCard, {MatchStatus} from "@components/MatchDetailCard";
import {PATHS} from "@constants/PATHS";
import useLiverScoreUpdateService from "@services/useLiverScoreUpdateService";


export default function MatchesLiveScreen() {
    const {outputArr, fetchLiveMatches} = useLiverScoreUpdateService();

    const handleRefresh = () => {
        fetchLiveMatches().catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchLiveMatches().catch((err) => console.error(err));
    }, []);

    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={handleRefresh}/>
                }
            >
                <View>
                    {outputArr &&
                        outputArr.length > 0 &&
                        outputArr.map((item, index) => {
                            let team1_score = `${item.scorecard?.team1.marks}/${item.scorecard?.team1.wickets}`;
                            let team2_score = `${item.scorecard?.team2.marks}/${item.scorecard?.team2.wickets}`;
                            let overs_T1 = `${item.scorecard?.team1.overs}.${item.scorecard?.team1.balls}`;
                            let overs_T2 = `${item.scorecard?.team2.overs}.${item.scorecard?.team2.balls}`;
                            return (
                                <MatchDetailCard
                                    key={index}
                                    matchStatus={MatchStatus.Live}
                                    team1={item.team1}
                                    team2={item.team2}
                                    team1Score={team1_score}
                                    team2Score={team2_score}
                                    team1Image={PATHS.IMAGES.Team_1}
                                    team2Image={PATHS.IMAGES.Team_2}
                                    matchNo={item.match_no}
                                    overs_T1={overs_T1}
                                    overs_T2={overs_T2}
                                    matchId={item.id}
                                    tosWinner={item.tos_winner}
                                    firstBat={item.first_bat}
                                />
                            );
                        })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
