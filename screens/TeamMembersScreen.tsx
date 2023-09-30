import PlayerDetailsCard from "../components/PlayerDetailsCard";
import ImageHolder from "../components/ImageHolder";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {THEME} from "../config/theme";
import {PATHS} from "../config/paths";

export default function TeamMembersScreen() {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.teamCardContainer}>
                    <ImageHolder source={PATHS.IMAGES.NO_IMAGE} size={70}/>
                    <Text style={styles.teamCardText}>Team Players</Text>
                </View>
                <PlayerDetailsCard url={PATHS.IMAGES.NO_IMAGE} playerName="Akila" playerRole="Batsman"/>
                <PlayerDetailsCard url={PATHS.IMAGES.NO_IMAGE} playerName="Kamal" playerRole="Batsman"/>
                <PlayerDetailsCard url={PATHS.IMAGES.NO_IMAGE} playerName="Isuru" playerRole="Batsman"/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    teamCardContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    teamCardText: {
        color: THEME.COLORS.primary,
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: "4%",
    }
});
