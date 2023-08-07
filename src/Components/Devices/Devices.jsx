import React, { useContext } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import DevicesContext from "../../Context/DevicesContext";
import Device from "./Device";

export default function Devices() {
  const { devices } = useContext(DevicesContext);

  return (
    <ScrollView style={styles.devicesContainer}>
      {devices.map((device) => (
        <Device key={device.id} {...device} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  devicesContainer: {
    marginBottom: 48,
    paddingTop: 16,
    height: Dimensions.get("window").height - 56
  },
});
