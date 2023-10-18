import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "@constants/THEME";
import {useEffect, useState} from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import ScoreComponentCoordinator from "@components/coordinator/ScoreComponentCoordinator";
import ScoreUpdate from "@components/coordinator/ScoreUpdate";
import {MatchStatus} from "@components/MatchDetailCard";
import TeamNamesCardCoordinator from "@components/coordinator/TeamNamesCardCoordinator";

export default function ScoreboardCoordinatorScreen(props: any) {
    type MatchDetailsType = {
        team1: {
            balls: number,
            extras: number,
            fours: number,
            marks: number,
            ones: number,
            overs: number,
            sixes: number,
            threes: number,
            twos: number,
            wickets: number,
        },
        team2: {
            balls: number,
            extras: number,
            fours: number,
            marks: number,
            ones: number,
            overs: number,
            sixes: number,
            threes: number,
            twos: number,
            wickets: number,
        }
    }
    const [selectedTab, setSelectedTab] = useState(0);
    const [matchDetails, setDetails] = useState<MatchDetailsType>({
        team1: {
            balls: 0,
            extras: 0,
            fours: 0,
            marks: 0,
            ones: 0,
            overs: 0,
            sixes: 0,
            threes: 0,
            twos: 0,
            wickets: 0,
        },
        team2: {
            balls: 0,
            extras: 0,
            fours: 0,
            marks: 0,
            ones: 0,
            overs: 0,
            sixes: 0,
            threes: 0,
            twos: 0,
            wickets: 0,
        }
    });
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);
    const TEAM_1 = props.route.params.team_1;
    const TEAM_2 = props.route.params.team_2;
    const tossWinner = props.route.params.tossWinner;
    const firstBat = props.route.params.first;
    const matchStatus = props.route.params.matchStatus;

    const fetchMatchDetails = async () => {
        let url = `match/${props.route.params.data}`;
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.match) {
                const obj = response.data.data.match;
                setDetails(obj);
            } else {
                console.error("Error");
            }
        })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        fetchMatchDetails().catch((e) => console.error(e));

    }, []);

    const handleRefresh = () => {
        fetchMatchDetails().catch((e) => console.error(e));
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
                <TeamNamesCardCoordinator teamName1={TEAM_1} teamName2={TEAM_2}/>
                {tossWinner === (firstBat === "team2" ? TEAM_2 : TEAM_1) ? (
                    <Text style={styles.description}>{`${tossWinner} Won the toss and elected to bat.`}</Text>
                ) : (
                    <Text style={styles.description}>{`${tossWinner} Won the toss and elected to ball.`}</Text>
                )}
                <View style={styles.mainContainer}>
                    {
                        matchStatus !== MatchStatus.Live && (
                            <View style={styles.container}>
                                {
                                    selectedTab === 0 ?
                                        <TouchableOpacity style={styles.leftContainerText}
                                                          onPress={() => setSelectedTab(0)}>
                                            <Text style={styles.leftText}>{TEAM_1}</Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.leftContainerNotText}
                                                          onPress={() => setSelectedTab(0)}>
                                            <Text style={styles.leftNotText}>{TEAM_1}</Text>
                                        </TouchableOpacity>
                                }
                                {
                                    selectedTab === 1 ?
                                        <TouchableOpacity style={styles.rightContainerText}
                                                          onPress={() => setSelectedTab(0)}>
                                            <Text style={styles.leftText}>{TEAM_2}</Text>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.rightContainerNotText}
                                                          onPress={() => setSelectedTab(1)}>
                                            <Text style={styles.leftNotText}>{TEAM_2}</Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        )
                    }
                </View>
                {
                    matchStatus === MatchStatus.Live && (
                        <ScoreUpdate matchId={props.route.params.data}
                                     selectedTab={selectedTab === 0 ? TEAM_1 : TEAM_2}
                                     team1Name={TEAM_1}
                                     team2Name={TEAM_2}
                        />
                    )
                }
                {
                    selectedTab === 0 && (
                        <View>
                            {
                                matchStatus === MatchStatus.Completed && (
                                    <ScoreComponentCoordinator details={matchDetails?.team1}
                                                               matchId={props.route.params.data}
                                                               teamName={TEAM_1}
                                                               details2={matchDetails?.team2}/>
                                )

                            }
                        </View>
                    )
                }
                {
                    selectedTab === 1 && (
                        <View>
                            {
                                matchStatus === MatchStatus.Completed && (
                                    <ScoreComponentCoordinator details={matchDetails.team2}
                                                               matchId={props.route.params.data}
                                                               teamName={TEAM_2}
                                                               details2={matchDetails.team1}/>
                                )
                            }
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        backgroundColor: THEME.COLORS.green,
        borderRadius: 30,
        marginHorizontal: "8%",
        marginBottom: "4%",
    },
    titleText: {
        fontSize: 14,
        fontWeight: "bold",
        color: THEME.COLORS.white,
        textAlign: "center",
        paddingVertical: "2%",
    },
    mainContainer: {
        marginHorizontal: "14%",
        marginTop: "3%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.white,
        shadowColor: THEME.COLORS.green,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 5,
    },
    leftContainerText: {
        width: "50%",
        paddingVertical: "4%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.green,
    },
    rightContainerText: {
        width: "50%",
        paddingVertical: "4%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.green,
    },
    leftContainerNotText: {
        width: "50%",
        textAlign: "center",
        fontWeight: "bold",
    },
    leftText: {
        color: THEME.COLORS.white,
        textAlign: "center",
        fontWeight: "bold",
    },
    leftNotText: {
        color: THEME.COLORS.green,
        textAlign: "center",
        fontWeight: "bold",
    },
    rightContainerNotText: {
        width: "50%",
        textAlign: "center",
        fontWeight: "bold",
    },
    description: {
        fontSize: 15,
        color: THEME.COLORS.green,
        textAlign: 'center',
        marginBottom: 10
    },
});