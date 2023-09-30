import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

interface TextInputFieldProps {
  label : string;
  placeholder: string;
  isPassword?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  isPassword = false,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (

    <View style={styles.mainContainer}>
      <Text style={styles.label}> {label} </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={isPassword && !isPasswordVisible}
          style={styles.input}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.passwordToggle}
          >
            <FontAwesome
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="rgba(16, 27, 98, 1)"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flexDirection:'column',
    alignItems:'flex-start',
  },
  label : {
    fontSize: 18,
    color: '#000532',
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000532',
    marginBottom: 20,
    marginLeft :5,
  },
  input: {
    flex: 1,
    padding: 5,
    paddingLeft :  0,
    fontSize: 16,
    color: '#000532'
  },
  passwordToggle: {
    padding: 10,
  },
});

export default TextInputField;
