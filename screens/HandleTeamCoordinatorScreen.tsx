import React, {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import {useEffect, useState} from "react";
import {THEME} from "@constants/THEME";
import {AntDesign} from '@expo/vector-icons';
import {useToast} from "@context/ToastContext";

interface Player {
    id: string;
    name: string;
    nic: string;
    contact: string;
    attendance_state: boolean;
}

interface Company {
    name: string;
    address: string;
    contact: string;
    players: Player[];
}

interface Team {
    players: any;
    auth_id: string;
    company: Company;
    email: string;
    gender: string;
    id: string;
    location: string;
    name: string;
    food_state: boolean;
    water_state: boolean;
}

interface ResponseData {
    data: {
        id: string;
        team: Team;
        players: Player[];
    }
}

export default function HandleTeamCoordinatorScreen() {
    const [teamId, setTeamId] = useState<string>('');
    const authContext = useAuth();
    const {showToast} = useToast();
    const [players, setPlayers] = useState<Player[]>([]);
    const [updatedPlayers, setUpdatedPlayers] = useState<Player[]>([]);
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const outputArr = players.map((player) => {
        const updatedPlayer = updatedPlayers.find((updatedPlayer) => updatedPlayer.nic === player.nic);
        if (updatedPlayer) {
            return {
                ...player,
                attendance_state: updatedPlayer.attendance_state,
            };
        } else {
            return {
                ...player,
            };
        }
    });

    const getProfileDetails = async () => {
        try {
            const response = await axiosInstanceForFitSixes.get<ResponseData>('teams_by_teamcordinator');
            setTeamId(response.data.data.team.id);
            const company = response.data.data.team;
            const playersData = company.players;
            setPlayers(playersData);
        } catch (error) {
            console.log('Get users failed:', error);
        }
    }

    const markAttendance = async (nic: string) => {
        try {
            const data = {
                team_id: teamId,
                nic_list: [nic],
            }

            const response = await axiosInstanceForFitSixes.post('mark_attendance', data);
            const company = response.data.data.team;
            const playersData = company.players;
            setUpdatedPlayers(playersData);

        } catch (error) {
            console.log('Get users failed:', error);
        }
    }

    const handleApproveAttendance = (nic: string) => {
        markAttendance(nic).then(
            () => showToast(`Attendance Marked successfully`)
        )
            .catch((e) => console.error(e));
    }

    const onRefresh = () => {
        getProfileDetails().catch((e) => console.error(e));
    }

    useEffect(() => {
        getProfileDetails().catch((e) => console.error(e));
    }, []);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={{marginBottom: "8%"}}>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: "center", marginBottom: "5%"}}>Team
                        Member
                        Details</Text>
                </View>
                {outputArr && outputArr.map((player, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.label}>Name:</Text>
                            <Text style={styles.value}>{player.name}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.label}>Contact:</Text>
                            <Text style={styles.value}>{player.contact}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.label}>NIC:</Text>
                            <Text style={styles.value}>{player.nic}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {
                                !player.attendance_state && (
                                    <TouchableOpacity
                                        style={styles.approveButton}
                                        onPress={() => handleApproveAttendance(player.nic)}
                                    >
                                        <Text style={styles.buttonText}>Present</Text>
                                    </TouchableOpacity>
                                )
                            }
                            {
                                player.attendance_state && (
                                    <TouchableOpacity
                                        style={styles.attendanceMarkedButton}
                                    >
                                        <AntDesign name="checksquare" size={24} color="green"/>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontWeight: 'bold',
        color: THEME.COLORS.primary
    },
    value: {
        marginLeft: 10,
        color: THEME.COLORS.primary
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    approveButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
    },
    attendanceMarkedButton: {
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'flex-end',
        flex: 1,
    },
    attendanceMarkedText: {
        color: THEME.COLORS.green,
        fontSize: 16,
    },
    absentButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
