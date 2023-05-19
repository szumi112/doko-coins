import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import BuyComponent from "../buy-component/index";
import Market from "../Market";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Buy") {
            iconName = focused ? "ios-cart" : "ios-cart-outline";
          } else if (route.name === "Market") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBar,
        headerShown: false, // Hide the header/title
      })}
    >
      <Tab.Screen name="Buy" component={BuyComponent} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Account" component={BuyComponent} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    marginTop: 10,
  },
});

export default BottomTabNavigator;
