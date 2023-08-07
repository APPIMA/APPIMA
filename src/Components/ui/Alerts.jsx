import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";
import Colors from "../../Colors";

export default function Alerts({ text }) {
  return (
    <View style={styles.alertContainer}>
      <CustomText style={styles.alertText}>{text}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.red,
    marginBottom: 12
  },
  alertText: {
    textTransform: "uppercase",
    color: Colors.white,
  },
});
