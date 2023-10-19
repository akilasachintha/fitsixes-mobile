import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {THEME} from "@constants/THEME";

interface HeaderTextProps {
    header: React.ReactNode;
}

const HeaderText: React.FC<HeaderTextProps> = ({header}) => {
    return <Text style={[styles.text]}>{header}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: THEME.COLORS.primary,
        fontWeight: "bold",
        paddingVertical: '8%',
    },
});

export default HeaderText;
