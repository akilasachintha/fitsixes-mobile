import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {THEME} from "@constants/THEME";
import ImageHolder from "@components/ImageHolder";
import {PATHS} from "@constants/PATHS";

interface ScoreCardProps {
    details: {
        marks: number;
        wickets: number;
        overs: number;
        balls: number;
        extras: number;
    };
    teamName?: string;
    teamNo: number;
    totalOvers: number;
}

const ScoreComponent: React.FC<ScoreCardProps> = ({details, teamName, teamNo, totalOvers}) => {

    return (
        <View style={styles.container}>
            <View style={styles.scoreDetails}>
                <View style={styles.teamContainer}>
                    <ImageHolder source={teamNo === 1 ? PATHS.IMAGES.Team_1 : PATHS.IMAGES.Team_2} size={80}/>
                    <View style={styles.teamNameContainer}>
                        <Text style={styles.text3}>{teamName}</Text>
                    </View>
                </View>
                <View style={styles.score}>
                    <Text style={styles.text1}>{details.marks + '/' + details.wickets}</Text>
                    <Text
                        style={styles.text2}>{details.overs + '.' + details.balls + ' / ' + totalOvers + ' Overs'}</Text>
                    <Text style={styles.text2}>{'Extra: ' + details.extras}</Text>
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
        marginBottom: "5%",
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
        textAlign: 'center',
    },
    teamNameContainer: {
        marginTop: 10,
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
        alignItems: "center",
        width: "40%",
    }
})