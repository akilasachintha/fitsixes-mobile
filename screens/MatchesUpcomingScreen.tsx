import {SafeAreaView, ScrollView} from "react-native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";
import {PATHS} from "../config/paths";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {BASE_URL, createAxiosInstance} from "../config/axiosConfig";

export default function MatchesUpcomingScreen() {

    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    useEffect(() => {
        let url = "matches/ongoing";
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.matches && response.data.data.matches.matches) {
                setUpcomingMatches(response.data.data.matches.matches);
                console.log(response.data, '----------data-----------------');
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
                {upcomingMatches && upcomingMatches.map((item: any, index) => {
                    return (
                        <MatchDetailCard
                            key={index}
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