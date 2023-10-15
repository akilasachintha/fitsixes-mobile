import TeamNamesCard from "@components/TeamNamesCard";
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "@constants/THEME";
import {useEffect, useState} from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import ScoreComponentCoordinator from "@components/coordinator/ScoreComponentCoordinator";

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
                <TeamNamesCard teamName1={TEAM_1} teamName2={TEAM_2}/>
                {tossWinner === firstBat ? (
                    <Text style={styles.description}>{`${tossWinner} Won the toss and elected to bat.`}</Text>
                ) : (
                    <Text style={styles.description}>{`${tossWinner} Won the toss and elected to ball.`}</Text>
                )}
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        {
                            selectedTab === 0 ?
                                <TouchableOpacity style={styles.leftContainerText} onPress={() => setSelectedTab(0)}>
                                    <Text style={styles.leftText}>{TEAM_1}</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity style={styles.leftContainerNotText} onPress={() => setSelectedTab(0)}>
                                    <Text style={styles.leftNotText}>{TEAM_1}</Text>
                                </TouchableOpacity>
                        }
                        {
                            selectedTab === 1 ?
                                <TouchableOpacity style={styles.rightContainerText} onPress={() => setSelectedTab(0)}>
                                    <Text style={styles.leftText}>{TEAM_2}</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity style={styles.rightContainerNotText}
                                                  onPress={() => setSelectedTab(1)}>
                                    <Text style={styles.leftNotText}>{TEAM_2}</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                {
                    selectedTab === 0 && (
                        <View>
                            <ScoreComponentCoordinator details={matchDetails?.team1}
                                                       matchId={props.route.params.data}
                                                       teamName={TEAM_1}
                                                       details2={matchDetails?.team2}/>
                            <View>
                                <Text style={styles.scoreUpdateText}>Score Update</Text>
                                <View style={styles.marks}>
                                    <View style={styles.marksSub}>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>1</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>2</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>3</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>4</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>5</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.marksSub}>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>6</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>WD</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>NB</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksText}>LB</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.marksComponent}>
                                            <Text style={styles.marksTextRed}>W</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }
                {
                    selectedTab === 1 && (
                        <View>
                            <ScoreComponentCoordinator details={matchDetails.team2}
                                                       matchId={props.route.params.data}
                                                       teamName={TEAM_2}
                                                       details2={matchDetails.team1}/>
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
        margin: "2%"
    },
    mainContainer: {
        marginHorizontal: "14%",
        marginTop: "3%",
        marginBottom: "6%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.white,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 10,
    },
    leftContainerText: {
        width: "50%",
        paddingVertical: "4%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.primary,
    },
    rightContainerText: {
        width: "50%",
        paddingVertical: "4%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.primary,
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
        color: THEME.COLORS.primary,
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
        color: THEME.COLORS.primary,
        textAlign: 'center',
        marginBottom: 10
    },
    scoreUpdateText: {
        color: THEME.COLORS.primary,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marks: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: "2%",
        marginHorizontal: "7%",
        padding: "2%",
        backgroundColor: THEME.COLORS.white,
        borderRadius: 30,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 10,
    },
    marksSub: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    marksComponent: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: THEME.COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: "1%",
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 10,
    },
    marksText: {
        color: THEME.COLORS.primary,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marksTextRed: {
        color: THEME.COLORS.red,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
});