import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import Lecturas from "./Lecturas";
import Colors from "../../Colors";
import CustomText from "../ui/CustomText";
import GlobalContext from "../Context/GlobalContext";

export default function Device({
  nombre,
  lectura1,
  lectura2,
  lectura3,
  lectura4,
  id,
  connection,
}) {
  const { changeDeviceTitle } = useContext(GlobalContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState(nombre);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleSave = () => {
    changeDeviceTitle(newDeviceName, id);
    toggleModal();
  };

  return (
    <View style={styles.deviceContainer}>
      <View style={styles.deviceInfoContainer}>
        <View style={styles.deviceNameContainer}>
          <CustomText style={styles.deviceName}>{nombre}</CustomText>
          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <FontAwesome
              name="pencil-square-o"
              size={18}
              color={Colors.darkText}
            />
          </TouchableOpacity>
        </View>
        <CustomText style={styles.deviceLastUpdate}>
          {connection ? "Conectado" : "Sin Conexión"}
        </CustomText>
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={newDeviceName}
              onChangeText={setNewDeviceName}
              placeholder="Enter new name"
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

      <Lecturas
        id={id}
        lectura1={lectura1}
        lectura2={lectura2}
        lectura3={lectura3}
        lectura4={lectura4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    display: "flex",
    marginHorizontal: 8,
    marginBottom: 16,
    borderWidth: 2,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    width: Dimensions.get("window").width - 16,
  },
  deviceName: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 6,
    color: Colors.darkText,
    paddingTop: 3,
    paddingLeft: 12,
  },
  deviceInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  deviceLastUpdate: {
    color: Colors.white,
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 6,
  },
  deviceNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
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

Device.propTypes = {
  nombre: PropTypes.string.isRequired,
  lectura1: PropTypes.number.isRequired,
  lectura2: PropTypes.number.isRequired,
  lectura3: PropTypes.number.isRequired,
  lectura4: PropTypes.number.isRequired
};
