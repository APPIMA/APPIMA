import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import useForm from "../../hooks/useForm";

import DevicesContext from "../../Context/DevicesContext";
import Colors from "../../Colors";
import CustomText from "../ui/CustomText";
import validateDeviceSettings from "../../utils/validateDeviceSettings";
import Alerts from "../ui/Alerts";

export default function AddDevice() {
  const { addDevice } = useContext(DevicesContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const { deviceName, host, port, onInputChange, onResetForm } = useForm({
    deviceName: "",
    host: "",
    port: "",
  });

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleSave = () => {
    const invalidTypes = validateDeviceSettings({
      name: deviceName,
      host,
      port,
    });

    setAlerts(invalidTypes);
    if (invalidTypes.length > 0) {
      return;
    }

    toggleModal();
    addDevice({ deviceName: deviceName.trim(), port, host });
    onResetForm();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Ionicons name="add" size={28} color={Colors.text} />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {alerts.map((text, index) => (
              <Alerts key={`alert_${index}`} text={text} />
            ))}
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                onInputChange({ value, name: "deviceName" })
              }
              placeholder="Escriba el nombre"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) => onInputChange({ value, name: "host" })}
              placeholder="Escriba la dirección IP"
            />
            <TextInput
              style={styles.input}
              onChangeText={(value) => onInputChange({ value, name: "port" })}
              placeholder="Escriba el puerto"
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <CustomText style={styles.saveButtonText}>Guardar</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <CustomText style={styles.cancelButtonText}>Cancelar</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
