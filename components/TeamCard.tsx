import React from "react"
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import ImageHolder from "@components/ImageHolder";
import {THEME} from "@constants/THEME";
import {PATHS} from "@constants/PATHS";

interface TeamCardProps {
    teamName: string;
    source?: ImageSourcePropType;
    index: any;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamName, source = require('../assets/no-image.jpg'), index }) => {
    return (
        <View style={styles.cardContainer}>
            <View>
                <Image
                    source={PATHS.IMAGES.FIT_SIXES_LOGO}
                    style={[
                        styles.image,
                        { alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end' }
                    ]}
                />
            </View>

            <View style={styles.teamNameContainer}>
                <ImageHolder source={source} size={60} />
                <Text style={styles.teamName} numberOfLines={3} ellipsizeMode="tail">
                    {teamName.length > 20 ? `${teamName.slice(0, 30)}...` : teamName}
                </Text>
            </View>

        </View>
    )
}

export default TeamCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: 140,
        height: 165,
        backgroundColor: THEME.COLORS.primary,
        borderRadius: 30,
        elevation: 5
    },
    image: {
        height: 65,
        width: 65,
        marginTop: -5
    },
    teamNameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: -8,
    },
    teamName: {
        marginTop: 15,
        color: THEME.COLORS.white,
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    }
})