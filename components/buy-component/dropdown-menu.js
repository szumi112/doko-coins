import React from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownMenu = ({ items, selectedValue, setSelectedValue }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedValue}
        style={{ backgroundColor: "#fafafa" }}
        containerStyle={{ height: 40 }}
        itemStyle={{ justifyContent: "flex-start" }}
        dropDownStyle={{
          backgroundColor: "#fafafa",
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 99,
          height: 200,
        }}
        onChangeValue={setSelectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default DropdownMenu;
