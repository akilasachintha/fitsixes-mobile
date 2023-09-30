import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import TeamCard from "../components/TeamCard";
import {useNavigation} from "@react-navigation/native";

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
    {
        id: 8,
        name: 'Virtusa',
        src: ''
    },
    {
        id: 9,
        name: 'Sysco LABS',
        src: ''
    },
    {
        id: 10,
        name: '99X Technology',
        src: ''
    }
]

export default function TeamScreen() {
    const navigation = useNavigation();
    const handleTeamCardClick = () => {
        // @ts-ignore
        navigation.navigate("TeamTabTeamMembersStack");
    }

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View style={[styles.itemContainer, { padding: 0, marginTop: index % 2 !== 0 ? 30 : 0 }]}>
                <TouchableOpacity onPress={handleTeamCardClick}
                                  style={styles.touchableHighlight}
                                  activeOpacity={0.9}>
                    <TeamCard teamName={item.name} index={index} source={item.src !== '' || item.src.length !== 0 ? item.src : require('../assets/no-image.jpg')} />
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
                data={teamList}
                keyExtractor={(item: any) => item.id}
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
        paddingHorizontal: 40,
    },
    flatList: {},
    columnWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemContainer: {
        flex: 1,
    },
    touchableHighlight: {
        padding: 1,
        borderRadius: 30
    }
});