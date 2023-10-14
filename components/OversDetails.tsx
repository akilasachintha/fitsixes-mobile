import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { THEME } from '@constants/THEME'

interface OverDetailsProps {
    details: (number | string)[];
}

const OversDetails: React.FC<OverDetailsProps> = ({ details }) => {
    return (
        <View style={styles.container}>
            <View style={styles.cardContent2}>
                {details?.map((item) => {
                    return (
                        <View style={styles.cardDetails}><View style={styles.roundView}><Text style={[styles.firstCardText]}>{item}</Text></View></View>
                    )
                })}
            </View>
        </View>
    )
}

export default OversDetails;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: "7%",
        borderRadius: 20,
        backgroundColor: THEME.COLORS.white,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 10,
        marginBottom: "5%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContent2: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        alignSelf: 'center'
    },
    cardDetails: {
        width: '17%',
    },
    firstCardText: {
        color: THEME.COLORS.white,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'justify',
        alignSelf: 'center'
    },
    roundView: {
        backgroundColor: THEME.COLORS.primary,
        alignSelf: 'center',
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})