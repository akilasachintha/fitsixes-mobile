import React, {useEffect, useState} from "react";
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import ImageHolder from "@components/ImageHolder";
import {THEME} from "@constants/THEME";
import {getRandomNoImage, PATHS} from "@constants/PATHS";
import useLiverScoreUpdateService, {TMatch} from "@services/useLiverScoreUpdateService";
import {MatchStatus} from "@components/MatchDetailCard";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";

interface TeamNamesProps {
    submitPressed?: boolean;
    teamName1: string;
    teamName2: string;
    matchId: string;
    teamSource1?: ImageSourcePropType;
    teamSource2?: ImageSourcePropType;
    matchStatus: string;
}

const TeamNamesCardCoordinator: React.FC<TeamNamesProps> = ({
                                                                teamName1,
                                                                teamName2,
                                                                teamSource1 = getRandomNoImage(),
                                                                teamSource2 = getRandomNoImage(),
                                                                matchId,
                                                                matchStatus,
                                                                submitPressed
                                                            }) => {
    const [liveMatches, setLiveMatches] = useState<TMatch[]>([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);
    const {outputArr, fetchLiveMatches} = useLiverScoreUpdateService();
    const getMatchDetails = outputArr.find((item: any) => item.id.toString() === matchId);
    const liveMatch = liveMatches.find((item: any) => item.id.toString() === matchId);

    const fetchLiveScreenMatches = async () => {
        let url = "matches/ongoing";

        try {
            axiosInstanceForFitSixes
                .get(`${url}`)
                .then((response) => {
                    if (response?.data?.data?.matches?.matches) {
                        setLiveMatches(response.data.data.matches.matches);
                        console.log("API Data Live");
                    } else {
                        console.error("Error");
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (submitPressed) {
            fetchLiveScreenMatches().catch((e) => console.error(e));
        }
    }, [submitPressed]);

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardSecondContainer}>
                <View style={styles.teamDetails}>
                    <ImageHolder source={teamSource1} size={70}/>
                    <View style={styles.teamNameContainer}>
                        <Text style={styles.teamName} numberOfLines={3} ellipsizeMode="tail">
                            {teamName1.length > 20 ? `${teamName1.slice(0, 30)}...` : teamName1}
                        </Text>
                        {
                            matchStatus === MatchStatus.Live && getMatchDetails && (
                                <View style={{marginTop: 10}}>
                                    {
                                        !liveMatch ? (
                                            <Text
                                                style={styles.score}>
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.marks} /
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.wickets}
                                            </Text>
                                        ) : (
                                            <Text
                                                style={styles.score}>
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team1 && liveMatch.scorecard.team1.marks} /
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team1 && liveMatch.scorecard.team1.wickets}
                                            </Text>
                                        )
                                    }
                                    {
                                        !liveMatch ? (
                                            <Text
                                                style={styles.score}>
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.overs}
                                                .
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.balls}
                                                /{getMatchDetails && getMatchDetails.overs}
                                            </Text>
                                        ) : (
                                            <Text
                                                style={styles.score}>
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team1 && liveMatch.scorecard.team1.overs}
                                                .
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team1 && liveMatch.scorecard.team1.balls}
                                                /{liveMatch && liveMatch.overs}
                                            </Text>
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={PATHS.IMAGES.FIT_SIXES_LOGO} style={styles.image}/>
                </View>
                <View style={styles.teamDetails}>
                    <ImageHolder source={teamSource2} size={70}/>
                    <View style={styles.teamNameContainer}>
                        <Text style={styles.teamName} numberOfLines={3} ellipsizeMode="tail">
                            {teamName2.length > 20 ? `${teamName2.slice(0, 30)}...` : teamName2}
                        </Text>
                        {
                            matchStatus === MatchStatus.Live && getMatchDetails && (
                                <View style={{marginTop: 10}}>
                                    {
                                        !liveMatch ? (
                                            <Text
                                                style={styles.score}>
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.marks} /
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.wickets}
                                            </Text>
                                        ) : (
                                            <Text
                                                style={styles.score}>
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team2 && liveMatch.scorecard.team2.marks} /
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team2 && liveMatch.scorecard.team2.wickets}
                                            </Text>
                                        )
                                    }
                                    {
                                        !liveMatch ? (
                                            <Text
                                                style={styles.score}>
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.overs}
                                                .
                                                {getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.balls}
                                                /{getMatchDetails && getMatchDetails.overs}
                                            </Text>
                                        ) : (
                                            <Text
                                                style={styles.score}>
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team2 && liveMatch.scorecard.team2.overs}
                                                .
                                                {liveMatch && liveMatch.scorecard && liveMatch.scorecard.team2 && liveMatch.scorecard.team2.balls}
                                                /{liveMatch && liveMatch.overs}
                                            </Text>
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>

            </View>
        </View>
    )
}

export default TeamNamesCardCoordinator;

const styles = StyleSheet.create({
    cardContainer: {
        alignSelf: 'center',
        borderRadius: 32,
        backgroundColor: THEME.COLORS.green,
        elevation: 2,
        width: "90%",
        marginBottom: "5%"
    },
    cardSecondContainer: {
        alignSelf: 'center',
        padding: 25,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    teamDetails: {
        flexDirection: 'column'
    },
    teamNameContainer: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    teamName: {
        marginTop: 10,
        color: THEME.COLORS.white,
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center'
    },
    score: {
        color: THEME.COLORS.white,
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10
    },
    image: {
        width: 130,
        height: 130
    }
});