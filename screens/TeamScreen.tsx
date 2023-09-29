import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import TeamCard from "../components/TeamCard";

const teamList = [
    {
        id: 1,
        name: 'Creative Software',
        src: require('../assets/no-image.jpg')
    },
    {
        id: 2,
        name: 'WSO2',
        src: require('../assets/no-image.jpg')
    },
    {
        id: 3,
        name: 'MIT',
        src: require('../assets/no-image.jpg')
    },
    {
        id: 4,
        name: 'DirectFN',
        src: require('../assets/no-image.jpg')
    },
    {
        id: 5,
        name: 'Cambio Software',
        src: require('../assets/no-image.jpg')
    },
    {
        id: 6,
        name: 'IFS',
        src: require('../assets/icon.png')
    },
    {
        id: 7,
        name: 'CodeGen',
        src: ''
    },
]

export default function TeamScreen() {
    const renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View style={[styles.itemContainer, { padding: 0, marginTop: index % 2 !== 0 ? 30 : 0 }]}>
                <TouchableHighlight onPress={() => { }} style={styles.touchableHighlight} activeOpacity={0.6} underlayColor={'#000532'}>
                    <TeamCard teamName={item.name} index={index} source={item.src !== '' || item.src.length !== 0 ? item.src : require('../assets/no-image.jpg')} />
                </TouchableHighlight>
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    style={styles.flatList}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    data={teamList}
                    keyExtractor={(item: any, index: number) => item.id}
                    renderItem={({ item, index }: { item: any; index: number }) =>
                        renderItem({ item, index })
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '100%',
        flex: 1,
        height: '100%',
        paddingBottom: 50
    },
    flatList: {
        margin: 5,
        padding: 10,
    },
    columnWrapperStyle: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    itemContainer: {
        flex: 1,
    },
    touchableHighlight: {
        padding: 12,
        borderRadius: 30
    }
});