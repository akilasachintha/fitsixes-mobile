import React, {useEffect, useState} from "react";
import {RefreshControl, SafeAreaView, ScrollView} from "react-native";
import MatchDetailCard, {MatchStatus} from "@components/MatchDetailCard";
import {PATHS} from "@constants/PATHS";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import {useFocusEffect} from "@react-navigation/native";

interface Match {
    team1: string;
    team2: string;
    match_no: number;
}

export default function MatchesUpcomingScreen() {
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const fetchUpcomingMatches = () => {
        let url = "matches/upcoming";
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.matches && response.data.data.matches.matches) {
                setUpcomingMatches(response.data.data.matches.matches);
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

    useFocusEffect(
        React.useCallback(() => {
            fetchUpcomingMatches();
        }, []));

    const handleRefresh = () => {
        fetchUpcomingMatches();
    };

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
                    <MatchDetailCard
                        key={index}
                        matchStatus={MatchStatus.Upcoming}
                        team1={item.team1}
                        team2={item.team2}
                        team1Image={PATHS.IMAGES.Team_1}
                        team2Image={PATHS.IMAGES.Team_2}
                        matchNo={item.match_no}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
