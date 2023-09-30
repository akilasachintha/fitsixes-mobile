import ScoreCard from "../components/ScoreCard";
import TeamNamesCard from "../components/TeamNamesCard";
import TeamScore from "../components/TeamScore";
import {SafeAreaView, ScrollView} from "react-native";

export default function ScoreboardScreen() {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TeamNamesCard teamName1="Geveo" teamName2="WSO2"/>
                <TeamScore teamName="Geveo" score="100/2"/>
                <ScoreCard/>
            </ScrollView>
        </SafeAreaView>
    )
}