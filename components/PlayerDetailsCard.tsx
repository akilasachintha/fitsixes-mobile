import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageHolder from './ImageHolder'
import { THEME } from "@constants/THEME";
import { PATHS } from "@constants/PATHS";
import { getrandomNoImage } from "@constants/PATHS";

interface PlayerDetailsCardProps {
    key: number;
    url: ImageSourcePropType;
    playerName: String;
}

const PlayerDetailsCard: React.FC<PlayerDetailsCardProps> = ({
    key,
    url,
    playerName,

}) => {
    return (
        <View key={key} style={styles.playerCardContainer}>
            <View style={styles.playerCardSubContainer}>
                <View style={styles.playerProfileContainer}>
                    <ImageHolder
                        source={url ? url : getrandomNoImage()}
                        size={60}
                        borderColor="#13FAF8"
                        borderWidth={3}
                    />
                </View>
                <View style={styles.playerDetailsContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                        {playerName}
                    </Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoView} resizeMode='contain' source={PATHS.IMAGES.FIT_SIXES_LOGO} />
                </View>
            </View>
        </View>
    )

}
export default PlayerDetailsCard;

const styles = StyleSheet.create({
    playerCardContainer: {
        marginHorizontal: '5%',
        height: 70,
        backgroundColor: THEME.COLORS.primary,
        borderRadius: 112,
        alignSelf: 'center',
        marginVertical: "2%",
    },

    playerCardSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '3%',
    },

    playerProfileContainer: {
        width: '18%',
        flexDirection: 'column',
    },

    playerDetailsContainer: {
        width: '45%',
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    playerName: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        width: '100%',
        margin: 2
    },

    logoContainer: {
        width: '30%',
        marginLeft: 15,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },

    logoView: {
        width: "100%",
        height: "100%",
    },
})







