import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ImageHolder from "@components/ImageHolder";
import {PATHS} from "@constants/PATHS";
import {THEME} from "@constants/THEME";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {useAuth} from "@context/AuthContext";

interface EyeIconProps {
    onPress: () => void;
    visible: boolean;
    error?: boolean;
    onBlur?: () => void;
}

const EyeIcon: React.FC<EyeIconProps> = ({onPress, visible}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.eyeIcon}>
                <Ionicons
                    name={visible ? 'eye' : 'eye-off'}
                    size={20}
                    color={THEME.COLORS.white}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    );
};

const ProfileScreen = () => {
    useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <SafeAreaView>
            <View style={styles.profileImageView}>
                <ImageHolder
                    source={PATHS.IMAGES.NO_IMAGE}
                    size={150}
                    borderColor="#13FAF8"
                    borderWidth={2}
                />
            </View>
            <Text style={styles.teameNameText}>
                Team Name
            </Text>
            <View style={styles.profileDetailsContent}>
                <View style={styles.profileDetailsSubContent}>
                    <View style={styles.iconView}>
                        <View style={styles.iconContent}>
                            <Image source={PATHS.IMAGES.EMAIL_ICON} style={styles.image}/>
                        </View>
                    </View>
                    <View style={styles.inputFieldContent}>
                        <Text style={styles.textView}>Email</Text>
                        <Text style={styles.inputField}>{"abc@gmail.com"}</Text>
                    </View>
                </View>
                <View style={styles.profileDetailsSubContent}>
                    <View style={styles.iconView}>
                        <View style={styles.iconContent}>
                            <Image source={PATHS.IMAGES.PASSWORD_ICON} style={styles.image}/>
                        </View>
                    </View>
                    <View style={styles.inputFieldContent}>
                        <Text style={styles.textView}>Password</Text>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{"password"}</Text>
                                <EyeIcon
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    visible={isPasswordVisible}
                                />
                        </View>
                    </View>
                </View>
                <View style={styles.profileDetailsSubContent}>
                    <View style={styles.iconView}>
                        <View style={styles.iconContent}>
                            <Image source={PATHS.IMAGES.LOGOUT_ICON} style={styles.image}/>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.inputFieldContent}
                                      onPress={handleLogout}>
                        <Text style={styles.textView}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileImageView: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center'
    },
    teameNameText: {
        fontSize: 24,
        fontWeight: '700',
        color: THEME.COLORS.primary,
        textAlign: 'center',
        marginTop: 24
    },
    profileDetailsContent: {
        height: 320,
        marginHorizontal: "12%",
        backgroundColor: THEME.COLORS.primary,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignSelf: 'center',
        marginTop: "8%",
        elevation: 10,
        justifyContent: 'space-evenly',
        paddingLeft: "5%",
    },
    profileDetailsSubContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

    },
    iconView: {
        flexDirection: 'column',
        width: '20%',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    iconContent: {
        backgroundColor: THEME.COLORS.white,
        borderRadius: 25,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputFieldContent: {
        flexDirection: 'column',
        width: '80%',
        marginLeft: 20,
        marginRight: 25,
        justifyContent: 'center'
    },
    textView: {
        fontSize: 20,
        fontWeight: '700',
        color: THEME.COLORS.white,
    },
    inputView: {
        width: '100%',
        flexDirection: 'row'
    },
    inputField: {
        borderWidth: 0,
        paddingVertical:5,
        fontSize: 14,
        fontWeight: '300',
        color: THEME.COLORS.white,
        flexDirection: 'column',
        width: '85%'
    },
    eyeIcon: {
        flexDirection: 'column',
        padding: 5
    },
    icon: {
        marginLeft: '1%',
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});