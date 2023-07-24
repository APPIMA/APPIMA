import { StyleSheet, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function CustomText(props) {
  const [loaded] = useFonts({
    "Open Sans": require("../../../assets/fonts/OpenSans-Regular.ttf")
  })

  if (!loaded) {
    return null;
  }

  const { style } = props;

  return <Text {...props} style={{
    ...styles.defaultText, 
    ...style
  }} />;
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Open Sans",
  },
});
