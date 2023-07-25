import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import Colors from "../../Colors";
import CustomText from "../ui/CustomText";

export default function Lectura({ lectura, numero }) {
  const [estado, setEstado] = useState("Bien");
  const [estilo, setEstilo] = useState({})

  useEffect(() => {
    if (lectura < 20) {
      setEstado("Seguro");
      setEstilo({
        fontWeight: 600,
        color: Colors.green
      });
    } else if (lectura >= 20 && lectura <= 50 ) {
      setEstado("Precaución");
      setEstilo({
        fontWeight: 600,
        color: Colors.orange
      });
    } else {
      setEstado("Peligro!!!");
      setEstilo({
        fontWeight: 600,
        color: Colors.red
      });
    }
  }, [lectura])

  return (
    <View style={styles.deviceContainer}>
      <CustomText style={styles.lecturaTitulo}>Sensor {numero}</CustomText>
      <CustomText style={{
        ...styles.lecturaTitulo,
        ...estilo
      }}>{estado}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    flex: 1
  },
  lecturaTitulo: {
    textAlign: "center",
  }
});

Lectura.propTypes = {
  lectura: PropTypes.number.isRequired,
  numero: PropTypes.number.isRequired
}