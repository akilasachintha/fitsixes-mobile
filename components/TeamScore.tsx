import React from "react";
import {ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import ImageHolder from './ImageHolder'
import {THEME} from "../config/theme";

interface TeamScoreProps {
    teamName: String;
    score?: any;
    wickets?: any;
    overs?: any;
    src?: ImageSourcePropType
}

const TeamScore: React.FC<TeamScoreProps> = ({ teamName, score = 0, wickets = 0, overs = 0.0, src = require('../assets/no-image.jpg') }) => {
    return (
        <View style={styles.container}>
            <ImageHolder source={src} size={100} borderColor="#000532" borderWidth={1} />
            <View style={styles.teamDetails}>
                <Text style={styles.teamName} numberOfLines={2} ellipsizeMode="tail">{teamName.length > 20 ? `${teamName.slice(0, 30)}...` : teamName}</Text>
                <Text style={styles.teamDetailsText}>{score + ' - ' + wickets}</Text>
                <Text style={styles.teamName}>{'(' + overs + ')'}</Text>
            </View>
        </View>
    )
}

export default TeamScore;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    teamDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    teamName: {
        fontSize: 18,
        color: THEME.COLORS.primary,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 5
    },
    teamDetailsText: {
        fontSize: 16,
        color: THEME.COLORS.primary,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 5
    }
})