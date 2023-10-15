import TeamNamesCard from "../components/TeamNamesCard";
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "../config/theme";
import {useState} from "react";
import TeamScore from "../components/TeamScore";
import ScoreCard from "../components/ScoreCard";

export default function ScoreboardScreen() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TeamNamesCard teamName1="Geveo" teamName2="WSO2"/>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        {
                            selectedTab === 0 ?
                                <TouchableOpacity style={styles.leftContainerText} onPress={() => setSelectedTab(0)}>
                                    <Text style={styles.leftText}>Geveo</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity style={styles.leftContainerNotText} onPress={() => setSelectedTab(0)}>
                                    <Text style={styles.leftNotText}>Geveo</Text>
                                </TouchableOpacity>
                        }
                        {
                            selectedTab === 1 ?
                                <TouchableOpacity style={styles.rightContainerText} onPress={() => setSelectedTab(0)}>
                                    <Text style={styles.leftText}>WSO2</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity style={styles.rightContainerNotText}
                                                  onPress={() => setSelectedTab(1)}>
                                    <Text style={styles.leftNotText}>WSO2</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                {
                    selectedTab === 0 && (
                        <View>
                            <TeamScore teamName="Geveo" score="100/2"/>
                            <ScoreCard/>
                        </View>
                    )

                }
                {
                    selectedTab === 1 && (
                        <View>
                            <TeamScore teamName="WSO2" score="50/5"/>
                            <ScoreCard/>
                        </View>
                    )

                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "2%",
    },
    mainContainer: {
        marginHorizontal: "20%",
        borderRadius: 30,
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
    },
    leftContainerText: {
        width: "50%",
        paddingVertical: "4%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.primary,
    },
    rightContainerText: {
        width: "50%",
        paddingVertical: "4%",
        borderRadius: 30,
        backgroundColor: THEME.COLORS.primary,
    },
    leftContainerNotText: {
        width: "50%",
        textAlign: "center",
        fontWeight: "bold",
    },
    leftText: {
        color: THEME.COLORS.white,
        textAlign: "center",
        fontWeight: "bold",
    },
    leftNotText: {
        color: THEME.COLORS.primary,
        textAlign: "center",
        fontWeight: "bold",
    },
    rightContainerNotText: {
        width: "50%",
        textAlign: "center",
        fontWeight: "bold",
    }
});