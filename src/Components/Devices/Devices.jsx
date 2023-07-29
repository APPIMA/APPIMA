import React, { useCallback, useContext, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import GlobalContext from "../../Context/GlobalContext";
import Device from "./Device";

export default function Devices() {
  const { devices, setDevices } = useContext(GlobalContext);

  const updateDevices = useCallback(() => {
    const updatedDevices = devices.map((device) => {
      const updatedDevice = { ...device };

      const client = new WebSocket(`ws://${device.host}:${device.port}`);

      client.onmessage = (e) => {
        try {
          const jsonData = JSON.parse(e.data);
          if (jsonData.hasOwnProperty("sensor1")) {
            updatedDevice.sensores[0].lectura = jsonData.sensor1;
          }
          if (jsonData.hasOwnProperty("sensor2")) {
            updatedDevice.sensores[1].lectura = jsonData.sensor2;
          }
          if (jsonData.hasOwnProperty("sensor3")) {
            updatedDevice.sensores[2].lectura = jsonData.sensor3;
          }
          if (jsonData.hasOwnProperty("sensor4")) {
            updatedDevice.sensores[3].lectura = jsonData.sensor4;
          }
          updatedDevice.lastUpdate = Date.now();
        } catch (error) {
          if (error.name !== "SyntaxError") {
            throw error;
          }
        }
      };

      client.close();

      return updatedDevice;
    });

    setDevices(updatedDevices);
  }, [devices, setDevices]);

  useEffect(() => {
    const intervalo = setInterval(updateDevices, 1000);

    return () => {
      clearInterval(intervalo);
    };
  });

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
