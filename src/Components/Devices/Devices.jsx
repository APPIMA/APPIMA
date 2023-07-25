import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import GlobalContext from "../Context/GlobalContext";
import Device from "./Device";

export default function Devices() {
  const { devices } = useContext(GlobalContext);

  return <ScrollView style={styles.devicesContainer}>
    {devices.map((device) => (
      <Device key={device.id} {...device} />
    ))}
  </ScrollView>
}

const styles = StyleSheet.create({
  devicesContainer: {
    marginBottom: 48,
    paddingTop: 16
  },
});