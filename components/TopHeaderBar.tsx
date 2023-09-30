import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ImageHolder from "./ImageHolder";
import {useNavigation} from "@react-navigation/native";
import {THEME} from "../config/theme";

export default function TopHeaderBar() {
    const navigation = useNavigation();

    const handleHamBurgerClick = () => {
        // @ts-ignore
        navigation.openDrawer();
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.hamburgerContainer} activeOpacity={0.8} onPress={handleHamBurgerClick}>
                    <View style={[styles.hamburgerBar, {width: 25}]}/>
                    <View style={[styles.hamburgerBar, {width: 15}]}/>
                    <View style={[styles.hamburgerBar, {width: 20}]}/>
                    <View style={[styles.hamburgerBar, {width: 15}]}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>Fit Sixes</Text>
                </View>
                <ImageHolder source={require("../assets/fit-sixes-icon.png")} size={48}
                             borderColor={THEME.COLORS.primary}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: "5%",
        marginTop: 30,
        paddingVertical: 10,
    },
    hamburgerContainer: {},
    hamburgerBar: {
        height: 3,
        backgroundColor: THEME.COLORS.primary,
        borderRadius: 5,
        marginVertical: 2,
    },
    headerText: {
        color: THEME.COLORS.primary,
        fontSize: 20,
        fontWeight: "bold",
    }
});

