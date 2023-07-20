import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./src/Colors";
import BarTitle from "./src/Components/BarTitle/BarTitle";
import Devices from "./src/Components/Devices/Devices";
import GlobalProvider from "./src/Components/Context/GlobalProvider";

export default function App() {
  return (
    <View  style={styles.container}>
      <GlobalProvider>
        <StatusBar
          hidden={false}
          barStyle="default"
          animated={false}
          translucent={false}
          backgroundColor={Colors.white}
        />
        <BarTitle name="Menu" />
        <Devices />
        <Text>APP LEVANTADA</Text>
      </GlobalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
