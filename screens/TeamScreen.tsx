import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import TeamCard from "@components/TeamCard";
import {useNavigation} from "@react-navigation/native";
import {PATHS} from "@constants/PATHS";

const teamList = [
    {
        id: 1,
        name: 'Creative Software',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 2,
        name: 'WSO2',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 3,
        name: 'MIT',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 4,
        name: 'DirectFN',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 5,
        name: 'Cambio Software',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 6,
        name: 'IFS',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 7,
        name: 'CodeGen',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 8,
        name: 'Virtusa',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 9,
        name: 'Sysco LABS',
        src: PATHS.IMAGES.NO_IMAGE
    },
    {
        id: 10,
        name: '99X Technology',
        src: PATHS.IMAGES.NO_IMAGE
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
                centerContent={true}
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