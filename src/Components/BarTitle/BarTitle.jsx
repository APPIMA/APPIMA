import { View, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../Colors";
import CustomText from "../ui/CustomText";
import AddDevice from "./AddDevice";

export default function BarTitle({ barTitle }) {
  return (
    <View style={styles.bar}>
      <CustomText style={styles.title}>{barTitle}</CustomText>
      <AddDevice />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.darkBlue,
    elevation: 10,
    height: 56,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "600",
    color: Colors.text,
  },
});
