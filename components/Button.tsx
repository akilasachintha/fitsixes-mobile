import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';

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
      backgroundColor: '#000532',
      borderRadius: 112,
      alignItems: 'center',
      width: '90%',
      padding: 15,
      justifyContent: 'center',
      marginVertical: "5%",
    },
    buttonText: {
      color: 'rgba(255, 255, 255, 1)',
      fontSize : 24,
      fontWeight : "500",
    },
    androidShadow: {
      elevation: 3, 
    },
  });
  
  export default Button;