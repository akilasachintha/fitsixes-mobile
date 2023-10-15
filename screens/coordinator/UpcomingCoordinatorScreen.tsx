import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "@constants/THEME";
import {Picker} from "@react-native-picker/picker";
import React from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import {useToast} from "@context/ToastContext";
import {useNavigation} from "@react-navigation/native";

export default function UpcomingCoordinatorScreen(props: any) {
    const TEAM_1 = props.route.params.team_1;
    const TEAM_2 = props.route.params.team_2;
    const MATCH_ID = props.route.params.data;
    const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);
    const [selectedBattingTeam, setSelectedBattingTeam] = React.useState<string | null>(null);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);
    const {showToast} = useToast();
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (selectedTeam && selectedBattingTeam) {
            console.log("Toss Winner: ", selectedTeam);

            try {
                let url = `matchstatus/${MATCH_ID.toString()}`;
                const data = {
                    tos_winner: selectedTeam ? selectedTeam.toString() : null,
                    first_batting_team: selectedBattingTeam ? selectedBattingTeam.toString() : null,
                };

                const response = await axiosInstanceForFitSixes.put(`${url}`, data);
                if (response.data.state) {
                    showToast("Updated Successfully");
                    // @ts-ignore
                    // navigation.navigate("CoordinatorTabMatchesStack", {screen: "LiveCoordinatorTab",});
                }
            } catch (e) {
                console.log(e);
            }

        } else {
            Alert.alert("Please select a team");
        }
    };

    const handleMatchStart = async () => {
        try {
            let url = `matchstatus/${MATCH_ID.toString()}`;
            const data = {};

            const response = await axiosInstanceForFitSixes.put(`${url}`, data);
            if (response.data.state) {
                showToast("Updated Successfully");
                // @ts-ignore
                navigation.navigate("CoordinatorTabMatchesStack", {screen: "LiveCoordinatorTab",});
            }
        } catch (e) {
            console.log(e);
            showToast("Match Start Failed");
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>Update Toss Winner</Text>
                <Picker
                    selectedValue={selectedTeam}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                        setSelectedTeam(itemValue)
                    }>
                    <Picker.Item label="Select a team" value={null}/>
                    <Picker.Item label={TEAM_1} value={TEAM_1}/>
                    <Picker.Item label={TEAM_2} value={TEAM_2}/>
                </Picker>
            </View>
            <View>
                <Text style={styles.titleText}>First Batting Team</Text>
                <Picker
                    selectedValue={selectedBattingTeam}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                        setSelectedBattingTeam(itemValue)
                    }>
                    <Picker.Item label="Select a team" value={null}/>
                    <Picker.Item label={TEAM_1} value={TEAM_1}/>
                    <Picker.Item label={TEAM_2} value={TEAM_2}/>
                </Picker>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>
                    Submit
                </Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.titleText}>Press when starts the Match</Text>
                <TouchableOpacity onPress={handleMatchStart} style={styles.submitButton}>
                    <Text style={styles.submitText}>
                        Match Started.
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: THEME.COLORS.primary,
        textAlign: "center",
        marginVertical: "5%",
    },
    picker: {
        width: "100%",
        borderRadius: 10,
        height: 40,
        borderWidth: 10,
        borderColor: THEME.COLORS.primary,
        backgroundColor: THEME.COLORS.white,
    },
    submitButton: {
        backgroundColor: THEME.COLORS.primary,
        padding: "3%",
        borderRadius: 10,
        alignItems: "center",
        marginVertical: "5%",
    },
    submitText: {
        color: THEME.COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
    }
});
