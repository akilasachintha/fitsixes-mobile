import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {THEME} from "@constants/THEME";

interface ScoreCardProps {
    matchId: number;
    details: {
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
    teamName?: string;
    details2: {
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
}

const ScoreComponentCoordinator: React.FC<ScoreCardProps> = ({matchId, details, teamName, details2}) => {
    const calculateRunRate = (totalRuns: number, totalOvers: number): number => {
        if (totalOvers === 0) {
            return 0;
        }
        const runRate = totalRuns / totalOvers;
        console.log(matchId, runRate);
        return Math.round(runRate * 100) / 100;
    };

    const calculateRequiredRunRate = (targetRuns: number, remainingOvers: number): number => {
        if (remainingOvers === 0) {
            return Number.POSITIVE_INFINITY;
        }
        const requiredRunRate = targetRuns / remainingOvers;
        return Math.round(requiredRunRate * 100) / 100;
    };

    return (
        <View style={styles.container}>
            <View style={styles.scoreDetails}>
                <View style={styles.teamContainer}>
                    <View style={styles.teamNameContainer}>
                        <Text style={styles.text3}>{teamName}</Text>
                    </View>
                </View>
                <View style={styles.score}>
                    <Text style={styles.text1}>{details.marks + '/' + details.wickets}</Text>
                    <Text style={styles.text2}>{details.overs + '.' + details.balls + '/' + '10 Overs'}</Text>
                </View>
            </View>
            <View style={styles.otherDetailsContainer}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.text2}>{'CRR: ' + calculateRunRate(details.marks, details.overs)}</Text>
                    {details.overs !== 10 && (
                        <Text
                            style={styles.text2}>{'RRR: ' + calculateRequiredRunRate(details2.marks, 10 - details.overs)}</Text>
                    )}
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.text2}>{'Extra: ' + details.extras}</Text>
                </View>
            </View>
        </View>
    );
};

export default ScoreComponentCoordinator;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 32,
        backgroundColor: THEME.COLORS.primary,
        elevation: 5,
        width: "90%",
        marginBottom: "5%",
    },
    scoreDetails: {
        flexDirection: 'row',
        marginTop: "5%",
        justifyContent: 'space-around'
    },
    score: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1: {
        color: THEME.COLORS.white,
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
    },
    text2: {
        color: THEME.COLORS.white,
        fontSize: 15,
        fontWeight: '500'
    },
    text3: {
        color: THEME.COLORS.white,
        fontSize: 17,
        fontWeight: '700',
    },
    teamNameContainer: {
        marginTop: 10
    },
    otherDetailsContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: "6%"
    },
    detailsContainer: {
        flexDirection: 'column',
    },
    teamContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
})