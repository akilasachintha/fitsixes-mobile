import {Image, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ImageHolder from "./ImageHolder";
import {useNavigation} from "@react-navigation/native";
import {THEME} from "../config/theme";
import {PATHS} from "../config/paths";

interface MatchDetailCardProps {
    matchNo: number;
    team1: string;
    team2: string;
    team1Score?: string;
    team2Score?: string;
    team1Image: ImageProps;
    team2Image: ImageProps;
    matchStatus: MatchStatusType;
    overs_T1?: string;
    overs_T2?: string;
}

export type MatchStatusType = "Live" | "Upcoming" | "Completed";

export const MatchStatus: Record<MatchStatusType, MatchStatusType> = {
    Live: "Live",
    Upcoming: "Upcoming",
    Completed: "Completed",
}

export default function MatchDetailCard({
                                            matchNo,
                                            team1 = "Team 1",
                                            team2 = "Team 2",
                                            team1Score,
                                            team2Score,
                                            team1Image,
                                            team2Image,
                                            matchStatus,
                                            overs_T1,
                                            overs_T2
                                        }: MatchDetailCardProps) {
    const navigation = useNavigation();
    const handleMatchCardClick = () => {
        // @ts-ignore
        navigation.navigate("HomeTabScoreboardStack");
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleMatchCardClick}>
            <ImageBackground
                source={PATHS.IMAGES.FIT_SIXES_LOGO}
                resizeMode="contain"
                imageStyle={matchStatus === "Live" ? { display: "flex" } : { display: "none" }}
                style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Match No : {matchNo}</Text>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.titleText}>{matchStatus}</Text>
                        {
                            matchStatus === MatchStatus.Live && (
                                <View style={{
                                    backgroundColor: THEME.COLORS.border,
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                }}/>
                            )
                        }
                    </View>
                </View>
                <View
                    style={[styles.contentContainer, matchStatus !== MatchStatus.Live ? { flexDirection: "row" } : { flexDirection: "column" }]}>
                    <View>
                        <View style={styles.teamContainer}>
                            <View style={styles.teamImageContainer}>
                                <ImageHolder source={team1Image} size={40} />
                                <Text style={styles.teamImageText}>{team1}</Text>
                            </View>
                            {
                                matchStatus === MatchStatus.Live && (
                                    <View>
                                        <Text style={styles.teamScoreText}>{team1Score}</Text>
                                        <Text style={styles.teamScoreBottomText}>{'(' + overs_T1 + ')'}</Text>
                                    </View>
                                )
                            }
                        </View>
                        <Text style={styles.vsText}>Vs.</Text>
                        <View style={styles.teamContainer}>
                            <View style={styles.teamImageContainer}>
                                <ImageHolder source={team2Image} size={40} />
                                <Text style={styles.teamImageText}>{team2}</Text>
                            </View>
                            {
                                matchStatus === MatchStatus.Live && (
                                    <View>
                                        <Text style={styles.teamScoreText}>{team2Score}</Text>
                                        <Text style={styles.teamScoreBottomText}>{'(' + overs_T2 + ')'}</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    {
                        matchStatus !== MatchStatus.Live && (
                            <Image source={PATHS.IMAGES.FIT_SIXES_LOGO} style={{ width: 140, height: 100 }} />
                        )
                    }
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "6%",
        padding: "4%",
        backgroundColor: THEME.COLORS.primary,
        borderRadius: 20,
        marginBottom: "4%",
    },
    titleContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "4%",
    },
    titleText: {
        color: THEME.COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    contentContainer: {
        justifyContent: "space-between",
    },
    teamContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    teamImageContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    teamImageText: {
        color: THEME.COLORS.white,
        fontSize: 14,
        marginLeft: "8%",
        fontWeight: "bold",
    },
    teamScoreText: {
        color: THEME.COLORS.white,
        fontSize: 14,
    },
    teamScoreBottomText: {
        color: THEME.COLORS.gray,
        fontSize: 10,
        textAlign: "right",
    },
    vsText: {
        color: THEME.COLORS.border,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
        marginVertical: "2%",
        paddingHorizontal: "4%",
    },
});