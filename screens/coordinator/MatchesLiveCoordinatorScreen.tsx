import {RefreshControl, SafeAreaView, ScrollView, View} from "react-native";
import {MatchStatus} from "@components/MatchDetailCard";
import {PATHS} from "@constants/PATHS";
import React, {useEffect, useState} from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import MatchDetailCoordinatorCard from "@components/coordinator/MatchDetailCoordinatorCard";
import {useFocusEffect} from "@react-navigation/native";

export type TMatch = {
    team1: string;
    team2: string;
    match_no: number;
    match_level: string;
    pitch_no: number;
    id: string;
    tos_winner: string;
    first_bat: string;
    scorecard: {
        team1: {
            marks: number;
            wickets: number;
            overs: number;
            balls: number;
        },
        team2: {
            marks: number;
            wickets: number;
            overs: number;
            balls: number;
        }
    }
}
export default function MatchesLiveCoordinatorScreen() {
    const [liveMatches, setLiveMatches] = useState<TMatch[]>([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const fetchLiveMatches = () => {
        let url = "matches_pitch_coordinator";
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.matches && response.data.data.matches.ongoing && response.data.data.matches.ongoing.matches) {
                setLiveMatches(response.data.data.matches.ongoing.matches);
            } else {
                console.error("Error");
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    const handleRefresh = () => {
        fetchLiveMatches();
    };

    useEffect(() => {
        fetchLiveMatches();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchLiveMatches();
        }, [])
    )

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={handleRefresh}
                />
            }
            >
                <View>
                    {liveMatches && liveMatches.map((item: TMatch, index) => {
                        let team1_score = `${item.scorecard?.team1.marks}/${item.scorecard?.team1.wickets}`
                        let team2_score = `${item.scorecard?.team2.marks}/${item.scorecard?.team2.wickets}`
                        let overs_T1 = `${item.scorecard?.team1.overs}.${item.scorecard?.team1.balls}`
                        let overs_T2 = `${item.scorecard?.team2.overs}.${item.scorecard?.team2.balls}`
                        return (
                            <MatchDetailCoordinatorCard
                                key={index}
                                matchStatus={MatchStatus.Live}
                                matchLevel={item.match_level}
                                pitchNo={item.pitch_no}
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
                                )
                            })}
                        </View>
            </ScrollView>
        </SafeAreaView>
    )
}