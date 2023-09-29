import {SafeAreaView} from "react-native-safe-area-context";
import ScoreCard from "../components/ScoreCard";
import TeamNamesCard from "../components/TeamNamesCard";

export default function ScoreboardScreen() {
    return (
        <SafeAreaView>
            <TeamNamesCard teamName1="Geveo" teamName2="WSO2"/>
            <ScoreCard/>
        </SafeAreaView>
    )
}