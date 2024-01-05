import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import NegociosStack from "./NegociosStack";
import FavoritesStack from "./FavoritesStack";
import AccountStack from "./AccountStack";
import TopNegociosStack from "./TopNegociosStack";
import SearchStack from "./SearchStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="negocios"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#54b4eb",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="negocios"
          component={NegociosStack}
          options={{ title: "Negocios" }}
        ></Tab.Screen>
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: "Favoritos" }}
        ></Tab.Screen>
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Mi cuenta" }}
        ></Tab.Screen>
        <Tab.Screen
          name="top"
          component={TopNegociosStack}
          options={{ title: "Top 10" }}
        ></Tab.Screen>
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "negocios":
      iconName = "compass-outline";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "account";
      break;
    case "top":
      iconName = "star";
      break;
    default:
      break;
  }
  return (
    <Icon
      type="material-community"
      name={iconName}
      size={22}
      color={color}
    ></Icon>
  );
}
