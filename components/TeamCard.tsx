import React from "react"
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

interface TeamCardProps {
    teamName: string;
    source?: ImageSourcePropType;
    index: any;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamName, source = require('../assets/no-image.jpg'), index }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={{ justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                <Image source={require('../assets/fit-sixes.png')} style={styles.image} />
            </View>
        </View>
    )
}

export default TeamCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: 160,
        height: 190,
        backgroundColor: '#000532',
        borderRadius: 10
    },
    image: {
        height: 20,
        width: 20
    }
})