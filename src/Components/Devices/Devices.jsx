import React, { useCallback, useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
          updatedDevice.lectura1 = jsonData.sensor1;
          updatedDevice.lectura2 = jsonData.sensor2;
          updatedDevice.lectura3 = jsonData.sensor3;
          updatedDevice.lectura4 = jsonData.sensor4;
          updatedDevice.lastUpdate = Date.now();
        } catch (error) {
          console.log("Texto no es un JSON");
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
  },
});
