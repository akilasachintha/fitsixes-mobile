import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import ImageHolder from "@components/ImageHolder";
import {getRandomNoImage, PATHS} from "@constants/PATHS";
import {THEME} from "@constants/THEME";
import React, {useEffect, useState} from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";

const ProfileScreen = () => {
    useNavigation();
    const [profileDetails, setProfileDetails] = useState<any>({});
    const {logout} = useAuth();
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const handleLogout = () => {
        logout();
    }

    const getProfileDetails = async () => {
        try {
            const response = await axiosInstanceForFitSixes.get('teamprofile');
            console.log("API call", response.data.data);
            setProfileDetails(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('Get users failed:', error);
        }
    }

    useEffect(() => {
        getProfileDetails().catch((e) => console.error(e));
    }, []);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileImageView}>
                    <ImageHolder
                        source={getRandomNoImage()}
                        size={150}
                        borderColor="#13FAF8"
                        borderWidth={2}
                    />
                </View>
                <Text style={styles.teameNameText}>
                    {profileDetails && profileDetails.team && profileDetails.team.name}
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
                            <Text
                                style={styles.inputField}>{profileDetails && profileDetails.team && profileDetails.team.email}</Text>
                        </View>
                    </View>
                    <View style={styles.profileDetailsSubContent}>
                        <View style={styles.iconView}>
                            <View style={styles.iconContent}>
                                <Image source={PATHS.IMAGES.EMAIL_ICON} style={styles.image}/>
                            </View>
                        </View>
                        <View style={styles.inputFieldContent}>
                            <Text style={styles.textView}>Contact No</Text>
                            <Text
                                style={styles.inputField}>{profileDetails && profileDetails.team && profileDetails.team.company && profileDetails.team.company.contact}</Text>
                        </View>
                    </View>
                    <View style={styles.profileDetailsSubContent}>
                        <View style={styles.iconView}>
                            <View style={styles.iconContent}>
                                <Image source={PATHS.IMAGES.EMAIL_ICON} style={styles.image}/>
                            </View>
                        </View>
                        <View style={styles.inputFieldContent}>
                            <Text style={styles.textView}>Company Code</Text>
                            <Text
                                style={styles.inputField}>{profileDetails && profileDetails.team && profileDetails.team.company && profileDetails.team.company.company_code}</Text>
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
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileImageView: {
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
        paddingVertical: "5%",
        marginBottom: "6%",
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
        marginVertical: "5%",
    },
    iconView: {
        flexDirection: 'column',
        marginHorizontal: "5%",
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
        paddingVertical: 5,
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