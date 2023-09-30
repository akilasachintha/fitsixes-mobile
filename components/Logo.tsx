// Logo.tsx
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import ImageHolder from "./ImageHolder"; 

interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
  return (

    <ImageHolder
      source={require("../assets/images/logo.png")}
      size={230}
      borderColor="rgba(16, 27, 98, 1)"
      borderWidth={0}
    //   borderRadius = {150}
    />

    // <View
    //         style={[
    //             styles.imageContainer,
    //             {
    //                 width: 230,
    //                 height: 230,
    //                 borderColor : "rgba(16, 27, 98, 1)",
    //                 borderWidth : 2,
    //             },
    //         ]}
    //     >
    //         <Image source={require("../assets/logo.png")} style={styles.image} />
    //     </View>
  );
};

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 150,
        overflow: "hidden",
        backgroundColor: "rgba(16, 27, 98, 1)",

    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
});


export default Logo;
