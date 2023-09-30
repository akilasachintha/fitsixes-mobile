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
    fontSize: 30,
    color: '#000532',
    fontWeight : "bold",
    marginVertical: '8%',
  },
});

export default HeaderText;
