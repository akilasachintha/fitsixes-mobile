import React, {useState} from 'react';
import {KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {THEME} from "@constants/THEME";

interface EyeIconProps {
    onPress: () => void;
    visible: boolean;
    error?: boolean;
    onBlur?: () => void;
}

const EyeIcon: React.FC<EyeIconProps> = ({onPress, visible, error, onBlur}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name={visible ? 'eye' : 'eye-off'}
                    size={20}
                    color={error && onBlur ? 'red' : THEME.COLORS.primary}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    );
};

interface FormFieldProps {
    placeholder: string;
    onChangeText: any;
    onBlur: any;
    value: any;
    error: any;
    secureTextEntry?: boolean;
    isEyeEnabled?: boolean;
    isCorrect: boolean;
    keyboardType?: KeyboardTypeOptions;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 placeholder,
                                                 onChangeText,
                                                 onBlur,
                                                 value,
                                                 error,
                                                 secureTextEntry,
                                                 isEyeEnabled,
                                                 isCorrect,
                                                 keyboardType
                                             }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const inputStyles = [
        styles.inputContainer,
        error && onBlur ? styles.inputFieldError : null,
        !(error && onBlur) && isCorrect ? styles.inputFieldCorrect : null,
    ];

    const handleClearInput = () => {
        setInputValue('');
    };

    return (
        <View>
            <Text style={styles.labelText}>
                {placeholder}
            </Text>
            <View style={inputStyles}>
                <TextInput
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    style={styles.inputField}
                    placeholder={placeholder}
                    onChangeText={(text) => {
                        setInputValue(text);
                        onChangeText(text);
                    }}
                    onBlur={onBlur}
                    value={inputValue}
                    keyboardType={keyboardType}
                />
                {secureTextEntry && isEyeEnabled && (
                    <EyeIcon
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        visible={isPasswordVisible}
                        error={error}
                        onBlur={onBlur}
                    />
                )}
                {error && onBlur ? (
                    <Ionicons onPress={handleClearInput} name="close-circle" size={20} color="red" style={styles.icon}/>
                ) : isCorrect ? (
                    <Ionicons name="checkmark-circle" size={20} color={THEME.COLORS.primary} style={styles.icon}/>
                ) : null}
            </View>
            {error && onBlur ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

export default FormField;


const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
        borderBottomWidth: 2,
        borderColor: THEME.COLORS.primary,
    },
    inputField: {
        color: THEME.COLORS.primary,
        flex: 1,
        fontSize: 16,
    },
    inputFieldError: {
        marginBottom: 0,
        borderColor: 'red',
    },
    labelText: {
        color: THEME.COLORS.primary,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: '2%',
    },
    inputFieldCorrect: {
        marginBottom: '5%',
    },
    error: {
        marginVertical: 4,
        color: 'red',
        fontSize: 12,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: '1%',
    },
});

