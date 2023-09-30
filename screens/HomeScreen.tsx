import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {ScrollView, StyleSheet, View} from "react-native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";


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
                    team1Image={require("../assets/no-image.jpg")}
                    team2Image={require("../assets/no-image.jpg")}
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
                    team1Image={require("../assets/no-image.jpg")}
                    team2Image={require("../assets/no-image.jpg")}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Upcoming}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={require("../assets/no-image.jpg")}
                    team2Image={require("../assets/no-image.jpg")}
                    matchNo={10}
                />
                <MatchDetailCard
                    matchStatus={MatchStatus.Upcoming}
                    team1={"Team 1"}
                    team2={"Team 2"}
                    team1Image={require("../assets/no-image.jpg")}
                    team2Image={require("../assets/no-image.jpg")}
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
        marginVertical: "4%",
    },
    leftText: {
        color: "#101B62",
        fontSize: 18,
        fontWeight: "bold",
    },
    rightText: {
        color: "#101B62",
        fontSize: 16,
        fontWeight: "bold",
    }
});