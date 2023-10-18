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

const ScoreComponentCoordinator: React.FC<ScoreCardProps> = ({details, teamName}) => {
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
        backgroundColor: THEME.COLORS.green,
        elevation: 5,
        width: "90%",
        marginVertical: "5%",
        paddingVertical: "6%",
    },
    scoreDetails: {
        flexDirection: 'row',
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