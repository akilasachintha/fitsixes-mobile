import PlayerDetailsCard from "@components/PlayerDetailsCard";
import ImageHolder from "../components/ImageHolder";
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {THEME} from "@constants/THEME";
import {PATHS} from "@constants/PATHS";
import { useEffect } from "react";

export default function TeamMembersScreen(props : any) {
    console.log("aaa",props.route.params.players)

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.teamCardContainer}>
                    <ImageHolder source={PATHS.IMAGES.NO_IMAGE} size={70}/>
                    <Text style={styles.teamCardText}>Team Players</Text>
                </View>
                
                {/* <PlayerDetailsCard url={PATHS.IMAGES.NO_IMAGE} playerName="Akila" playerRole="Batsman"/>
                <PlayerDetailsCard url={PATHS.IMAGES.NO_IMAGE} playerName="Kamal" playerRole="Batsman"/>
                <PlayerDetailsCard url={PATHS.IMAGES.NO_IMAGE} playerName="Isuru" playerRole="Batsman"/> */}
            </ScrollView>
            <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                    centerContent={true}
                    numColumns={1}
                    data={props.route.params.players}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}: { item: any; index: number }) =>
                        <PlayerDetailsCard url={PATHS.IMAGES.NO_IMAGE} playerName={item.name} playerRole="Batsman"/>
                }
                />
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
    },
    flatList: {
        // borderWidth:2
    },
});
