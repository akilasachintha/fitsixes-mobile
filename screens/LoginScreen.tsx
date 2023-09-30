import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../context/AuthContext";
import ImageHolder from "../components/ImageHolder";
import HeaderText from "../components/HeaderText";
import TextInputField from "../components/TextInputField";
import Button from "../components/Button";

export default function LoginScreen() {
    const navigation = useNavigation();
    const {login} = useAuth();

    const handleLogin = () => {
        login();
        // @ts-ignore
        navigation.navigate("HomeStack");
    }

    const handleForgotPassword = () => {
        // @ts-ignore
        navigation.navigate("ForgetPasswordStack");
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ImageHolder source={require("../assets/fit-sixes.png")} size={150} borderWidth={0}/>
                <HeaderText header={"Login"}/>
                <TextInputField label={"Email"} placeholder={"abc@gmail.com"}/>
                <TextInputField label={"Password"} placeholder={"password"} isPassword={true}/>
                <View style={styles.forgetPasswordContainer}>
                    <TouchableOpacity style={styles.forgetPasswordTextContainer} onPress={handleForgotPassword}>
                        <Text style={styles.forgetPasswordText}>Forget Password</Text>
                    </TouchableOpacity>
                </View>
                <Button title={"Login"} onPress={handleLogin}/>
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
    forgetPasswordContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: "5%",
    },
    forgetPasswordTextContainer: {
        justifyContent: "flex-end",
    },
    forgetPasswordText: {
        color: "#000532",
        fontSize: 14,
        textAlign: "right",
    }
});