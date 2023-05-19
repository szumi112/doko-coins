import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./components/navigation/bottom-tab-navigator";

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;
