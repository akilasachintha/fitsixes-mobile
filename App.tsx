import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from "./navigation/StackNavigator";
import {StatusBar} from "expo-status-bar";

export default function App() {
  return (
      <NavigationContainer>
          <StackNavigator/>
          <StatusBar style="dark"/>
      </NavigationContainer>
  );
}
