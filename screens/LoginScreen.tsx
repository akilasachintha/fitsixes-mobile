import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import ImageHolder from '../components/ImageHolder';
import HeaderText from '../components/HeaderText';
import Button from '../components/Button';
import {THEME} from '../config/theme';
import {PATHS} from '../config/paths';
import FormFields, {IFormField} from "../components/FormFields";
import {useAuthService} from "../services/useAuthService";

export interface ILoginFormValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const fields: IFormField[] = [
    {id: "1", placeholder: 'Email', name: 'email', required: true, secureTextEntry: false, isEyeEnabled: false, keyboardType: 'email-address'},
    {id: "2", placeholder: 'Password', name: 'password', required: true, secureTextEntry: true, isEyeEnabled: true, keyboardType: 'default'},
];

const initialValues: ILoginFormValues = {email: '', password: ''};

export default function LoginScreen() {
    const navigation = useNavigation();
    const {loginService} = useAuthService()

    const handleLogin = async (values: ILoginFormValues) => {
        console.log('values', values);

        try {
            await loginService(values.email, values.password);
        } catch (e) {
            console.error(e);
        }
    };

    const handleForgotPassword = () => {
        // @ts-ignore
        navigation.navigate('ForgetPasswordStack');
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.container}>
                <ImageHolder source={PATHS.IMAGES.FIT_SIXES_LOGO} size={150} borderWidth={0}/>
                <HeaderText header={'Login'}/>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    onSubmit={(values) => handleLogin(values)}
                >
                    {({
                          handleChange
                          , handleBlur
                          , handleSubmit
                          , values
                          , errors
                          , touched
                      }) => (
                        <KeyboardAvoidingView behavior="padding"
                                              style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                            <FormFields
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                fields={fields}
                            />
                            <View style={styles.forgetPasswordContainer}>
                                <TouchableOpacity style={styles.forgetPasswordTextContainer}
                                                  onPress={handleForgotPassword}>
                                    <Text style={styles.forgetPasswordText}>Forgot Password</Text>
                                </TouchableOpacity>
                            </View>
                            <Button title="Login" onPress={handleSubmit}/>
                        </KeyboardAvoidingView>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: '8%',
        justifyContent: 'center',
    },
    forgetPasswordContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: '5%',
    },
    forgetPasswordTextContainer: {
        justifyContent: 'flex-end',
    },
    forgetPasswordText: {
        color: THEME.COLORS.primary,
        fontSize: 14,
        textAlign: 'right',
    },
});
