import React, {useEffect, useState} from "react";
import {RefreshControl, SafeAreaView, ScrollView} from "react-native";
import {MatchStatus} from "@components/MatchDetailCard";
import {PATHS} from "@constants/PATHS";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import MatchDetailCoordinatorCard from "@components/coordinator/MatchDetailCoordinatorCard";
import {useFocusEffect} from "@react-navigation/native";

interface Match {
    team1: string;
    team2: string;
    match_no: number;
    match_level: string;
    pitch_no: number;
    id: string;
}

export default function MatchesUpcomingCoordinatorScreen() {
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const fetchUpcomingMatches = () => {
        let url = "matches_pitch_coordinator";
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.matches && response.data.data.matches.upcoming && response.data.data.matches.upcoming.matches && response.data.data.matches.upcoming.matches) {
                setUpcomingMatches(response.data.data.matches.upcoming.matches);
            } else {
                console.error("Error");
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        fetchUpcomingMatches();
    }, []);

    const handleRefresh = () => {
        fetchUpcomingMatches();
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUpcomingMatches();
        }, []));

    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {upcomingMatches && upcomingMatches.map((item, index) => (
                    <MatchDetailCoordinatorCard
                        key={index}
                        matchStatus={MatchStatus.Upcoming}
                        pitchNo={item.pitch_no}
                        team1={item.team1}
                        team2={item.team2}
                        team1Image={PATHS.IMAGES.Team_1}
                        team2Image={PATHS.IMAGES.Team_2}
                        matchNo={item.match_no}
                        matchLevel={item.match_level}
                        matchId={item.id}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
