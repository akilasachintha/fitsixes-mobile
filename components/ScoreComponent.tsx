import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../config/theme";
import ImageHolder from "./ImageHolder";
import { PATHS } from "../config/paths";

interface ScoreCardProps {
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

const ScoreComponent: React.FC<ScoreCardProps> = ({ details, teamName, details2 }) => {
    const calculateRunRate = (totalRuns: number, totalOvers: number): number => {
        if (totalOvers === 0) {
            return 0;
        }
        const runRate = totalRuns / totalOvers;
        const roundedRunRate = Math.round(runRate * 100) / 100;
        return roundedRunRate;
    };

    const calculateRequiredRunRate = (targetRuns: number, remainingOvers: number): number => {
        if (remainingOvers === 0) {
            return Number.POSITIVE_INFINITY;
        }
        const requiredRunRate = targetRuns / remainingOvers;
        const roundedRequiredRunRate = Math.round(requiredRunRate * 100) / 100;
        return roundedRequiredRunRate;
    };

    return (
        <View style={styles.container}>
            <View style={styles.scoreDetails}>
                <ImageHolder source={PATHS.IMAGES.Team_1} size={80} />
                <View style={styles.score}>
                    <Text style={styles.text1}>{details.marks + '/' + details.wickets}</Text>
                    <Text style={styles.text2}>{details.overs + '.' + details.balls + '/' + '10 Overs'}</Text>
                </View>
            </View>

            <View style={styles.teamNameContainer}>
                <Text style={styles.text3}>{teamName}</Text>
            </View>

            <View style={styles.otherDetailsContainer}>
                <View style={styles.detailsContainer}>
                    <Text>{'CRR: ' + calculateRunRate(details.marks, details.overs)}</Text>
                    {details.overs !== 10 && (
                        <Text>{'RRR: ' + calculateRequiredRunRate(details2.marks, 10 - details.overs)}</Text>
                    )}
                </View>
                <View style={styles.detailsContainer}>
                    <Text>{'Extra: ' + details.extras}</Text>
                </View>
            </View>
        </View>
    );
};

export default ScoreComponent;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 32,
        backgroundColor: THEME.COLORS.primary,
        elevation: 5,
        width: "90%",
        height: 350,
        marginBottom: "5%"
    },
    scoreDetails: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly'
    },
    score: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1: {
        color: THEME.COLORS.white,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },
    text2: {
        color: THEME.COLORS.white,
        fontSize: 15,
        fontWeight: '500'
    },
    text3: {
        color: THEME.COLORS.white,
        fontSize: 17,
        fontWeight: '700'
    },
    teamNameContainer: {
        marginTop: 5
    },
    otherDetailsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    detailsContainer: {
        flexDirection: 'column',
        width: '50%'
    }
})