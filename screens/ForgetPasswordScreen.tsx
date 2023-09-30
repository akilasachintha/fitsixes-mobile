import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ImageHolder from "../components/ImageHolder";
import HeaderText from "../components/HeaderText";
import TextInputField from "../components/TextInputField";
import Button from "../components/Button";
import {THEME} from "../config/theme";

export default function ForgetPasswordScreen() {
    const navigation = useNavigation();

    const handleForgotPassword = () => {
        // @ts-ignore
        navigation.navigate("LoginStack");
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageHolder source={require("../assets/fit-sixes.png")} size={150} borderWidth={0}/>
                <HeaderText header={"Forget Password"}/>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        Please enter your registered email address. We will send you a link to reset your password.
                    </Text>
                </View>
                <TextInputField label={"Email"} placeholder={"abc@gmail.com"}/>
                <Button title={"Reset Password"} onPress={handleForgotPassword}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: "25%",
        paddingHorizontal: "8%",
    },
    descriptionContainer: {
        width: "100%",
        alignItems: "flex-start",
        paddingVertical: "5%",
    },
    descriptionText: {
        color: THEME.COLORS.primary,
        fontSize: 14,
        textAlign: "left",
        marginBottom: "5%",
    },
    forgetPasswordContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: "5%",
    },
    forgetPasswordTextContainer: {
        justifyContent: "flex-end",
    },
    forgetPasswordText: {
        color: THEME.COLORS.primary,
        fontSize: 14,
        textAlign: "right",
    }
});