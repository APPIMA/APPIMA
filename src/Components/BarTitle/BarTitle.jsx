import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Colors";
import GlobalContext from "../Context/GlobalContext";

export default function BarTitle({ name }) {
  const { addDevice } = useContext(GlobalContext);

  return (
    <View style={styles.bar}>
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity onPress={addDevice} style={styles.button}>
        <Ionicons name="add" size={32} color="black" />
      </TouchableOpacity>
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
    backgroundColor: Colors.white,
    elevation: 10,
    marginBottom:15
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    borderRadius: 100,
    borderWidth: 1,
    display: "flex",
    alignItems:'center',
    justifyContent:'center',
    width: 45,
    height: 45,
  },
});
