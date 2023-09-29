// GradientBackground.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: object; // Optional style prop
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children,}) => {
  return (
    <LinearGradient
        colors={['rgba(71,134,169,255)', '#E5FFFF', 'rgba(71,134,169,255)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
    >
      {children}
     </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
