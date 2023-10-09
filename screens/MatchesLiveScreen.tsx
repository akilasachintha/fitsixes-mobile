import {RefreshControl, SafeAreaView, ScrollView} from "react-native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";
import {PATHS} from "../config/paths";
import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {BASE_URL, createAxiosInstance} from "../config/axiosConfig";

export default function MatchesLiveScreen() {
    const [ongoingMatches, setOngoingMatches] = useState([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const fetchLiveMatches = () => {
        let url = "matches/ongoing";
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.matches && response.data.data.matches.matches) {
                setOngoingMatches(response.data.data.matches.matches);
            } else {
                console.error("Error");
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        fetchLiveMatches();
    }, []);

    const handleRefresh = () => {
        fetchLiveMatches();
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
                {ongoingMatches && ongoingMatches.map((item: any, index) => {
                    let team1_score = `${item.scorecard?.team1.marks}/${item.scorecard?.team1.wickets}`
                    let team2_score = `${item.scorecard?.team2.marks}/${item.scorecard?.team2.wickets}`
                    let overs_T1 = `${item.scorecard?.team1.overs}.${item.scorecard?.team1.balls}`
                    let overs_T2 = `${item.scorecard?.team2.overs}.${item.scorecard?.team2.balls}`
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
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}