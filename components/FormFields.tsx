import React from 'react';
import FormField from '@components/FormField';
import {KeyboardTypeOptions} from "react-native";

export interface IFormField {
    id: string;
    name: string;
    placeholder: string;
    required: boolean;
    secureTextEntry: boolean;
    isEyeEnabled: boolean;
    keyboardType?: KeyboardTypeOptions;
}

interface Props {
    handleChange: any;
    handleBlur: any;
    values: any;
    errors: any;
    touched: any;
    fields: IFormField[];
}

const FormFields: React.FC<Props> = ({handleChange, handleBlur, values, errors, touched, fields}) => {
    return fields.map((field) => (
        <FormField
            key={field.id}
            placeholder={field.placeholder}
            onChangeText={handleChange(field.name)}
            onBlur={handleBlur(field.name)}
            value={values[field.name]}
            error={touched[field.name] && errors[field.name]}
            secureTextEntry={field.secureTextEntry}
            isEyeEnabled={field.isEyeEnabled}
            isCorrect={touched[field.name]}
            keyboardType={field.keyboardType}
        />
    ));
};

export default FormFields;
