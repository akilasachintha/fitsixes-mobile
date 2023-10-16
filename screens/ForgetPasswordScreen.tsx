import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from "react-native";
import ImageHolder from "@components/ImageHolder";
import HeaderText from "@components/HeaderText";
import Button from "@components/Button";
import {THEME} from "@constants/THEME";
import {PATHS} from "@constants/PATHS";
import * as Yup from "yup";
import FormFields, {IFormField} from "@components/FormFields";
import {Formik} from "formik";
import React from "react";
import {useAuthService} from "@services/useAuthService";

type IForgetPasswordFormValues = {
    email: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        // @ts-ignore
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const fields: IFormField[] = [
    {
        id: "1",
        placeholder: 'Email',
        name: 'email',
        required: true,
        secureTextEntry: false,
        isEyeEnabled: false,
        keyboardType: 'email-address'
    },
    {
        id: "2",
        placeholder: 'Password',
        name: 'password',
        required: true,
        secureTextEntry: true,
        isEyeEnabled: true,
        keyboardType: 'default'
    },
    {
        id: "3",
        placeholder: 'Confirm Password',
        name: 'confirmPassword',
        required: true,
        secureTextEntry: true,
        isEyeEnabled: true,
        keyboardType: 'default'
    },
];

const initialValues: IForgetPasswordFormValues = {email: '', password: '', confirmPassword: ''};

export default function ForgetPasswordScreen() {
    const {forgotPasswordService} = useAuthService();

    const handleForgotPassword = async (values: IForgetPasswordFormValues) => {
        console.log(values);
        await forgotPasswordService(values.email, values.password);
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.container}>
                <ImageHolder source={PATHS.IMAGES.FIT_SIXES_LOGO} size={150} borderWidth={0}/>
                <HeaderText header={"Forget Password"}/>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        Please enter your registered email address. We will send you a link to reset your password.
                    </Text>
                </View>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    onSubmit={(values) => handleForgotPassword(values)}
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
                            <Button title="Reset Password" onPress={handleSubmit}/>
                        </KeyboardAvoidingView>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
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
});