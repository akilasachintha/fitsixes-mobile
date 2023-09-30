import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import ImageHolder from './ImageHolder'

interface PlayerDetailsCardProps {
    url: ImageSourcePropType;
    playerName: String;
    playerRole: String;
}

const PlayerDetailsCard: React.FC<PlayerDetailsCardProps> = ({
    url,
    playerName,
    playerRole,

}) => {
    return (
        <View style={styles.playerCardContainer}>
            <View style={styles.playerCardSubContainer}>
                <View style={styles.playerProfileContainer}>
                    <ImageHolder
                        source={url ? url : require('../assets/no-image.jpg')}
                        size={60}
                        borderColor="#13FAF8"
                        borderWidth={3}
                    />
                </View>
                <View style={styles.playerDetailsContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                        {playerName}
                    </Text>
                    <Text numberOfLines={1} style={styles.playerName}>
                        {playerRole}
                    </Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoView} resizeMode='center' source={require('../assets/images/fit-sixes-drawer-logo.png')} />
                </View>
            </View>
        </View>
    )

}
export default PlayerDetailsCard;

const styles = StyleSheet.create({
    playerCardContainer: {
        width: 364,
        height: 75,
        backgroundColor: '#101B62',
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







