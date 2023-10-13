import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Image, ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageHolder from "../components/ImageHolder";
import { PATHS } from "../config/paths";
import { THEME } from "../config/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface EyeIconProps {
    onPress: () => void;
    visible: boolean;
    error?: boolean;
    onBlur?: () => void;
}

const EyeIcon: React.FC<EyeIconProps> = ({ onPress, visible, error, onBlur }) => {
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

interface ProfileScreenProps{
    url: ImageSourcePropType;
    email: string;
    password: string;
   
}
const ProfileScreen: React.FC<ProfileScreenProps> = ({
    email = 'example@email.com',
    password = 'examplePassword',
    url

}) =>{
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
        <SafeAreaView>
            <View style={styles.profileImageView}>
                <ImageHolder
                    source={ url ? url : PATHS.IMAGES.NO_IMAGE}
                    size={200}
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
                            <Image source={require('../assets/email_icon.png')} />
                        </View>
                    </View>
                    <View style={styles.inputFieldContent}>
                        <Text style={styles.textView}>Email</Text>
                        <Text style={styles.inputField}>{email}</Text>
                    </View>
                </View>
                <View style={styles.profileDetailsSubContent}>
                    <View style={styles.iconView}>
                        <View style={styles.iconContent}>
                            <Image source={require('../assets/password_icon.png')} />
                        </View>
                    </View>
                    <View style={styles.inputFieldContent}>
                        <Text style={styles.textView}>Password</Text>
                        <View style={styles.inputView}>
                            <Text style={styles.inputField}>{password}</Text>
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
                            <Image source={require('../assets/logout_icon.png')} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.inputFieldContent}
                        onPress={()=>{
                            //@ts-ignore
                            navigation.openDrawer();  
                        }}>
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
        height: 360,
        width: 360,
        backgroundColor: THEME.COLORS.primary,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignSelf: 'center',
        marginTop: 28,
        elevation: 10,
        justifyContent: 'space-evenly'
    },
    profileDetailsSubContent: {
        flexDirection: 'row',
        width: '80%',
        marginBottom: 23,
        marginTop: 23,
        marginHorizontal: 23,

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
        width: 50,
        height: 50,
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
        fontSize: 24,
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






})