import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";
import React from "react";
import {THEME} from "../config/theme";
import {PATHS} from "../config/paths";

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleSeeAllClick = () => {
        // @ts-ignore
        navigation.navigate("HomeTabMatchesStack", {screen: "UpcomingTab",});
    }

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MatchDetailCard
                    matchStatus={MatchStatus.Live}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Score={"100/2"}
                    team2Score={"200/2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <View style={styles.subtitleContainer}>
                    <Text style={styles.leftText}>Upcoming</Text>
                    <TouchableOpacity onPress={handleSeeAllClick}>
                        <Text style={styles.rightText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <MatchDetailCard
                    matchStatus={MatchStatus.Upcoming}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Upcoming}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Upcoming}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={PATHS.IMAGES.NO_IMAGE}
                    team2Image={PATHS.IMAGES.NO_IMAGE}
                    matchNo={10}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    subtitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "8%",
        marginBottom: "4%",
    },
    leftText: {
        color: THEME.COLORS.primary,
        fontSize: 18,
        fontWeight: "bold",
    },
    rightText: {
        color: THEME.COLORS.primary,
        fontSize: 16,
        fontWeight: "bold",
    }
});