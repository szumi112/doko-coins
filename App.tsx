import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./components/navigation/bottom-tab-navigator";

import { AppRegistry } from "react-native";

AppRegistry.registerComponent("App", () => App);

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;
