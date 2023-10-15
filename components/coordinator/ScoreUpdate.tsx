import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "@constants/THEME";

export default function ScoreUpdate() {
    return (
        <View>
            <Text style={styles.scoreUpdateText}>Score Update</Text>
            <View style={styles.marks}>
                <View style={styles.marksSub}>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>5</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.marksSub}>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>WD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>NB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>LB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksTextRed}>W</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.marksSub}>
                    <TouchableOpacity style={styles.marksComponent}>
                        <Text style={styles.marksText}>Finish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scoreUpdateText: {
        color: THEME.COLORS.primary,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marks: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: "2%",
        marginHorizontal: "7%",
        padding: "2%",
        backgroundColor: THEME.COLORS.white,
        borderRadius: 30,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 10,
    },
    marksSub: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    marksComponent: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: THEME.COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: "1%",
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 10,
    },
    marksText: {
        color: THEME.COLORS.primary,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marksTextRed: {
        color: THEME.COLORS.red,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
});