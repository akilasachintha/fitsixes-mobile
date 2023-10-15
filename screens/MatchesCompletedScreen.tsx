import {RefreshControl, SafeAreaView, ScrollView} from "react-native";
import MatchDetailCard, {MatchStatus} from "@components/MatchDetailCard";
import {PATHS} from "@constants/PATHS";
import React, {useEffect, useState} from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import {TMatch} from "@screens/MatchesLiveScreen";

export default function MatchesCompletedScreen() {
    const [completedMatches, setCompletedMatches] = useState<TMatch[]>([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const fetchCompletedMatches = () => {
        let url = "matches/finish";
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.matches && response.data.data.matches.matches) {
                setCompletedMatches(response.data.data.matches.matches);
            } else {
                console.error("Error");
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        fetchCompletedMatches();
    }, []);

    const handleRefresh = () => {
        fetchCompletedMatches();
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
                {completedMatches && completedMatches.map((item: TMatch, index) => {
                    return (
                        <MatchDetailCard
                            key={index}
                            matchStatus={MatchStatus.Completed}
                            team1={item.team1}
                            team2={item.team2}
                            team1Image={PATHS.IMAGES.Team_1}
                            team2Image={PATHS.IMAGES.Team_2}
                            matchNo={item.match_no}
                            matchId={item.id}
                            tosWinner={item.tos_winner}
                            firstBat={item.first_bat}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}