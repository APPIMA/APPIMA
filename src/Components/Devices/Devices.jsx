import { View, Text } from "react-native";
import React, { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";

export default function Devices() {
  const { devices } = useContext(GlobalContext);

  return devices.map(({ nombre, lecturas, id }) => (
    <View key={id}>
      <Text>{nombre}</Text>
      <Text>Lectura 1: {lecturas[0]}</Text>
      <Text>Lectura 2: {lecturas[1]}</Text>
      <Text>Lectura 3: {lecturas[2]}</Text>
      <Text>Lectura 4: {lecturas[3]}</Text>
    </View>
  ));
}
