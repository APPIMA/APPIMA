import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Lecturas from "./Lecturas";
import Colors from "../../Colors";
import CustomText from "../ui/CustomText";
import DevicesContext from "../../Context/DevicesContext";
import getRelativeTimeText from "../../utils/getRelativeTimeText";
import useForm from "../../hooks/useForm";
import WebSocketManager from "../../classes/WebSocketManager";
import Alerts from "../ui/Alerts";
import validateDeviceSettings from "../../utils/validateDeviceSettings";

export default function Device({ name, sensores, id, host, port, lastUpdate }) {
  const msgFunction = useCallback((lectures) => {
    updateLectures(id, [
      {
        lectura: lectures[0],
        name: sensores[0].name,
      },
      {
        lectura: lectures[1],
        name: sensores[1].name,
      },
      {
        lectura: lectures[2],
        name: sensores[2].name,
      },
      {
        lectura: lectures[3],
        name: sensores[3].name,
      },
    ]);
  }, []);

  const { changeDeviceSettings, deleteDevice, updateLectures } = useContext(DevicesContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [client, setClient] = useState(
    new WebSocketManager({ host, id, msgFunction, port }),
  );
  const { newDeviceName, newHost, newPort, onInputChange, onResetForm } = useForm({
      newDeviceName: name,
      newHost: host,
      newPort: port,
    });
  const [relativeTime, setRelativeTime] = useState(
    getRelativeTimeText(parseInt((Date.now() - lastUpdate) / 1000, 10)),
  );
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRelativeTime = getRelativeTimeText(
        parseInt((Date.now() - lastUpdate) / 1000, 10),
      );
      setRelativeTime(newRelativeTime);
    }, 1000); // Intervalo de 1000 ms (1 segundo)

    return () => {
      clearInterval(intervalId);
    };
  }, [lastUpdate]);

  useEffect(() => {
    setClient(new WebSocketManager({ host, id, msgFunction, port }));
    client.openConnection();

    return () => {
      client.closeConnection();
    };
  }, [port, host]);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleSave = () => {
    const invalidTypes = validateDeviceSettings({
      name: newDeviceName,
      host: newHost,
      port: newPort,
    });

    setAlerts(invalidTypes);
    if (invalidTypes.length > 0) {
      return;
    }

    changeDeviceSettings({
      id,
      name: newDeviceName,
      host: newHost,
      port: newPort,
    });
    toggleModal();
  };

  const handleDelete = () => {
    deleteDevice(id);
    toggleModal();
  };

  const handleClose = () => {
    toggleModal();
    onResetForm();
    setAlerts([]);
  };

  return (
    <View style={styles.deviceContainer}>
      <View style={styles.deviceInfoContainer}>
        <View style={styles.deviceNameContainer}>
          <CustomText style={styles.deviceName}>{name}</CustomText>
        </View>
        <CustomText onPress={toggleModal} style={styles.changeConfiguration}>
          Editar configuración
        </CustomText>
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {alerts.map((text, index) => (
              <Alerts key={`alert_${index}`} text={text} />
            ))}
            <TextInput
              style={styles.input}
              value={newDeviceName}
              onChangeText={(value) =>
                onInputChange({ name: "newDeviceName", value })
              }
              placeholder="Escribe un nuevo nombre"
            />
            <TextInput
              style={styles.input}
              value={newHost}
              onChangeText={(value) =>
                onInputChange({ name: "newHost", value })
              }
              placeholder="Escribe una nueva dirección"
            />
            <TextInput
              style={styles.input}
              value={newPort}
              onChangeText={(value) =>
                onInputChange({ name: "newPort", value })
              }
              placeholder="Escribe un nuevo puerto"
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <CustomText style={styles.saveButtonText}>Actualizar</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
              <CustomText style={styles.cancelButtonText}>Cancelar</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <CustomText style={styles.deleteButtonText}>Eliminar Dispositivo</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Lecturas id={id} sensores={sensores} />

      <CustomText style={styles.ipAddress}>
        {`${host}:${port} - ${relativeTime}`}
      </CustomText>
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
  changeConfiguration: {
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
  ipAddress: {
    color: Colors.white,
    backgroundColor: Colors.darkBlue,
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
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
  deleteButton: {
    backgroundColor: Colors.red,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  deleteButtonText: {
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
  name: PropTypes.string.isRequired,
  sensores: PropTypes.array.isRequired,
};
