import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import { THEME } from "../config/theme";
import ImageHolder from "./ImageHolder";
import { PATHS } from "../config/paths";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";


interface CartCardProps {
    url: ImageSourcePropType;
    text: string
}


const CartCard: React.FC<CartCardProps> = ({
    url,
    text,
}) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleConfirmButton = () => {
        console.log('======================Confirm Order===================')
    }

    const handleQuantityChangeIcon = (iconName: String) => {
        if (iconName === 'remove-circle-outline') {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        } else if (iconName === 'add-circle-outline') {
            setQuantity(quantity + 1);
        }
    }
    return (
        <View style={styles.maincontainer}>
            <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                    <ImageHolder
                        source={url ? url : PATHS.IMAGES.NO_IMAGE}
                        size={100}
                        borderColor="#13FAF8"
                        borderWidth={3}
                    />
                </View>
                <View style={styles.orderItemDetailsContainer}>
                    <Text numberOfLines={2} style={styles.textView}>Order Your {text} From Here</Text>
                    <View style={styles.quantityView}>
                        <TouchableOpacity style={styles.plusIcon}
                            onPress={() => handleQuantityChangeIcon('remove-circle-outline')}>
                            <Ionicons
                                name={'remove-circle-outline'}
                                size={30}
                                color={THEME.COLORS.white}
                            />
                        </TouchableOpacity>
                        <View style={styles.quantity}>
                            <Text style={styles.amount}>{quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.minusIcon}
                            onPress={() => handleQuantityChangeIcon('add-circle-outline')}>
                            <Ionicons
                                name={'add-circle-outline'}
                                size={30}
                                color={THEME.COLORS.white}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.confirmButton}
                    onPress={handleConfirmButton}
                >
                    <Text style={styles.buttonText}>Confirm Your Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CartCard

const styles = StyleSheet.create({

    maincontainer: {
        width: 373,
        height: 221,
        backgroundColor: THEME.COLORS.primary,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignSelf: 'center',
        marginBottom: 35,
        elevation: 10,
        marginTop: 5
    },
    subContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 50,
        flexDirection: 'row'
    },
    imageContainer: {
        flexDirection: 'column',
        margin: 25,
        width: '27%',
        height: 100
    },
    orderItemDetailsContainer: {
        marginRight: 25,
        marginTop: 32,
        flexDirection: 'column',
        width: '52%'
    },
    textView: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: THEME.COLORS.white
    },
    quantityView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15
    },
    plusIcon: {
        flexDirection: 'column',
        margin: 5
    },
    quantity: {
        flexDirection: 'column'
    },
    amount: {
        color: THEME.COLORS.white,
        fontSize: 25,
        margin: 5
    },
    minusIcon: {
        flexDirection: 'column',
        margin: 5
    },
    buttonView: {
        width: '80%',
        marginHorizontal: 25,
        alignSelf: 'center',
        marginTop: 5
    },
    confirmButton: {
        backgroundColor: THEME.COLORS.white,
        borderRadius: 112,
        alignItems: 'center',
        width: '100%',
        padding: 2,
        justifyContent: 'center',
        marginVertical: "5%",
        height: 45,
    },
    buttonText: {
        color: THEME.COLORS.primary,
        fontSize: 20,
        fontWeight: "700",
    },
})