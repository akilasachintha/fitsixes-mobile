import TeamNamesCard from "@components/TeamNamesCard";
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "@constants/THEME";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance, WEB_SOCKET_URL} from "@config/axiosConfig";
import ScoreComponent from "@components/ScoreComponent";

const reconnectDelay = 3000;

type TServerMatch = {
    match_id: number;
    id: string;
    tos_winner: string;
    first_bat: string;
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
    },
}

export default function ScoreboardScreen(props: any) {
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
    const [serverMessages, setServerMessages] = useState<TServerMatch | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const ws = useRef<WebSocket | null>(null);
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

    const handleRefresh = () => {
        fetchMatchDetails().catch((e) => console.error(e));
    };

    const connectToWebSocket = () => {
        ws.current = new WebSocket(WEB_SOCKET_URL);

        ws.current.onopen = () => {
            console.log('connected');
            setIsConnected(true);
        };

        ws.current.onclose = () => {
            console.log('disconnected');
            setIsConnected(false);

            setTimeout(connectToWebSocket, reconnectDelay);
        };

        ws.current.onerror = (e) => {
            // @ts-ignore
            console.log('error:', e.message);
        };

        ws.current.onmessage = (e) => {
            const incomingMessage = e.data;
            console.log(incomingMessage);
            setServerMessages(JSON.parse(incomingMessage));
        };
    };

    useEffect(() => {
        fetchMatchDetails().catch((e) => console.error(e));
        connectToWebSocket();
        console.log("IsConnected", isConnected);

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    function calculateRequiredRunsAndBalls(targetRuns: number, currentRuns: number, currentOvers: number, currentOverBalls: number) {
        const totalOvers = 10;
        const maxBallsPerOver = 6;
        let totalBallsBowled: number
        if (currentOvers === 0) {
            totalBallsBowled = 0;
        } else {
            totalBallsBowled = (currentOvers - 1) * maxBallsPerOver + currentOverBalls;
        }
        const remainingBalls = totalOvers * maxBallsPerOver - totalBallsBowled;
        const requiredRuns = targetRuns - currentRuns + 1;
        return {
            requiredRuns,
            remainingBalls,
        };
    }

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
                <TeamNamesCard teamName1={TEAM_1} teamName2={TEAM_2} />
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
                            <ScoreComponent
                                details={serverMessages && serverMessages.team1 ? serverMessages.team1 : matchDetails.team1}
                                teamName={TEAM_1}
                                details2={serverMessages && serverMessages.team2 ? serverMessages.team2 : matchDetails.team2}/>

                            {
                                (matchDetails && matchDetails?.team1.marks === 0 && matchDetails?.team2.marks === 0) || (
                                    serverMessages && serverMessages.team1.marks === 0 && serverMessages.team2.marks === 0) ? (
                                <Text style={styles.description}>Both teams have not scored any runs yet.</Text>
                            ) : (
                                <>
                                    {firstBat !== TEAM_1 && (
                                        <Text style={styles.description}>
                                            {`${TEAM_1} require ${
                                                calculateRequiredRunsAndBalls(
                                                    serverMessages && serverMessages.team2 && serverMessages.team2.marks ? serverMessages.team2.marks : matchDetails.team2.marks,
                                                    serverMessages && serverMessages.team1 && serverMessages.team1.marks ? serverMessages.team1.marks : matchDetails.team1.marks,
                                                    serverMessages && serverMessages.team1 && serverMessages.team1.overs ? serverMessages.team1.overs : matchDetails.team1.overs,
                                                    serverMessages && serverMessages.team1 && serverMessages.team1.balls ? serverMessages.team1.balls : matchDetails.team1.balls
                                                ).requiredRuns} runs from ${
                                                calculateRequiredRunsAndBalls(serverMessages && serverMessages.team2 && serverMessages.team2.marks ? serverMessages.team2.marks : matchDetails.team2.marks,
                                                    serverMessages && serverMessages.team1 && serverMessages.team1.marks ? serverMessages.team1.marks : matchDetails.team1.marks,
                                                    serverMessages && serverMessages.team1 && serverMessages.team1.overs ? serverMessages.team1.overs : matchDetails.team1.overs,
                                                    serverMessages && serverMessages.team1 && serverMessages.team1.balls ? serverMessages.team1.balls : matchDetails.team1.balls).remainingBalls} balls`}
                                        </Text>
                                    )}
                                </>
                            )}
                        </View>
                    )
                }

                {
                    selectedTab === 1 && (
                        <View>
                            <ScoreComponent details={matchDetails.team2} teamName={TEAM_2} details2={matchDetails.team1} />
                            {matchDetails?.team1.marks === 0 && matchDetails?.team2.marks === 0 ? (
                                <Text style={styles.description}>Both teams have not scored any runs yet.</Text>
                            ) : (
                                <>
                                    {firstBat !== TEAM_2 && (
                                        <Text style={styles.description}>
                                            {`${TEAM_2} require ${calculateRequiredRunsAndBalls(matchDetails.team1.marks, matchDetails.team2.marks, matchDetails.team2.overs, matchDetails.team2.balls).requiredRuns} runs from ${calculateRequiredRunsAndBalls(matchDetails.team1.marks, matchDetails.team2.marks, matchDetails.team2.overs, matchDetails.team2.balls).remainingBalls} balls`}
                                        </Text>
                                    )}
                                </>
                            )}
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
        marginBottom: 10,
        paddingHorizontal: "8%",

    }
});