import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface HeaderTextProps {
  header: React.ReactNode;
}

const HeaderText: React.FC<HeaderTextProps> = ({ header}) => {
  return <Text style={[styles.text]}>{header}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 45,
    color: 'rgba(16, 27, 98, 1)',
    fontWeight : '600',
    fontFamily : 'Roboto'
  },
});

export default HeaderText;
