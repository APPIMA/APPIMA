/* eslint-disable react/no-array-index-key */
import { View, StyleSheet } from "react-native";
import React from "react";
import PropTypes from 'prop-types'
import Lectura from "./Lectura";

export default function Lecturas({ lectura1, lectura2, lectura3, lectura4, id }) {
  return (
    <View style={styles.deviceContainer}>
      <Lectura key={`${id}_1`} lectura={lectura1} numero={1} />
      <Lectura key={`${id}_2`} lectura={lectura2} numero={2} />
      <Lectura key={`${id}_3`} lectura={lectura3} numero={3} />
      <Lectura key={`${id}_4`} lectura={lectura4} numero={4} />
    </View>
  );
}

const styles = StyleSheet.create({
  deviceContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12
  },
});

Lecturas.propTypes = {
  id: PropTypes.number.isRequired,
  lectura1: PropTypes.number.isRequired,
  lectura2: PropTypes.number.isRequired,
  lectura3: PropTypes.number.isRequired,
  lectura4: PropTypes.number.isRequired
}