import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
  }
  
  const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
    return (
      <TouchableOpacity style={[styles.button, Platform.OS === 'android' && styles.androidShadow]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'rgba(16, 27, 98, 1)', 
      padding: 10,
      borderRadius: 112,
      alignItems: 'center',
      width : 310,
      height : 75,
      justifyContent: 'center',

    },
    buttonText: {
      color: 'rgba(255, 255, 255, 1)',
      fontSize : 24,
      fontWeight : "500",
      fontFamily : 'Roboto',
    },
    androidShadow: {
      elevation: 3, 
    },
  });
  
  export default Button;