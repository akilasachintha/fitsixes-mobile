import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TeamCard from './components/TeamCard';
import ImageHolder from './components/ImageHolder';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <TeamCard teamName='Creative Software' index={0} /> */}
      <ImageHolder source={require('./assets/fit-sixes.png')} size={230} borderWidth={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
