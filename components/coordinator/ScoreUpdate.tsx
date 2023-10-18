import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {THEME} from '@constants/THEME';
import {useToast} from "@context/ToastContext";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import {Picker} from "@react-native-picker/picker";

type ScoreUpdateProps = {
    matchId: number;
    team1Name: string;
    team2Name: string;
    selectedTab: string;
}

export default function ScoreUpdate({matchId, team1Name, team2Name}: ScoreUpdateProps) {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const {showToast} = useToast();
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const handleButtonPress = (text: string) => {
        setSelectedButton(text);
    };

    const handleCancel = () => {
        setSelectedButton(null);
    };

    const handleSubmit = async () => {
        if (selectedButton !== null) {
            console.log(`Selected button: ${selectedButton}`);

            if (selectedButton === 'finish') {
                handleMatchFinish().catch((e) => console.log(e));
                return;
            } else {
                try {
                    const data = {
                        score: {
                            match_id: matchId.toString(),
                            key: selectedButton.toString(),
                        }
                    }

                    console.log("Data:", data);

                    const response = await axiosInstanceForFitSixes.post('update_score', data);
                    console.log("API call", response.data.data);
                    showToast("Score updated successfully");
                    setSelectedButton(null);
                } catch (error) {
                    console.log('Score update failed:', error);
                    showToast("Score update failed");
                }
            }

        } else {
            showToast('Please select a button');
            console.log('No button selected');
        }
    };

    const handleMatchFinish = async () => {
        if (selectedButton === 'finish' && selectedTeam !== null) {
            try {
                let url = `matchstatus/${matchId.toString()}`;
                const data = {
                    match_winner: selectedTeam ? selectedTeam.toString() : null,
                };

                const response = await axiosInstanceForFitSixes.put(`${url}`, data);
                if (response.data.state) {
                    showToast("Updated Successfully");
                }
            } catch (e) {
                console.log(e);
                showToast("Match Start Failed");
            }
            setSelectedButton(null);
            return;
        } else {
            showToast('Please select a team');
            console.log('No team selected');
        }
    }

    const data = [
        {value: '0', text: 'zero',},
        {value: '1', text: 'ones',},
        {value: '2', text: 'twos',},
        {value: '3', text: 'threes',},
        {value: '4', text: 'fours',},
        {value: '5', text: 'fives',},
        {value: '6', text: 'sixes',},
        {value: '7', text: 'sevens',},
        {value: 'W', text: 'wicket',},
        {value: 'W1', text: 'wicket_ones',},
        {value: 'W2', text: 'wicket_twos',},
        {value: 'W3', text: 'wicket_threes',},
        {value: 'E0', text: 'extras_zero',},
        {value: 'E1', text: 'extras_one',},
        {value: 'E2', text: 'extras_two',},
        {value: 'E3', text: 'extras_three',},
        {value: 'E4', text: 'extras_four',},
        {value: 'E5', text: 'extras_five',},
        {value: 'E6', text: 'extras_six',},
        {value: 'E7', text: 'extras_seven',}
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.scoreUpdateText}>Score Update</Text>
            <View style={styles.marks}>
                <View style={styles.marksSub}>
                    {data.slice(0, 8).map((button) => (
                        <TouchableOpacity
                            key={button.value}
                            style={[
                                styles.marksComponent,
                                selectedButton === button.text && {backgroundColor: 'red'},
                            ]}
                            onPress={() => handleButtonPress(button.text)}
                        >
                            <Text style={[styles.marksText, selectedButton === button.text && {color: 'white'}]}>
                                {button.value}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.marksSub}>
                    {data.slice(8, 12).map((button) => (
                        <TouchableOpacity
                            key={button.value}
                            style={[
                                styles.marksComponent,
                                selectedButton === button.text && {backgroundColor: 'red'},
                            ]}
                            onPress={() => handleButtonPress(button.text)}
                        >
                            <Text style={[styles.marksText, selectedButton === button.text && {color: 'white'}]}>
                                {button.value}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.marksSub}>
                    {data.slice(12, 20).map((button) => (
                        <TouchableOpacity
                            key={button.value}
                            style={[
                                styles.marksComponent,
                                selectedButton === button.text && {backgroundColor: 'red'},
                            ]}
                            onPress={() => handleButtonPress(button.text)}
                        >
                            <Text style={[styles.marksText, selectedButton === button.text && {color: 'white'}]}>
                                {button.value}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.marksSub}>
                    <TouchableOpacity style={[styles.marksTextComponent, {backgroundColor: THEME.COLORS.primary}]}
                                      onPress={handleSubmit}>
                        <Text style={[styles.marksText, {color: THEME.COLORS.white}]}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marksTextComponent} onPress={handleCancel}>
                        <Text style={styles.marksText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.marksSubFinish}>
                <Text style={styles.titleText}>Update Winning Team and press Finish button</Text>
                <View style={styles.finishContainer}>
                    {
                        selectedButton === 'finish' && (
                            <View>
                                <Picker
                                    selectedValue={selectedTeam}
                                    style={styles.picker}
                                    onValueChange={(itemValue) =>
                                        setSelectedTeam(itemValue)
                                    }>
                                    <Picker.Item label="Select a team" value={null}/>
                                    <Picker.Item label={team1Name} value={team1Name}/>
                                    <Picker.Item label={team2Name} value={team2Name}/>
                                </Picker>
                            </View>
                        )
                    }
                    {
                        selectedButton !== 'finish' && (
                            <TouchableOpacity
                                style={[styles.marksTextComponentFinish, selectedButton === 'finish' && {backgroundColor: 'green'},]}
                                onPress={() => handleButtonPress('finish')}>
                                <Text
                                    style={[styles.marksTextFinish, selectedButton === 'finish' && {color: 'white'}]}>Finish</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        selectedButton === 'finish' && (
                            <TouchableOpacity
                                style={[styles.marksTextComponentFinish, selectedButton === 'finish' && {backgroundColor: 'green'},]}
                                onPress={handleMatchFinish}>
                                <Text
                                    style={[styles.marksTextFinish, selectedButton === 'finish' && {color: 'white'}]}>Finish</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        selectedButton === 'finish' && (
                            <TouchableOpacity
                                style={[styles.marksTextComponentFinishCancel, selectedButton === 'finish' && {backgroundColor: 'white'},]}
                                onPress={handleCancel}>
                                <Text
                                    style={[styles.marksTextFinishCancel, selectedButton === 'finish' && {color: THEME.COLORS.primary}]}>Cancel</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 8,
    },
    scoreUpdateText: {
        color: THEME.COLORS.primary,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marks: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: THEME.COLORS.white,
        borderRadius: 30,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
    },
    marksSub: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    marksSubFinish: {
        flexDirection: 'column',
        backgroundColor: THEME.COLORS.white,
        borderRadius: 30,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
        marginVertical: 10,
        width: '90%',
    },
    marksSubFinishCancel: {
        flexDirection: 'column',
        backgroundColor: THEME.COLORS.white,
        borderRadius: 30,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
        marginVertical: 10,
        width: '90%',
    },
    marksComponent: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: THEME.COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
    },
    marksText: {
        color: THEME.COLORS.primary,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marksTextFinish: {
        color: THEME.COLORS.white,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marksTextFinishCancel: {
        color: THEME.COLORS.white,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marksTextComponent: {
        height: 40,
        width: 100,
        borderRadius: 30,
        backgroundColor: THEME.COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
    },
    marksTextComponentFinish: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: THEME.COLORS.primary,
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
    },
    marksTextComponentFinishCancel: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: THEME.COLORS.white,
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        shadowColor: THEME.COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation: 2,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        color: THEME.COLORS.primary,
        textAlign: "center",
        marginTop: "5%",
        marginHorizontal: "5%",
    },
    picker: {
        borderRadius: 10,
        borderWidth: 10,
        borderColor: THEME.COLORS.primary,
        backgroundColor: THEME.COLORS.white,
    },
    finishContainer: {
        flexDirection: 'column',
    }
});
