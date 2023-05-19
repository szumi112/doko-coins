import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const DeleteButton = ({ handleDelete }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleDelete}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>X</Text>
      </View>
      <View style={styles.triangleContainer}>
        <View style={styles.triangle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    overflow: "visible",
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#333333",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  triangleContainer: {
    position: "absolute",
    top: 4,
    left: -9,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    overflow: "visible",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 19,
    borderTopWidth: 19,
    borderRightColor: "#333333",
    borderTopColor: "transparent",
    transform: [{ rotate: "135deg" }],
  },
});

export default DeleteButton;
