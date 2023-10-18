import TeamNamesCard from "@components/TeamNamesCard";
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "@constants/THEME";
import {useState} from "react";
import ScoreComponent from "@components/ScoreComponent";
import useLiverScoreUpdateService from "@services/useLiverScoreUpdateService";

export default function ScoreboardScreen(props: any) {
    const [selectedTab, setSelectedTab] = useState(0);
    const {outputArr, fetchLiveMatches} = useLiverScoreUpdateService();
    const id = props.route.params.data;
    const TEAM_1 = props.route.params.team_1;
    const TEAM_2 = props.route.params.team_2;
    const tossWinner = props.route.params.tossWinner;
    const firstBat = props.route.params.first;

    const getMatchDetails = outputArr.find((item: any) => item.id === id);

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
                            {getMatchDetails && <ScoreComponent
                                teamName={TEAM_1}
                                details={getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team1}
                            />}
                        </View>
                    )
                }
                {
                    selectedTab === 1 && (
                        <View>
                            {getMatchDetails && <ScoreComponent
                                teamName={TEAM_2}
                                details={getMatchDetails && getMatchDetails.scorecard && getMatchDetails.scorecard.team2}
                            />}
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
            height: 2
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 5,
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