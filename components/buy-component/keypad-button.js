import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const KeypadButton = ({ value, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    minWidth: 60,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default KeypadButton;
