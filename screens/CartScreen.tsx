import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import CartCard from "@components/CartCard";
import {THEME} from "@constants/THEME";
import {getrandomNoImage} from "@constants/PATHS";

export default function CartScreen() {

    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.textView}> Welcome !</Text>
                    <Text style={styles.textView}> You can request your food and beverages right here,
                        hassle-free</Text>
                </View>
                <View style={styles.cardView}>
                    <CartCard url={getrandomNoImage()} text="Food"/>
                    <CartCard url={getrandomNoImage()} text="Water"/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textContainer: {
        margin: 20
    },
    textView: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: THEME.COLORS.primary,
    },
    cardView: {
        marginTop: 20
    }
})