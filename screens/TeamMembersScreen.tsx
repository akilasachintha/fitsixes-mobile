import PlayerDetailsCard from "../components/PlayerDetailsCard";
import ImageHolder from "../components/ImageHolder";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {THEME} from "../config/theme";

export default function TeamMembersScreen() {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.teamCardContainer}>
                    <ImageHolder source={require("../assets/no-image.jpg")} size={70}/>
                    <Text style={styles.teamCardText}>Team Players</Text>
                </View>
                <PlayerDetailsCard url={require("../assets/no-image.jpg")} playerName="Akila" playerRole="Batsman"/>
                <PlayerDetailsCard url={require("../assets/no-image.jpg")} playerName="Kamal" playerRole="Batsman"/>
                <PlayerDetailsCard url={require("../assets/no-image.jpg")} playerName="Isuru" playerRole="Batsman"/>
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
