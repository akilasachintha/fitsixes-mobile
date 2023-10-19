import TeamNamesCard from "@components/TeamNamesCard";
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "@constants/THEME";
import {useState} from "react";
import ScoreComponent from "@components/ScoreComponent";
import useLiverScoreUpdateService from "@services/useLiverScoreUpdateService";
import {MatchStatus} from "@components/MatchDetailCard";

export default function ScoreboardScreen(props: any) {
    const [selectedTab, setSelectedTab] = useState(0);
    const {outputArr, completedMatches, fetchLiveMatches} = useLiverScoreUpdateService();
    const id = props.route.params.data;
    const TEAM_1 = props.route.params.team_1;
    const TEAM_2 = props.route.params.team_2;
    const tossWinner = props.route.params.tossWinner;
    const firstBat = props.route.params.first;
    const matchStatus = props.route.params.matchStatus;

    const getMatchDetails = outputArr.find((item: any) => item.id === id);
    const getCompletedMatchDetails = completedMatches.find((item: any) => item.id === id);

    const handleRefresh = () => {
        fetchLiveMatches().catch((err) => console.error(err));
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
                {tossWinner === (firstBat === "team2" ? TEAM_2 : TEAM_1) ? (
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
                            {matchStatus === MatchStatus.Live && getMatchDetails && <ScoreComponent
                                teamName={TEAM_1}
                                details={getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1}
                                teamNo={1}
                                totalOvers={getMatchDetails && getMatchDetails.overs}
                            />}
                            {matchStatus === MatchStatus.Completed && getCompletedMatchDetails && <ScoreComponent
                                teamName={TEAM_1}
                                details={getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team1}
                                teamNo={1}
                                totalOvers={getCompletedMatchDetails && getCompletedMatchDetails.overs}
                            />}
                            {
                                matchStatus === MatchStatus.Live && getMatchDetails && (
                                    <View style={styles.scoreContainer}>
                                        <View style={styles.scoreCard}>
                                            <Text>Sixes</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.sixes}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Fours</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.fours}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Twos</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.twos}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Ones</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1 && getMatchDetails.scorecard.team1.ones}</Text>
                                        </View>
                                    </View>
                                )
                            }
                            {
                                matchStatus === MatchStatus.Completed && getCompletedMatchDetails && (
                                    <View style={styles.scoreContainer}>
                                        <View style={styles.scoreCard}>
                                            <Text>Sixes</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team1 && getCompletedMatchDetails.scorecard.team1.sixes}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Fours</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team1 && getCompletedMatchDetails.scorecard.team1.fours}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Twos</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team1 && getCompletedMatchDetails.scorecard.team1.twos}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Ones</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team1 && getCompletedMatchDetails.scorecard.team1.ones}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    )
                }
                {
                    selectedTab === 1 && (
                        <View>
                            {matchStatus === MatchStatus.Live && getMatchDetails && <ScoreComponent
                                teamName={TEAM_2}
                                details={getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2}
                                teamNo={2}
                                totalOvers={getMatchDetails && getMatchDetails.overs}
                            />}
                            {matchStatus === MatchStatus.Completed && getCompletedMatchDetails && <ScoreComponent
                                teamName={TEAM_2}
                                details={getCompletedMatchDetails && getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team2}
                                teamNo={2}
                                totalOvers={getCompletedMatchDetails && getCompletedMatchDetails.overs}
                            />}
                            {
                                matchStatus === MatchStatus.Live && getMatchDetails && (
                                    <View style={styles.scoreContainer}>
                                        <View style={styles.scoreCard}>
                                            <Text>Sixes</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.sixes}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Fours</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.fours}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Twos</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.twos}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Ones</Text>
                                            <Text
                                                style={styles.scoreRound}>{getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2 && getMatchDetails.scorecard.team2.ones}</Text>
                                        </View>
                                    </View>
                                )
                            }
                            {
                                matchStatus === MatchStatus.Completed && getCompletedMatchDetails && (
                                    <View style={styles.scoreContainer}>
                                        <View style={styles.scoreCard}>
                                            <Text>Sixes</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team2 && getCompletedMatchDetails.scorecard.team2.sixes}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Fours</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team2 && getCompletedMatchDetails.scorecard.team2.fours}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Twos</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team2 && getCompletedMatchDetails.scorecard.team2.twos}</Text>
                                        </View>
                                        <View style={styles.scoreCard}>
                                            <Text>Ones</Text>
                                            <Text
                                                style={styles.scoreRound}>{getCompletedMatchDetails && getCompletedMatchDetails.scorecard && getCompletedMatchDetails.scorecard.team2 && getCompletedMatchDetails.scorecard.team2.ones}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    )
                }
                {
                    matchStatus === MatchStatus.Completed && getCompletedMatchDetails && (
                        <Text
                            style={styles.vsText}>{`${getCompletedMatchDetails && getCompletedMatchDetails.winner} Won the match.`}</Text>
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
            height: 1
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
    },
    leftContainerText: {
        width: "50%",
        paddingVertical: "4%",
        paddingHorizontal: "2%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.primary,
    },
    rightContainerText: {
        width: "50%",
        paddingVertical: "4%",
        paddingHorizontal: "2%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.primary,
    },
    leftContainerNotText: {
        width: "50%",
        paddingHorizontal: "4%",
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
        paddingHorizontal: "4%",
        fontWeight: "bold",
    },
    description: {
        fontSize: 15,
        color: THEME.COLORS.primary,
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: "8%",
    },
    vsText: {
        color: THEME.COLORS.primary,
        fontSize: 14,
        textAlign: "center",
        marginVertical: "4%",
        paddingHorizontal: "4%",
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: "4%",
    },
    scoreCard: {
        backgroundColor: THEME.COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreRound: {
        color: THEME.COLORS.primary,
        fontSize: 18,
        fontWeight: "bold",
    }
});