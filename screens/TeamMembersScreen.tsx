import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PlayerDetailsCard from '@components/PlayerDetailsCard';
import ImageHolder from '../components/ImageHolder';
import { THEME } from '@constants/THEME';
import { PATHS } from '@constants/PATHS';
import { getrandomNoImage } from "@constants/PATHS";

export default function TeamMembersScreen(props: any) {

    return (
        <View style={styles.container}>
            <View style={styles.teamCardContainer}>
                <ImageHolder source={getrandomNoImage()} size={70} />
                <Text style={styles.teamCardText}>Team Players</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                numColumns={1}
                data={props?.route?.params?.players || []}
                keyExtractor={(item) => item.nic.toString()}
                renderItem={({ item }) => (
                    <PlayerDetailsCard key={item.id} url={getrandomNoImage()} playerName={item.name} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    teamCardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamCardText: {
        color: THEME.COLORS.primary,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    flatList: {},
});
