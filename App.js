import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Colors from './src/Colors';
import BarTitle from './src/Components/BarTitle/BarTitle';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        hidden={false}
        barStyle="default"
        animated={false}
        translucent={false}
        backgroundColor={Colors.white}
      />
      <BarTitle name="Menu" />
      <Text>APP LEVANTADA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});