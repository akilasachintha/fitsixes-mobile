import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

interface ImageHolderProps {
    source: ImageSourcePropType;
    size: number;
    borderColor?: string;
    borderWidth?: number;
}

const ImageHolder: React.FC<ImageHolderProps> = ({
    source,
    size,
    borderColor = "#05fffc",
    borderWidth = 2,
}) => {
    const circleSize = Math.max(size, 0);

    return (
        <View
            style={[
                styles.imageContainer,
                {
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                    borderColor,
                    borderWidth,
                },
            ]}
        >
            <Image source={source} style={styles.image} />
        </View>
    );
};

export default ImageHolder;

const styles = StyleSheet.create({
    imageContainer: {
        overflow: "hidden",
        backgroundColor: "#000532",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
});
