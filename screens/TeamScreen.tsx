import {FlatList, RefreshControl, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from 'react';
import TeamCard from "@components/TeamCard";
import {useNavigation} from "@react-navigation/native";
import {UseTeamsService} from "@services/useTeamsService";

export default function TeamScreen() {
    const navigation = useNavigation();
    const [apiData, setApiData] = useState<any>(null);
    const {getTeams} = UseTeamsService()

    useEffect(() => {
        getTeams()
            .then((response) => {
                setApiData(response.companies);

            })
            .catch((error) => {
                console.error('Error fetching response:', error);
            });
    }, []);

    const handleTeamCardClick = (players: string[]) => {
        // @ts-ignore
        navigation.navigate("TeamTabTeamMembersStack", {players:players});
    }

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View key={index} style={[styles.itemContainer, {padding: 0, marginTop: index % 2 !== 0 ? 30 : 0}]}>
                <TouchableOpacity onPress={() => handleTeamCardClick(item.players)}
                                  style={styles.touchableHighlight}
                                  activeOpacity={0.9}>
                    <TeamCard teamName={item.name} index={index} source={item.src !== '' || item.src.length !== 0 ? item.src : require('../assets/no-image.jpg')} />
                </TouchableOpacity>
            </View>
        )
    };

    const handleRefresh = () => {
        getTeams()
            .then((response) => {
                setApiData(response.companies);

            })
            .catch((error) => {
                console.error('Error fetching response:', error);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={handleRefresh}
                    />
                }
                centerContent={true}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
                data={apiData}
                // keyExtractor={(item: any) => item.id}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}: { item: any; index: number }) =>
                    renderItem({item, index})
                }
                />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: "5%",
    },
    flatList: {},
    columnWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemContainer: {
        margin: "2%",
    },
    touchableHighlight: {
        padding: 1,
        borderRadius: 30
    }
});