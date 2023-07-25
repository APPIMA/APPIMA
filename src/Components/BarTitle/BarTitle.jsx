import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Colors";
import GlobalContext from "../Context/GlobalContext";
import CustomText from "../ui/CustomText";

export default function BarTitle({ barTitle }) {
  const { addDevice } = useContext(GlobalContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [IP, setIP] = useState("");
  const [port, setPort] = useState("");

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleSave = () => {
    toggleModal();
    addDevice({ deviceName, port, IP });
    setDeviceName("");
    setIP("");
    setPort("");
  };

  return (
    <View style={styles.bar}>
      <CustomText style={styles.title}>{barTitle}</CustomText>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Ionicons name="add" size={28} color={Colors.text} />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              onChangeText={setDeviceName}
              placeholder="Escriba el nombre"
            />
            <TextInput
              style={styles.input}
              onChangeText={setIP}
              placeholder="Escriba la dirección IP"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPort}
              placeholder="Escriba el puerto"
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <CustomText style={styles.saveButtonText}>Save</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "600",
    color: Colors.text,
  },
  button: {
    borderRadius: 100,
    borderColor: Colors.text,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    width: Dimensions.get("window").width - 32,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: Colors.darkBlue,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.darkText,
    fontSize: 16,
  },
});
