import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React from "react";
import Colors from "./src/Colors";
import BarTitle from "./src/Components/BarTitle/BarTitle";
import Devices from "./src/Components/Devices/Devices";
import GlobalProvider from "./src/Context/GlobalProvider";

export default function App() {
  return (
    <View style={styles.container}>
      <GlobalProvider>
        <StatusBar
          hidden={false}
          barStyle="default"
          animated={false}
          translucent={false}
          backgroundColor={Colors.darkBlue}
        />
        <BarTitle barTitle="Dispositivos" />
        <Devices />
      </GlobalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
