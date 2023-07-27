/* eslint-disable react/no-array-index-key */
import { View, StyleSheet } from "react-native";
import React from "react";
import PropTypes from 'prop-types'
import Lectura from "./Lectura";

export default function Lecturas({ sensores, id }) {
  return (
    <View style={styles.deviceContainer}>
      <Lectura key={`${id}_1`} lectura={sensores[0].lectura} name={sensores[0].name} />
      <Lectura key={`${id}_2`} lectura={sensores[1].lectura} name={sensores[1].name} />
      <Lectura key={`${id}_3`} lectura={sensores[2].lectura} name={sensores[2].name} />
      <Lectura key={`${id}_4`} lectura={sensores[3].lectura} name={sensores[3].name} />
    </View>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: 12,
    paddingLeft: 12,
  },
});

Lecturas.propTypes = {
  id: PropTypes.number.isRequired,
  sensores: PropTypes.array.isRequired
}