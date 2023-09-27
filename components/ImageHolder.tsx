import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

interface ImageHolderProps {
    source: ImageSourcePropType;
    size: number;
}

const ImageHolder: React.FC<ImageHolderProps> = ({ source, size }) => {
    return (
        <View style={[styles.imageContainer, { width: size, height: size }]}>
            <Image source={source} style={styles.image} />
        </View>
    );
};

export default ImageHolder;

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 50,
        overflow: "hidden",
        borderColor: "#13FAF8",
        borderWidth: 2
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
});
