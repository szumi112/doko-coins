// Keypad.js
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const Keypad = ({ handlePress }) => {
  return (
    <View style={styles.keypad}>
      <View style={styles.row}>
        <KeypadButton value={1} handlePress={handlePress} />
        <KeypadButton value={2} handlePress={handlePress} />
        <KeypadButton value={3} handlePress={handlePress} />
      </View>
      <View style={styles.row}>
        <KeypadButton value={4} handlePress={handlePress} />
        <KeypadButton value={5} handlePress={handlePress} />
        <KeypadButton value={6} handlePress={handlePress} />
      </View>
      <View style={styles.row}>
        <KeypadButton value={7} handlePress={handlePress} />
        <KeypadButton value={8} handlePress={handlePress} />
        <KeypadButton value={9} handlePress={handlePress} />
      </View>
      <View style={styles.row}>
        <KeypadButton
          value={0}
          handlePress={handlePress}
          zeroButton
          style={styles.smallButton}
        />
        <KeypadButton
          value={"."}
          handlePress={handlePress}
          style={styles.smallButton}
        />
      </View>
    </View>
  );
};

const KeypadButton = ({ value, handlePress, zeroButton }) => {
  const buttonStyles = [styles.button];
  if (zeroButton) {
    buttonStyles.push(styles.zeroButton);
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={() => handlePress(value)}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  keypad: {
    justifyContent: "center",
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 40,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  zeroButton: {
    width: 160,
    borderRadius: 80,
  },
  smallButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Keypad;
