import React from "react";
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import ImageHolder from "@components/ImageHolder";
import {THEME} from "@constants/THEME";
import {PATHS} from "@constants/PATHS";

interface TeamNamesProps {
    teamName1: string;
    teamName2: string;
    teamSource1?: ImageSourcePropType;
    teamSource2?: ImageSourcePropType;
}

const TeamNamesCardCoordinator: React.FC<TeamNamesProps> = ({teamName1, teamName2, teamSource1 = PATHS.IMAGES.NO_IMAGE, teamSource2 = PATHS.IMAGES.NO_IMAGE}) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardSecondContainer}>
                <View style={styles.teamDetails}>
                    <ImageHolder source={teamSource1} size={70}/>
                    <View style={styles.teamNameContainer}>
                        <Text style={styles.teamName} numberOfLines={3} ellipsizeMode="tail">
                            {teamName1.length > 20 ? `${teamName1.slice(0, 30)}...` : teamName1}
                        </Text>
                    </View>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={PATHS.IMAGES.FIT_SIXES_LOGO} style={styles.image}/>
                </View>
                <View style={styles.teamDetails}>
                    <ImageHolder source={teamSource2} size={70}/>
                    <View style={styles.teamNameContainer}>
                        <Text style={styles.teamName} numberOfLines={3} ellipsizeMode="tail">
                            {teamName2.length > 20 ? `${teamName2.slice(0, 30)}...` : teamName2}
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default TeamNamesCardCoordinator;

const styles = StyleSheet.create({
    cardContainer: {
        alignSelf: 'center',
        borderRadius: 32,
        backgroundColor: THEME.COLORS.green,
        elevation: 5,
        width: "90%",
        height: 150,
        marginBottom: "5%"
    },
    cardSecondContainer: {
        alignSelf: 'center',
        padding: 25,
        flexDirection: 'row'
    },
    teamDetails: {
        flexDirection: 'column'
    },
    teamNameContainer: {
        width: 70,
    },
    teamName: {
        marginTop: 10,
        color: THEME.COLORS.white,
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10
    },
    image: {
        width: 130,
        height: 130
    }
});