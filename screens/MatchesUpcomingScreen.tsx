import { SafeAreaView, ScrollView } from "react-native";
import MatchDetailCard, { MatchStatus } from "../components/MatchDetailCard";
import { PATHS } from "../config/paths";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MatchesUpcomingScreen() {

    const [upcomingMatches, setUpcomingMatches] = useState([])

    useEffect(() => {
        let url = "https://j1kydf6tp3.execute-api.ap-south-1.amazonaws.com/dev/v1/matches/upcoming";
        axios.get(`${url}`).then((response) => {
            if (response.data && response.data.matches) {
                setUpcomingMatches(response.data.matches.matches);
                console.log(response.data, '----------data-----------------')
            } else {
                console.error("Error");
            }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {upcomingMatches?.map((item: any) => {
                    return (
                        <MatchDetailCard
                            matchStatus={MatchStatus.Upcoming}
                            team1={item.team1}
                            team2={item.team2}
                            team1Image={PATHS.IMAGES.NO_IMAGE}
                            team2Image={PATHS.IMAGES.NO_IMAGE}
                            matchNo={item.match_no}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}