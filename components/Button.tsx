import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {THEME} from "@constants/THEME";

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
      backgroundColor: THEME.COLORS.primary,
      borderRadius: 112,
      alignItems: 'center',
      width: '100%',
      padding: 10,
      justifyContent: 'center',
      marginVertical: "5%",
    },
    buttonText: {
      color: THEME.COLORS.white,
      fontSize : 24,
      fontWeight : "500",
    },
    androidShadow: {
      elevation: 3, 
    },
  });
  
  export default Button;