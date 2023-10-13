import TeamNamesCard from "../components/TeamNamesCard";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../config/theme";
import { useEffect, useState } from "react";
import TeamScore from "../components/TeamScore";
import ScoreCard from "../components/ScoreCard";
import { useAuth } from "../context/AuthContext";
import { BASE_URL, createAxiosInstance } from "../config/axiosConfig";
import ScoreComponent from "../components/ScoreComponent";

export default function ScoreboardScreen(props: any) {
    type MatchDetailsType = {
        team1: {
            balls: number;
            extras: number;
            fours: number;
            marks: number;
            ones: number;
            overs: number;
            sixes: number;
            threes: number;
            twos: number;
            wickets: number;
        };
        team2: {
            balls: number;
            extras: number;
            fours: number;
            marks: number;
            ones: number;
            overs: number;
            sixes: number;
            threes: number;
            twos: number;
            wickets: number;
        };
    };
    const [selectedTab, setSelectedTab] = useState(0);
    const [matchDetails, setMatchDetails] = useState<MatchDetailsType[]>([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);
    const TEAM_1 = props.route.params.team_1;
    const TEAM_2 = props.route.params.team_2;

    const fetchMatchDetails = async () => {
        let url = `match/${props.route.params.data}`;
        try {
            const response = await axiosInstanceForFitSixes.get(`${url}`);
            if (response && response.data && response.data.data && response.data.data.match) {
                const responseDetails = response.data.data.match;
                setMatchDetails([responseDetails]);
            } else {
                console.error("Error");
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchMatchDetails();
    }, []);

    const handleRefresh = () => {
        fetchMatchDetails();
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
                            {/* <ScoreComponent details={matchDetails[0].team1} teamName={TEAM_1} details2={matchDetails[0].team2} /> */}

                        </View>
                    )
                }
                {
                    selectedTab === 1 && (
                        <View>
                            {/* <ScoreComponent details={matchDetails[0].team2} teamName={TEAM_2} details2={matchDetails[0].team1} /> */}
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
        margin: "2%",
    },
    mainContainer: {
        marginHorizontal: "20%",
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
        marginBottom: "5%",
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
    }
});