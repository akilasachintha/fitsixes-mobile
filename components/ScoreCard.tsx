import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {THEME} from "../config/theme";

const playerDetails = [
    {
        id: 1,
        name: 'Kasun',
        details: [{ id: 1, six: 3 }, { id: 2, six: 4 }, { id: 3, six: 6 }, { id: 4, six: 2 }, { id: 5, six: 0 }, { id: 6, six: 3 }]
    },
    {
        id: 2,
        name: 'Sadun',
        details: [{ id: 1, six: 3 }, { id: 2, six: 4 }, { id: 3, six: 6 }, { id: 4, six: 2 }, { id: 5, six: 0 }, { id: 6, six: 3 }]
    },
    {
        id: 3,
        name: 'Akila',
        details: [{ id: 1, six: 3 }, { id: 2, six: 4 }, { id: 3, six: 6 }, { id: 4, six: 2 }, { id: 5, six: 0 }, { id: 6, six: 3 }]
    },
    {
        id: 4,
        name: 'Siraj',
        details: [{ id: 1, six: 3 }, { id: 2, six: 4 }, { id: 3, six: 6 }, { id: 4, six: 2 }, { id: 5, six: 0 }, { id: 6, six: 3 }]
    },
    {
        id: 5,
        name: 'Ranmuthu',
        details: [{ id: 1, six: 3 }, { id: 2, six: 4 }, { id: 3, six: 6 }, { id: 4, six: 2 }, { id: 5, six: 0 }, { id: 6, six: 3 }]
    }
]

interface ScoreCardProps {

}

const ScoreCard: React.FC<ScoreCardProps> = ({ }) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstCard}>
                <View style={styles.cardContent1}>
                    <Text style={styles.firstCardText}>Batman</Text>
                </View>

                <View style={styles.cardContent2}>
                    <View style={styles.cardDetails}><Text style={[styles.firstCardText, { letterSpacing: 1 }]}>6s</Text></View>
                    <View style={styles.cardDetails}><Text style={[styles.firstCardText, { letterSpacing: 1 }]}>4s</Text></View>
                    <View style={styles.cardDetails}><Text style={[styles.firstCardText, { letterSpacing: 1 }]}>3s</Text></View>
                    <View style={styles.cardDetails}><Text style={[styles.firstCardText, { letterSpacing: 1 }]}>2s</Text></View>
                    <View style={styles.cardDetails}><Text style={[styles.firstCardText, { letterSpacing: 1 }]}>1s</Text></View>
                    <View style={styles.cardDetails}><Text style={[styles.firstCardText, { letterSpacing: 1 }]}>Ex</Text></View>
                </View>
            </View>

            <View style={[styles.container, styles.secondCard]}>
                {playerDetails?.map((item: any, index) => {
                    let length = playerDetails.length;
                    return (
                        <View key={index}>
                            <View style={styles.playerDetails} key={index}>
                                <View style={styles.cardContent1}>
                                    <Text style={[styles.secondCardText]} numberOfLines={2} ellipsizeMode="tail">{item.name.length > 20 ? `${item.name.slice(0, 25)}...` : item.name}</Text>
                                </View>

                                <View style={styles.cardContent2}>
                                    {item.details?.map((i: any) => {
                                        return (
                                            <View style={styles.cardDetails} key={i.id}>
                                                <Text style={[styles.secondCardText]}>{i.six}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                            {length !== index + 1 && (
                                <View style={styles.line}></View>
                            )}
                        </View>
                    );
                })}
            </View>

        </View>
    )
}

export default ScoreCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "2%"
    },
    firstCard: {
        width: "90%",
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFF',
        elevation: 8,
        shadowColor: '#B4C1D5',
        shadowOffset: { width: 40, height: 40 },
        shadowOpacity: 0.8,
        shadowRadius: 60,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContent1: {
        width: '40%',
    },
    cardContent2: {
        flexDirection: 'row',
        width: '60%',
    },
    cardDetails: {
        width: '17%'
    },
    firstCardText: {
        color: THEME.COLORS.primary,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'justify'
    },
    secondCard: {
        backgroundColor: THEME.COLORS.primary,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        width: "90%",
        marginTop: 20
    },
    secondCardText: {
        color: THEME.COLORS.white,
        fontSize: 18,
        fontWeight: '600',
    },
    playerDetails: {
        flexDirection: 'row',
        padding: 20,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: THEME.COLORS.gray,
    }
})